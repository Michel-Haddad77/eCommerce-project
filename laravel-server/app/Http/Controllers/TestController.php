<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use App\Models\User;
use App\Models\Product;

class TestController extends Controller
{

/****This controller was only created for testing relationships, please ignore****/

    //testing 1 to many relationship
    function test(){
        return Category::find(1)->products; //returns all products with category id=1
    }

    function test2(){

        return Auth::user();
        return Product::find(1)->category; //returns all products that user (id=1) has favorited

    }

    //testing 1 to many relationship
    function test3(){
        return User::find(1)->favoritedProducts; //returns all products that user (id=1) has favorited
    }
}
