<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;
use App\Http\Controllers\TestController;
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
Route::get('/test', [TestController::class, 'test2']);

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


//admin routes
Route::group(['prefix' => 'admin'], function(){
    Route::group(['middleware' => 'admin.access'], function(){
        //grouping the routes under the same controller
        Route::controller(AdminController::class)->group(function (){
            Route::post('/add_category', 'addCategory');
            Route::post('/add_product', 'addProduct');
            Route::get('/all_categories', 'getAllCategories');
        });
    });    
});

//Product routes
Route::controller(ProductController::class)->group(function (){
    Route::get('/all_products/{id?}', 'getAllProducts');
    Route::get('/get_favorites/{id}', 'getFavorites');
});

//product routes that need authorization
Route::group(['prefix' => 'user'], function(){
    Route::group(['middleware' => 'user.access'], function(){
        Route::controller(ProductController::class)->group(function (){    
            Route::post('/toggle_favorite', 'toggleFavorite');
            Route::post('/check_favorite', 'checkFavorite');
        });
    });
});

//Route for unauthorized access
Route::get('/not_found', [AdminController::class, 'notFound'])->name("not-found");