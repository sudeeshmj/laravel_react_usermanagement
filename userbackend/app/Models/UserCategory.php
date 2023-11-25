<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCategory extends Model
{
    use HasFactory;
    protected $table="usercategories";
    protected $fillable= ['user_id','category_id'];

    public function categories()
{
    return $this->belongsToMany(Category::class, 'category_id', 'id');
}

// Category model
public function users()
{
    return $this->belongsToMany(User::class,  'user_id', 'id');
}
}
