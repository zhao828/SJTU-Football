<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Demo extends CI_Controller {
    public function index() {
        
    
        $name = $_POST['name'];
        $pass = $_POST['pass'];
        $rows = DB::row('test', ['*'], ['phone' => $name]);
        
        
        
        if($rows==null||$rows->password != $pass){
          $this->json([
            'data' => [
                'msg' => 0
            ]
          ]);
          
        }
        else{
          $this->json([
            'data' => [
                'msg' => 1
            ]
          ]);
        }
       


        
          

        
      
    }
}