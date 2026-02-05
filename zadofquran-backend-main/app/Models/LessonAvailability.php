<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class LessonAvailability extends Model
{
    use HasFactory;

    protected $table = 'lesson_availabilities';
    protected $guarded = [];

    protected $casts = [
        'day_of_week' => 'integer',
     ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}
