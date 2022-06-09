<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class AdminController extends Controller
{
    public function addCategory(Request $request){
        $category = new Category;

        $category->name = $request->name;
        $category->save();

        return response()->json([
            "status" => "Success",
        ], 200);

    }
}
