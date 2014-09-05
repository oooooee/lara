<?php

/**
 * Class HomeController
 * 我觉得我应该用用laravel框架，而不是公司的框架，我觉得就算是模仿，我也可以学到很多很多的东西。
 */

class HomeController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/


    /**
     * 主页
     */
    public function index(){
        return View::make('soml.index');
    }

    /**
     * 登陆页
     */
    public function sign(){

        return View::make('soml.sign');

    }

    /**
     * 登陆
     */
    public function login(){

        // 传入json数据

        // 验证数据

        // 如果正确，设置session

        // 如果不正确，报错
        $rc = DB::table('user')->where('account', '=', Input::get('account'))->get();

        if( empty($rc) ){
            echo '';
        }





    }


    /**
     * 注册方法
     */
    public function register(){

       /* DB::insert('insert into user(account,pwd,email,status) value(?,?,?,?)',
            array('soml', md5('12345678'), '362619655@qq.com', 1));*/

        // 验证数据

        // 插入数据
        DB::insert('insert into user(account,pwd,email,status) value(?,?,?,?)',
            array(Input::get('account'), md5(Input::get('pwd')), Input::get('email'), 1));


        // 重定向到

        // 返回成功

    }

    /**
     * 取得今日热议主题的方法
     */
    public function get_hot(){

    }

    /**
     * 取得个人信息
     */
    public function get_per(){

    }

    /**
     * 取得列表数据
     */
    public function get_list(){

    }

    /**
     * 取得社区动行状况的方法
     */
    public function get_web(){

    }

}
