<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Function is to handle index
     * @return view object
     */
    public function index(){

        //To load all NEW project
        $projects = Project::get()->sortByDesc("created_at")->values();

        //return view("newprojects")->with(['projects' => $projects->toJson()]);
        return view("projects")->with(['projects' => $projects->toJson()]);
    }


    /**
     * Function is to handle add project request
     */
    public function doAdd(Request $request){
        $request->validate([
            'street' => "required | max:255",
            'city' => "required | max:255"
        ]);

        $data = $request->all();

        //To create new project
        $project = Project::create($data);
        
        return response($project->toJson(), 200);
    }


    /**
     * Function is to handle do update request
     */
    public function doUpdate(Request $request, $id){
        $project = Project::findOrFail($id);

        $request->validate([
            'street' => "required | max:255",
            'city' => "required | max:255"
        ]);

        $data = $request->all();
        //call update method
        $project->update($data);

        return response($project->toJson(), 200);
    }

    /**
     * Function is to handle do delete
     */
    public function doDelete(Request $request, $id){
        $project = Project::findOrFail($id);

        $project->delete();

        return response(['id' => $project->id], 200);
    }


    /**
     * Function is to handle uplaod image for PROJECT
     */
    public function doUploadImage(Request $request, $id){
        $project = Project::findOrFail($id);


        $request->validate([
            'image'     =>  'required|image|mimes:jpeg,png,jpg,gif|max:3072'
        ]);

        //call method to upload image
        $projectImage = $project->uploadImage($request->file('image'));

        return response($projectImage->toJson(), 200);
    }


    /**
     * Function is to handle remove image from project
     */
    public function doDeleteImage(Request $request, $id){
        $project = Project::findOrFail($id);

        $request->validate([
            'image_id'     =>  'required|numeric'
        ]);

        
        $projectImage = $project->deleteImage($request->input('image_id'));

        if(!$projectImage){
            return response(['message' => "Delete image error"], 404);
        }

        return response($projectImage->toJson(), 200);
    }
}
