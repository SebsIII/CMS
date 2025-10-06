<?php
//Pass the table number as query param and save it to a json file

$jsonString = file_get_contents('data.json');
$data = json_decode($jsonString, true); // 'true' returns an associative array
print_r($data["sasso"]);

?>