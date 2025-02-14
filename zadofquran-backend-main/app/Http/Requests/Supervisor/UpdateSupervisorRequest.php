<?php

namespace App\Http\Requests\Supervisor;

use App\Rules\NumOfWords;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSupervisorRequest extends FormRequest
{
    /**
     * Determine if the supervisor is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->can('supervisors.update');
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
            'email' => "required|email|unique:users,email,{$this->id},id,deleted_at,NULL",
            'password' => 'nullable|string|confirmed|min:8',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => $this->name ? trim($this->name) : null,
            'email' => $this->email ? trim($this->email) : null,
            'password' => $this->password ? trim($this->password) : null,
        ]);
    }
}
