<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\Staff\LoginRequest;
use App\Http\Requests\Auth\Staff\RegisterRequest;
use App\Http\Requests\Auth\Staff\UpdateAuthRequest;
use App\Models\StaffDetails;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    use \App\Traits\StoreImage;
    use \App\Traits\AvailabilityHandler;

    public function __construct()
    {
        $this->middleware('auth')->except(['login']);
        $this->middleware('guest')->only(['login']);
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $staffDetails = $request->user();
        $staffDetails = StaffDetails::where('email', $staffDetails['email'])->first();

        abort_if(!$staffDetails, 401);

        $staffDetails->staff->update([
            'name' => $data['name'],
            'phone' => $data['phone'],
        ]);

        $staff = $staffDetails->staff;

        $staffDetails->update([
            'age' => $data['age'],
            'gender' => $data['gender'],
        ]);

        if (array_key_exists('availability', $data) && $data['availability'] && count($data['availability'])) {
            $this->storeAvailabilities($data['availability'], $staff, true);
        }

        $courses = $data['courses'];
        $staff->courses()->sync($courses);

        $token = $staff->details->createToken('auth_token')->plainTextToken;

        $availabilities = $this->getAvailabilitiesInTimezones($staff->availabilities);

        return apiSuccessResponse(__('messages.register_success'), [
            'token' => $token,
            'user' => array_merge(
                $staff->only([
                    "id",
                    "name",
                    "image",
                    "phone",
                    "email",
                    "qualifications",
                    "locale",
                    "created_at",
                    "updated_at",
                ]),
                [
                    'age' => $staff->details->age,
                    'gender' => $staff->details->gender,
                    'availabilities' => $availabilities,
                    'courses' => $staff->courses->toArray(),
                ]
            )
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        $staffDetails = StaffDetails::where('email', $data['email'])
            ->with('staff', 'staff.availabilities', 'staff.courses')->first();

        if (!$staffDetails || !Hash::check($data['password'], $staffDetails->password)) {
            return apiErrorResponse(__('auth.failed'), [
                'email' => [
                    'message' => __('auth.failed')
                ],
            ], 401);
        }

        $token = $staffDetails->createToken('auth_token')->plainTextToken;

        $availabilities = $this->getAvailabilitiesInTimezones($staffDetails->staff->availabilities);

        return apiSuccessResponse(__('messages.login_success'), [
            'token' => $token,
            'user' => array_merge(
                $staffDetails->staff->toArray(),
                [
                    'age' => $staffDetails->age,
                    'gender' => $staffDetails->gender,
                    'availabilities' => $availabilities,
                    'courses' => $staffDetails->staff->courses->toArray(),
                ]
            )
        ]);
    }

    public function getUserInfo(Request $request)
    {
        $staffDetails = $request->user(); // token is valid
        $staffDetails = StaffDetails::where('email', $staffDetails['email']) // is staff
            ->with(['staff', 'staff.availabilities', 'staff.courses',
            'staff.lessons' => function ($query) {
                    $query->whereHas('availabilities', function ($q) {
                        $q->where('start_time', '>', now());
                    });
                }, 
            'staff.lessons.subscriber', 'staff.lessons.course', 'staff.lessons.availabilities'])->first();

        abort_if(!$staffDetails, 401);
        $staff = $staffDetails->staff;
        $timezone = request('timezone_offset');

        $netAvailabilities = $this->getNetAvailabilities($staff);
        $availabilities = $this->getAvailabilitiesInTimezones($netAvailabilities, $timezone);
        
        $lessons = $staff->lessons;
        $lessonsArray = [];
        $lessonsAvailabilitiesArray = [];
        foreach ($lessons as $lesson) {
            $lessonAvailabilities = $this->getAvailabilitiesInTimezones($lesson->availabilities, $timezone);
            foreach ($lessonAvailabilities as $lessonAvailability) {
                $lessonsAvailabilitiesArray[] = $lessonAvailability;
            }
            $item = $lesson->toArray();
            $item['availabilities'] = $lessonAvailabilities;
            $lessonsArray[] = $item;
        }

        return apiSuccessResponse(__('messages.user_found'), [
            'user' => array_merge(
                $staffDetails->staff->toArray(),
                [
                    'age' => $staffDetails->age,
                    'gender' => $staffDetails->gender,
                    'availabilities' => $availabilities,
                    'courses' => $staffDetails->staff->courses->toArray(),
                    'lessons' => $lessonsArray,
                ]
            )
        ]);
    }

    public function updateUserInfo(UpdateAuthRequest $request)
    {
        $data = $request->validated();
        $staffDetails = $request->user();
        $staffDetails = StaffDetails::where('email', $staffDetails['email'])->first();

        abort_if(!$staffDetails, 401);

        $staffDetails->staff->update([
            'name' => $data['name'] ?? $staffDetails->staff->name,
            'phone' => $data['phone'] ?? $staffDetails->staff->phone,
        ]);

        $staff = $staffDetails->staff;

        $staffDetails->update([
            'age' => $data['age'] ?? $staffDetails->age,
        ]);

        if (array_key_exists('availability', $data) && $data['availability'] && count($data['availability'])) {
            $this->storeAvailabilities($data['availability'], $staff, true);
        }

        $availabilities = $this->getAvailabilitiesInTimezones($staff->availabilities);

        return apiSuccessResponse(__('messages.updated_success'), [
            'user' => array_merge(
                $staff->only([
                    "id",
                    "name",
                    "image",
                    "phone",
                    "email",
                    "qualifications",
                    "locale",
                    "created_at",
                    "updated_at",
                ]),
                [
                    'age' => $staff->details->age,
                    'gender' => $staff->details->gender,
                    'availabilities' => $availabilities,
                    'courses' => $staff->courses->toArray(),
                ]
            )
        ]);
    }

    public function logout(Request $request)
    {
        $staffDetails = $request->user();
        $staffDetails = StaffDetails::where('email', $staffDetails['email'])->first();

        abort_if(!$staffDetails, 401);

        $staffDetails->currentAccessToken()->delete();

        return apiSuccessResponse(__('messages.logout_success'));
    }
}
