<?php

namespace App\Http\Requests\Auth;

use App\Rules\NumOfWords;
use Illuminate\Foundation\Http\FormRequest;

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
            'name' => ['required', 'string', 'min:2', 'max:255', new NumOfWords(2)],
            'email' => 'required|email|unique:users,email,' . $this->user()->id,
            'password' => 'nullable|string|confirmed|min:8',
            'phone' => 'required|string|phone_number|unique:users,phone,' . $this->user()->id,
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
