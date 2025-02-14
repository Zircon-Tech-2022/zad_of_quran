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
            'phone' => 'nullable|string|phone_number|unique:staff,phone,' . $this->user()->staff->id . ',id,deleted_at,NULL',
            'age' => 'nullable|integer|min:18',
            'availability' => 'nullable|array|min:1',
            'availability.*.day' => ['required', Rule::in(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'])],
            'availability.*.start_time' => 'required|date_format:H:i',
            'availability.*.end_time' => 'required|date_format:H:i',
            'availability.*.timezone' => 'required|string',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => $this->name ? trim($this->name) : null,
            'email' => $this->email ? trim($this->email) : null,
            'password' => $this->password ? trim($this->password) : null,
            'phone' => $this->phone ? $this->unifyPhone($this->phone) : null,
        ]);
    }
}
