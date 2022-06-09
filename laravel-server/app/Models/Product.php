<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    //Create many to many relationship between products and users (favorited by)
    public function usersWhoFavorited(){

        return $this->belongsToMany(User::class, 'favorites');
    }

    
    //create an inverse one to many (belongs to) between product and category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
