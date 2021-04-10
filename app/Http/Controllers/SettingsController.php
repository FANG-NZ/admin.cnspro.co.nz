<?php

namespace App\Http\Controllers;

class SettingsController extends Controller{

    /**
     * Function is to show index
     */
    public function index(){
        return view("settings");
    }

}