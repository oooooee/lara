<?php

class TbController extends BaseController {

    /**
     * 首页
     */
    public function test(){

        var_dump($_GET);

        $user = DB::table('admit')->paginate(15);

        echo '<br/>';

        foreach( $user as $v ){
            echo $v->stu_name . '<br/>';
        }



        echo $user->links();
    }

}
