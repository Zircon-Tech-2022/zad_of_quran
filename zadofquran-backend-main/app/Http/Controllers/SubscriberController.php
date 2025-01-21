<?php

namespace App\Http\Controllers;

use App\Exports\SubscriberExport;
use App\Mail\NewSubscriber;
use App\Models\Subscriber;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\Subscriber\StoreSubscriberRequest;
use App\Http\Requests\Subscriber\Subscriber\UpdateSubscriberRequest;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;

class SubscriberController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:subscribers.list')->only(['index']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subscribers = Subscriber::when(request('q'), fn($query, $q) => $query->search($q))
            ->leftJoin('plans', 'plans.id', '=', 'subscribers.plan_id')
            ->select(['subscribers.id', 'subscribers.name', 'subscribers.email', 'subscribers.phone', 'plans.name as plan'])
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'asc'))
            ->paginate(request('limit', 25));

        return apiSuccessResponse(__('messages.users_found'), $subscribers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubscriberRequest $request)
    {
        $data = $request->validated();
        $subscriber = Subscriber::create($data);
        $mail = new NewSubscriber($data);
        Mail::send($mail);
        $subscriber = $subscriber->only('id', 'name', 'email', 'phone');
        return apiSuccessResponse(__('messages.register_success'), $subscriber);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subscriber $subscriber)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubscriberRequest $request, Subscriber $subscriber)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subscriber $subscriber)
    {
        //
    }

    /**
     * export Excel file
     */
    public function export(Excel $excel)
    {
        $users = Subscriber::when(request('q'), fn($query, $q) => $query->search($q))
            ->leftJoin('plans', 'plans.id', '=', 'subscribers.plan_id')
            ->select(['subscribers.id', 'subscribers.name', 'subscribers.email', 'subscribers.phone', 'plans.name as plan'])
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'asc'))
            ->get();

        return Excel::download(new SubscriberExport([
            ['ID', 'Name', 'Email', 'Phone', 'Plan'],
            ...$users->toArray()
        ]), 'subscribers.xlsx');
    }
}
