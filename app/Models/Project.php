<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        return $this->hasImages;
    }

    public function hasImages(){
        return $this->hasMany('App\Models\ProjectImage', 'project_id');
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
