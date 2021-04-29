<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Project::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->name(),

            'street' => $this->faker->streetAddress(),
            'city' => $this->faker->city(),

            'is_new'    => $this->faker->numberBetween(0,1),
            'completed_on' => $this->faker->date(),

            'bedrooms'  => $this->faker->numberBetween(2,5),
            'bathrooms' => $this->faker->numberBetween(1,3),
            'carpark'   => $this->faker->numberBetween(1,3),
            'livingrooms' => $this->faker->numberBetween(1,2),
            'land_area' => $this->faker->randomElement(['200 m2', '240 m2', '260 m2', '280 m2']),
            'floor_area'=> $this->faker->randomElement(['420 m2', '500 m2', '580 m2', '640 m2', '780 m2']),

            'short_description' => $this->faker->text(30),
            'description' => $this->faker->paragraphs(2, true)
        ];
    }
}
