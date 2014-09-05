<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		 Schema::create('docs',function($table){
		    $table->increments('id');
		    $table->string('title',64);
		    $table->text('content');
		    $table->string('create_date',12);
		    $table->string('last_change',12);
		});
		DB::table('docs')->insert(array(
			'title'=>'test',
			'content'=>'just a test!', 
			'create_date'=>time(),
			'last_change'=>''
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
		Schema::drop('docs');
	}

}
