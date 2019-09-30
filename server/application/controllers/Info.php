<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Info extends CI_Controller {
    public function index() {
        
    
        $name = $_POST['user'];
        $data = $_POST['equip'];
        $info = $_POST['info'];
        $number = $_POST['num'];
        $player = $_POST['player']; 
        $equips = explode(",", $data);

        $rows = DB::update('test', ['pad'=>$equips[0],'helmet' => $equips[1],'pant'=>$equips[2],'homejersey'=>$equips[3],'guestjersey'=>$equips[4],'mouthguard' => $equips[5],'id' => $info,'number'=>$number,'name'=>$player], ['phone' => $name]);
        $row = DB::row('test',['*'],['id'=>$info]);

        $this->json([
          'data'=>$row
        ]);
        
        
        
      
    }
}