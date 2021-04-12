<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\SiteConfig;

class SiteConfigTest extends TestCase
{
    //use RefreshDatabase;

    /**
     * Test if there is only one record into database
     */
    public function test_site_config_valid()
    {
        SiteConfig::current();
        $count = SiteConfig::get()->count();

        $this->assertEquals(1, $count);
    }


    /**
     * Test if site config update correctlly
     */
    public function test_update_site_coonfig()
    {
        $config = SiteConfig::current();

        $test_email = "test@test.com";
        $config->email = $test_email;
        $config->save();

        $config = SiteConfig::current();
        $this->assertEquals($test_email, $config->email);

        $data = [
            'email' => "test2@test.com",
            'phone' => "09 999 8888",
            'address' => "168 somewhere street, Hamilton",

            'facebook' => "https://www.facebook.com/profile.php?id=100011258371033",
            'instagram' => ""
        ];
        $config->update($data);

        $config = SiteConfig::current();

        $this->assertEquals($data['email'], $config->email);
        $this->assertEquals($data['phone'], $config->phone);
        $this->assertEquals($data['address'], $config->address);
        $this->assertEquals($data['facebook'], $config->facebook);
        $this->assertEquals($data['instagram'], $config->instagram);
    }
}
