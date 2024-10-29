<?php

namespace App\Http\Requests\Auth;

use App\Rules\NumOfWords;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
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
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|confirmed|min:8',
            'phone' => 'required|string|phone_number|unique:users,phone',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => trim($this->name),
            'email' => trim($this->email),
            'password' => trim($this->password),
            'phone' => trim($this->phone),
        ]);
    }
}
