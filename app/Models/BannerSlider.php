<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class BannerSlider extends Model
{
    use HasFactory;

    protected $table = "banner_sliders";

    protected $hidden = [
        'created_at',
        'updated_at',
        'hasImage'
    ];

    protected $appends = ['image'];

    public function getImageAttribute(){
        return $this->hasImage;
    }

    /**
     * Image
     * has_one relation
     */
    public function hasImage(){
        return $this->hasOne('App\Models\Image', "parent_id");
    }


    /**
     * Function is to handle upload image
     */
    public function uploadImage($imageFile)
    {
        //To delete current image first
        $this->deleteImage();

        $path = Storage::disk('public')->put('banner-slider', $imageFile);
        $url = Storage::url($path);
        
        //To create project image object
        $image = new Image();
        
        $image->name = $path;
        $image->url = $url;
        $image->parent_id = $this->id;

        $image->save();
        return $image;
    }

    /**
     * Function is to delete image
     */
    public function deleteImage()
    {
        if(!$this->hasImage()->exists()){
            return;
        }

        Storage::disk('public')->delete($this->hasImage->name);
        $this->hasImage()->delete();
    }


    /**
     * STATAIC
     */
    public static function boot()
    {
        parent::boot();

        //Handle before delete banner slider
        self::deleting(function($banner_slider){
            $banner_slider->deleteImage();
        });
    }


}
