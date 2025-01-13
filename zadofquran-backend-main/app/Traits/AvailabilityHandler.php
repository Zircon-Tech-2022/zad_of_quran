<?php

namespace App\Traits;

trait AvailabilityHandler
{
  public function storeAvailabilities($availabilities, $staff, $fromScratch = false)
  {
    if ($fromScratch) {
      $staff->availabilities()->delete();
    }
    foreach ($availabilities as $item) {
      $staff->availabilities()->create([ // keys order is manadatory due to setters
        'day' => $item['day'],
        'timezone_offset' => $item['timezone'],
        'start_time' => $item['start_time'],
        'end_time' => $item['end_time'],
      ]);
    }
  }

  public function getAvailabilities($availabilities)
  {
    $availabilities = $availabilities->map(function ($availability) {
      $times = $availability->getTimesInZones();
      return [
        'days' => $times['days'],
        'start_times' => $times['start_times'],
        'end_times' => $times['end_times'],
      ];
    });

    return $availabilities;
  }
}
