<?php

namespace App\Http\Controllers;

use App\Events\MessageToChannel;
use App\Events\NewMessageEvent;
use App\Events\NewMessageToUser;
use App\Models\Friend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function sendMessage(Request $request)
    {
        $channel_name = $request->channel_name;
        $message = $request->message;
        $friend = Friend::where('channel_name', $request->channel_name)->firstOrFail();
        $isInviter = $friend->inviter_id == \auth()->id() ? true : false;
        $otherUser = $isInviter ? $friend->receiver_id : $friend->inviter_id;
        $friend->update(["read" => 0]);
        event(new NewMessageToUser($otherUser));
        event(new MessageToChannel($message, $channel_name));
    }

    public function getMessages(Request $request)
    {
        $channel_name = $request->channel_name;
        Friend::where('channel_name',$channel_name)->update(["read"=>1]);

        return Redis::lrange($channel_name, 0, -1);

    }

}
