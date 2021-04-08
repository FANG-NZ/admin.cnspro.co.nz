<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectImage;
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
        //$projects = Project::get()->sortBy("created_at");
        //$projects = Project::all();

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


        $projectImage = new ProjectImage();
        $projectImage->id = 100;
        $projectImage->name = "Test name";
        $projectImage->url = "https://freebw.com/templates/tatee/images/post-10.jpg";
        $projectImage->project_id = (int)$id;

        //sleep(2);

        return response($projectImage->toJson(), 200);
    }
}
