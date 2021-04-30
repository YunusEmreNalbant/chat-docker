<?php

use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Auth::routes();
Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/a', function () {

   return Redis::lrange('asdasd',0,-1);
});
Route::get('/home', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('friends', [\App\Http\Controllers\UserController::class, 'getFriends'])->name('get.Friends');
Route::post('send-messages', [\App\Http\Controllers\ChatController::class, 'sendMessage'])->name('send.message');
Route::post('get-messages', [\App\Http\Controllers\ChatController::class, 'getMessages'])->name('get.message');
