<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

include "baseDatos.php";

$type = null;
$email = null;
$password = null;

if (isset($_GET['op'])) {
    $type = $_GET['op'];
}

if (isset($_GET['email'])) {
    $email = $_GET['email'];
}

if (isset($_POST['email'])) {
    $email = $_POST['email'];
}

if (isset($_POST['password'])) {
    $password = $_POST['password'];
}

switch ($type) {
    case 'login':
        login($mysqli, $email, $password);
    break;

    case 'register':
        register($mysqli, $email, $password);
    break;

    case 'recovery':
        recovery($mysqli, $email);
    break;
    
    default:
        error('Repuesta no encontrada');
    break;
}

function login($mysqli, $email, $password) {
    if ($email && $password) {
        $consulta = $mysqli->query("SELECT * FROM usuario WHERE correo='".$email."' AND clave='".$password."'");
        if ($consulta->num_rows > 0) {
            $datos = $consulta->fetch_array(MYSQLI_ASSOC);
            sendJson($datos);
        } else {
            error('Error de credenciales');
        }
    } else {
        error('Error al ingresar las credenciales');
    }
}

function register($mysqli, $email, $password) {
    if ($email && $password) {
        $sql = "INSERT INTO usuario(id, nombre, apellido, correo, clave, foto, id_perfil) VALUES(NULL, NULL, NULL, '$email', '$password', NULL, 2)";
        $mysqli->query($sql) or die('Failed:<br><br>'.$mysqli->error);

        $consulta = $mysqli->query("SELECT * FROM usuario WHERE id=(SELECT MAX(id) FROM usuario)");
        $datos = $consulta->fetch_array(MYSQLI_ASSOC);
        sendJson($datos);
    } else {
        error('Error al registrar el usuario');
    }
}

function recovery($mysqli, $email) {
    if ($email) {
        $consulta = $mysqli->query("SELECT correo,clave FROM usuario WHERE correo='".$email."'");
        if ($consulta->num_rows > 0) {
            $datos = $consulta->fetch_array(MYSQLI_ASSOC);
            sendJson($datos);
        } else {
            error('El correo no esta registrado');
        }
    } else {
        error('Error al recuperar la clave');
    }
}

function sendJson($data) {
    echo json_encode(array('data' => $data));
}

function error($mensaje) {
    echo json_encode(array('Error' => $mensaje));
}

?>