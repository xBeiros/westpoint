<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::published()
            ->orderBy('published_at', 'desc')
            ->get();

        return Inertia::render('News/Index', [
            'news' => $news
        ]);
    }

    public function show($slug)
    {
        $article = News::published()
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('News/Show', [
            'article' => $article
        ]);
    }
}


