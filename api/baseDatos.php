<?php
    $mysqli = new mysqli("localhost", "root", "", "chat");

    if ($mysqli->connect_errno) {
        echo "Failed to connect to MySQL: " . $mysqli->connect_error;
        exit();
    }

class DataBase {

    function __construct() {

    }

    function mysqli() {
        $mysqli = new mysqli("localhost", "root", "", "chat");

        if ($mysqli->connect_errno) {
            echo "Failed to connect to MySQL: " . $mysqli->connect_error;
            exit();
        }

        return $mysqli;
    }
}
?>