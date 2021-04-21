<?php

namespace Database\Factories;

use App\Models\BannerSlider;
use Illuminate\Database\Eloquent\Factories\Factory;

class BannerSliderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = BannerSlider::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->name()
        ];
    }
}
