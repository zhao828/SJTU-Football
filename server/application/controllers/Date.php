<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
class Date extends CI_Controller {
    public function index() {
        
        $date = date("Y-m-d");
        $rows = DB::select('date', ['*']);
        $flag = false;
        foreach ($rows as $value) {
          $a =  $value->time;
          $b = $value;
          if($date<=$a){
            $flag = true;
            break;
              }
          }


        #strtotime($zero1)<strtotime($zero2)



        if ($flag ==true){
          $this->json([
            'code' => 0,
            'date' => $b,
            'schedule'=>$rows
        ]);
        }
        else{
            $this->json([
            'code' => 0,
            'date' => '',
            'schedule'=>''
        ]);
        }

        
       
    }
}
