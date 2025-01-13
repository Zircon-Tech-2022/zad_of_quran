<?php

namespace App\Http\Requests\Auth\Staff;

use App\Rules\NumOfWords;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    use \App\Traits\UnifyPhone;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:255', new NumOfWords(2)],
            'email' => 'required|email|unique:staff,email,|unique:staff_details,email',
            'password' => 'required|string|confirmed|min:8',
            'phone' => 'required|string|phone_number|unique:staff,phone',
            'age' => 'required|integer|min:18',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'courses' => 'required|array|min:1|exists:courses,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
            'availability' => 'required|array|min:1',
            'availability.*.day' => ['required', Rule::in(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'])],
            'availability.*.start_time' => 'required|date_format:H:i',
            'availability.*.end_time' => 'required|date_format:H:i',
            'availability.*.timezone' => 'required|string',
            'qualifications' => 'required|string',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => trim($this->name),
            'email' => trim($this->email),
            'password' => trim($this->password),
            'phone' => $this->unifyPhone($this->phone),
        ]);
    }
}
