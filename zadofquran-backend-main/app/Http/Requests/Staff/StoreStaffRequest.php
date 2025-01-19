<?php

namespace App\Http\Requests\Staff;

use App\Rules\NumOfWords;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreStaffRequest extends FormRequest
{
    use \App\Traits\UnifyPhone;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()?->can('staff.create');
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
            'phone' => ['required', 'string', 'max:13', 'min:13', 'phone_number', 'unique:staff,phone,NULL,id,deleted_at,NULL'],
            'email' => 'required|email|unique:staff,email,|unique:staff_details,email',
            'password' => 'required|string|confirmed|min:8',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'courses' => 'nullable|array|min:1|exists:courses,id',
            'qualifications' => ['required', 'string'],
            'age' => 'required|integer|min:18',
            'locale' => ['required', 'string', 'in:' . implode(',', array_keys(config('app.locales')))],
            'availability' => 'nullable|array|min:1',
            'availability.*.day' => ['required', Rule::in(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'])],
            'availability.*.start_time' => 'required|date_format:H:i',
            'availability.*.end_time' => 'required|date_format:H:i',
            'availability.*.timezone' => 'required|string',
        ];
    }

    /**
     * set Default locale if not set
     */
    protected function prepareForValidation(): void
    {
        if (!$this->get('locale')) {
            $this->merge(['locale' => app()->getLocale()]);
        }

        $this->merge([
            'name' => trim($this->name),
            'email' => trim($this->email),
            'password' => trim($this->password),
            'phone' => $this->unifyPhone($this->phone),
        ]);
    }
}
