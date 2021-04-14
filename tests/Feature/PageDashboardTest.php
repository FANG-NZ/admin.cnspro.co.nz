<?php

namespace Tests\Feature;

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
        $response = $this->get('/dashboard');

        $response->assertStatus(302);
        $response->assertRedirect(Route('page_login'));
    }
}
