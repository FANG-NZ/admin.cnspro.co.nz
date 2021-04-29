<?php

namespace Database\Seeders;

use App\Models\BannerSlider;
use App\Models\Image;
use Illuminate\Database\Seeder;

class BannerSliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //To generate 3 fake banner slider
        BannerSlider::factory()->count(3)
            ->has(Image::factory()->count(1), 'hasImage')
            ->create();

        echo "> BANNER SLIDER [3] CREATED\r\n";
    }
}
