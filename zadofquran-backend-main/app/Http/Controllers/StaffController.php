<?php

namespace App\Http\Controllers;

use App\Http\Requests\Staff\StoreStaffRequest;
use App\Http\Requests\Staff\UpdateStaffRequest;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StaffController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:staff.list')->only(['index']);
        $this->middleware('permission:staff.view')->only(['show']);
        $this->middleware('permission:staff.create')->only(['store']);
        $this->middleware('permission:staff.update')->only(['update']);
        $this->middleware('permission:staff.softDelete')->only(['destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $staff = Staff::when(request('q'), fn($query, $q) => $query->search($q))
            ->select(['id', 'name', 'image', 'phone', 'email', 'qualifications', 'locale'])
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
        $staff = Staff::create($data);
        $staff = $staff->only('id', 'name', 'image', 'phone', 'email', 'qualifications', 'locale');
        return apiSuccessResponse(__('messages.added_success'), $staff);
    }

    /**
     * Display the specified resource.
     */
    public function show(Staff $staff)
    {
        $staff = $staff->only('id', 'name', 'image', 'phone', 'email', 'qualifications', 'locale');
        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $staff);
    }

    /**
     * Display a staff.
     */
    public function staff()
    {
        $staff = Staff::select(['name', 'image', 'phone', 'email', 'qualifications', 'locale'])
            ->orderBy('id')
            ->where('locale', app()->getLocale())
            ->get();
        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $staff);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStaffRequest $request, Staff $staff)
    {
        $data = $request->validated();
        $staff->update($data);
        $staff = $staff->only('id', 'name', 'image', 'phone', 'email', 'qualifications', 'locale');
        return apiSuccessResponse(__('messages.updated_success'), $staff);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Staff $staff)
    {
        $staff->delete();
        return apiSuccessResponse(__('messages.deleted_success'));
    }
}
