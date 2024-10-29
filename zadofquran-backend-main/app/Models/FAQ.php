<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FAQ extends Model
{
    use HasFactory, SoftDeletes;

    protected static function boot()
    {
        parent::boot();

        static::creating(fn($FAQ) => self::editActiveAndLocale($FAQ));
        static::updating(fn($FAQ) => self::editActiveAndLocale($FAQ));

        static::creating(fn($FAQ) => self::setlocale($FAQ));
        static::updating(fn($FAQ) => self::setlocale($FAQ));
    }

    private static function editActiveAndLocale($FAQ)
    {
        $FAQ->is_active = is_null($FAQ->is_active) ? true : $FAQ->is_active;
    }

    private static function setlocale($FAQ)
    {
        $FAQ->locale = $FAQ->locale ?? app()->getLocale();
    }

    protected $table = 'FAQs';

    protected $guarded = [];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeSearch($query, $q)
    {
        return $query->where('question', 'like', "%$q%")
            ->orWhere('answer', 'like', "%$q%")
            ->orWhere('locale', 'like', "%$q%");
    }
}
