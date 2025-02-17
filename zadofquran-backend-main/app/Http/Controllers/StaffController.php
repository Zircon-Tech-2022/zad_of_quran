<?php

namespace App\Http\Controllers;

use App\Http\Requests\Staff\StoreStaffRequest;
use App\Http\Requests\Staff\UpdateStaffRequest;
use App\Models\Staff;
use App\Models\StaffDetails;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class StaffController extends Controller
{
    use \App\Traits\StoreImage;
    use \App\Traits\TimeParser;
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
        $staff = Staff::with('details', 'availabilities', 'courses', 'lessons', 'lessons.subscriber', 'lessons.course', 'lessons.availabilities')
            ->where('id', $id)
            ->first();

        if (!$staff) {
            return apiErrorResponse(__('messages.data_not_found'), null, 404);
        }

        $timezone = request('timezone_offset');
        $availabilities = $this->getAvailabilities($staff->availabilities, $timezone);

        $lessons = $staff->lessons;
        $lessonsArray = [];
        $lessonsAvailabilitiesArray = [];
        foreach ($lessons as $lesson) {
            $lessonAvailabilities = $this->getAvailabilities($lesson->availabilities, $timezone);
            foreach ($lessonAvailabilities as $lessonAvailability) {
                $lessonsAvailabilitiesArray[] = $lessonAvailability;
            }
            $item = $lesson->toArray();
            $item['availabilities'] = $lessonAvailabilities;
            $lessonsArray[] = $item;
        }

        $netAvailabilities = $this->getTimesArrayInZones(
            $this->getNetAvailabilities($availabilities, $lessonsAvailabilitiesArray),
            $timezone
        );

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
                    'availabilities' => $netAvailabilities,
                    'courses' => $staff->courses->toArray(),
                    'lessons' => $lessonsArray,
                ]
            )
        );
    }

    public function match(Request $request)
    {
        $staff = Staff::with('details', 'availabilities', 'courses');
        if ($request->has('age') && $request->age) {
            $staff->whereHas('details', function ($query) use ($request) {
                $query->where('age', '>=', $request->age);
            });
        }

        if ($request->has('gender') && $request->gender) {
            $staff->whereHas('details', function ($query) use ($request) {
                $query->where('gender', $request->gender);
            });
        }

        // the new value
        if ($request->has('course') && $request->course) {
            $staff->whereHas('courses', function ($query) use ($request) {
                $query->where('course_id', $request->course);
            });
            // the stored value
        } else if ($request->has('course_id') && $request->course_id) {
            $staff->whereHas('courses', function ($query) use ($request) {
                $query->where('course_id', $request->course_id);
            });
        }

        $exactStaff = clone $staff;
        $maybeStaff = clone $staff;

        if ($request->has('availability') && $request->availability && count($request->availability)) {
            $availabilities = $this->reformAvailabilities($request->availability);
            $exactStaff = $exactStaff->where(function ($query) use ($availabilities) {
                foreach ($availabilities as $availability) {
                    $day = $availability['day'];
                    $startTime = $availability['start_time'];
                    $endTime = $availability['end_time'];

                    $query->whereHas('availabilities', function ($subQuery) use ($startTime, $endTime, $day) {
                        $subQuery
                            ->where('day', $day)
                            ->where('start_time', '<=', $startTime)
                            ->where('end_time', '>=', $endTime);
                    });
                }
            })->whereDoesntHave('lessons', function ($query) use ($availabilities) {
                foreach ($availabilities as $availability) {
                    $day = $availability['day'];
                    $startTime = $availability['start_time'];
                    $endTime = $availability['end_time'];

                    $query->where('status', 'confirmed')
                        ->whereHas('availabilities', function ($subQuery) use ($day, $startTime, $endTime) {
                            $subQuery->where('day', $day)
                                ->where(function ($timeQuery) use ($startTime, $endTime) {
                                    $timeQuery
                                        ->whereBetween('start_time', [$startTime, $endTime])
                                        ->orWhereBetween('end_time', [$startTime, $endTime])
                                        ->orWhere(function ($overlapQuery) use ($startTime, $endTime) {
                                            $overlapQuery
                                                ->where('start_time', '<=', $startTime)
                                                ->where('end_time', '>=', $endTime);
                                        });
                                });
                        });
                }
            });

            $maybeStaff = $maybeStaff->where(function ($query) use ($availabilities) {
                foreach ($availabilities as $availability) {
                    $day = $availability['day'];
                    $startTime = $availability['start_time'];
                    $endTime = $availability['end_time'];

                    $query->whereHas('availabilities', function ($subQuery) use ($startTime, $endTime, $day) {
                        $subQuery->where('day', $day)
                            ->where('start_time', '<=', Carbon::parse($startTime)->addHours(2))
                            ->where('end_time', '>=', Carbon::parse($endTime)->subHours(2));
                    });
                }
            });
        }

        $exactStaff = $exactStaff->orderByRaw('(SELECT age FROM staff_details WHERE staff_details.staff_id = staff.id) ASC')
            ->orderBy('rate', 'desc')
            ->get();
        $maybeStaff = $maybeStaff->orderBy(StaffDetails::select('age')
            ->whereColumn('staff_id', 'staff.id')
            ->orderBy('age', 'asc'))
            ->orderBy('rate', 'desc')
            ->get();

        $results = [
            'exact' => [],
            'maybe' => [],
        ];

        $exactStaffIds = $exactStaff->pluck('id')->toArray();

        foreach ($exactStaff as $staffMember) {
            $availabilities = $this->getAvailabilities($staffMember->availabilities);
            $item = $staffMember->toArray();
            $item['availabilities'] = $availabilities;
            $results['exact'][] = $item;
        }

        foreach ($maybeStaff as $staffMember) {
            if (in_array($staffMember->id, $exactStaffIds)) {
                continue;
            }
            $availabilities = $this->getAvailabilities($staffMember->availabilities);
            $item = $staffMember->toArray();
            $item['availabilities'] = $availabilities;
            $results['maybe'][] = $item;
        }

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

        if ($staff->details) {
            $staff->details->update([
                'password' => Hash::make($password),
            ]);
        } else {
            if (!$staff->email) {
                $staff->update([
                    'email' => $this->generateRandomUsername($staff->name),
                ]);
            }

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

        if (array_key_exists('availability', $data) && $data['availability'] && count($data['availability'])) {
            $this->storeAvailabilities($this->reformAvailabilities($data['availability']), $staff, true);
        }

        if (isset($data['courses']) && $data['courses'] && count($data['courses'])) {
            $staff->courses()->detach();
            $courses = $data['courses'];
            $staff->courses()->sync($courses);
        }

        $availabilities = $this->getAvailabilities($staff->availabilities);

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
