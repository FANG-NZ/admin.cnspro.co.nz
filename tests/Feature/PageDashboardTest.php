<?php

namespace Tests\Feature;

use App\Models\AdminUser;
use App\Models\BannerSlider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PageDashboardTest extends TestCase
{
    use DatabaseTransactions;

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
        Storage::fake('public');

        //setup data
        $data = $banner_slider->toArray();
        $data['image'] = UploadedFile::fake()->create('test.jpg');
        

        $response = $this->actingAs($admin, 'admin')
                        ->post(route("page_dashboard.add_banner_slider"), $data);

        $content = json_decode($response->getContent());
                        
        $response->assertSuccessful();
        $this->assertDatabaseHas(
            "banner_sliders", 
            ['title' => $banner_slider->title]
        );
        Storage::disk('public')->assertExists($content->image->name);
    }


    /**
     * TEST CASE
     * This is to test fail update banner slider NOFOUND by ID
     */
    public function test_fail_update_banner_slider_notfound()
    {
        $admin = AdminUser::factory()->make();

        $response = $this->actingAs($admin, 'admin')
                            ->put(
                                route(
                                    "page_dashboard.update_banner_slider", 
                                    ['id' => 10000]
                                ), 
                                ['title' => "Testing title updated"]
                            );

        $response->assertStatus(404);
    }


    /**
     * TEST CASE
     * This is to test update banner slider without any data
     */
    public function test_fail_update_banner_slider_without_data()
    {
        $admin = AdminUser::factory()->make();
        $banner_slider = BannerSlider::factory()->make();
        $banner_slider->save();

        $response = $this->actingAs($admin, 'admin')
                            ->put(
                                route(
                                    "page_dashboard.update_banner_slider", 
                                    ['id' => $banner_slider->id]
                                ), 
                                [/* EMPTY DATA */]
                            );

        $response->assertJsonValidationErrors(['title', 'image']);
    }

    

    /**
     * TEST CASE
     * This isto test update banner slider item
     */
    public function test_update_banner_slider()
    {
        $admin = AdminUser::factory()->make();
        $banner_slider = BannerSlider::factory()->make();
        $banner_slider->save();

        $response = $this->actingAs($admin, 'admin')
                            ->put(
                                route(
                                    "page_dashboard.update_banner_slider", 
                                    ['id' => $banner_slider->id]
                                ), 
                                ['title' => "Testing title updated"]
                            );

        $content = json_decode($response->getContent());

        $response->assertSuccessful();
        $this->assertEquals('Testing title updated', $content->title);
    }


    /**
     * TEST CASE
     * This is to test update banner slider with new image
     */
    public function test_update_banner_slider_with_new_image()
    {
        $admin = AdminUser::factory()->make();
        $banner_slider = BannerSlider::factory()->make();
        $banner_slider->save();

        Storage::fake('public');
        $data['image'] = UploadedFile::fake()->create('new-test.jpg');
        

        $response = $this->actingAs($admin, 'admin')
                            ->put(
                                route(
                                    "page_dashboard.update_banner_slider", 
                                    ['id' => $banner_slider->id]
                                ), 
                                $data
                            );

        $content = json_decode($response->getContent());
                        
        $response->assertSuccessful();
        $this->assertEquals($banner_slider->id, $content->image->parent_id);
        Storage::disk('public')->assertExists($content->image->name);
    }


    /**
     * TEST CASE
     * This is to test delete banner slider item 
     */
    public function test_delete_banner_slider()
    {
        $admin = AdminUser::factory()->make();
        $banner_slider = BannerSlider::factory()->make();
        $banner_slider->save();

        Storage::fake('public');
        $image = UploadedFile::fake()->create('test.jpg');
        //To set fake image
        $banner_slider->uploadImage($image);


        $response = $this->actingAs($admin, 'admin')
                            ->delete(
                                route(
                                    "page_dashboard.delete_banner_slider", 
                                    ['id' => $banner_slider->id]
                                )
                            );

        var_dump($response->getContent());

        $response->assertSuccessful();
    }
}
