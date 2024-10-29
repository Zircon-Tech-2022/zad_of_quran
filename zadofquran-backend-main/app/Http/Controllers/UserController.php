<?php

namespace App\Http\Controllers;

use App\Exports\UserExport;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:users.list')->only(['index', 'export']);
        $this->middleware('permission:users.create')->only('store');
        $this->middleware('permission:users.view')->only('show');
        $this->middleware('permission:users.update')->only('update');
        $this->middleware('permission:users.softDelete')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::when(request('q'), fn($query, $q) => $query->search($q))
            ->when(request()->boolean('subscribed'), fn($q) => $q->subscribed())
            ->select(['id', 'name', 'email', 'phone'])
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'asc'))
            ->paginate(request('limit', 25));

        return apiSuccessResponse(__('messages.users_found'), $users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $user = User::create($data);
        $user = $user->only('id', 'name', 'email', 'phone');
        return apiSuccessResponse(__('messages.register_success'), $user);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user = $user->only('id', 'name', 'email', 'phone');
        return apiSuccessResponse(__('messages.user_found'), $user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (!$data['password']):
            unset($data['password']);
        endif;
        $user->update($data);
        $user = $user->only('id', 'name', 'email', 'phone');
        return apiSuccessResponse(__('messages.updated_success'), $user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return apiSuccessResponse(__('messages.deleted_success'));
    }

    /**
     * export Excel file
     */
    public function export(Excel $excel)
    {
        $users = User::when(request('q'), fn($query, $q) => $query->search($q))
            ->select(['id', 'name', 'email', 'phone'])
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'asc'))
            ->get();

        return Excel::download(new UserExport([
            ['ID', 'Name', 'Email', 'Phone'],
            ...$users->toArray()
        ]), 'users.xlsx');
    }
}
