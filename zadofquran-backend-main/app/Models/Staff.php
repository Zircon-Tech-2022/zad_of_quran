<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\LessonStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Staff extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'staff';

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

    public function details()
    {
        return $this->hasOne(StaffDetails::class);
    }

    public function availabilities()
    {
        return $this->hasMany(StaffAvailability::class);
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'staff_courses');
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class)->where('status', LessonStatus::CONFIRMED);
    }

    protected function email(): Attribute
    {
        return Attribute::get(function ($value) {
            return $value ?: $this->details?->email;
        });
    }
}
