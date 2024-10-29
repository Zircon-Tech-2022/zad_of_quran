<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Course extends Model
{
    use HasFactory, SoftDeletes;

    protected static function boot()
    {
        parent::boot();

        static::creating(fn($course) => self::uploadImage($course));
        static::updating(fn($course) => self::uploadImage($course));

        static::creating(fn($course) => self::setlocale($course));
        static::updating(fn($course) => self::setlocale($course));

        static::forceDeleted(fn($course) => deleteFile($course->image));
    }

    private static function uploadImage($course)
    {
        $course->image = uploadFile('image', 'courses', $course->getOriginal('image'), asset('assets/course.png'));
    }

    private static function setlocale($course)
    {
        $course->locale = $course->locale ?? app()->getLocale();
    }

    protected $guarded = [];

    public function scopeSearch($query, $q)
    {
        return $query->where('name', 'like', "%$q%")
            ->orWhere('description', 'like', "%$q%");
    }
}
