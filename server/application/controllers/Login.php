<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use QCloud_WeApp_SDK\Constants as Constants;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;





class Login extends CI_Controller {
    public function index() {
        $result = LoginService::login();
        


        if ($result['loginState'] === Constants::S_AUTH) {
            
            
            $this->json([
                'code' => 0,
                'data' => $result['userinfo'],
                'flag'=>true
                
                
                
            ]);
        } else {
            $this->json([
                'code' => -1,
                'error' => $result['error']
            ]);
        }
    }
}
