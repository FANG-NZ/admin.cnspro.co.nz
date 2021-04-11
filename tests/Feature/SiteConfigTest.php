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

        $new_config = SiteConfig::current();
        $this->assertEquals($test_email, $new_config->email);
    }
}
