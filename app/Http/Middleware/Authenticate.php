<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\URL;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        $current_url = URL::current();
        $request->session()->put('url.intended', $current_url);
        
        //To add message
        $msg = [
            'status' => 'danger',
            'content' => "Please login first to access"
        ];
        $request->session()->flash('ff-message', $msg);

        if (! $request->expectsJson()) {
            return route('page.login');
        }
    }
}
