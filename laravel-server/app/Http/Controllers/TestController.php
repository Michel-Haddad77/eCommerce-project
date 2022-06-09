<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\User;

class TestController extends Controller
{

/****This controller was only created for testing relationships, please ignore****/

    //testing 1 to many relationship
    function test(){
        return Category::find(1)->products; //returns all products with category id=1
    }

    //testing 1 to many relationship
    function test2(){
        return User::find(1)->favoritedProducts; //returns all products that user (id=1) has favorited
    }
}
