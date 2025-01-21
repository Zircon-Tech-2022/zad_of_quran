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

    protected $hidden = ['is_active'];

    // Conditionally make 'is_active' visible based on select query
    public function makeVisible($attributes)
    {
        if (in_array('is_active', $attributes)) {
            $this->hidden = array_diff($this->hidden, ['is_active']);
        }

        return parent::makeVisible($attributes);
    }

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
