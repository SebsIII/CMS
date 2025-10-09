<?php
if(isset($_GET["t"])){
    if(deleteTable($_GET["t"])){
        echo(true);
    } else {
        echo(false);
    }
}

function deleteTable($table){
    if(file_exists("tables.json")){
        $data = json_decode(file_get_contents("tables.json"), true);
        unset($data[$_GET["t"]]);
        if(file_put_contents("tables.json", json_encode($data, JSON_PRETTY_PRINT))){
            return true;
        }
    } else {
        return false;
    }   
}

?>