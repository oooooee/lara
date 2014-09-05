<?php

class ArticlesController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
        $articles = Article::all();

        return View::make('articles.index', compact('articles'));
	}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
        return View::make('articles.create');
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
        $rules = array('title' => 'required|min:5');

        $validator = Validator::make(Input::all(), $rules);
		//
        if ($validator->fails())
        {
            return Redirect::route('articles.create')
                ->withErrors($validator)
                ->withInput();
        }

        $article = Article::create(array('title'=>Input::get('title'), 'text'=>Input::get('text')));

        return Redirect::route('articles.show', array($article->id));
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
        $article = Article::find($id);

        return View::make('articles.show', compact('article'));


	}


	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
        $article = Article::find($id);

        return View::make('articles.edit', compact('article'));

		//
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
        $rules = array('title' => 'required|min:5');

        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails())
        {
            return Redirect::route('articles.create')
                ->withErrors($validator)
                ->withInput();
        }

        $article = Article::find($id);

        $article->title = Input::get('title');
        $article->text = Input::get('text');
        $article->save();

        return Redirect::route('articles.show', array($article->id));

	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
        Article::destroy($id);

        return Redirect::route('articles.index');
	}


}
