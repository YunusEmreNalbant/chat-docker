<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];


    public function user_invitations()
    {
        return $this->belongsToMany(User::class, 'friends', 'inviter_id', 'receiver_id')->withPivot('channel_name','updated_at','read');
    }

    public function user_recevived_invitations()
    {
        return $this->belongsToMany(User::class, 'friends', 'receiver_id', 'inviter_id')->withPivot('channel_name','updated_at','read');
    }

    public function getFriends()
    {
        $first = $this->user_invitations()
            ->orderBy('pivot_read', 'ASC')
            ->orderBy('pivot_updated_at', 'DESC')
            ->get();
        $second = $this->user_recevived_invitations()
            ->orderBy('pivot_read', 'ASC')
            ->orderBy('pivot_updated_at', 'DESC')
            ->get();
        return $first->merge($second);
    }



}
