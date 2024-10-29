<?php

namespace App\Http\Requests\Blog;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBlogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->can('blogs.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'slug' => "nullable|string|unique:blogs,slug,{$this->blog->id},id,deleted_at,NULL",
            'content' => 'required|string',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string',
            'image' => 'nullable|file|image|max:10240',
            'publish' => 'nullable|boolean',
            'locale' => 'required|string|in:' . implode(',', array_keys(config('app.locales'))),
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
