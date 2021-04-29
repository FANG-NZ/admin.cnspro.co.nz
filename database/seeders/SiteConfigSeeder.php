<?php

namespace Database\Seeders;

use App\Models\SiteConfig;
use Illuminate\Database\Seeder;

class SiteConfigSeeder extends Seeder
{

    private $default_data = [
        'email' => "info@cnspro.co.nz",
        'phone' => "021 000 168",
        'address' => "NOT ADDREE SETUP"
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $config = SiteConfig::current();
        $config->update($this->default_data);
        $config->save();

        echo "> SiteConfig Init\r\n";
    }
}
