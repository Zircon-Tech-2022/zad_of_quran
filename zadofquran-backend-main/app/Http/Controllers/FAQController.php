<?php

namespace App\Http\Controllers;

use App\Models\FAQ;
use App\Http\Requests\FAQ\StoreFAQRequest;
use App\Http\Requests\FAQ\UpdateFAQRequest;

class FAQController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:faqs.list')->only('index');
        $this->middleware('permission:faqs.create')->only('store');
        $this->middleware('permission:faqs.view')->only('show');
        $this->middleware('permission:faqs.update')->only('update');
        $this->middleware('permission:faqs.softDelete')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $FAQs = FAQ::when(request('q'), fn($query, $q) => $query->search($q))
            ->select(['id', 'question', 'answer', 'is_active', 'locale'])
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'asc'))
            ->paginate(request('limit', 25));

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $FAQs);
    }

    /**
     * Display a listing of the resource.
     */
    public function FAQs()
    {
        $FAQs = FAQ::when(request('q'), fn($query, $q) => $query->search($q))
            ->select(['question', 'answer'])
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'asc'))
            ->where('locale', app()->getLocale())
            ->paginate(request('limit', 15));

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $FAQs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFAQRequest $request)
    {
        $data = $request->validated();
        $FAQ = FAQ::create($data);
        $FAQ = $FAQ->only('id', 'question', 'answer', 'is_active', 'locale');
        return apiSuccessResponse(__('messages.added_success'), $FAQ);
    }

    /**
     * Display the specified resource.
     */
    public function show(FAQ $FAQ)
    {
        $FAQ = $FAQ->only('id', 'question', 'answer', 'is_active', 'locale');
        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $FAQ);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFAQRequest $request, FAQ $FAQ)
    {
        $data = $request->validated();
        $FAQ->update($data);
        $FAQ = $FAQ->only('id', 'question', 'answer', 'is_active', 'locale');
        return apiSuccessResponse(__('messages.updated_success'), $FAQ);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FAQ $FAQ)
    {
        $FAQ->delete();
        return apiSuccessResponse(__('messages.deleted_success'));
    }
}
