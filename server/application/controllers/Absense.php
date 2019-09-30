<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Absense extends CI_Controller {
    public function index() {
        

        $matchcall = $_POST['matchcall'];
        $traincall = $_POST['traincall'];
        $firstcall = $_POST['firstcall'];
        if($firstcall=='true'){
          $stage = DB::row('state', ['*']);
        }
        else{
          $stage = (object) array('status' => '');
        }
        
        if(($matchcall=='true'||$stage->status=='2') ){
          $rows = DB::update('state', ['status' => 2]);
          $rows1 = DB::select('test', ['*'], 'game = "0"');
          $rows2 = DB::select('test', ['*'], 'game = "1"');
          $this->json([
            'oncall'=>$rows2,
            'absense'=>$rows1,
            'stage'=>'match',
          ]);
        }
           if(($traincall=='true'||$stage->status=='1')){
          $rows = DB::update('state', ['status' => 1]);
          $rows1 = DB::select('test', ['*'], 'train = "0"');
          $rows2 = DB::select('test', ['*'], 'train = "1"');
          $this->json([
            'oncall'=>$rows2,
            'absense'=>$rows1,
            'stage'=>'train',
          ]);
        }
        if(($traincall=='false'&&$matchcall=='false')||$stage->status=='0'){
          $rows = DB::update('state', ['status' => 0]);
          $rows = DB::update('test', ['game' => 0]);
          $rows = DB::update('test', ['train' => 0]);
      
          $this->json([
            'stage'=>'break',
          ]);
        }
        
   
    }
}