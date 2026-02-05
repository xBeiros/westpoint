<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Spatie\YamlFrontMatter\YamlFrontMatter;
use League\CommonMark\CommonMarkConverter;

class WikiService
{
    protected string $basePath = 'resources/wiki';

    public function all()
    {
        $files = File::allFiles(base_path($this->basePath));

        return collect($files)->map(function ($file) {
            $document = YamlFrontMatter::parseFile($file->getPathname());
            $markdown = $document->body();
            $html = (new CommonMarkConverter())->convert($markdown);

            return [
                'slug' => str_replace('.md', '', $file->getRelativePathname()),
                'title' => $document->title ?? ucfirst(basename($file->getFilename(), '.md')),
                'tags' => $document->tags ?? [],
                'description' => $document->description ?? null,
                'content' => $html->getContent(),
                'raw' => $markdown,
            ];
        });
    }

    public function find(string $slug)
    {
        $path = base_path("{$this->basePath}/{$slug}.md");

        if (!File::exists($path)) {
            abort(404);
        }

        $document = YamlFrontMatter::parseFile($path);
        $html = (new CommonMarkConverter())->convert($document->body());

        return [
            'slug' => $slug,
            'title' => $document->title ?? ucfirst(basename($slug)),
            'tags' => $document->tags ?? [],
            'description' => $document->description ?? null,
            'content' => $html->getContent(),
        ];
    }
}


