<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int)$user->id === (int)$id;
});
Broadcast::channel('App.Models.Chat.{channel}', function ($user, $channel) {
    $friend = \App\Models\Friend::where('channel_name', $channel)->firstOrFail();
    return $friend->inviter_id == $user->id || $friend->receiver_id == $user->id;
});
