<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use App\Http\Requests\Testimonial\StoreTestimonialRequest;
use App\Http\Requests\Testimonial\UpdateTestimonialRequest;

class TestimonialController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:testimonials.list')->only('index');
        $this->middleware('permission:testimonials.create')->only('store');
        $this->middleware('permission:testimonials.view')->only('show');
        $this->middleware('permission:testimonials.update')->only('update');
        $this->middleware('permission:testimonials.softDelete')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testimonials = Testimonial::when(request('q'), fn($query, $q) => $query->search($q))
            ->select(['id', 'name', 'content', 'image', 'locale'])
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'asc'))
            ->paginate(request('limit', 25));

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $testimonials);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTestimonialRequest $request)
    {
        $data = $request->validated();
        $testimonial = Testimonial::create($data);
        $testimonial = $testimonial->only('id', 'name', 'content', 'image', 'locale');
        return apiSuccessResponse(__('messages.added_success'), $testimonial);
    }

    /**
     * Display the specified resource.
     */
    public function show(Testimonial $testimonial)
    {
        $testimonial = $testimonial->only('id', 'name', 'content', 'image', 'locale');
        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $testimonial);
    }

    /**
     * Display a testimonials.
     */
    public function testimonials()
    {
        $testimonials = Testimonial::select(['name', 'content'])
            ->where('locale', app()->getLocale())
            ->limit(8)
            ->inRandomOrder()
            ->get();
        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $testimonials);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial)
    {
        $data = $request->validated();
        $testimonial->update($data);
        $testimonial = $testimonial->only('id', 'name', 'content', 'image', 'locale');
        return apiSuccessResponse(__('messages.updated_success'), $testimonial);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        return apiSuccessResponse(__('messages.deleted_success'));
    }
}
