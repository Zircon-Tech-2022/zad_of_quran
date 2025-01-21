<?php

namespace App\Traits;

use Carbon\Carbon;

trait AvailabilityHandler
{
  public function storeAvailabilities($availabilities, $model, $fromScratch = false)
  {
    if ($fromScratch) {
      $model->availabilities()->delete();
    }
    foreach ($availabilities as $item) {
      $model->availabilities()->create([ // keys order is manadatory due to setters
        'day' => $item['day'],
        'timezone_offset' => $item['timezone'],
        'start_time' => $item['start_time'],
        'end_time' => $item['end_time'],
      ]);
    }
  }

  public function getAvailabilities($availabilities, $timezone = null)
  {
    $availabilities = $availabilities->map(function ($availability) use ($timezone) {
      $times = $availability->getTimesInZones($timezone);
      return [
        'days' => $times['days'],
        'start_times' => $times['start_times'],
        'end_times' => $times['end_times'],
      ];
    });

    return $availabilities;
  }

  public function getNetAvailabilities($availabilities, $lessonAvailabilities)
  {
    $netAvailabilities = [];

    foreach ($availabilities as $availability) {
      $availabilityStart = Carbon::parse($availability['start_times']['gmt']);
      $availabilityEnd = Carbon::parse($availability['end_times']['gmt']);
      $day = $availability['days']['gmt'];

      // Initialize the availability as the full availability period
      $currentAvailability = [['start_time' => $availabilityStart, 'end_time' => $availabilityEnd]];

      foreach ($lessonAvailabilities as $lessonAvailability) {
        $lessonStart = Carbon::parse($lessonAvailability['start_times']['gmt']);
        $lessonEnd = Carbon::parse($lessonAvailability['end_times']['gmt']);

        // Check if the lesson day matches the availability day
        if ($lessonAvailability['days']['gmt'] === $day) {
          $updatedAvailability = [];

          foreach ($currentAvailability as $timeSlot) {
            $slotStart = $timeSlot['start_time'];
            $slotEnd = $timeSlot['end_time'];

            // Check if there is an intersection
            if ($lessonStart < $slotEnd && $lessonEnd > $slotStart) {
              // Split the availability if necessary
              if ($lessonStart > $slotStart) {
                $updatedAvailability[] = [
                  'start_time' => $slotStart,
                  'end_time' => $lessonStart
                ];
              }
              if ($lessonEnd < $slotEnd) {
                $updatedAvailability[] = [
                  'start_time' => $lessonEnd,
                  'end_time' => $slotEnd
                ];
              }
            } else {
              // If no intersection, keep the original time slot
              $updatedAvailability[] = $timeSlot;
            }
          }

          // Update the current availability with the updated slots
          $currentAvailability = $updatedAvailability;
        }
      }

      // Add the remaining availability to the net availabilities
      foreach ($currentAvailability as $slot) {
        $netAvailabilities[] = [
          'day' => $day,
          'start_time' => $slot['start_time']->toTimeString(),
          'end_time' => $slot['end_time']->toTimeString()
        ];
      }
    }

    return $netAvailabilities;
  }
}
