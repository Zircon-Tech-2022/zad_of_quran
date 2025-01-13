<?php

namespace App\Traits;

use Carbon\Carbon;

trait TimeParser
{
  public $days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  public function getGmtTime($value, $timezone)
  {
    return Carbon::parse($value, $timezone)->tz('GMT');
  }

  public function getLocalTime($value, $timezone)
  {
    return Carbon::parse($value, $timezone);
  }

  public function getLocalTimeFromGmt($value, $timezone)
  {
    return Carbon::parse($value, 'GMT')->tz($timezone);
  }

  public function getDayIndex($day)
  {
    return array_search(strtolower($day), $this->days);
  }

  public function adjustDay($localTime, $zoneTime, $localDay)
  {
    $dayIndex = $this->getDayIndex($localDay);

    $hourDiff = $zoneTime->hour - $localTime->hour;

    if ($hourDiff > 12) {
      $dayIndex = ($dayIndex - 1 + 7) % 7;
    } elseif ($hourDiff < -12) {
      $dayIndex = ($dayIndex + 1) % 7;
    }

    return $this->days[$dayIndex];
  }

  public function reformAvailabilities($availabilities)
  {
    $updated = [];
    foreach ($availabilities as $availability) {
      $startTime = $this->getGmtTime($availability['start_time'], $availability['timezone']);
      $endTime = $this->getGmtTime($availability['end_time'],  $availability['timezone']);
      $localStartTime = $this->getLocalTime($availability['start_time'], $availability['timezone']);

      $localDay = $availability['day'];

      $day = $this->adjustDay($localStartTime, $startTime, $localDay);
      $dayIndex = $this->getDayIndex($day);

      if ($endTime->hour > $startTime->hour) {
        $updated[] = [
          "day" => $day,
          "start_time" => $startTime->format('H:i'),
          "end_time" => $endTime->format('H:i'),
          "timezone" => $availability['timezone']
        ];
      } else {
        $updated[] = [
          "day" => $day,
          "start_time" => $startTime->format('H:i'),
          "end_time" => '23:59',
          "timezone" => $availability['timezone']
        ];

        $dayIndex = ($dayIndex + 1) % 7;
        $updated[] = [
          "day" => $this->days[$dayIndex],
          "start_time" => '00:00',
          "end_time" => $endTime->format('H:i'),
          "timezone" => $availability['timezone']
        ];
      }
    }
    return $updated;
  }
}
