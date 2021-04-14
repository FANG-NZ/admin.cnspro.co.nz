<?php

namespace Tests\Feature;

use App\Models\AdminUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PageDashboardTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_view_dashboard_page()
    {
        $response = $this->get(route('page_dashboard'));
        //Test admin not logged in
        $response->assertStatus(302);
        $response->assertRedirect(Route('page_login'));

        //Try to view dashboard with admin logged in 
        $admin = AdminUser::factory()->make();

        $response = $this->actingAs($admin, 'admin')
                        ->get(route('page_dashboard'));

        $response->assertSuccessful();
    }
}
