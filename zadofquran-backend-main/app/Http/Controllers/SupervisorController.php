<?php

namespace App\Http\Controllers;

use App\Http\Requests\Supervisor\StoreSupervisorRequest;
use App\Http\Requests\Supervisor\UpdateSupervisorRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SupervisorController extends Controller
{
    use \App\Traits\AvailabilityHandler;

    public function __construct()
    {
        $this->middleware('permission:supervisors.list')->only('index');
        $this->middleware('permission:supervisors.list')->only('supervisors');
        $this->middleware('permission:supervisors.create')->only('store');
        $this->middleware('permission:supervisors.view')->only('show');
        $this->middleware('permission:supervisors.update')->only('update');
        $this->middleware('permission:supervisors.softDelete')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $supervisors = User::role('supervisor')
            ->when(request('q'), fn($query, $q) => $query->search($q))
            ->select(['id', 'name', 'email'])
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'asc'))
            ->paginate(request('limit', 25));

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $supervisors);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSupervisorRequest $request)
    {
        $data = $request->validated();
        $supervisor = User::create($data);
        $supervisor->assignRole('supervisor');
        $supervisor = $supervisor->only('id', 'name', 'email');
        return apiSuccessResponse(__('messages.register_success'), $supervisor);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $supervisor = User::role('supervisor')->where('id', $id)
            ->with(['lessons' => function ($query) {
                $query->whereHas('availabilities', function ($q) {
                    $q->where('start_time', '>', now());
                });
            }, 'lessons.subscriber', 'lessons.course', 'lessons.staff', 'lessons.availabilities'])
            ->first();

        if (!$supervisor) {
            return apiErrorResponse(__('messages.not_found'), null, 404);
        }

        $timezone = request('timezone_offset');

        $lessons = $supervisor->lessons;
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

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), array_merge(
            $supervisor->only([
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
                'lessons' => $lessonsArray,
            ]
        ));
    }

    public function supervisors()
    {
        $supervisors = User::role('supervisor')->select(['id', 'name', 'email'])
            ->get();

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $supervisors);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupervisorRequest $request, User $supervisor)
    {
        if (!$supervisor->hasRole('supervisor')) {
            return apiErrorResponse(__('messages.not_found'), null, 404);
        }
        $data = $request->validated();

        $supervisor->update(array_merge(
            $data,
            [
                'password' => isset($data['password']) && !empty($data['password']) ? Hash::make($data['password']) : $supervisor->password,
            ]
        ));

        $supervisor = $supervisor->only('id', 'name', 'email');
        return apiSuccessResponse(__('messages.updated_success'), $supervisor);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $supervisor)
    {
        if (!$supervisor->hasRole('supervisor')) {
            return apiErrorResponse(__('messages.not_found'), null, 404);
        }
        $supervisor->delete();
        return apiSuccessResponse(__('messages.deleted_success'));
    }
}
