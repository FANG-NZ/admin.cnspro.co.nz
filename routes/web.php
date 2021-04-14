<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SettingsController;

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

Route::get('/login', [LoginController::class, "index"])->name("page_login");
Route::post('/login', [LoginController::class, "doLogin"])->name("page_login.dologin");
Route::post('/logout', [LoginController::class, "doLogout"])->name("page_login.dologout");

Route::middleware(['auth:admin'])->group(function(){

    Route::get("/", function(){
        return redirect('/dashboard');
    });

    Route::get('/dashboard', [DashboardController::class, "index"])->name("page_dashboard");
    Route::get('/projects', [ProjectController::class, "index"])->name("page_projects");
    Route::get('/settings', [SettingsController::class, "index"])->name("page_settings");
    Route::put('/settings/update', [SettingsController::class, 'doUpdate'])->name("page_settings.update");

    //To setup json response middleware
    Route::middleware(['json.response'])->group(function(){

        Route::post('/projects/add', [ProjectController::class, "doAdd"]);
        Route::delete('/projects/delete/{id}', [ProjectController::class, "doDelete"]);
        Route::put('/projects/update/{id}', [ProjectController::class, "doUpdate"]);
        Route::post('/projects/upload/{id}', [ProjectController::class, "doUploadImage"]);
        Route::delete('/projects/delete/{id}', [ProjectController::class, "doDeleteImage"]);
    });
});


