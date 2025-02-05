<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lesson extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    protected $with = ['course'];

    public function scopeSearch($query, $q)
    {
        return $query->where('id', 'LIKE', "%$q%")
            ->orWhereHas('staff', function ($staffQuery) use ($q) {
                $staffQuery->where('name', 'like', "%$q%")
                    ->orWhere('email', 'like', "%$q%")
                    ->orWhere('phone', 'like', "%$q%");
            })
            ->orWhereHas('subscriber', function ($subscriberQuery) use ($q) {
                $subscriberQuery->where('name', 'like', "%$q%")
                    ->orWhere('email', 'like', "%$q%")
                    ->orWhere('phone', 'like', "%$q%")
                    ->orWhereHas('user', function ($userQuery) use ($q) {
                        $userQuery->where('name', 'like', "%$q%")
                            ->orWhere('email', 'like', "%$q%")
                            ->orWhere('phone', 'like', "%$q%");
                    });
            })
            ->orWhereHas('course', function ($courseQuery) use ($q) {
                $courseQuery->where('name', 'like', "%$q%")
                    ->orWhere('description', 'like', "%$q%");
            });
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function subscriber()
    {
        return $this->belongsTo(Subscriber::class);
    }

    public function supervisor()
    {
        return $this->belongsTo(User::class, 'supervisor_id', 'id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function availabilities()
    {
        return $this->hasMany(LessonAvailability::class);
    }
}
