<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Sign extends CI_Controller {
    public function index() {
        
      $game = $_POST['game'];
      $train = $_POST['train'];
      $id = $_POST['id'];
        
        
        if($train=='true'){
          $rows = DB::update('test', ['train' => 1], ['id' => $id]);
          
          $this->json([
            'data' => [
                'msg' => 'train'
            ]
          ]);
          
        }
        if($game=='true'){
          $rows = DB::update('test', ['game' => 1], ['id' => $id]);


          $this->json([
            'data' => [
                'msg' => 'game'
            ]
          ]);
          
        }
       


        
          

        
      
    }
}