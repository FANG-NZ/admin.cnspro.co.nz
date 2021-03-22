<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{

    private $default_data = [
        //First
        [
            'title' => "MAGNIFICENT WITH TWO MASTERS",
            'completed_on' => "2021-01-19",
            'street' => "5 capricorn place",
            'city' => "Hamilton",
            'bedrooms' => "4",
            'bathrooms' => "2",
            'carpark' => "2 - 3",
            'livingrooms' => "2",
            'land_area' => "640 m2",
            'floor_area' => "240 m2",

            'short_description' => "This spacious 240sqm home delivers ultimate family living without any compromises. Designed with ultimate functionality in mind, it makes a relaxed, low-maintenance living look in the context of modern life. From the walk-in pantry to the two heat pumps in the house, easy living features abound. Four bedrooms include two master bedrooms (three bathrooms in total) mean there's no shortage of accommodation, fantastic space for family and guests, while two living areas provide inviting options for dining, reclining and entertaining.",
            'description' => "<p>This spacious 240sqm home delivers ultimate family living without any compromises. Designed with ultimate functionality in mind, it makes a relaxed, low-maintenance living look in the context of modern life.</p><p>From the walk-in pantry to the two heat pumps in the house, easy living features abound. Four bedrooms include two master bedrooms (three bathrooms in total) mean there's no shortage of accommodation, fantastic space for family and guests, while two living areas provide inviting options for dining, reclining and entertaining.</p>"
        ],
        //Second
        [
            'title' => "MODERN LIVING",
            'completed_on' => "2021-02-28",
            'street' => "4/61 Fifth Avenue, Enderley",
            'city' => "Hamilton",
            'bedrooms' => "3",
            'bathrooms' => "2",
            'carpark' => "1",
            'livingrooms' => "1",
            'land_area' => "115 m2",
            'floor_area' => "---",

            'short_description' => "Investors and first home buyers take note! This is an opportunity to purchase a low maintenance, modern townhouse close to five cross roads and with easy access into the CBD.",
            'description' => "<p>This three bedroom home has been built to a sleek design and encompasses an easygoing lifestyle. Comprising three bedrooms (the master enjoying it's own ensuite) set over two levels. Downstairs the open plan kitchen, dining and living leads out to a private courtyard area, perfect for entertaining in warmer months. The single garage provides both safe off street parking and ample storage space.</p><p>Location here is extremely central and within walking distance to the local shops and schools. Access around the city is easy with Fifth Ave adjoining Wairere Drive. Call James on 0273139170 to book a viewing!</p>"
        ],
        //Third
        [
            'title' => "THE CBD LOOKOUT",
            'completed_on' => "2021-03-22",
            'street' => "Unit 202/521 Anglesea Street",
            'city' => "Hamilton",
            'bedrooms' => "2",
            'bathrooms' => "1",
            'carpark' => "1 (UNCOVERED)",
            'livingrooms' => "1",
            'land_area' => "640 m2",
            'floor_area' => "",

            'short_description' => "If immaculate & central city living is what you are after - look no further! This beautiful 2 bedroom townhouse in the heart of Hamilton City cannot be missed! Located at 521 Anglesea Street with only a few minutes walk to Hamilton Bus centre, Centre Place & Downtown Plaza, Wintec & Waikato Stadium, you will be right amongst all the action, and able enjoy the city lights and excitement.",
            'description' => ""
        ]
    ];


    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        foreach($this->default_data as $k => $item){
            $this->createProject($item);
        }

    }


    /**
     * Function is to create project
     */
    private function createProject($data)
    {
        $project = Project::where([
            ['street' ,$data['street']],
            ['city' ,$data['city']]
        ])->first();

        if($project){
            return $project;
        }

        //To create project
        $project = Project::create($data);
        echo "> PROJECT [{$project->street}, {$project->city}] ADDED\r\n";
        return $project;
    }
}
