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
            'phone' => 'required|string|phone_number|unique:staff,phone,NULL,id,deleted_at,NULL',
            'age' => 'required|integer|min:18',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'courses' => 'required|array|min:1|exists:courses,id',
            'availability' => 'required|array|min:1',
            'availability.*.day' => 'required|integer|between:0,6',
            'availability.*.start_time' => 'required|date_format:H:i',
            'availability.*.end_time' => 'required|date_format:H:i|after:availability.*.start_time',
            'availability.*.timezone' => 'required|timezone',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => $this->name ? trim($this->name) : null,
            'phone' => $this->phone ? $this->unifyPhone($this->phone) : null,
        ]);
    }
}
