<?php

namespace App\Traits;

use Carbon\Carbon;

trait AvailabilityHandler
{
  public function storeAvailabilities(array $availabilities, $model, bool $fromScratch = false)
  {
    if ($fromScratch) {
      $model->availabilities()->delete();
    }

    $savedAvailabilities = [];

    foreach ($availabilities as $availability) {
      $intervals = $this->normalizeForSaveAndConvertToUtc($availability);

      foreach ($intervals as $interval) {
        $savedAvailabilities[] = $model->availabilities()->create([
            'day_of_week' => $interval['day_of_week'],
            'start_time'  => $interval['start_time'],
            'end_time'    => $interval['end_time'],
            'timezone'    => $interval['timezone'],
        ]);
      }
    }

    return $savedAvailabilities;
  }

  public function getAvailabilityInTimezones($availability, ?string $forcedTimezone = null): array
  {
      // Base GMT times
      $startGmt = Carbon::parse($availability['start_time'], 'UTC');
      $endGmt   = Carbon::parse($availability['end_time'], 'UTC');

      $baseDayName = \Carbon\Carbon::create()->startOfWeek()->addDays($availability['day_of_week'] - 1)->format('l');

      $timeZones = [
          'gmt'   => 'UTC',
          'eg'    => 'Africa/Cairo',
          'sa'    => 'Asia/Riyadh',
          'local' => $forcedTimezone ?? $availability['timezone'] ?? 'UTC',
      ];

      $days = [];
      $startTimes = [];
      $endTimes = [];

      foreach ($timeZones as $key => $zone) {
          $zStart = $startGmt->copy()->tz($zone);
          $zEnd   = $endGmt->copy()->tz($zone);

          // Adjust day if timezone shift crosses midnight
          $day = Carbon::parse($baseDayName, 'UTC');
          if ($zStart->dayOfWeek !== $startGmt->dayOfWeek) {
              $day = $day->addDays($zStart->dayOfWeek - $startGmt->dayOfWeek);
          }

          $days[$key] = $day->format('l');
          $startTimes[$key] = $zStart->format('H:i');
          $endTimes[$key] = $zEnd->format('H:i');
      }

      return [
          'days' => $days,
          'start_times' => $startTimes,
          'end_times' => $endTimes,
      ];
  }

  public function getAvailabilitiesInTimezones($availabilities, ?string $timezone = null)
  {
    return collect($availabilities)->map(function ($availability) use ($timezone) {
        return $this->getAvailabilityInTimezones($availability, $timezone);
    });
  }

  public function getNetAvailabilities($staff)
  {
      $staffAvailabilities = $staff->availabilities;
      $lessonAvailabilities = $staff->lessons
          ->flatMap(fn ($lesson) => $lesson->availabilities)
          ->groupBy('day_of_week');

      $net = [];

      foreach ($staffAvailabilities as $availability) {
          $day = $availability->day_of_week;

          $rawInterval = [
            'day_of_week' => $day,
            'start_time'  => Carbon::parse($availability->start_time, 'UTC'),
            'end_time'    => Carbon::parse($availability->end_time, 'UTC'),
            'timezone'    => $availability->timezone,
          ];


          // Normalize (split if crossing midnight)
          $baseIntervals = $this->normalizeInterval($rawInterval);

          foreach ($baseIntervals as $interval) {
            $intervalDay = $interval['day_of_week'];

            if (!isset($lessonAvailabilities[$intervalDay])) {
                $net[] = $interval;
                continue;
            }

            $currentIntervals = [$interval];

            foreach ($lessonAvailabilities[$intervalDay] as $lesson) {
                $busyStart = Carbon::parse($lesson->start_time, 'UTC');
                $busyEnd   = Carbon::parse($lesson->end_time, 'UTC');

                $currentIntervals = $this->subtractInterval(
                    $currentIntervals,
                    $busyStart,
                    $busyEnd
                );
            }

            $net = array_merge($net, $currentIntervals);
          }
      }

      return $net;
  }

