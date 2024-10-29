<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Http\Requests\Plan\StorePlanRequest;
use App\Http\Requests\Plan\UpdatePlanRequest;


class PlanController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:plans.list')->only('index');
        $this->middleware('permission:plans.create')->only('store');
        $this->middleware('permission:plans.view')->only('show');
        $this->middleware('permission:plans.update')->only('update');
        $this->middleware('permission:plans.softDelete')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plans = Plan::when(request('q'), fn($query, $q) => $query->search($q))
            ->select(['id', 'name', 'monthly_sessions', 'weekly_sessions', 'session_duration', 'type', 'price', 'currency', 'discount', 'description', 'locale'])
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'asc'))
            ->paginate(request('limit', 25));

        return apiSuccessResponse(__('messages.plans_found'), $plans);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlanRequest $request)
    {
        $data = $request->validated();
        $plan = Plan::create($data);
        $plan = $plan->only('id', 'name', 'monthly_sessions', 'weekly_sessions', 'session_duration', 'type', 'price', 'currency', 'discount', 'description', 'locale');
        return apiSuccessResponse(__('messages.added_success'), $plan);
    }

    /**
     * Display the specified resource.
     */
    public function show(Plan $plan)
    {
        $plan = $plan->only('id', 'name', 'monthly_sessions', 'weekly_sessions', 'session_duration', 'type', 'price', 'currency', 'discount', 'description', 'locale');
        return apiSuccessResponse(__('messages.plan_found'), $plan);
    }

    /**
     * Display a plans.
     */
    public function plans()
    {
        $plans = Plan::select(['id', 'name', 'monthly_sessions', 'weekly_sessions', 'session_duration', 'discount', 'price', 'currency', 'type','locale'])
            ->orderBy('price')
            ->where('locale', app()->getLocale())
            ->get()
            ->groupBy('type');
        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $plans);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlanRequest $request, Plan $plan)
    {
        $data = $request->validated();
        $plan->update($data);
        $plan = $plan->only('id', 'name', 'monthly_sessions', 'weekly_sessions', 'session_duration', 'type', 'price', 'currency', 'discount', 'description', 'locale');
        return apiSuccessResponse(__('messages.updated_success'), $plan);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Plan $plan)
    {
        $plan->delete();
        return apiSuccessResponse(__('messages.deleted_success'));
    }
}
