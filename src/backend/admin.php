<?php
function clearTables(){
    if(file_exists("tables.json")){
        return file_put_contents("tables.json", json_encode([], JSON_PRETTY_PRINT));
    }
}

clearTables();  //to update
?>