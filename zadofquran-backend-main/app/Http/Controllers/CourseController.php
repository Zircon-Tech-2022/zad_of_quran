<?php

namespace App\Http\Controllers;

use App\Http\Requests\Course\StoreCourseRequest;
use App\Http\Requests\Course\UpdateCourseRequest;
use App\Models\Course;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:courses.list')->only('index');
        $this->middleware('permission:courses.create')->only('store');
        $this->middleware('permission:courses.view')->only('show');
        $this->middleware('permission:courses.update')->only('update');
        $this->middleware('permission:courses.softDelete')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courser = Course::when(request('q'), fn($query, $q) => $query->search($q))
            ->select(['id', 'name', 'description', 'image', 'locale', 'display_at_home'])
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'asc'))
            ->paginate(request('limit', 25));

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $courser);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $data = $request->validated();
        $course = Course::create($data);
        $course = $course->only('id', 'name', 'description', 'image', 'locale');
        return apiSuccessResponse(__('messages.added_success'), $course);
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        $course = $course->only('id', 'name', 'description', 'image', 'locale');
        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $course);
    }

    public function availableCourses()
    {
        $courses = Course::select(['id', 'name', 'image', 'locale', 'description'])
            ->orderBy('id')
            ->get();

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $courses);
    }

    /**
     * Display courses for home page.
     */
    public function courses()
    {
        $courses = Course::select(['id', 'name', 'image', 'locale', 'description'])
            ->where('locale', app()->getLocale())
            ->where('display_at_home', true)
            ->orderBy('id')
            ->get();

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $courses);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $data = $request->validated();
        $course->update($data);
        $course = $course->only('id', 'name', 'description', 'image', 'locale');
        return apiSuccessResponse(__('messages.updated_success'), $course);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();
        return apiSuccessResponse(__('messages.deleted_success'));
    }
}
