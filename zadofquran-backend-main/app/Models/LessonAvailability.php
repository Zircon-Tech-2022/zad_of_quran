<?php

namespace App\Models;

use App\Traits\TimeParser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonAvailability extends Model
{
    use HasFactory, TimeParser;

    protected $table = 'lesson_availabilities';
    protected $guarded = [];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}
