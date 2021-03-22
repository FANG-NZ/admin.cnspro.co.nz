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
    public function addProject(Request $request){
        dd("I'm here");
    }
}
