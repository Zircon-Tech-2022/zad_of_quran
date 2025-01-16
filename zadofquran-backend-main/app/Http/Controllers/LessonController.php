<?php

namespace App\Http\Controllers;

use App\Http\Requests\Lesson\StoreLessonRequest;
use App\Http\Requests\Lesson\UpdateLessonRequest;
use App\Models\Lesson;

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
        $lessons = Lesson::with('staff:id,name', 'subscriber:id,name', 'course:id,name')
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

        $lesson = Lesson::create([
            'staff_id' => $data['staff_id'],
            'subscriber_id' => $data['subscriber_id'],
            'course_id' => $data['course_id'],
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
                        'id' => $lesson->staff->id,
                        'name' => $lesson->staff->name,
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
        $lesson = Lesson::with('staff', 'subscriber', 'course', 'availabilities')
            ->where('id', $id)
            ->first();

        if (!$lesson) {
            return apiErrorResponse(__('messages.data_not_found'), null, 404);
        }

        $timezone = request('timezone_offset');
        $availabilities = $this->getAvailabilities($lesson->availabilities, $timezone);

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), [
            array_merge(
                $lesson->toArray(),
                [
                    'availabilities' => $availabilities,
                ]
            )
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        $data = $request->validated();

        $lesson->update([
            'staff_id' => $data['staff_id'] ?? $lesson->staff_id,
            'subscriber_id' => $data['subscriber_id'] ?? $lesson->subscriber_id,
            'course_id' => $data['course_id'] ?? $lesson->course_id,
            'is_active' => $data['is_active'] ?? $lesson->is_active,
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
