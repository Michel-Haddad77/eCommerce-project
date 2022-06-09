<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    //testing 1 to many relationship
    function test(){
        return Category::find(1)->products; //returns all products with category id=1
    }
}
