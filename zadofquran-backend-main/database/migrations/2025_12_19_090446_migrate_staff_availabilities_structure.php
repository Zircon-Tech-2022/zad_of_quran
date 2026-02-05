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
        Schema::table('staff_availabilities', function (Blueprint $table) {
            if (! Schema::hasColumn('staff_availabilities', 'day_of_week')) {
                $table->tinyInteger('day_of_week')->nullable()->after('staff_id');
            }

            if (! Schema::hasColumn('staff_availabilities', 'timezone')) {
                $table->string('timezone', 64)->nullable()->after('end_time');
            }
        });

        $dayMap = [
            'sunday'    => 0,
            'monday'    => 1,
            'tuesday'   => 2,
            'wednesday' => 3,
            'thursday'  => 4,
            'friday'    => 5,
            'saturday'  => 6,
        ];

        $timezoneMap = [
            'GMT+2' => 'Africa/Cairo',
            'GMT+3' => 'Asia/Riyadh',
        ];

        DB::table('staff_availabilities')
            ->orderBy('id')
            ->chunk(100, function ($rows) use ($dayMap, $timezoneMap) {
                foreach ($rows as $row) {
                    if (isset($row->timezone_offset)) {
                        $ianaTimezone = $timezoneMap[$row->timezone_offset] ?? 'UTC';
                        $tz = new CarbonTimeZone($ianaTimezone);

                        $startUtc = Carbon::createFromFormat('H:i:s', $row->start_time, $tz)
                            ->utc()
                            ->format('H:i:s');

                        $endUtc = Carbon::createFromFormat('H:i:s', $row->end_time, $tz)
                            ->utc()
                            ->format('H:i:s');

                        DB::table('staff_availabilities')
                            ->where('id', $row->id)
                            ->update([
                                'day_of_week' => $dayMap[$row->day],
                                'start_time'  => $startUtc,
                                'end_time'    => $endUtc,
                                'timezone'    => $ianaTimezone,
                            ]);
                    }
                }
            });

        Schema::table('staff_availabilities', function (Blueprint $table) {
            if (Schema::hasColumn('staff_availabilities', 'day')) {
                $table->dropColumn(['day']);
            }
            if (Schema::hasColumn('staff_availabilities', 'timezone_offset')) {
                $table->dropColumn(['timezone_offset']);
            }
        });

        $indexExists = DB::selectOne("
            SELECT 1
            FROM information_schema.statistics
            WHERE table_schema = DATABASE()
            AND table_name = 'staff_availabilities'
            AND index_name = 'staff_availabilities_staff_id_day_of_week_index'
            LIMIT 1
        ");

        if (! $indexExists) {
            Schema::table('staff_availabilities', function (Blueprint $table) {
                $table->index(['staff_id', 'day_of_week']);
            });
        }
    }

    public function down(): void
    {
        Schema::table('staff_availabilities', function (Blueprint $table) {
            $table->enum('day', [
                'sunday',
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday'
            ])->nullable();

            $table->string('timezone_offset')->nullable();

            $table->dropIndex(['staff_id', 'day_of_week']);
            $table->dropColumn(['day_of_week', 'timezone']);
        });
    }
};
