<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\WikiService;
use Inertia\Inertia;

class WikiController extends Controller
{
    public function index(WikiService $wiki)
    {
        $articles = $wiki->all();
        return Inertia::render('Wiki/Index', [
            'articles' => $articles,
        ]);
    }

    public function show(WikiService $wiki, string $slug)
    {
        $article = $wiki->find($slug);
        return Inertia::render('Wiki/Show', [
            'article' => $article,
        ]);
    }

    public function search(Request $request, WikiService $wiki)
    {
        $query = strtolower($request->get('q'));
        $results = $wiki->all()->filter(function ($article) use ($query) {
            return str_contains(strtolower($article['title']), $query)
                || str_contains(strtolower($article['raw']), $query)
                || collect($article['tags'])->contains(fn($tag) => str_contains(strtolower($tag), $query));
        });

        return Inertia::render('Wiki/Search', [
            'query' => $query,
            'results' => $results->values(),
        ]);
    }
}


