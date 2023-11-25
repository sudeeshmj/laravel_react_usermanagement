<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);
Route::get('userlist',[UserController::class,'getAllUsers']);
Route::get('user-data/{id}',[UserController::class,'getUser']);
Route::post('updateuser/{id}',[UserController::class,'updateUser']);


Route::post('add-categories',[CategoryController::class,'addCategories']);
Route::get('categorieslist',[CategoryController::class,'getAllCategories']);
Route::post('/save-user-category', [CategoryController::class,'saveUserCategory']);
