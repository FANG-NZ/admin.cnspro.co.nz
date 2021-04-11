<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteConfig extends Model
{
    use HasFactory;

    //define the admin table name
    protected $table = "siteconfig";

    protected $fillable = [
        'email',
        'phone',
        'address',
        'facebook',
        'instagram'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];


    /**
     * STATIC
     * Function is to return current siteconfig,
     * we use single reacord to store SiteConfig
     */
    public static function current(){

        if(SiteConfig::get()->count() === 0){
            
            $siteconfig = SiteConfig::create([
                'email' => "info@cnspro.co.nz",
                'address' => "Not address setup"
            ]);

            return $siteconfig;
        }

        return SiteConfig::get()->first();
    }
}
