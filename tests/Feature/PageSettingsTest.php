<?php

namespace Tests\Feature;

use App\Models\AdminUser;
use Tests\TestCase;

class PageSettingsTest extends TestCase
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
                        ->get(route('page_settings'));

        $response->assertStatus(200);
    }

    /**
     * TEST CASE
     * This is to test if form can be submitted correctly
     */
    public function test_form_submit_without_authenticated()
    {
        //Test if admin user logged in 
        $response = $this->put(route('page_settings.update'), []);
        $this->assertEquals(
            $response->exception->getMessage(),
            'Unauthenticated.'
        );
    }

    /**
     * TEST CASE
     * This is to test form validator
     */
    public function test_form_submit_validator()
    {
        $admin = AdminUser::factory()->make();

        //For email
        $response = $this->actingAs($admin, 'admin')
                        ->put(
                            route('page_settings.update'), 
                            []
                        );
        $response->assertSessionHasErrors(['email']);

        $response = $this->actingAs($admin, 'admin')
                        ->put(
                            route('page_settings.update'), 
                            ['email' => "Test email here"]
                        );
        $response->assertSessionHasErrors(['email']);

        //For phone
        $response = $this->actingAs($admin, 'admin')
                        ->put(
                            route('page_settings.update'), 
                            ['phone' => ""]
                        );
        $response->assertSessionHasErrors(['phone']);

        //For address
        $response = $this->actingAs($admin, 'admin')
                        ->put(
                            route('page_settings.update'), 
                            []
                        );
        $response->assertSessionHasErrors(['email']);

        //For all right
        $response = $this->actingAs($admin, 'admin')
                        ->put(
                            route('page_settings.update'), 
                            [
                                'email' => "test@test.com",
                                'phone' => "0064 168 9988",
                                'address' => "168 somewhere street, Hamilton"
                            ]
                        );
        $response->assertSessionHasNoErrors();
    }
}
