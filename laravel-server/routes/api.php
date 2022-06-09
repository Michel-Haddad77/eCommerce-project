<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;
//use App\Http\Controllers\TestController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductController;

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

//test
//Route::get('/category', [TestController::class, 'test2']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api'], function($router) {
    Route::post('/register', [JWTController::class, 'register']);
    Route::post('/login', [JWTController::class, 'login']);
    Route::post('/logout', [JWTController::class, 'logout']);
    Route::post('/refresh', [JWTController::class, 'refresh']);
    Route::post('/profile', [JWTController::class, 'profile']);
});


/* Route::group(['prefix' => 'admin'], function(){
    Route::group(['middleware' => 'role.resto'], function(){
        Route::get('/', [AdminController::class, 'getAllSalaries']);
        Route::get('/salaries', [AdminController::class, 'getAllSalaries']);
    });
}); */


//admin routes
Route::controller(AdminController::class)->group(function (){
    Route::post('/add_category', 'addCategory');
    Route::post('/add_product', 'addProduct');
    Route::get('/all_categories', 'getAllCategories');
});

//Product routes
Route::controller(ProductController::class)->group(function (){
    Route::get('/all_products/{id?}', 'getAllProducts');
    Route::get('/add_favorite/{user_id}/{product_id}', 'addFavorite');
});
