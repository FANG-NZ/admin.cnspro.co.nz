<?php

namespace Database\Factories;

use App\Models\ProjectImage;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectImageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProjectImage::class;


    private $url_data = [
        'https://freebw.com/templates/tatee/images/post-01.jpg',
        'https://freebw.com/templates/tatee/images/post-02.jpg',
        'https://freebw.com/templates/tatee/images/post-03.jpg',
        'https://freebw.com/templates/tatee/images/post-04.jpg',
        'https://freebw.com/templates/tatee/images/post-05.jpg',
        'https://freebw.com/templates/tatee/images/post-06.jpg',
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
