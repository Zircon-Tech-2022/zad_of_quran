<?php

namespace App\Http\Controllers;

use App\Http\Requests\Staff\StoreStaffRequest;
use App\Http\Requests\Staff\UpdateStaffRequest;
use App\Models\Staff;
use App\Models\StaffDetails;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Enums\LessonStatus;

class StaffController extends Controller
{
    use \App\Traits\StoreImage;
    use \App\Traits\AvailabilityHandler;

    public function __construct()
    {
        $this->middleware('permission:staff.list')->only(['index']);
        $this->middleware('permission:staff.list')->only(['match']);
        $this->middleware('permission:staff.view')->only(['show']);
        $this->middleware('permission:staff.create')->only(['store']);
        $this->middleware('permission:staff.update')->only(['update']);
        $this->middleware('permission:staff.softDelete')->only(['destroy']);
        $this->middleware('role:admin')->only(['resetPassword']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $staff = Staff::when(request('q'), fn($query, $q) => $query->search($q))
            ->select(['id', 'name', 'image', 'phone', 'email', 'qualifications', 'locale', 'rate', 'display_at_home'])
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'asc'))
            ->paginate(request('limit', 25));

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $staff);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStaffRequest $request)
    {
        $data = $request->validated();

        $staff = Staff::create([
            'email' => $data['email'],
        ]);

        $password = !empty($data['password']) ? $data['password'] : $this->generateRandomPassword();

        $staff->details()->create([
            'email' => $data['email'],
            'password' => Hash::make($password),
        ]);

        return apiSuccessResponse(
            __('messages.added_success'),
            array_merge(
                $staff->only([
                    "id",
                    "email",
                ]),
                [
                    'password' => $password,
                ]
            )
        );
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $staff = Staff::with(['details', 'availabilities', 'courses',
            'lessons' => function ($query) {
                    $query->whereHas('availabilities', function ($q) {
                        $q->where('start_time', '>', now());
                    });
                },
            'lessons.subscriber', 'lessons.course', 'lessons.availabilities'])
            ->where('id', $id)
            ->first();

        if (!$staff) {
            return apiErrorResponse(__('messages.data_not_found'), null, 404);
        }

        $timezone = request('timezone_offset');

        $netAvailabilities = $this->getNetAvailabilities($staff);
        $availabilities = $this->getAvailabilitiesInTimezones($netAvailabilities, $timezone);

        $lessons = $staff->lessons;
        $lessonsArray = [];
        $lessonsAvailabilitiesArray = [];
        foreach ($lessons as $lesson) {
            $lessonAvailabilities = $this->getAvailabilitiesInTimezones($lesson->availabilities, $timezone);
            foreach ($lessonAvailabilities as $lessonAvailability) {
                $lessonsAvailabilitiesArray[] = $lessonAvailability;
            }
            $item = $lesson->toArray();
            $item['availabilities'] = $lessonAvailabilities;
            $lessonsArray[] = $item;
        }

        return apiSuccessResponse(
            __('messages.data_retrieved_successfully'),
            array_merge(
                $staff->only([
                    "id",
                    "name",
                    "image",
                    "phone",
                    "email",
                    "qualifications",
                    "locale",
                    "deleted_at",
                    "created_at",
                    "updated_at",
                ]),
                [
                    'age' => $staff->details?->age,
                    'gender' => $staff->details?->gender,
                    'availabilities' => $availabilities,
                    'courses' => $staff->courses->toArray(),
                    'lessons' => $lessonsArray,
                ]
            )
        );
    }

    public function match(Request $request)
    {
        // selected staff with completed profiles
        $staff = Staff::with(['details', 'availabilities', 'courses',
            'lessons' => function ($query) {
                    $query->whereHas('availabilities', function ($q) {
                        $q->where('start_time', '>', now());
                    });
            }])
            ->whereNotNull( 'name')
            ->where('name', '!=', '')
            ->whereNotNull('phone');

        // filter on gender
        if ($request->filled('gender')) {
            $staff->whereHas('details', function ($q) use ($request) {
                $q->where('gender', $request->gender);
            });
        }

        // filter on course
        $courseId = $request->course ?? $request->course_id;
        if ($courseId) {
            $staff->whereHas('courses', function ($q) use ($courseId) {
                $q->where('course_id', $courseId);
            });
        }

        // base queries for each case
        $randomStaff = clone $staff; // doesn't care about target
        $exactStaff = clone $staff; // matches the required target (with 5mins tolerance)
        $maybeStaff = clone $staff; // matches the required target (with 2hrs tolerance)


        if (!empty($request->availability) && is_array($request->availability)) {
            // normalize availabilities as store method works
            $targetAvailabilities = collect($request->availability)
                ->flatMap(fn ($availability) =>
                    $this->normalizeForSaveAndConvertToUtc($availability) ?? []
                )
                ->values()
                ->all();

            // continue $exactStaff query
            $exactStaff->where(function ($q) use ($targetAvailabilities) {
                foreach ($targetAvailabilities as $target) {
                    $start = Carbon::parse($target['start_time'])
                        ->addMinutes(5)
                        ->format('H:i:s');

                    $end = Carbon::parse($target['end_time'])
                        ->subMinutes(5)
                        ->format('H:i:s');

                    $q->whereHas('availabilities', function ($qa) use ($target, $start, $end) {
                        $qa->where('day_of_week', $target['day_of_week'])
                        ->whereTime('start_time', '<=', $start)
                        ->whereTime('end_time', '>=', $end);
                    })
                    ->whereDoesntHave('lessons.availabilities', function ($ql) use ($target) {
                        $ql->where('day_of_week', $target['day_of_week'])
                        ->whereTime('start_time', '<', $target['end_time'])
                        ->whereTime('end_time', '>', $target['start_time']);
                    });
                }
            });

            // Continue $maybeStaff query
            $toleranceHours = 2;
            $maybeStaff->where(function ($q) use ($targetAvailabilities, $toleranceHours) {
                foreach ($targetAvailabilities as $target) {
                    // Calculate target duration in minutes
                    $targetDuration = (strtotime($target['end_time']) - strtotime($target['start_time'])) / 60;

                    $q->whereHas('availabilities', function ($qa) use ($target, $toleranceHours, $targetDuration) {
                        $qa->where('day_of_week', $target['day_of_week'])
                            ->where(function ($timeQuery) use ($target, $toleranceHours, $targetDuration) {
                                // Check if widened availability covers the target time
                                $timeQuery->whereRaw(
                                    "SUBTIME(start_time, ?) <= ?",
                                    [sprintf('%d:00:00', $toleranceHours), $target['start_time']]
                                )
                                ->whereRaw(
                                    "ADDTIME(end_time, ?) >= ?",
                                    [sprintf('%d:00:00', $toleranceHours), $target['end_time']]
                                )
                                // Check if after subtracting lessons, there's enough continuous time
                                ->whereRaw("
                                    (TIMESTAMPDIFF(MINUTE, start_time, end_time) -
                                    COALESCE((
                                        SELECT SUM(TIMESTAMPDIFF(MINUTE,
                                            GREATEST(la.start_time, staff_availabilities.start_time),
                                            LEAST(la.end_time, staff_availabilities.end_time)
                                        ))
                                        FROM lesson_availabilities la
                                        INNER JOIN lessons l ON la.lesson_id = l.id
                                        WHERE l.staff_id = staff_availabilities.staff_id
                                            AND la.day_of_week = staff_availabilities.day_of_week
                                            AND la.start_time < staff_availabilities.end_time
                                            AND la.end_time > staff_availabilities.start_time
                                            -- Additionally check if lesson overlaps with target window
                                            AND la.start_time < ?
                                            AND la.end_time > ?
                                    ), 0)) >= ?
                                ", [
                                    $target['end_time'],
                                    $target['start_time'],
                                    $targetDuration
                                ]);
                            });
                    });
                }
            });
        }

        // sort by age [(greater and nearest), then greater, then lower], then order by rate
        $exactStaff = $exactStaff
            ->orderByRaw('
                CASE
                    WHEN (SELECT age FROM staff_details WHERE staff_details.staff_id = staff.id) > ? THEN 0
                    WHEN (SELECT age FROM staff_details WHERE staff_details.staff_id = staff.id) = ? THEN 1
                    ELSE 2
                END ASC', [$request->age, $request->age])
            ->orderByRaw('ABS((SELECT age FROM staff_details WHERE staff_details.staff_id = staff.id) - ?) ASC', [$request->age])
            ->orderBy('rate', 'desc')
            ->get();

        // exclude exact staff from maybe, so no duplicated results
        $exactStaffIds = $exactStaff->pluck('id')->toArray();
        $maybeStaff = $maybeStaff
            ->whereNotIn('staff.id', $exactStaffIds)
            ->orderByRaw('
                CASE
                    WHEN (SELECT age FROM staff_details WHERE staff_details.staff_id = staff.id) > ? THEN 0
                    WHEN (SELECT age FROM staff_details WHERE staff_details.staff_id = staff.id) = ? THEN 1
                    ELSE 2
                END ASC', [$request->age, $request->age])
            ->orderByRaw('ABS((SELECT age FROM staff_details WHERE staff_details.staff_id = staff.id) - ?) ASC', [$request->age])
            ->orderBy('rate', 'desc')
            ->get();

        $maybeStaffIds = $maybeStaff->pluck('id')->toArray();
        $randomStaff = $randomStaff
            ->whereNotIn('staff.id', $exactStaffIds)
            ->whereNotIn('staff.id', $maybeStaffIds)
            ->orderByRaw('
                CASE
                    WHEN (SELECT age FROM staff_details WHERE staff_details.staff_id = staff.id) > ? THEN 0
                    WHEN (SELECT age FROM staff_details WHERE staff_details.staff_id = staff.id) = ? THEN 1
                    ELSE 2
                END ASC', [$request->age, $request->age])
            ->orderByRaw('ABS((SELECT age FROM staff_details WHERE staff_details.staff_id = staff.id) - ?) ASC', [$request->age])
            ->orderBy('rate', 'desc')
            ->take(35)
            ->get();

        $results = [
            'exact' => $exactStaff,
            'maybe' => $maybeStaff,
            'random' =>$randomStaff,
        ];

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $results);
    }

    /**
     * Display a staff.
     */
    public function staff()
    {
        $staff = Staff::select(['name', 'image', 'phone', 'email', 'qualifications', 'locale', 'rate'])
            ->where('display_at_home', true)
            ->orderBy('id')
            ->where('locale', app()->getLocale())
            ->get();

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $staff);
    }

    public function resetPassword(Staff $staff)
    {
        $password = $this->generateRandomPassword();

        if (!$staff->email) {
            $staff->update([
                'email' => $this->generateRandomUsername($staff->name),
            ]);
        }

        if ($staff->details) {
            $staff->details->update([
                'email' => $staff->email,
                'password' => Hash::make($password),
            ]);
        } else {
            $staff->details()->create([
                'staff_id' => $staff->id,
                'email' => $staff->email,
                'password' => Hash::make($password),
            ]);
        }

        return apiSuccessResponse(
            __('messages.updated_success'),
            array_merge(
                $staff->only([
                    "id",
                    "email",
                ]),
                [
                    'password' => $password,
                ]
            )
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStaffRequest $request, Staff $staff)
    {
        $data = $request->validated();
        $staffDetails = $staff->details;

        if ($request->hasFile('image')) {
            if ($staffDetails->staff->image) {
                Storage::disk('public')->delete($staffDetails->staff->image);
            }
            $data['image'] = $this->storeImage($request);
        }

        $staff->update([
            'name' => $data['name'] ?? $staff->name,
            'image' => $data['image'] ?? $staff->image,
            'phone' => $data['phone'] ?? $staff->phone,
            'rate' => $data['rate'] ?? $staff->rate,
            'display_at_home' => $data['display_at_home'] ?? $staff->display_at_home,
            'qualifications' => $data['qualifications'] ?? $staff->qualifications,
        ]);

        $staffDetails?->update([
            'age' => $data['age'] ?? $staffDetails->age,
            'gender' => $data['gender'] ?? $staffDetails->gender,
        ]);

        if (array_key_exists('availability', $data)) {
            $data['availability'] = $data['availability'] ?? [];
            $this->storeAvailabilities($data['availability'], $staff, true);
        }

        if (isset($data['courses']) && $data['courses'] && count($data['courses'])) {
            $staff->courses()->detach();
            $courses = $data['courses'];
            $staff->courses()->sync($courses);
        }

        $availabilities = $this->getAvailabilitiesInTimezones($staff->availabilities);

        return apiSuccessResponse(
            __('messages.updated_success'),
            array_merge(
                $staff->only([
                    "id",
                    "name",
                    "image",
                    "phone",
                    "email",
                    "qualifications",
                    "locale",
                    "deleted_at",
                    "created_at",
                    "updated_at",
                ]),
                [
                    'age' => $staff?->details?->age,
                    'gender' => $staff?->details?->gender,
                    'availabilities' => $availabilities,
                    'courses' => $staff?->courses->toArray(),
                ]
            )
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Staff $staff)
    {
        if ($staff->lessons->count() > 0) {
            return apiErrorResponse(__('messages.staff_has_lessons'));
        }
        if ($staff->image) {
            Storage::disk('public')->delete($staff->image);
        }
        $staff->delete();
        return apiSuccessResponse(__('messages.deleted_success'));
    }

    private function generateRandomPassword()
    {
        return substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_*&%$#@!'), 0, 10);
    }

    private function generateRandomUsername($name)
    {
        // Convert name to lowercase and replace spaces with underscores
        $baseUsername = Str::slug($name, '_');

        // Check if username already exists
        $username = $baseUsername;
        $counter = 1;

        while (Staff::where('email', $username)->exists()) {
            $username = $baseUsername . '_' . $counter;
            $counter++;
        }

        return $username;
    }
}


            // $exactStaff = $exactStaff->where(function ($query) use ($availabilities) {
            //     foreach ($availabilities as $availability) {
            //         $day = $availability['day'];
            //         $startTime = $availability['start_time'];
            //         $endTime = $availability['end_time'];

            //         $query->whereHas('availabilities', function ($subQuery) use ($startTime, $endTime, $day) {
            //             $subQuery
            //                 ->where('day', $day)
            //                 ->where('start_time', '<=', $startTime)
            //                 ->where('end_time', '>=', $endTime);
            //         });
            //     }
            // })->whereDoesntHave('lessons', function ($query) use ($availabilities) {
            //     foreach ($availabilities as $availability) {
            //         $day = $availability['day'];
            //         $startTime = $availability['start_time'];
            //         $endTime = $availability['end_time'];

            //         $query->where('status', LessonStatus::CONFIRMED)
            //             ->whereHas('availabilities', function ($subQuery) use ($day, $startTime, $endTime) {
            //                 $subQuery->where('day', $day)
            //                     ->where(function ($timeQuery) use ($startTime, $endTime) {
            //                         $timeQuery
            //                             ->whereBetween('start_time', [$startTime, $endTime])
            //                             ->orWhereBetween('end_time', [$startTime, $endTime])
            //                             ->orWhere(function ($overlapQuery) use ($startTime, $endTime) {
            //                                 $overlapQuery
            //                                     ->where('start_time', '<=', $startTime)
            //                                     ->where('end_time', '>=', $endTime);
            //                             });
            //                     });
            //             });
            //     }
            // });

            // $maybeStaff = $maybeStaff->where(function ($query) use ($availabilities) {
            //     foreach ($availabilities as $availability) {
            //         $day = $availability['day'];
            //         $startTime = $availability['start_time'];
            //         $endTime = $availability['end_time'];

            //         $query->whereHas('availabilities', function ($subQuery) use ($startTime, $endTime, $day) {
            //             $subQuery->where('day', $day)
            //                 ->where('start_time', '<=', Carbon::parse($startTime)->addHours(2))
            //                 ->where('end_time', '>=', Carbon::parse($endTime)->subHours(2));
            //         });
            //     }
            // });