<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

include "controller/chatController.php";

$type = null;
$idUsuario = null;
$idContacto = null;
$tipoSala = null;
$idSala = null;
$mensaje = null;
$url = null;

if (isset($_GET['op'])) {
    $type = $_GET['op'];
}

if (isset($_POST['idUsuario'])) {
    $idUsuario = $_POST['idUsuario'];
}

if (isset($_POST['idContacto'])) {
    $idContacto = $_POST['idContacto'];
}

if (isset($_POST['tipoSala'])) {
    $tipoSala = $_POST['tipoSala'];
}

if (isset($_POST['idSala'])) {
    $idSala = $_POST['idSala'];
}

if (isset($_POST['mensaje'])) {
    $mensaje = $_POST['mensaje'];
}

if (isset($_POST['url'])) {
    $url = $_POST['url'];
}


switch ($type) {
    case 'add':
        registrarSala($tipoSala, $idUsuario, $idContacto);
    break;

    case 'listMessage':
        listarMensajeSala($idSala);
    break;

    case 'message':
        mensajeSala($idUsuario, $idSala, $mensaje, $url);
    break;

    case 'reciente':
        mensajeReciente($idUsuario);
    break;
    
    default:
        error('Repuesta no encontrada');
    break;
}

function registrarSala($tipoSala, $idUsuario, $idContacto) {
    $chatController = new ChatController;

    if ($tipoSala && $idUsuario && $idContacto) {
        $data = $chatController->registrarSala($tipoSala, $idUsuario, $idContacto);
        sendJson($data);
    } else {
        error('Error al iniciar la conversación');
    }
    
}

function listarMensajeSala($idSala) {
    $chatController = new ChatController;

    if ($idSala) {
        $data = $chatController->listarMensajeSala($idSala);

        if($data > 0) {
            sendJson($data);
        } else {
            error('No existe mensajes registrados');
        }
        
    } else {
        error('Error al listar la sala');
    }
    
}

function mensajeSala($idUsuario, $idSala, $mensaje, $url) {
    $chatController = new ChatController;

    if ($idUsuario && $idSala && $mensaje) {
        $data = $chatController->mensajeSala($idUsuario, $idSala, $mensaje, $url);
        sendJson($data);
    } else {
        error('Error al enviar el mensaje a la sala');
    }
    
}

function mensajeReciente($idUsuario) {
    $chatController = new ChatController;

    if ($idUsuario) {
        $data = $chatController->mensajeReciente($idUsuario);
        sendJson($data);
    } else {
        error('Error al enviar la lista de conversaciones recientes');
    }
    
}


function sendJson($data) {
    echo json_encode(array('data' => $data));
}

function error($mensaje) {
    echo json_encode(array('Error' => $mensaje));
}
?>