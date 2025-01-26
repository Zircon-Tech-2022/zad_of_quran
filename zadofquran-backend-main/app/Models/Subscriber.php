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

    public function lessons()
    {
        return $this->hasMany(Lesson::class)->where('is_active', true);
    }

    public function scopeSearch($query, $q)
    {
        return $query->where('subscribers.name', 'LIKE', "%$q%") // Explicitly use table name for `name`
            ->orWhere('subscribers.email', 'LIKE', "%$q%") // Explicitly use table name for `email`
            ->orWhere('subscribers.phone', 'LIKE', "%$q%") // Explicitly use table name for `phone`
            ->orWhereHas('plan', function ($planQuery) use ($q) {
                $planQuery->where('plans.name', 'like', "%$q%") // Explicitly use `plans.name`
                    ->orWhere('plans.monthly_sessions', $q)
                    ->orWhere('plans.weekly_sessions', $q)
                    ->orWhere('plans.session_duration', $q)
                    ->orWhere('plans.price', $q)
                    ->orWhere('plans.currency', 'like', "%$q%")
                    ->orWhere('plans.discount', 'like', "%$q%")
                    ->orWhere('plans.description', 'like', "%$q%");
            })
            ->orWhereHas('user', function ($userQuery) use ($q) {
                $userQuery->where('users.name', 'like', "%$q%") // Explicitly use `users.name`
                    ->orWhere('users.email', 'like', "%$q%")
                    ->orWhere('users.phone', 'like', "%$q%");
            });
    }
}
