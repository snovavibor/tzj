<?php

class Model 
{
    public function __construct($data)
    {

        foreach($data as $key=>$val)
        {
            if(gettype($val) == 'string')
            {
                $val = strtolower($val);
            }
            $this->$key = $val;
        }
        
    }
}