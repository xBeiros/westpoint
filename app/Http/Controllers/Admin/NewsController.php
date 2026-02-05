<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = News::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/News/Index', [
            'news' => $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('News/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'author' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'image_path' => 'nullable|string|max:255',
            'published' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        $news = News::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'excerpt' => $request->excerpt,
            'content' => $request->content,
            'author' => $request->author,
            'category' => $request->category,
            'image_path' => $request->image_path,
            'published' => $request->published ?? false,
            'published_at' => $request->published_at ?? now(),
        ]);

        return redirect()->route('admin.news.index')
            ->with('success', 'News-Artikel erfolgreich erstellt!');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        return Inertia::render('Admin/News/Show', [
            'article' => $news
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        return Inertia::render('News/Edit', [
            'article' => $news
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'author' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'image_path' => 'nullable|string|max:255',
            'published' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        $news->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'excerpt' => $request->excerpt,
            'content' => $request->content,
            'author' => $request->author,
            'category' => $request->category,
            'image_path' => $request->image_path,
            'published' => $request->published ?? false,
            'published_at' => $request->published_at ?? now(),
        ]);

        return redirect()->route('admin.news.index')
            ->with('success', 'News-Artikel erfolgreich aktualisiert!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        $news->delete();

        return redirect()->route('admin.news.index')
            ->with('success', 'News-Artikel erfolgreich gelöscht!');
    }
}


