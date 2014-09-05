<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class FooCommand extends Command {

	/**
	 * 1. 这里是命令行调用的名字, 如这里的: `topic:excerpt`, 
     * 命令行调用的时候就是 `php artisan topic:excerpt`
     *
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'ssss:111';

	/**
	 * The console command description.
	 * 2. 这里填写命令行的描述, 当执行 `php artisan` 时
   	 *   可以看得见.
	 * @var string
	 */
	protected $description = 'Command description.';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 * 3. 这里是放要执行的代码, 如在我这个例子里面,
   	 *   生成摘要, 并保持.
	 * @return mixed
	 */
	public function fire()
	{
		//
		$this->info('ssssssssssssssssssss');
		$this->info('1111111111111111111111');
	}

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return array(
			array('example', InputArgument::REQUIRED, 'An example argument.'),
		);
	}

	/**
	 * Get the console command options.
	 *
	 * @return array
	 */
	protected function getOptions()
	{
		return array(
			array('example', null, InputOption::VALUE_OPTIONAL, 'An example option.', null),
		);
	}

}
