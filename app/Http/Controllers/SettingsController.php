<?php

namespace App\Http\Controllers;

use App\Models\SiteConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class SettingsController extends Controller{

    /**
     * Function is to show index
     */
    public function index(){
        $config = SiteConfig::current();

        return view("settings", ['SiteConfig' => $config]);
    }

    /**
     * Function is to handle doupdate
     */
    public function doUpdate(Request $request){
        
        $request->validate([
            'email' => "required | email",
            'phone' => "required",
            'address' => "required",

            'new_password' => "nullable|min:8",
            'repeat_new_password' => "nullable|same:new_password"
        ]);

        //To update SiteConfig
        $config = SiteConfig::current();

        $config->update([
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'facebook' => $request->input('facebook'),
            'instagram' => $request->input('instagram'),
        ]);


        //If there is NEW PASSWORD passed, we need to handle
        //update password
        if($password = $request->input('new_password')){
            $admin = Auth::user();

            $admin->password = Hash::make($password);
            $admin->save();
        }



        //To add session message
        $msg = [
            'status' => 'success',
            'title' => "Upadte success",
            'content' => "Your request has been updated successfully"
        ];
        $request->session()->flash('CNSPRO_MESSAGE', json_encode($msg));

        return redirect()->back();
    }

}