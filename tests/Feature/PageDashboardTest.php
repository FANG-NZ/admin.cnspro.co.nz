<?php

namespace Tests\Feature;

use App\Models\AdminUser;
use App\Models\BannerSlider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class PageDashboardTest extends TestCase
{
    use RefreshDatabase;

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

    /**
     * TEST CASE
     * This is to test add new banner slider item
     */
    public function test_add_new_banner_slider()
    {
        $admin = AdminUser::factory()->make();
        $banner_slider = BannerSlider::factory()->make();

        //setup data
        $data = $banner_slider->toArray();
        $data['image'] = UploadedFile::fake()->create('test.jpg');
        

        $response = $this->actingAs($admin, 'admin')
                        ->post(route("page_dashboard.add_banner_slider"), $data);

                        
        $response->assertSuccessful();
        $this->assertDatabaseHas(
            "banner_sliders", 
            [
                'title' => $banner_slider->title
            ]
        );
    }


    /**
     * TEST CASE
     * This isto test update banner slider item
     */
    public function test_update_banner_slider()
    {
        $response = $this->put(route("page_dashboard.update_banner_slider", ['id' => 1]), []);

        $response->assertSuccessful();
    }


    /**
     * TEST CASE
     * This is to test delete banner slider item 
     */
    public function test_delete_banner_slider()
    {
        $response = $this->delete(route("page_dashboard.delete_banner_slider", ['id' => 1]), []);

        $response->assertSuccessful();
    }
}
