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
        Schema::create('wiki_articles', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->longText('content'); // HTML content from editor
            $table->longText('raw_content')->nullable(); // Raw content for editing
            $table->json('tags')->nullable();
            $table->string('category')->default('general');
            $table->string('author_discord_id')->nullable();
            $table->string('author_name')->nullable();
            $table->boolean('published')->default(true);
            $table->integer('views')->default(0);
            $table->integer('order')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wiki_articles');
    }
};
