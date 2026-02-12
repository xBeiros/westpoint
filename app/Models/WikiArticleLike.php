<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WikiArticleLike extends Model
{
    protected $fillable = [
        'wiki_article_id',
        'user_id',
    ];

    public function article()
    {
        return $this->belongsTo(WikiArticle::class, 'wiki_article_id');
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
