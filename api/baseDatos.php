<?php
    $link = mysql_connect("localhost","root","") or die ("Problemas al Conectar al Servidor");
    if($link){
        mysql_select_db("chat") or die ("Problemas al conectar la Base de Datos");
    }
?>