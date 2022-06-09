<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Favorite;

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

    //Get all the categories
    public function addFavorite($user_id,$product_id){
        $favorited = Favorite::where('user_id',$user_id)->where('product_id',$product_id)->first();

        if($favorited){
            return response()->json([
                "status" => "Already a Favorite",
            ], 200); 
        }

        $favorited = new Favorite;


        $favorited->user_id = $user_id;
        $favorited->product_id = $product_id;
        $favorited->save();

        return response()->json([
            "status" => "Success",
        ], 200);
    }
}
