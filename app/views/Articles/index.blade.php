<h1>Listing articles</h1>

<table>
    <tr>
        <th>Title</th>
        <th>Text</th>
        <th colspan="2"></th>
    </tr>
    @foreach ($articles as $article)
    <tr>
        <td>{{ $article->title }}</td>
        <td>{{ $article->text }}</td>
        <td>{{ link_to_route('articles.show', 'Show', $article->id) }}</td>
        <td>{{ link_to_route('articles.edit', 'Edit', $article->id) }}</td>
        <td>
            {{ Form::open(array('method' => 'DELETE', 'route' => array('articles.destroy', $article->id))) }}
            {{ Form::submit('Delete') }}
            {{ Form::close() }}
        </td>
    </tr>
    @endforeach
</table>
{{ link_to_route('articles.create', 'New article') }}