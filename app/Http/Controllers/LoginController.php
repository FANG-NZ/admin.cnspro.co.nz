<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    
    public function index(){
        return view("auth/login");
    }


    /**
     * Function is to handle fo login reuqest
     */
    public function doLogin(Request $request){
        dd("I'm here");
    }

}
