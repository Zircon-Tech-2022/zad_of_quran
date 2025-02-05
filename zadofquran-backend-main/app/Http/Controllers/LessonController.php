<?php

namespace App\Http\Controllers;

use App\Http\Requests\Lesson\StoreLessonRequest;
use App\Http\Requests\Lesson\UpdateLessonRequest;
use App\Models\Lesson;
use App\Models\Subscriber;

class LessonController extends Controller
{
    use \App\Traits\TimeParser;
    use \App\Traits\AvailabilityHandler;

    public function __construct()
    {
        $this->middleware('permission:lesson.list')->only(['index']);
        $this->middleware('permission:lesson.view')->only(['show']);
        $this->middleware('permission:lesson.create')->only(['store']);
        $this->middleware('permission:lesson.update')->only(['update']);
        $this->middleware('permission:lesson.softDelete')->only(['destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lessons = Lesson::when(request('q'), fn($query, $q) => $query->search($q))
            ->with('staff:id,name,email,phone', 'subscriber:id,name,email,phone', 'course:id,name')
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'asc'))
            ->paginate(request('limit', 25));

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $lessons);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLessonRequest $request)
    {
        $data = $request->validated();

        $flattenedArray = [];
        foreach ($data['availability'] as $index => $slot) {
            foreach ($slot as $key => $value) {
                $flattenedArray[] = "$key: $value";
            }
        }

        $subscriber = Subscriber::firstOrCreate([
            'name' => $data['name'],
            'phone' => $data['phone'],
        ], [
            'age' => $data['age'],
            'gender' => $data['gender'],
            'persons_count' => 1, // default value
            'appointments' => implode(', ', $flattenedArray),
        ]);

        $lesson = Lesson::create([
            'staff_id' => $data['staff_id'],
            'supervisor_id' => $data['supervisor_id'],
            'subscriber_id' => $subscriber->id,
            'course_id' => $data['course_id'],
            'status' => isset($data['staff_id']) && !empty($data['staff_id']) ? 'waiting' : 'not_added',
        ]);

        if (array_key_exists('availability', $data) && count($data['availability'])) {
            $this->storeAvailabilities($this->reformAvailabilities($data['availability']), $lesson);
        }

        $availabilities = $this->getAvailabilities($lesson->availabilities);

        return apiSuccessResponse(__('messages.added_success'), [
            array_merge(
                $lesson->toArray(),
                [
                    'course' => [
                        'id' => $lesson->course->id,
                        'name' => $lesson->course->name,
                    ],
                    'staff' => [
                        'id' => $lesson->staff?->id,
                        'name' => $lesson->staff?->name,
                    ],
                    'subscriber' => [
                        'id' => $lesson->subscriber->id,
                        'name' => $lesson->subscriber->name,
                    ],
                    'availabilities' => $availabilities,
                ]
            )
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $lesson = Lesson::with('staff', 'staff.details:id,age,gender,staff_id', 'subscriber', 'course', 'supervisor', 'availabilities')
            ->where('id', $id)
            ->first();

        if (!$lesson) {
            return apiErrorResponse(__('messages.data_not_found'), null, 404);
        }

        $timezone = request('timezone_offset');
        $availabilities = $this->getAvailabilities($lesson->availabilities, $timezone);

        return apiSuccessResponse(
            __('messages.data_retrieved_successfully'),
            array_merge(
                $lesson->toArray(),
                [
                    'staff' => [
                        'id' => $lesson->staff?->id,
                        'name' => $lesson->staff?->name,
                        'email' => $lesson->staff?->email,
                        'phone' => $lesson->staff?->phone,
                        'qualifications' => $lesson->staff?->qualifications,
                        'age' => $lesson->staff?->details?->age,
                        'gender' => $lesson->staff?->details?->gender,
                    ],
                    'availabilities' => $availabilities,
                ]
            )
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        $data = $request->validated();

        if (isset($data['status'])) {
            $lesson->update([
                'status' => $lesson?->staff_id ? $data['status'] : 'not_added',
            ]);

            return apiSuccessResponse(__('messages.updated_success'), [
                $lesson->toArray(),
            ]);
        }

        $lesson->update([
            'staff_id' => $data['staff_id'], // nullable
            'supervisor_id' => $data['supervisor_id'] ?? $lesson->supervisor_id,
            'course_id' => $data['course_id'] ?? $lesson->course_id,
        ]);

        if (array_key_exists('availability', $data) && count($data['availability'])) {
            $this->storeAvailabilities($this->reformAvailabilities($data['availability']), $lesson, true);
        }

        $lesson = $lesson->refresh();
        $availabilities = $this->getAvailabilities($lesson->availabilities);

        return apiSuccessResponse(__('messages.updated_success'), [
            array_merge(
                $lesson->toArray(),
                [
                    'availabilities' => $availabilities,
                ]
            )
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lesson $lesson)
    {
        $lesson->delete();
        return apiSuccessResponse(__('messages.deleted_success'));
    }
}
