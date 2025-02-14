<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => 'auth', 'namespace' => 'App\Http\Controllers', 'as' => 'auth.'], function () {
    Route::post('register', 'AuthController@register')->middleware('guest')->name('register');
    Route::post('login', 'AuthController@login')->middleware('guest')->name('login');
    Route::post('logout', 'AuthController@logout')->middleware('auth')->name('logout');
    Route::post('update', 'AuthController@updateUserInfo')->middleware('auth')->name('update');
    Route::get('/', 'AuthController@getUserInfo')->middleware('auth')->name('user');
});

Route::group(['prefix' => 'auth/staff', 'namespace' => 'App\Http\Controllers\Staff', 'as' => 'auth.staff.'], function () {
    Route::post('register', 'AuthController@register')->middleware('auth')->name('register');
    Route::post('login', 'AuthController@login')->middleware('guest')->name('login');
    Route::post('logout', 'AuthController@logout')->middleware('auth')->name('logout');
    Route::post('update', 'AuthController@updateUserInfo')->middleware('auth')->name('update');
    Route::get('/', 'AuthController@getUserInfo')->middleware('auth')->name('user');
});

Route::post('admin/auth/login', [App\Http\Controllers\AdminAuthController::class, 'login'])->middleware('guest')->name('admin.auth.login');

Route::get('admin/users/export', [App\Http\Controllers\UserController::class, 'export'])->name('admin.users.export')->middleware('auth');
Route::apiResource('admin/users', App\Http\Controllers\UserController::class, ['as' => 'admin'])->middleware('auth');

// ToDo: admin will update profile here
Route::get('supervisors', [App\Http\Controllers\SupervisorController::class, 'supervisors'], ['as' => 'admin'])->middleware('auth');
Route::apiResource('admin/lessons', App\Http\Controllers\LessonController::class, ['as' => 'admin'])->middleware('auth');
Route::apiResource('admin/supervisors', App\Http\Controllers\SupervisorController::class, ['as' => 'admin'])->middleware('auth');
Route::apiResource('admin/staff', App\Http\Controllers\StaffController::class, ['as' => 'admin'])->middleware('auth');
Route::get('staff', [App\Http\Controllers\StaffController::class, 'staff']);
Route::post('staff/match', [App\Http\Controllers\StaffController::class, 'match']);
Route::put('staff/reset-password/{staff}', [App\Http\Controllers\StaffController::class, 'resetPassword']);

Route::apiResource('admin/FAQs', App\Http\Controllers\FAQController::class, ['as' => 'admin'])->middleware('auth');
Route::get('FAQs', [App\Http\Controllers\FAQController::class, 'FAQs']);

Route::apiResource('admin/testimonials', App\Http\Controllers\TestimonialController::class, ['as' => 'admin'])->middleware('auth');
Route::get('testimonials', [App\Http\Controllers\TestimonialController::class, 'testimonials']);

Route::apiResource('admin/courses', App\Http\Controllers\CourseController::class, ['as' => 'admin'])->middleware('auth');
Route::get('availableCourses', [App\Http\Controllers\CourseController::class, 'availableCourses']);
Route::get('courses', [App\Http\Controllers\CourseController::class, 'courses']);

Route::apiResource('admin/plans', App\Http\Controllers\PlanController::class, ['as' => 'admin'])->middleware('auth');
Route::get('plans', [App\Http\Controllers\PlanController::class, 'plans']);

Route::apiResource('admin/blogs', App\Http\Controllers\BlogController::class, ['as' => 'admin'])->middleware('auth');
Route::get('blogs', [App\Http\Controllers\BlogController::class, 'blogs']);
Route::get('blogs/{blog:slug}', [App\Http\Controllers\BlogController::class, 'blog']);
Route::get('blogs/{blog:slug}/comments', [App\Http\Controllers\BlogController::class, 'comments']);

Route::post('comments', [App\Http\Controllers\CommentController::class, 'store']);
Route::get('admin/comments', [App\Http\Controllers\CommentController::class, 'index']);
Route::put('admin/comments/{comment}', [App\Http\Controllers\CommentController::class, 'update']);
Route::delete('admin/comments/{comment}', [App\Http\Controllers\CommentController::class, 'destroy']);

Route::get('admin/subscribers/export', [App\Http\Controllers\SubscriberController::class, 'export'])->name('admin.subscribers.export')->middleware('auth');
Route::get('admin/subscribers', [App\Http\Controllers\SubscriberController::class, 'index'])->name('admin.subscribers.index')->middleware('auth');
Route::get('admin/subscribers/{subscriber}', [App\Http\Controllers\SubscriberController::class, 'show'])->name('admin.subscribers.show')->middleware('auth');
Route::delete('admin/subscribers/{subscriber}', [App\Http\Controllers\SubscriberController::class, 'destroy'])->name('admin.subscribers.destroy')->middleware('auth');
Route::post('subscribe', [App\Http\Controllers\SubscriberController::class, 'store']);

Route::post('contact', [App\Http\Controllers\ContactController::class, 'sendMail']);
