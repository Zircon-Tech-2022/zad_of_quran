<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class StaffDetails extends Model
{
    use HasFactory, HasApiTokens;

    protected $table = 'staff_details';
    protected $guarded = [];

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }
}
