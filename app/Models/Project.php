<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Project extends Model
{
    use HasFactory;

    protected $table = "projects";

    protected $fillable = [
        'title',
        'is_new',
        'completed_on',
        'street',
        'city',
        'bedrooms',
        'bathrooms',
        'carpark',
        'livingrooms',
        'land_area',
        'floor_area',

        'short_description',
        'description'
    ];

    protected $hidden = [
        //'created_at',
        'updated_at',
        'hasImages' //We need to remove hasImages here. Why ???
    ];

    protected $appends = ['images'];

    public function getImagesAttribute(){
        return $this->hasImages->sortByDesc("created_at")->values();
    }

    public function hasImages(){
        return $this->hasMany('App\Models\ProjectImage', 'project_id');
    }


    /**
     * Function is to handle upload image into
     * this project
     */
    public function uploadImage($image){

        $path = Storage::disk('public')->put('projects', $image);
        $url = Storage::url($path);
        
        //To create project image object
        $projectImage = new ProjectImage();
        
        $projectImage->name = $path;
        $projectImage->url = $url;
        $projectImage->project_id = $this->id;

        $projectImage->save();
        return $projectImage;
    }


    /**
     * Function is to handle delete image from 
     * project
     */
    public function deleteImage($image_id){

        $image = $this->hasImages()->find($image_id);

        if(!$image){
            return false;
        }

        //To remove from database
        $image->delete();

        Storage::disk('public')->delete($image->name);
        
        return $image;
    }





    /**
     * STATIC
     */
    public static function boot(){
        parent::boot();

        //call before delete function 
        self::deleting(function($project){

            //To remove image reacord
            $project->hasImages()->each(function($image){
                $image->delete();
            });

        });
    }
    
}
