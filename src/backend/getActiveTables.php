<?php
//Send all the tables in the JSON file
function getTables($f){
    if(file_exists(strval($f))){
        return json_encode(file_get_contents(strval($f)), true);
    } else {
        return "File does not exist.";
    }   
}

print_r(getTables("tables.json"));
?>