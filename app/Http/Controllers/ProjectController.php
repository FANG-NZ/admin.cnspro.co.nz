<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Function is to handle index
     * @return view object
     */
    public function index(){

        //To load all NEW project
        $projects = Project::get()->sortByDesc("created_at")->values();

        return view("newprojects")->with(['projects' => $projects->toJson()]);
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

        if(!$project){
            return response(['message' => "Project not found"], 404);
        }

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

        if(!$project){
            return response(['message' => "Project not found"], 404);
        }

        $project->delete();

        return response(['id' => $project->id], 200);
    }


    /**
     * Function is to handle uplaod image for PROJECT
     */
    public function doUploadImage(Request $request, $id){

        $project = Project::findOrFail($id);

        if(!$project){
            return response(['message' => "Project not found"], 404);
        }

        $request->validate([
            'image'     =>  'required|image|mimes:jpeg,png,jpg,gif|max:3072'
        ]);


        $filename = $request->file("image")->getClientOriginalName();
        $ext = $request->file("image")->extension();
        
    
        $path = Storage::putFile(
            'public/projects',
            $request->file("image")
        );
        
        $url = Storage::url($path);
        
        //To create project image object
        $projectImage = new ProjectImage();
        
        $projectImage->name = $filename;
        $projectImage->url = $url;
        $projectImage->project_id = (int)$id;

        $projectImage->save();

        return response($projectImage->toJson(), 200);
    }


    /**
     * Function is to handle remove image from project
     */
    public function doDeleteImage(Request $request, $id){
        $project = Project::findOrFail($id);

        if(!$project){
            return response(['message' => "Project not found"], 404);
        }

        $request->validate([
            'image_id'     =>  'required|numeric'
        ]);

        $projectImage = ProjectImage::where([
            ['id', '=', $request->input('image_id')],
            ['project_id', '=', $id]
        ])->first();

        if(!$projectImage){
            return response(['message' => "Image not found"], 404);
        }

        return response($projectImage->toJson(), 200);
    }
}
