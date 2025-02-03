<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\UpdateAuthRequest;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class AdminAuthController extends Controller
{
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

        // minimum mutual permission required to login
        if (!$user->can('lesson.list')):
            return apiErrorResponse(__('messages.unauthorized'), [
                'email' => [
                    'message' => __('messages.unauthorized')
                ],
            ], 401);
        endif;

        $token = $user->createToken('auth_token')->plainTextToken;

        return apiSuccessResponse(__('messages.login_success'), [
            'token' => $token,
            'user' => array_merge(
                $user->only(['id', 'name', 'email', 'phone']),
                [
                    'permissions' => $user->getAllPermissions()->pluck('name')
                ]
            )
        ]);
    }
}
