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
            'email' => 'required|unique:staff,email,|unique:staff_details,email',
            'password' => 'nullable|string|confirmed|min:8',
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
            'email' => trim($this->email),
            'password' => trim($this->password),
        ]);
    }
}
