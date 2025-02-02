<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
            $table->string('email')->unique()->change();
        });
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
