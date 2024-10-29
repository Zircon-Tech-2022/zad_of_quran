<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Throwable;
use TypeError;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function render($request, Throwable $exception)
    {
        if ($request->expectsJson()):
            if ($exception instanceof AuthenticationException):
                return apiErrorResponse(__('messages.unauthenticated'), null, 401);
            endif;

            if ($exception instanceof AuthorizationException):
                return apiErrorResponse(__('messages.unauthorized'), null, 403);
            endif;

            if ($exception instanceof ValidationException):
                $errors = $exception->errors();
                foreach ($errors as $key => $value):
                    $errors[$key] = [
                        'message' => $value[0],
                    ];
                endforeach;
                return apiErrorResponse($exception->getMessage(), $errors, 422);
            endif;

            if ($exception instanceof \Spatie\Permission\Exceptions\UnauthorizedException):
                return apiErrorResponse(__('messages.unauthorized'), null, 403);
            endif;

            if ($exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException):
                return apiErrorResponse(__('messages.not_found'), null, 404);
            endif;

            if ($exception instanceof \Illuminate\Auth\Access\AuthorizationException):
                return apiErrorResponse(__('messages.unauthorized'), null, 403);
            endif;
        endif;

        return parent::render($request, $exception);
    }
}
