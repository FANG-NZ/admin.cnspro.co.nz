<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SiteConfig;
use Illuminate\Http\Request;

class APISettingsController extends Controller
{
    
    /**
     * Function is to handle load request
     */
    public function load()
    {
        $siteconfig = SiteConfig::current();

        return response($siteconfig->toJson(), 200);
    }

}
