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
        Schema::create('subscribers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('plan_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('name')->nullable();
            $table->string('email');
            $table->decimal('age');
            $table->enum('gender', ['male', 'female']);
            $table->integer('persons_count');
            $table->string('phone')->nullable();
            $table->text('appointments');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscribers');
    }
};
