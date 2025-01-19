<?php

namespace App\Http\Requests\Auth\Staff;

use App\Rules\NumOfWords;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAuthRequest extends FormRequest
{
    use \App\Traits\UnifyPhone;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (bool) $this->user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'min:2', 'max:255', new NumOfWords(2)],
            'password' => 'nullable|string|confirmed|min:8',
            'phone' => 'nullable|string|min:13|max:13|phone_number|unique:staff,phone,' . $this->user()->staff->id . ',id,deleted_at,NULL',
            'age' => 'nullable|integer|min:18',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
            'availability' => 'nullable|array|min:1',
            'availability.*.day' => ['required', Rule::in(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'])],
            'availability.*.start_time' => 'required|date_format:H:i',
            'availability.*.end_time' => 'required|date_format:H:i',
            'availability.*.timezone' => 'required|string',
            'qualifications' => 'nullable|string',
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
