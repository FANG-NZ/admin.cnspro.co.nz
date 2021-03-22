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
        $projects = Project::where('is_new', false)->get();
        //$projects = Project::all();

        return view("newproject")->with(['projects' => $projects->toJson()]);
    }


    /**
     * Function is to handle add project request
     */
    public function doAdd(Request $request){
        $request->headers->set('Accept', 'application/json');

        $request->validate([
            'street' => "required | max:255",
            'city' => "required | max:255"
        ]);

        $data = $request->all();

        $project = Project::find(1);
        // $catalog = new FFMCatalog();
        // $catalog->id = time();
        // $catalog->name = $data['name'];

        return response($project->toJson(), 200);
    }


    /**
     * Function is to handle do update request
     */
    public function doUpdate(Request $request, $id){
        $request->headers->set('Accept', 'application/json');

        $project = Project::findOrFail($id);

        $request->validate([
            'street' => "required | max:255",
            'city' => "required | max:255"
        ]);

        $data = $request->all();

        $project->street = $data['street'];
        $project->title = "TESTING for update project request [{$id}]";

        return response($project->toJson(), 200);
    }

    /**
     * Function is to handle do delete
     */
    public function doDelete(Request $request, $id){
        $request->headers->set('Accept', 'application/json');

        $project = Project::findOrFail($id);

        return response(json_encode(['id' => $project->id]), 200);
    }
}
