<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\=Course>
 */
class CourseFactory extends Factory
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
            'description' => $this->faker->paragraph,
            // 'image' => $this->faker->imageUrl(),
            'locale' => $this->faker->randomElement(array_keys(config('app.locales'))),
            'updated_at' => now(),
            'created_at' => now(),
        ];
    }
}
