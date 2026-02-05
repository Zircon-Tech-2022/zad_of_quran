<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Carbon\CarbonTimeZone;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Add new columns if they don't exist
        Schema::table('lesson_availabilities', function (Blueprint $table) {
            if (!Schema::hasColumn('lesson_availabilities', 'day_of_week')) {
                $table->tinyInteger('day_of_week')->nullable()->after('lesson_id');
            }
            if (!Schema::hasColumn('lesson_availabilities', 'timezone')) {
                $table->string('timezone', 64)->nullable()->after('end_time');
            }
        });

        // 2. Day map
        $dayMap = [
            'sunday'    => 0,
            'monday'    => 1,
            'tuesday'   => 2,
            'wednesday' => 3,
            'thursday'  => 4,
            'friday'    => 5,
            'saturday'  => 6,
        ];

        // 3. Phone prefix to IANA timezone map
        $phoneTimezoneMap = [
            '20'   => 'Africa/Cairo',           // Egypt
            '33'   => 'Europe/Paris',           // France
            '966'  => 'Asia/Riyadh',            // Saudi Arabia
            '971'  => 'Asia/Dubai',             // UAE
            '251'  => 'Africa/Addis_Ababa',     // Ethiopia
            '212'  => 'Africa/Casablanca',      // Morocco
            '1'    => 'America/New_York',       // USA (default; adjust per state if needed)
            '968'  => 'Asia/Muscat',            // Oman
        ];

        // 4. Migrate existing data
        DB::table('lesson_availabilities')
            ->orderBy('id')
            ->chunk(100, function ($rows) use ($dayMap, $phoneTimezoneMap) {
                foreach ($rows as $row) {
                    // Fetch subscriber phone for this lesson
                    $subscriber = DB::table('lessons')
                        ->join('subscribers', 'lessons.subscriber_id', '=', 'subscribers.id')
                        ->where('lessons.id', $row->lesson_id)
                        ->select('subscribers.phone')
                        ->first();

                    // Determine IANA timezone
                    $ianaTimezone = 'UTC';
                    if ($subscriber && $subscriber->phone) {
                        foreach ($phoneTimezoneMap as $prefix => $tz) {
                            if (str_starts_with($subscriber->phone, '+' . $prefix)) {
                                $ianaTimezone = $tz;
                                break;
                            }
                        }
                    }

                    // Convert times to UTC
                    $tz = new CarbonTimeZone($ianaTimezone);
                    $startUtc = Carbon::createFromFormat('H:i:s', $row->start_time, $tz)
                        ->utc()
                        ->format('H:i:s');
                    $endUtc = Carbon::createFromFormat('H:i:s', $row->end_time, $tz)
                        ->utc()
                        ->format('H:i:s');

                    // Update row
                    DB::table('lesson_availabilities')
                        ->where('id', $row->id)
                        ->update([
                            'day_of_week' => $dayMap[$row->day] ?? null,
                            'start_time'  => $startUtc,
                            'end_time'    => $endUtc,
                            'timezone'    => $ianaTimezone,
                        ]);
                }
            });

        // 5. Drop old columns if exist
        Schema::table('lesson_availabilities', function (Blueprint $table) {
            if (Schema::hasColumn('lesson_availabilities', 'day')) {
                $table->dropColumn('day');
            }
            if (Schema::hasColumn('lesson_availabilities', 'timezone_offset')) {
                $table->dropColumn('timezone_offset');
            }
        });

        // 6. Add index safely
        $indexExists = DB::selectOne("
            SELECT 1
            FROM information_schema.statistics
            WHERE table_schema = DATABASE()
              AND table_name = 'lesson_availabilities'
              AND index_name = 'lesson_availabilities_lesson_id_day_of_week_index'
            LIMIT 1
        ");

        if (! $indexExists) {
            Schema::table('lesson_availabilities', function (Blueprint $table) {
                $table->index(['lesson_id', 'day_of_week'], 'lesson_availabilities_lesson_id_day_of_week_index');
            });
        }
    }

    public function down(): void
    {
        Schema::table('lesson_availabilities', function (Blueprint $table) {
            if (Schema::hasColumn('lesson_availabilities', 'day_of_week')) {
                $table->dropColumn('day_of_week');
            }
            if (Schema::hasColumn('lesson_availabilities', 'timezone')) {
                $table->dropColumn('timezone');
            }

            $table->enum('day', ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'])->nullable();
            $table->string('timezone_offset')->default('GMT+2');

            $table->dropIndex('lesson_availabilities_lesson_id_day_of_week_index');
        });
    }
};
