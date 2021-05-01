<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFriendsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('friends', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inviter_id')->references('id')->on('users');//teklif eden
            $table->foreignId('receiver_id')->references('id')->on('users');//Teklifi değerlendiren
            $table->boolean('approved')->default(false);
            $table->string('channel_name')->nullable();
            $table->unique(['inviter_id', 'receiver_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('friends');
    }
}
