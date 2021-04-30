<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
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

        event(new NewMessage($message, $channel_name));

    }

    public function getMessages(Request $request)
    {
        $channel_name = $request->channel_name;

        return Redis::lrange($channel_name, 0, -1);

    }

}
