<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    
    public function index(){
        return view("auth/login");
    }


    /**
     * Function is to handle fo login reuqest
     */
    public function doLogin(Request $request){

        $request->validate([
            'Email' => 'required',
            'Password' => 'required'
        ]);
        
        $inputs = [
            'email' => $request->input('Email'),
            'password' => $request->input('Password')
        ];

        if(Auth::guard('admin')->attempt($inputs)){
            return redirect()->intended(url('/'));
        }

        return redirect()
                    ->back()
                    ->withInput()
                    ->withErrors(['message' => 'Incorrect admin user login details!']);
    }


    /**
     * Handle do logout request
     */
    public function doLogout(Request $request)
    {
        Auth::guard('admin')->logout();
        
        //To add message
        $msg = [
            'status' => 'success',
            'content' => "See you next time :)"
        ];
        $request->session()->flash('ff-message', $msg);

        return redirect(route('page_login'));
    }

}
