<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

include "baseDatos.php";

$type = null;
$id = null;
$nombre = null;
$apellido = null;
$correo = null;
$password = null;

if (isset($_GET['op'])) {
    $type = $_GET['op'];
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
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


switch ($type) {
    case 'select':
        selectUser($mysqli, $id);
    break;

    case 'update':
        update($mysqli, $id, $nombre, $apellido, $correo, $password);
    break;

     case 'delete':
        deletes($mysqli, $id);
    break;
    
    default:
        error('Repuesta no encontrada');
    break;
}

function selectUser($mysqli, $id) {
    $consulta = $mysqli->query("SELECT * FROM usuario WHERE id_perfil=2 AND id <> '$id'");
    if ($consulta->num_rows > 0) {
        while ($datos = $consulta->fetch_array(MYSQLI_ASSOC)) {
            $array[] = array(
                'id' => $datos['id'],
                'nombre' => $datos['nombre'],
                'apellido' => $datos['apellido'],
                'correo' => $datos['correo'],
                'foto' => $datos['foto'],
                'id_perfil' => $datos['id_perfil'],
            );
        }
        sendJson($array);
    } else {
        error('No existe usuarios registrados');
    }
}

function update($mysqli, $id, $nombre, $apellido, $correo, $password) {
    if ($id && $nombre && $apellido && $correo && $password) {
        $sql = "UPDATE usuario SET nombre='$nombre', apellido='$apellido', correo='$correo', clave='$password'  WHERE id = '$id'";
        if ($mysqli->query($sql) === TRUE || $mysqli->query($sql) === true) {
            $consulta = $mysqli->query("SELECT * FROM usuario WHERE id='$id'");
            $datos = $consulta->fetch_array(MYSQLI_ASSOC);
            sendJson($datos);
        } else {
            error('El usuario no se pudo actualizar');
        }
    } else {
        error('Error al actualizar el usuario');
    }
}

function deletes($mysqli, $id) {
    if ($id) {
        $sql = "DELETE FROM usuario WHERE id = '$id'";
        if ($mysqli->query($sql) === TRUE || $mysqli->query($sql) === true) {
            sendJson('Usuario eliminado');
        } else {
            error('El usuario no se pudo eliminar');
        }
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