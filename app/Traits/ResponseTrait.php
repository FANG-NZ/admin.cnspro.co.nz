<?php

namespace App\Traits;

use Illuminate\Support\Facades\Session;

trait ResponseTrait{

    private $session_name = "RESPONSE_MESSAGE";

    /**
     * So far we can't use CONSTANTS in Trait,
     * we use STATIC vars instead of CONSTANTS
     */
    public static $SUCCESS = "success";
    public static $ERROR = "error";
    public static $WARNING = "warning";

    //const SUCCESS = "success";
    //const ERROR = "danger";
    //const WARNING = "warning";

    /**
     * Function is to add resposne message into 
     * SESSION
     */
    public function addResponseMessage($status, $title, $content){

        $message = [
            'status' => $status,
            'title' => $title,
            'content' => $content
        ];

        Session::flash($this->session_name, json_encode($message));
    }


    /**
     * Function is to add success response message 
     */
    public function successResponse($content, $title="Request success"){
        $this->addResponseMessage(
            self::$SUCCESS,
            $title,
            $content
        );
    }

    /**
     * Function is to add error resposne message
     */
    public function errorResponse($content, $title="Request error"){
        $this->addResponseMessage(
            self::$ERROR,
            $title,
            $content
        );
    }

    /**
     * Function is to add warning response message
     */
    public function warningResponse($content, $title = "Request warning"){
        $this->addResponseMessage(
            self::$WARNING,
            $title,
            $content
        );
    }

}