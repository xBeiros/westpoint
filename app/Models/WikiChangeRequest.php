<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WikiChangeRequest extends Model
{
    protected $fillable = [
        'wiki_article_id',
        'request_type',
        'title',
        'slug',
        'description',
        'content',
        'raw_content',
        'tags',
        'category',
        'requester_discord_id',
        'requester_name',
        'status',
        'reviewer_discord_id',
        'reviewer_name',
        'review_notes',
        'reviewed_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'reviewed_at' => 'datetime',
    ];

    public function article()
    {
        return $this->belongsTo(WikiArticle::class, 'wiki_article_id');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }
}
