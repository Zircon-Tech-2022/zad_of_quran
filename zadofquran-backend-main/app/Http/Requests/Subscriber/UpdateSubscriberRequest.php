<?php

namespace App\Http\Requests\Subscriber\Subscriber;

use App\Rules\NumOfWords;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSubscriberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'plan_id' => ['required', 'exists:plans,id'],
            'name' => ['required', 'string', 'max:255', new NumOfWords(2)],
            'email' => ['required', 'string', 'email', 'max:255'],
            'age' => ['required', 'numeric'],
            'gender' => ['required', 'in:male,female'],
            'persons_count' => ['required', 'numeric'],
            'phone' => ['required', 'string', 'max:255', 'phone_number'],
            'appointments' => ['required', 'string', 'max:500'],
        ];
    }
}
