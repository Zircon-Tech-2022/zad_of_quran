<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

return new class extends Migration
{
    public function up(): void
    {
        $yesterday = Carbon::yesterday()->toDateString(); // "2026-01-31"

        foreach (['lesson_availabilities', 'staff_availabilities'] as $tableName) {
            // 1. Change the column types to datetime
            Schema::table($tableName, function (Blueprint $table) {
                $table->dateTime('start_time')->change();
                $table->dateTime('end_time')->change();
            });

            // 2. Update the values to Yesterday + Original Time
            // We use COALESCE/CONCAT to prepend the date to the existing time string
            DB::table($tableName)->update([
                'start_time' => DB::raw("CONCAT('$yesterday ', TIME(start_time))"),
                'end_time'   => DB::raw("CONCAT('$yesterday ', TIME(end_time))"),
            ]);
        }
    }

    public function down(): void
    {
        foreach (['lesson_availabilities', 'staff_availabilities'] as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->time('start_time')->change();
                $table->time('end_time')->change();
            });
        }
    }
};