<?php
function clearTables(){
    if(file_exists("tables.json")){
        return file_put_contents("tables.json", json_encode([], JSON_PRETTY_PRINT));
    }
}

clearTables();  //to update
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <h1>This file just clears the tables.json contents, for now...</h1>
    </body>
</html>