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
    public function test_form_info_validator()
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


    /**
     * TEST CASE
     * This is to test form password validator
     */
    public function test_form_password_validator()
    {
        $admin = AdminUser::factory()->make();

        //For password length < 8
        $response = $this->actingAs($admin, 'admin')
                        ->put(
                            route('page_settings.update'), 
                            ['new_password' => "88"]
                        );
        $response->assertSessionHasErrors(['new_password']);

        //For verify password right
        $response = $this->actingAs($admin, 'admin')
                        ->put(
                            route('page_settings.update'), 
                            ['new_password' => "12345678"]
                        );
        $response->assertSessionDoesntHaveErrors(['new_password']);

        $response = $this->actingAs($admin, 'admin')
                        ->put(
                            route('page_settings.update'), 
                            [
                                'new_password' => "",
                                'repeat_new_password' => "12345678"
                            ]
                        );
        $response->assertSessionHasErrors(['repeat_new_password']);

        $response = $this->actingAs($admin, 'admin')
                        ->put(
                            route('page_settings.update'), 
                            [
                                'new_password' => "12345678",
                                'repeat_new_password' => "12345678"
                            ]
                        );
        $response->assertSessionDoesntHaveErrors(['new_password', 'repeat_new_password']);
    }
}
