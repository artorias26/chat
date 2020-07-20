<?php

include "conexion/dataBase.php";

class LoginController {
    
    function __construct() {

    }

    function login($email, $password) {
        $dataBase = new DataBase;

        $consulta = $dataBase->mysqli()->query("SELECT * FROM usuario WHERE correo='$email' AND clave='$password' AND estatus = 1");
        if ($consulta->num_rows > 0) {
            $datos = $consulta->fetch_array(MYSQLI_ASSOC);
            return $datos;
        } else {
            return 'Error de credenciales';
        }
    }

    function register($email, $password) {
        $dataBase = new DataBase;
        
        $sql = "INSERT INTO usuario(id, nombre, apellido, correo, clave, foto, id_perfil, estatus) VALUES(NULL, NULL, NULL, '$email', '$password', NULL, 2, 1)";
        $dataBase->mysqli()->query($sql) or die('Failed:<br><br>'.$dataBase->mysqli()->error);

        $consulta = $dataBase->mysqli()->query("SELECT * FROM usuario WHERE id=(SELECT MAX(id) FROM usuario)");
        $datos = $consulta->fetch_array(MYSQLI_ASSOC);
        return $datos;
    }

    function recovery($email) {
        $dataBase = new DataBase;

        $consulta = $dataBase->mysqli()->query("SELECT correo,clave FROM usuario WHERE correo='".$email."'");
        if ($consulta->num_rows > 0) {
            $datos = $consulta->fetch_array(MYSQLI_ASSOC);
            return $datos;
        } else {
            return 'El correo no esta registrado';
        }
       
    }
}

?>