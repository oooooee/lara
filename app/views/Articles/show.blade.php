<p>
    <strong>Title:</strong>
    {{ $article->title }}
</p>

<p>
    <strong>Text:</strong>
    {{ $article->text }}
</p>

{{ link_to_route('articles.index', 'Back') }}
{{ link_to_route('articles.edit', 'Edit', $article->id) }}