<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\UserCategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getAllCategories(){
        $categories =  Category::all();
        return response()->json(['categories' => $categories], 200); 
    }

    public function addCategories(Request $request){
        $categories = new Category();
        $categories->name =$request->input('name');
        $categories->save();
        return response()->json(['categories' => $categories], 201);
    }


    public function saveUserCategory(Request $request){
        $userId = $request->input('userId');
        $categories = $request->input('categories');

        UserCategory::where('user_id', $userId)->delete();

        foreach ($categories as $category) {
            UserCategory::create([
                'user_id' => $userId,
                'category_id' => $category['label'], 
            ]);
        }
        return response()->json(['message' => 'User categories saved successfully'], 200);

    }

}
