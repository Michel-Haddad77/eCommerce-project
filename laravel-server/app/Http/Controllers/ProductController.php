<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Favorite;
use App\Models\User;

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

    //Add to favorites
    public function addFavorite(Request $request){
        $favorited = Favorite::where('user_id',$request->user_id)->where('product_id',$request->product_id)->first();

        if($favorited){
            return response()->json([
                "status" => "Already a Favorite",
            ], 200); 
        }

        $favorited = new Favorite;


        $favorited->user_id = $request->user_id;
        $favorited->product_id = $request->product_id;
        $favorited->save();

        return response()->json([
            "status" => "Success",
        ], 200);
    }

    //remove favorite
    public function removeFavorite(Request $request){
        Favorite::where('user_id',$request->user_id)->where('product_id',$request->product_id)->delete();

        return response()->json([
            "status" => "Success",
        ], 200);
    }

    //get all favorites of a single user
    public function getFavorites($id){
        $user = User::find($id);
        $favorites = $user->favoritedProducts;

        foreach($favorites as $favorite){
            $cat = Category::find($favorite->category_id);
            $favorite->category = $cat->name;
        }

        return response()->json([
            "status" => "Success",
            "data" => $favorites
        ], 200);
    }

}
