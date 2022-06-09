<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

class ProductController extends Controller
{
    //Get a single or all products
    public function getAllProducts($id = null){
        if($id){
            $products = Product::find($id);
            //creating a category key with the category name as value inside the product object
            $products->category = Product::find($id)->category->name;
        }else{
            $products = Product::all();
            foreach($products as $product){
                $cat = Category::find($product->category_id);
                $product->category = $cat->name;
            }
        }
        return response()->json([
            "status" => "Success",
            "data" => $products,
        ], 200);
    }
}
