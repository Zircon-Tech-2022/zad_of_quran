<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Plan extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    protected $casts = [
        'monthly_sessions' => 'integer',
        'weekly_sessions' => 'integer',
        'session_duration' => 'integer',
        'price' => 'decimal:2',
        'discount' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(fn($plan) => self::setlocale($plan));
        static::updating(fn($plan) => self::setlocale($plan));
    }

    private static function setlocale($FAQ)
    {
        $FAQ->locale = $FAQ->locale ?? app()->getLocale();
    }

    public function scopeSearch($query, $q)
    {
        return $query->where('name', 'like', "%$q%")
            ->orWhere('monthly_sessions', $q)
            ->orWhere('weekly_sessions', $q)
            ->orWhere('session_duration', $q)
            ->orWhere('price', $q)
            ->orWhere('currency', 'like', "%$q%")
            ->orWhere('discount', 'like', "%$q%")
            ->orWhere('description', 'like', "%$q%");
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'subscribers', 'plan_id', 'user_id');
    }

    public function subscribers()
    {
        return $this->hasMany(Subscriber::class);
    }
}
