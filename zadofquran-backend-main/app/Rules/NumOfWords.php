<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class NumOfWords implements ValidationRule
{
    public function __construct(private int $minWords = 2)
    {
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $names = explode(' ', $value);
        if (count($names) < $this->minWords) {
            $fail(__('validation.min_words', ['min' => $this->minWords]));
        }
    }
}