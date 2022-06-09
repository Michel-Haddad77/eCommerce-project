<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    //one to many relationship between categories and products
    function products(){

        return $this->hasMany(Product::class);
    }
}