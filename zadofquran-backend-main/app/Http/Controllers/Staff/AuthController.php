<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\Staff\LoginRequest;
use App\Http\Requests\Auth\Staff\RegisterRequest;
use App\Http\Requests\Auth\Staff\UpdateAuthRequest;
use App\Models\StaffDetails;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    use \App\Traits\StoreImage;
    use \App\Traits\AvailabilityHandler;
    use \App\Traits\TimeParser;

    public function __construct()
    {
        $this->middleware('auth')->except(['login', 'register']);
        $this->middleware('guest')->only(['login', 'register']);
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $this->storeImage($request);
        }

        $staff = Staff::create([
            'name' => $data['name'],
            'image' => $data['image'] ?? null,
            'phone' => $data['phone'],
            'email' => $data['email'],
            'qualifications' => $data['qualifications'],
        ]);

        $staff->details()->create([
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'age' => $data['age'],
            'gender' => $data['gender'],
        ]);

        if (array_key_exists('availability', $data) && count($data['availability'])) {
            $this->storeAvailabilities($this->reformAvailabilities($data['availability']), $staff);
        }

        $courses = $data['courses'] ?? [];
        $staff->courses()->sync($courses);

        $token = $staff->details->createToken('auth_token')->plainTextToken;

        $availabilities = $this->getAvailabilities($staff->availabilities);

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
                    "deleted_at",
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

        $availabilities = $this->getAvailabilities($staffDetails->staff->availabilities);

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
            ->with('staff', 'staff.availabilities', 'staff.courses', 'staff.lessons', 'staff.lessons.subscriber', 'staff.lessons.course', 'staff.lessons.availabilities')->first();

        abort_if(!$staffDetails, 401);

        $timezone = request('timezone_offset');
        $availabilities = $this->getAvailabilities($staffDetails->staff->availabilities, $timezone);

        $lessons = $staffDetails->staff->lessons;
        $lessonsArray = [];
        $lessonsAvailabilitiesArray = [];
        foreach ($lessons as $lesson) {
            $lessonAvailabilities = $this->getAvailabilities($lesson->availabilities, $timezone);
            foreach ($lessonAvailabilities as $lessonAvailability) {
                $lessonsAvailabilitiesArray[] = $lessonAvailability;
            }
            $item = $lesson->toArray();
            $item['availabilities'] = $lessonAvailabilities;
            $lessonsArray[] = $item;
        }

        $netAvailabilities = $this->getTimesArrayInZones(
            $this->getNetAvailabilities($availabilities, $lessonsAvailabilitiesArray),
            $timezone
        );

        return apiSuccessResponse(__('messages.user_found'), [
            'user' => array_merge(
                $staffDetails->staff->toArray(),
                [
                    'age' => $staffDetails->age,
                    'gender' => $staffDetails->gender,
                    'availabilities' => $netAvailabilities,
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

        if ($request->hasFile('image')) {
            if ($staffDetails->staff->image) {
                Storage::disk('public')->delete($staffDetails->staff->image);
            }
            $data['image'] = $this->storeImage($request);
        }

        $staffDetails->staff->update([
            'name' => $data['name'] ?? $staffDetails->staff->name,
            'image' => $data['image'] ?? $staffDetails->staff->image,
            'phone' => $data['phone'] ?? $staffDetails->staff->phone,
            'qualifications' => $data['qualifications'] ?? $staffDetails->staff->qualifications,
        ]);

        $staff = $staffDetails->staff;

        if ($data['password']) {
            $currentTokenId = auth()->user()->currentAccessToken()->id;
            $staffDetails->tokens()->where('id', '!=', $currentTokenId)->delete();
        }

        $staffDetails->update([
            'password' => isset($data['password']) && !empty($data['password']) ? Hash::make($data['password']) : $staffDetails->password,
            'age' => $data['age'] ?? $staffDetails->age,
        ]);

        if (array_key_exists('availability', $data) && count($data['availability'])) {
            $this->storeAvailabilities($this->reformAvailabilities($data['availability']), $staff, true);
        }

        $availabilities = $this->getAvailabilities($staff->availabilities);

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
                    "deleted_at",
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
