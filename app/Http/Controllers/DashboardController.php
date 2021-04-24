<?php

namespace App\Http\Controllers;

use App\Models\BannerSlider;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    
    public function index(){
        return view('dashboard');
    }


    /**
     * Function is to load all banner sliders
     */
    public function doLoadBannerSliders()
    {
        $banner_sliders = BannerSlider::all();

        return response($banner_sliders->toJson(), 200);
    }


    /**
     * TEST
     * POST METHOD
     */
    public function testPostMethod(Request $request, $id)
    {
        $data = $request->all();
sleep(2);
        return response($data, 200);
    }

    /**
     * TEST
     * PUT METHOD
     */
    public function testPutMethod(Request $request, $id)
    {

    }

    /**
     * TEST
     * DELETE METHOD
     */
    public function testDeleteMethod(Request $request, $id)
    {

    }

    


    /**
     * Function is to handle adding new banner slider 
     * item
     */
    public function doAddBannerSlider(Request $request)
    {
        $request->validate([
            'title' => "required|max:255",
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:3072'
        ]);

        //To add new banner slider
        $banner_slider = new BannerSlider();
        $banner_slider->title = $request->input('title');
        $banner_slider->save();

        //To handle image upload
        $banner_slider->uploadImage($request->file('image'));

        return response($banner_slider->toJson(), 201);
    }


    /**
     * Function is to handle update banner slider item
     */
    public function doUpdateBannerSlider(Request $request, $id)
    {
        $banner = BannerSlider::findOrFail($id);

        $request->validate([
            'title' => "required_without_all:image|nullable|max:255",
            'image' => 'required_without_all:title|nullable|image|mimes:jpeg,png,jpg,gif|max:3072'
        ]);

        //To update title
        if($request->filled("title")){
            $banner->title = $request->input('title');
            $banner->save();
        }

        //To update new image
        if($request->hasFile("image")){
            $banner->uploadImage($request->file('image'));
        }

        return response($banner->toJson(), 201);
    }


    /**
     * Function is to handle delete banner slider
     */
    public function doDeleteBannerSlider(Request $request, $id)
    {
        $banner = BannerSlider::findOrFail($id);

        //call delete method
        $banner->delete();

        return response($banner->toJson(), 200);
    }

}
