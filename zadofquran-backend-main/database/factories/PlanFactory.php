<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\=Plan>
 */
class PlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence,
            'monthly_sessions' => $this->faker->numberBetween(1, 10),
            'weekly_sessions' => $this->faker->numberBetween(1, 10),
            'session_duration' => $this->faker->numberBetween(1, 10),
            'type' => $this->faker->randomElement(['شهري', 'سنوي', 'ربع سنوي']),
            'price' => $this->faker->numberBetween(1, 1000),
            'currency' => 'ج.م',
            'discount' => $this->faker->numberBetween(1, 100),
            'description' => $this->faker->paragraph,
            'locale' => $this->faker->randomElement(array_keys(config('app.locales'))),
            'updated_at' => now(),
            'created_at' => now(),
        ];
    }
}