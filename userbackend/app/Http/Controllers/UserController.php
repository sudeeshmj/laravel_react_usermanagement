<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function register(Request $request){
        
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    

        $user = new User();
        $user->name =$request->input('name');
        $user->email =$request->input('email');
        $user->password = bcrypt($request->input('password'));
        $user->role = 0;
        $user->save();
        return response()->json(['user' => $user], 201);
    }


    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
           

            return response()->json(['user' => $user], 200);
        }

        return response()->json(['error' => 'Email or Password is incorrect'], 401);
    }

    public function getUser($id)
    {
       $user = User::find($id);

        if ($user) {
            return response()->json(['user' => $user], 200);     
        }
        else{
            return response()->json(['error' => 'User Not found'], 401); 
        }   
    }

    public function updateUser(Request $request, $id){
       

        $user =  User::find($id);
        if($user){
            $user->name = $request->input('name');
            if($request->hasFile('image')){
                $path='img/'. $user->image;

                if(File::exists($path)){
                    File::delete($path);
                }
                $file = $request->file('image');
                $extension = $file->extension();
                $fileName = 'user'.time().'.'. $extension;
                $file->move('img/', $fileName );
                $user->image= $fileName ;
            }
            $user->update();
            return response()->json(['user' => $user], 200);  
        }else{
            return response()->json(['error' => 'User Not found'], 401); 
        } 
    }


    public function getAllUsers(){
        $user =  User::with('categories')->where('role',0)->get();
        return response()->json(['user' => $user], 200); 
    }

}
