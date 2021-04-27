<?php

use Illuminate\Support\Facades\Route;


Route::get('/', [\App\Http\Controllers\MainController::class, 'index']);
Route::post('/', [\App\Http\Controllers\MainController::class, 'store'])->name('save');

Route::get('/redis', function () {
    // \Illuminate\Support\Facades\Redis::set('test',"yunus");
    //return \Illuminate\Support\Facades\Redis::get('test');

    $message = new stdClass();
    $message->room_id = 1;
    $message->text = "selamun aleykum";
    event(new \App\Events\NewMessage($message));

});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
