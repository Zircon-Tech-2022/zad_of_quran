<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\=FAQ>
 */
class FAQFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'question' => $this->faker->sentence,
            'answer' => $this->faker->paragraph,
            'is_active' => $this->faker->boolean,
            'locale' => $this->faker->randomElement(array_keys(config('app.locales'))),
            'updated_at' => now(),
            'created_at' => now(),
        ];
    }
}
