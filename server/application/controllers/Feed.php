<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Feed extends CI_Controller {
    public function index() {
        $openid = $_POST['info'];
        $rows = DB::row('test', ['*'], ['id' => $openid]);
        $rows1 = DB::row('state', ['*']);
        if($rows==null){
          $this->json([
            'data' => [
                'msg' => false,
                
            ]
          ]);    
        }
        
        else{
          $this->json([
            'data' => [
                'msg' => true,
                'data'=>$rows,
                'stage'=>$rows1
            ]
          ]);    

        }
        
    }
      
    
}
