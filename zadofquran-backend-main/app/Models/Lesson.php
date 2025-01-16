<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lesson extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function subscriber()
    {
        return $this->belongsTo(Subscriber::class);
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
