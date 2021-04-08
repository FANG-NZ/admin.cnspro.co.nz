<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'url',
        'project_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    protected $table = "project_images";
}
