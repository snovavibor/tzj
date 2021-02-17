<?php

require '../app/Model.php';

if(isset($_POST) && !empty($_POST)) {

    $formData = $_POST;
    new Repozitory($formData);
    
}else {
    echo "not data";die();
}

   
/***
 * без дополнительных проверок и валидаций 
 * упрощенный вариант  )))
 */
class Repozitory 
{
    
    public $model;

    public function __construct($formData)
    {
        
        $this->model = new Model($formData);

        if(!empty($this->model)) {
            $this->message();
        }
        
    }


   public function message()
    {
        echo(json_encode($this->model));
        
    }
    
}

