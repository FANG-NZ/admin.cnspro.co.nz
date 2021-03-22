<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/login', [LoginController::class, "index"])->name("login");
Route::post('/login', [LoginController::class, "doLogin"])->name("dologin");
Route::post('/logout', [LoginController::class, "doLogout"])->name("dologout");

Route::middleware(['auth:admin'])->group(function(){

    Route::get("/", function(){
        return redirect('/dashboard');
    });

    Route::get('/dashboard', [DashboardController::class, "index"])->name("dashboard");
    Route::get('/projects', [ProjectController::class, "index"])->name("projects");

    Route::post('/projects/add', [ProjectController::class, "addProject"]);

});

