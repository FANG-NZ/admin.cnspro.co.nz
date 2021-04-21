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

        return response($banner_slider->toJson(), 201);
    }




}
