<?php

namespace Tests\Feature;

use App\Models\AdminUser;
use Tests\TestCase;

class SettingsTest extends TestCase
{
    
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_view_setting_page()
    {
        $admin = AdminUser::factory()->make();

        $response = $this->actingAs($admin, 'admin')
                        ->get(route('page.settings'));

        $response->assertStatus(200);
    }
}
