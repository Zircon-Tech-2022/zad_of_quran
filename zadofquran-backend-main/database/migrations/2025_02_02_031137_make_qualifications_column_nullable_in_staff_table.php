<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('staff', function (Blueprint $table) {
            $table->text('qualifications')->nullable()->change();
            $table->string('name')->nullable()->change();
            $table->string('email')->nullable()->change();
        });

        $indexExists = DB::selectOne("
            SELECT 1
            FROM information_schema.statistics
            WHERE table_schema = DATABASE()
            AND table_name = 'staff'
            AND index_name = 'staff_email_unique'
            LIMIT 1
        ");

        if (! $indexExists) {
            Schema::table('staff', function (Blueprint $table) {
                $table->unique('email', 'staff_email_unique');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('staff', function (Blueprint $table) {
            $table->text('qualifications')->nullable(false)->change();
            $table->string('name')->nullable(false)->change();
            $table->dropUnique(['email']);
        });
    }
};
