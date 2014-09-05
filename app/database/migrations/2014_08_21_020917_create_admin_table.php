<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdminTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create('admin',function($table){
        $table->increments('id');
        $table->string('email',64);
        $table->string('password',64);
     	});
     	DB::table('admin')->insert(array(
			'email'=>'your email',
			'password'=>Hash::make('123456'),
    	));
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
		Schema::drop('admin');
	}

}
