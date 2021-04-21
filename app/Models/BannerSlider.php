<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BannerSlider extends Model
{
    use HasFactory;

    protected $table = "banner_sliders";

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    /**
     * Image
     * has_one relation
     */
    public function hasImage(){
        return $this->hasOne('App\Model\Image', "parent_id");
    }
}
