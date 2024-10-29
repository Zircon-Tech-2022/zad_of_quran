<?php

namespace App\Http\Requests\Plan;

use Illuminate\Foundation\Http\FormRequest;

class StorePlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->can('plans.create');
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
            'monthly_sessions' => ['required', 'integer', 'min:1'],
            'weekly_sessions' => ['required', 'integer', 'min:1'],
            'session_duration' => ['required', 'integer', 'min:1'],
            'type' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:1'],
            'currency' => ['required', 'string', 'max:255'],
            'discount' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'description' => ['nullable', 'string'],
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
