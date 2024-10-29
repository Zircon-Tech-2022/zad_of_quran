<?php

namespace App\Providers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Validator::extend('phone_number', function ($attribute, $value, $parameters, $validator) {
            // Define your regex pattern for phone numbers
            $pattern = '/^\+\d{1,3}\s?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/';

            return preg_match($pattern, $value);
        }, 'The :attribute is not a valid phone number.');
    }
}
