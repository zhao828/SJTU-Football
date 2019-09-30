<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Change extends CI_Controller {
    public function index() {
        
        
        $train = $_POST['train'];
        $game = $_POST['game'];
        $name = $_POST['name'];
        $tostatus = $_POST['tostatus'];
        
       
        if ($game=='true'){
          if($tostatus=='toon'){
          $rows = DB::update('test', ['game' => 1], ['name' => $name]);
          }
          if($tostatus=='toab'){
            $rows = DB::update('test', ['game' => 0], ['name' => $name]);

          }
        }
          if($train=='true'){
          if($tostatus=='toon'){
          $rows = DB::update('test', ['train' => 1], ['name' => $name]);
          }
          if($tostatus=='toab'){
            $rows = DB::update('test', ['train' => 0], ['name' => $name]);

          }
        }


       
          $this->json([
            'data' => [
                'msg' => 1
            ]
          ]);
        
       


        
          

        
      
    }
}