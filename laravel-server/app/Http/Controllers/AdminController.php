<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;

class AdminController extends Controller
{
    //Add Category
    public function addCategory(Request $request){
        $category = new Category;

        $category->name = $request->name;
        $category->save();

        return response()->json([
            "status" => "Success",
        ], 200);

    }

    //Add Product
    public function addProduct(Request $request){
        $product = new Product;

        $product->name = $request->name;
        $product->price = $request->price;
        $product->category_id = $request->category_id;
        $product->save();

        return response()->json([
            "status" => "Success",
        ], 200);

    }
}
