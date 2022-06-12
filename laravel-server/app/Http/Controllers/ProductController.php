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
    public function toggleFavorite(Request $request){
        $favorited = Favorite::where('user_id',$request->user_id)->where('product_id',$request->product_id)->first();

        //If already a favorite, remove from favorites
        if($favorited){
            Favorite::where('user_id',$request->user_id)->where('product_id',$request->product_id)->delete();
            return response()->json([
                "status" => "Removed from favorites",
            ], 200); 
        }

        $favorited = new Favorite;


        $favorited->user_id = $request->user_id;
        $favorited->product_id = $request->product_id;
        $favorited->save();

        return response()->json([
            "status" => "Added to favorites",
        ], 200);
    }


    //get all favorites of a single user
    public function getFavorites($id){
        $user = User::find($id);
        $favorites = $user->favoritedProducts;

        //get category og each favorite
        foreach($favorites as $favorite){
            $cat = Category::find($favorite->category_id);
            $favorite->category = $cat->name;
        }

        return response()->json([
            "status" => "Success",
            "data" => $favorites
        ], 200);
    }

    //this api checks if an item is a favorite to properly display the favorite button
    public function checkFavorite(Request $request){
        $favorited = Favorite::where('user_id',$request->user_id)->where('product_id',$request->product_id)->first();

        if($favorited){
            return response()->json([
                "status" => true,
            ], 200); 
        }

        return response()->json([
            "status" => false,
        ], 200);

    }

}
