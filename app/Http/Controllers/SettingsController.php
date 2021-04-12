<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SettingsController extends Controller{

    /**
     * Function is to show index
     */
    public function index(){
        return view("settings");
    }

    /**
     * Function is to handle doupdate
     */
    public function doUpdate(Request $request){
        
        $request->validate([
            'email' => "required | email",
            'phone' => "required",
            'address' => "required",

            'new_password' => "min:8",
            'repeat_new_password' => "same:new_password"
        ]);

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