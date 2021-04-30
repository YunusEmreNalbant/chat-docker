<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Auth::routes();
Route::get('/',[\App\Http\Controllers\HomeController::class,'index'])->name('home');
Route::get('/home',[\App\Http\Controllers\HomeController::class,'index'])->name('home');
Route::get('friends',[\App\Http\Controllers\UserController::class,'getFriends'])->name('get.Friends');
