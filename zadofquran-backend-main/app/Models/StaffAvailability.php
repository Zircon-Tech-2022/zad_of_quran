<?php

namespace App\Models;

use App\Traits\TimeParser;
use Illuminate\Database\Eloquent\Model;

class StaffAvailability extends Model
{
    use TimeParser;

    protected $table = 'staff_availabilities';
    protected $guarded = [];
}
