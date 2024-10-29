<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('monthly_sessions');
            $table->integer('weekly_sessions');
            $table->integer('session_duration');
            $table->string('type');
            $table->decimal('price', 8, 2);
            $table->string('currency')->default('ج.م');
            $table->decimal('discount', 8, 2)->nullable();
            $table->text('description')->nullable();
            $table->string('locale')->default(config('app.locale'));
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