  private function normalizeForSaveAndConvertToUtc(array $availability): array
  {
    $tz = $availability['timezone'];
    $day = (int) $availability['day']; // 0–6

    $base = Carbon::now($tz)->startOfDay();

    $tzStart = $base->clone()->next($day)->setTimeFrom($availability['start_time']);
    $tzStart = $this->setDayCorrectly($tzStart, $day, $base);
    $utcStart = $tzStart->utc();

    $tzEnd = $base->clone()->next($day)->setTimeFrom($availability['end_time']);
    $tzEnd = $this->setDayCorrectly($tzEnd, $day, $base);
    $utcEnd = $tzEnd->utc();

    $baseDate = $utcStart->clone()->startOfDay();

    // Crosses midnight → split
    if (
      $utcEnd->isNextDay($utcStart) &&
      $utcEnd->greaterThanOrEqualTo(
        $utcStart->copy()->endOfDay()->addMinutes(10)
      )
    ) {
      $start = $baseDate->copy()->setTimeFrom($utcStart);
      $nextStart = $start->copy()->addDay()->startOfDay();
      $end = $nextStart->copy()->setTimeFrom($utcEnd);

      return [
        [
            'day_of_week' => $start->dayOfWeek,
            'start_time'  => $start,
            'end_time'    => $start->clone()->endOfDay(),
            'timezone'    => $tz,
        ],
        [
            'day_of_week' => $nextStart->dayOfWeek,
            'start_time'  => $nextStart,
            'end_time'    => $end,
            'timezone'    => $tz,
        ],
      ];
    }

    // Does NOT cross midnight
    $start = $baseDate->copy()->setTimeFrom($utcStart);
    $end = $baseDate->copy()->setTimeFrom($utcEnd);

    return [[
        'day_of_week' => $start->dayOfWeek,
        'start_time'  => $start,
        'end_time'    => $end,
        'timezone'    => $tz,
    ]];
  }

  private function normalizeInterval(array $interval): array
  {
    $start = $interval['start_time'];
    $end   = $interval['end_time'];
    $day   = $interval['day_of_week'];

    // Crosses midnight → split
    if (
      $end->isNextDay($start) &&
      $end->greaterThanOrEqualTo(
        $start->copy()->endOfDay()->addMinutes(10)
      )
    ) {
        return [
            [
                'day_of_week' => $day,
                'start_time'  => $start,
                'end_time'    => $start->copy()->endOfDay(),
                'timezone'    => $interval['timezone'],
            ],
            [
                'day_of_week' => ($day + 1) % 7,
                'start_time'  => $start->copy()->startOfDay(),
                'end_time'    => $end,
                'timezone'    => $interval['timezone'],
            ],
        ];
    }

    return [$interval];
  }

  private function subtractInterval(array $intervals, Carbon $busyStart, Carbon $busyEnd): array
  {
    $result = [];

    $busyStartTime = $busyStart->format('H:i');
    $busyEndTime   = $busyEnd->format('H:i');

    foreach ($intervals as $interval) {
        $start = $interval['start_time'];
        $end = $interval['end_time'];

        $startTime = $start->format('H:i');
        $endTime = $end->format('H:i');

        // No overlap
        if ($busyEndTime <= $startTime || $busyStartTime >= $endTime) {
            $result[] = $interval;
            continue;
        }

        // Busy covers whole interval
        if ($busyStartTime <= $startTime && $busyEndTime >= $endTime) {
            continue;
        }

        // Busy cuts start
        if ($busyStartTime <= $startTime && $busyEndTime < $endTime) {
            $result[] = [
                'day_of_week' => $interval['day_of_week'],
                'start_time' => $start->copy()->setTimeFrom($busyEnd),
                'end_time' => $end,
                'timezone' => $interval['timezone'],
            ];
            continue;
        }

        // Busy cuts end
        if ($busyStartTime > $startTime && $busyEndTime >= $endTime) {
            $result[] = [
                'day_of_week' => $interval['day_of_week'],
                'start_time' => $start,
                'end_time' => $end->copy()->setTimeFrom($busyStart),
                'timezone' => $interval['timezone'],
            ];
            continue;
        }

        // Busy inside → split
        $result[] = [
            'day_of_week' => $interval['day_of_week'],
            'start_time' => $start,
            'end_time' => $start->copy()->setTimeFrom($busyStart),
            'timezone' => $interval['timezone'],
            ];
        $result[] = [
            'day_of_week' => $interval['day_of_week'],
            'start_time' => $end->copy()->setTimeFrom($busyEnd),
            'end_time' => $end,
            'timezone' => $interval['timezone'],
        ];
    }

    return $result;
  }

  private function setDayCorrectly($datetime, $day, $base)
  {
    // same day allowed
    $today = $base->dayOfWeek;

    if ($day == $today) {
        $sameDayCandidate = $datetime->clone()->previous($day)->setTimeFrom($datetime);
        // Clone base (today) and set time from $datetime
        $candidate = $base->copy()->setTimeFrom(Carbon::now($base->timezone));
        // Check if this candidate is already in the future
        $isIncoming = $sameDayCandidate->greaterThanOrEqualTo($candidate);
        if ($isIncoming) {
            return $sameDayCandidate->clone();
        }
    }
    return $datetime->clone();
  }
}
