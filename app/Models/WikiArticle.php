<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WikiArticle extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'slug',
        'title',
        'description',
        'content',
        'raw_content',
        'tags',
        'category',
        'author_discord_id',
        'author_name',
        'published',
        'views',
        'order',
    ];

    protected $casts = [
        'tags' => 'array',
        'published' => 'boolean',
        'views' => 'integer',
        'order' => 'integer',
    ];

    public function changeRequests()
    {
        return $this->hasMany(WikiChangeRequest::class);
    }

    public function pendingChangeRequests()
    {
        return $this->hasMany(WikiChangeRequest::class)->where('status', 'pending');
    }
}
