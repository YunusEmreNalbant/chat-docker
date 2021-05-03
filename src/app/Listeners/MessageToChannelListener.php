<?php

namespace App\Listeners;

use App\Events\MessageToChannel;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;

class MessageToChannelListener
{


    /**
     * Handle the event.
     *
     * @param MessageToChannel $newMessage
     * @return void
     */
    public function handle(MessageToChannel $newMessage)
    {
        $messageInfo = new \stdClass();
        $messageInfo->from = Auth::user()->id;
        $messageInfo->message = $newMessage->message;
        Redis::rpush($newMessage->channel_name, json_encode($messageInfo));
        //return Redis::lrange('messages', 0, -1);

    }
}
