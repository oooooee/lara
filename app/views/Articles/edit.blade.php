<h1>Editing Article</h1>

@include('Articles.notifications')

{{ Form::open(array('route' => array('articles.update', $article->id), 'method' => 'put')) }}
<p>
    {{ Form::text('title', $article->title) }}
</p>
<p>
    {{ Form::text('text', $article->text) }}
</p>
<p>
    {{ Form::submit('submit') }}
</p>
{{ Form::close() }}

{{ link_to_route('articles.index', 'Back') }}