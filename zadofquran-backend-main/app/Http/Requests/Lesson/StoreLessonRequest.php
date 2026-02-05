<?php

namespace App\Http\Requests\Lesson;

use App\Rules\NumOfWords;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreLessonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()?->can('lesson.create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', new NumOfWords(2)],
            'phone' => ['required', 'string', 'max:255', 'phone_number'],
            'age' => ['required', 'numeric'],
            'gender' => ['required', 'in:male,female'],
            'staff_id' => ['nullable', 'exists:staff,id'],
            'course_id' => ['required', 'exists:courses,id'],
            'supervisor_id' => ['required', 'exists:users,id'],
            'availability' => 'required|array|min:1',
            'availability.*.day' => 'required|integer|between:0,6',
            'availability.*.start_time' => 'required|date_format:H:i',
            'availability.*.end_time' => 'required|date_format:H:i|after:availability.*.start_time',
            'availability.*.timezone' => 'required|timezone',
        ];
    }
}
