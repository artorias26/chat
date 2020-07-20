<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

include "controller/loginController.php";

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
        login($email, $password);
    break;

    case 'register':
        register($email, $password);
    break;

    case 'recovery':
        recovery($email);
    break;
    
    default:
        error('Repuesta no encontrada');
    break;
}

function login($email, $password) {
    $loginController = new LoginController;

    if ($email && $password) {
        $data = $loginController->login($email, $password);
        sendJson($data);
    } else {
        error('Error al ingresar las credenciales');
    }
}

function register($email, $password) {
    $loginController = new LoginController;

    if ($email && $password) {
        $data = $loginController->register($email, $password);
        sendJson($data);
    } else {
        error('Error al registrar el usuario');
    }
}

function recovery($email) {
    $loginController = new LoginController;

    if ($email) {
        $data = $loginController->recovery($email, $password);
        sendJson($data);
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