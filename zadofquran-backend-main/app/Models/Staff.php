<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Staff extends Model
{
    use HasFactory, SoftDeletes;

    protected static function boot()
    {
        parent::boot();

        static::creating(fn($staff) => self::uploadImage($staff));
        static::updating(fn($staff) => self::uploadImage($staff));

        static::creating(fn($staff) => self::setlocale($staff));
        static::updating(fn($staff) => self::setlocale($staff));

        static::forceDeleted(fn($staff) => deleteFile($staff->image));
    }

    private static function uploadImage($staff)
    {
        $staff->image = uploadFile('image', 'staff', $staff->getOriginal('image'), asset('assets/staff.png'));
    }

    private static function setlocale($FAQ)
    {
        $FAQ->locale = $FAQ->locale ?? app()->getLocale();
    }

    protected $guarded = [];

    public function scopeSearch($query, $q)
    {
        return $query->where('name', 'like', "%$q%")
            ->orWhere('phone', 'like', "%$q%")
            ->orWhere('email', 'like', "%$q%")
            ->orWhere('qualifications', 'like', "%$q%");
    }
}
