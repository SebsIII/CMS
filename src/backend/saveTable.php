<?php

    if(isset($_POST["t"])){
        $table = $_POST["t"];
        echo(SaveTable($table));
    }
    function SaveTable($table){
        $new_table = [
            $table => date("l d M Y H:i:s")
        ];

        if(filesize("tables.json") == 0){
            return "No file present.";        
        } else {
            $old_tables = json_decode(file_get_contents("tables.json"), true);
            $old_tables[$table] = date("l d M Y H:i:s");
        }

        $encoded_tables = json_encode($old_tables, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        if(!file_put_contents("tables.json", $encoded_tables, LOCK_EX)){
            return "Error while saving table.";
        } else {
            return true;
        }
    }
?>