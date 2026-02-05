<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class StaffAvailability extends Model
{
    protected $table = 'staff_availabilities';
    protected $guarded = [];

    protected $casts = [
        'day_of_week' => 'integer',
    ];
}
