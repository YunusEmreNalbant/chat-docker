<?php

namespace App\Listeners;

use App\Events\NewMessage;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;

class NewMessageListener
{


    /**
     * Handle the event.
     *
     * @param NewMessage $newMessage
     * @return void
     */
    public function handle(NewMessage $newMessage)
    {
        $messageInfo = new \stdClass();
        $messageInfo->from = Auth::user()->id;
        $messageInfo->message = $newMessage->message;

        Redis::rpush($newMessage->channel_name, $messageInfo);
        //return Redis::lrange('messages', 0, -1);

    }
}
