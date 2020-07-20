<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

include "controller/usuarioController.php";

$type = null;
$id = null;
$nombre = null;
$apellido = null;
$correo = null;
$password = null;
$photo = null;

if (isset($_GET['op'])) {
    $type = $_GET['op'];
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
}

if (isset($_POST['id'])) {
    $id = $_POST['id'];
}

if (isset($_POST['nombre'])) {
    $nombre = $_POST['nombre'];
}

if (isset($_POST['apellido'])) {
    $apellido = $_POST['apellido'];
}

if (isset($_POST['correo'])) {
    $correo = $_POST['correo'];
}

if (isset($_POST['clave'])) {
    $password = $_POST['clave'];
}

if (isset($_POST['photo'])) {
    $photo = $_POST['photo'];
}


switch ($type) {
    case 'select':
        selectUser($id);
    break;

    case 'update':
        update($id, $nombre, $apellido, $correo, $password);
    break;

    case 'photo':
        photo($id, $photo);
    break;

    case 'delete':
        deletes($id);
    break;
    
    default:
        error('Repuesta no encontrada');
    break;
}

function selectUser($id) {
    $usuarioController = new UsuarioController;

    if ($id) {
        $data = $usuarioController->selectUser($id);
        sendJson($data);
    } else {
        error('No existe usuarios registrados');
    }
}

function update($id, $nombre, $apellido, $correo, $password) {
    $usuarioController = new UsuarioController;

    if ($id && $nombre && $apellido && $correo && $password) {
        $data = $usuarioController->update($id, $nombre, $apellido, $correo, $password);
        sendJson($data);
    } else {
        error('Error al actualizar el usuario');
    }
}

function photo($id, $photo) {
    $usuarioController = new UsuarioController;

    if ($id && $photo) {
        $data = $usuarioController->photo($id, $photo);
        sendJson($data);
    } else {
        error('Error al actualizar foto de perfil');
    }
}

function deletes($id) {
    $usuarioController = new UsuarioController;

    if ($id) {
        $data = $usuarioController->deletes($id);
        sendJson($data);
    } else {
        error('Error al eliminar el usuario');
    }
}

function sendJson($data) {
    echo json_encode(array('data' => $data));
}

function error($mensaje) {
    echo json_encode(array('Error' => $mensaje));
}
?>