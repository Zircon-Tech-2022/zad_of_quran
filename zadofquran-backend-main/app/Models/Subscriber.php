<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($subscriber) {
            $subscriber->user_id = $subscriber->user_id ?? auth()->id();
        });

        // static::creating(fn($subscriber) => self::setlocale($subscriber));
        // static::updating(fn($subscriber) => self::setlocale($subscriber));
    }

    private static function setlocale($FAQ)
    {
        $FAQ->locale = $FAQ->locale ?? app()->getLocale();
    }
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function scopeSearch($query, $q)
    {
        return $query->where('name', 'LIKE', "%$q%")
            ->orWhere('email', 'LIKE', "%$q%")
            ->orWhere('phone', 'LIKE', "%$q%")
            ->orWhereHas('plan', function ($query) use ($q) {
                $query->where('name', 'like', "%$q%")
                    ->orWhere('monthly_sessions', $q)
                    ->orWhere('weekly_sessions', $q)
                    ->orWhere('session_duration', $q)
                    ->orWhere('price', $q)
                    ->orWhere('currency', 'like', "%$q%")
                    ->orWhere('discount', 'like', "%$q%")
                    ->orWhere('description', 'like', "%$q%");
            })
            ->orWhereHas('user', function ($query) use ($q) {
                $query->where('name', 'like', "%$q%")
                    ->orWhere('email', 'like', "%$q%")
                    ->orWhere('phone', 'like', "%$q%");
            });
    }
}
