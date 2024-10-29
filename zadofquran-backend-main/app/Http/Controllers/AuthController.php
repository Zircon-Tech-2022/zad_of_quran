<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\UpdateAuthRequest;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['login', 'register']);
        $this->middleware('guest')->only(['login', 'register']);
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create($data);

        $token = $user->createToken('auth_token')->plainTextToken;

        return apiSuccessResponse(__('messages.register_success'), [
            'token' => $token,
            'user' => $user->only(['id', 'name', 'email', 'phone'])
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return apiErrorResponse(__('auth.failed'), [
                'email' => [
                    'message' => __('auth.failed')
                ],
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return apiSuccessResponse(__('messages.login_success'), [
            'token' => $token,
            'user' => $user->only(['id', 'name', 'email', 'phone'])
        ]);
    }

    public function getUserInfo(Request $request)
    {
        $user = $request->user();

        abort_if(!$user, 401);

        return apiSuccessResponse(__('messages.user_found'), $user->only(['id', 'name', 'email', 'phone']));
    }

    public function updateUserInfo(UpdateAuthRequest $request)
    {
        $data = $request->validated();
        $user = $request->user();

        abort_if(!$user, 401);

        if (!$data['password']):
            unset($data['password']);
        endif;

        $user->update($data);

        return apiSuccessResponse(__('messages.updated_success'), $user->only(['id', 'name', 'email', 'phone']));
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        abort_if(!$user, 401);

        $user->currentAccessToken()->delete();

        return apiSuccessResponse(__('messages.logout_success'));
    }
}
