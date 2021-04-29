<?php

namespace Database\Factories;

use App\Models\Image;
use Illuminate\Database\Eloquent\Factories\Factory;

class ImageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Image::class;

    private $url_data = [
        'https://freebw.com/templates/tatee/images/post-01.jpg',
        'https://freebw.com/templates/tatee/images/slide-12.jpg',
        'https://freebw.com/templates/tatee/images/slide-13.jpg',
        'https://freebw.com/templates/tatee/images/slide-14.jpg',
        'https://freebw.com/templates/tatee/images/slide-16.jpg'
    ];

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'url' => $this->faker->randomElement($this->url_data)
        ];
    }
}
