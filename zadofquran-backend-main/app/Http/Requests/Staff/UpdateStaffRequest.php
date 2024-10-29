<?php

namespace App\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStaffRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()?->can('staff.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:10240'],
            'phone' => ['nullable', 'string', 'max:255', 'phone_number', "unique:staff,phone,{$this->staff->id},id,deleted_at,NULL"],
            'email' => ['nullable', 'email', 'max:255', "unique:staff,email,{$this->staff->id},id,deleted_at,NULL"],
            'qualifications' => ['required', 'string'],
            'locale' => ['required', 'string', 'in:' . implode(',', array_keys(config('app.locales')))],
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
    }
}
