<?php

namespace App\Models;

use App\Traits\TimeParser;
use Illuminate\Database\Eloquent\Model;

class StaffAvailability extends Model
{
    use TimeParser;

    protected $table = 'staff_availabilities';
    protected $guarded = [];

    public function getTimesInZones()
    {
        $startTime = $this->getGmtTime($this->start_time, 'GMT');
        $endTime = $this->getGmtTime($this->end_time, 'GMT');
        $localDay = $this->day;

        $timeZones = [
            'gmt' => 'GMT',
            'eg' => 'Africa/Cairo',          // Egypt time
            'sa' => 'Asia/Riyadh',          // Saudi Arabia time
            'local' => $this->timezone_offset, // Local timezone offset in DB
        ];

        $days = [];
        $startTimes = [];
        $endTimes = [];
        foreach ($timeZones as $key => $zone) {
            $zoneStartTime = $startTime->copy()->tz($zone);
            $zoneEndTime = $endTime->copy()->tz($zone);

            $days[$key] = $this->adjustDay($startTime, $zoneStartTime, $localDay);
            $startTimes[$key] = $zoneStartTime->format('H:i');
            $endTimes[$key] = $zoneEndTime->format('H:i');
        }

        return [
            'days' => $days,
            'start_times' => $startTimes,
            'end_times' => $endTimes,
        ];
    }
}
