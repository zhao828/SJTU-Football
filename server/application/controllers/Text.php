<?php
require __DIR__ . "/qcloudsms_php-master/src/index.php";
defined('BASEPATH') OR exit('No direct script access allowed');
use Qcloud\Sms\SmsSingleSender;
use Qcloud\Sms\SmsMultiSender;
use Qcloud\Sms\SmsVoiceVerifyCodeSender;
use Qcloud\Sms\SmsVoicePromptSender;
use Qcloud\Sms\SmsStatusPuller;
use Qcloud\Sms\SmsMobileStatusPuller;
use Qcloud\Sms\VoiceFileUploader;
use Qcloud\Sms\FileVoiceSender;
use Qcloud\Sms\TtsVoiceSender;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Text extends CI_Controller {
    public function index() {
        $name = $_POST['name'];
        $loc = $_POST['loc'];
        $time = $_POST['time'];
        $appid = 1400161404; 
        $rows = DB::select('test', ['phone'], ['text' => 1]);
        $a = [];
        
        for ($x=0; $x<count($rows); $x++) {
          array_push($a,$rows[$x]->phone);
         } 
        
        // $this->json([
        //     'data' => $a,
            
        //   ]);

// 短信应用SDK AppKey
  $appkey = "5343442f521de5db13659b133d0b5378";
// 需要发送短信的手机号码
  // $phoneNumbers = ['18516276588'];
  $phoneNumbers = $a;
// 短信模板ID，需要在短信应用中申请
  $templateId = 233388;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
// 签名
  $smsSign = "SJTULIONS"; // NOTE: 这里的签名只是示例，请使用真实的已申请的签名，签名参数使用的是`签名内容`，而不是`签名ID`
// 单发短信

// 指定模板ID单发短信
// try {
//     $ssender = new SmsSingleSender($appid, $appkey);
//     $params = ["训练","周五下午","南体"];
//     $result = $ssender->sendWithParam("86", $phoneNumbers[0], $templateId,
//         $params, $smsSign, "", "");  // 签名参数未提供或者为空时，会使用默认签名发送短信
//     $rsp = json_decode($result);
//     echo $result;
// } catch(\Exception $e) {
//     echo var_dump($e);
// }
// echo "\n";
//     }

try {
    $msender = new SmsMultiSender($appid, $appkey);
    $params = [$name,$time,$loc];
    $result = $msender->sendWithParam("86", $phoneNumbers,
        $templateId, $params, $smsSign, "", "");  // 签名参数未提供或者为空时，会使用默认签名发送短信
    $rsp = json_decode($result);
    echo $result;
} catch(\Exception $e) {
    echo var_dump($e);
}
echo "\n";
}
}
