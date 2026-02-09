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
        Schema::create('wiki_change_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wiki_article_id')->constrained()->onDelete('cascade');
            $table->string('request_type')->default('edit'); // 'edit', 'create', 'delete'
            $table->string('title')->nullable(); // For new articles
            $table->string('slug')->nullable(); // For new articles
            $table->text('description')->nullable();
            $table->longText('content')->nullable(); // Proposed content
            $table->longText('raw_content')->nullable();
            $table->json('tags')->nullable();
            $table->string('category')->nullable();
            $table->string('requester_discord_id');
            $table->string('requester_name');
            $table->string('status')->default('pending'); // 'pending', 'approved', 'rejected'
            $table->string('reviewer_discord_id')->nullable();
            $table->string('reviewer_name')->nullable();
            $table->text('review_notes')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wiki_change_requests');
    }
};
