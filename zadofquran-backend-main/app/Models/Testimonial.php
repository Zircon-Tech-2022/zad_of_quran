<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Testimonial extends Model
{
    use HasFactory, SoftDeletes;

    protected static function boot()
    {
        parent::boot();

        static::creating(fn($FAQ) => self::setlocale($FAQ));
        static::updating(fn($FAQ) => self::setlocale($FAQ));
    }

    private static function setlocale($FAQ)
    {
        $FAQ->locale = $FAQ->locale ?? app()->getLocale();
    }

    protected $guarded = [];

    public function scopeSearch($query, $q)
    {
        return $query->where('name', 'like', "%$q%")
            ->orWhere('content', 'like', "%$q%");
    }
}
