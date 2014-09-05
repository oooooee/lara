<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

// 测试路由
/*
Route::any('user/{name}', function($name){


    echo 'a-z';


})->where('name', '[A-Za-z]+');

/*
Route::any('user/{id}', function($id){


    echo '1-9';


})->where('id', '[1-9]+');


//soml网站

Route::get('/', 'HomeController@index');
Route::get('/sign', 'HomeController@sign');
Route::get('/login', 'HomeController@login');
Route::get('/register', 'HomeController@register');

Route::get('/tb', 'TbController@test');
Route::get('/test', 'TestController@index');

//这里是用来测试的
Route::get('/abc', 'test\HomeController@index');

*/
// laravel 学习

Route::get('/', 'WelcomeController@index');

Route::resource('articles', 'ArticlesController');

