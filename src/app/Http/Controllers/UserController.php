<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function chat(){
        return view('welcome');
    }

    public function getFriends(){
        return \App\Http\Resources\UserWithoutFriendResource::collection(\Illuminate\Support\Facades\Auth::user()->getFriends());
    }
}
