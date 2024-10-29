<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\=Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'slug' => $this->faker->slug,
            'content' => $this->faker->paragraph,
            'description' => $this->faker->sentence,
            'short_description' => $this->faker->sentence,
            // 'image' => $this->faker->imageUrl(),
            'published_at' => $this->faker->dateTime,
            'locale' => $this->faker->randomElement(array_keys(config('app.locales'))),
            'updated_at' => now(),
            'created_at' => now(),
        ];
    }
}
