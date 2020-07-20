<?php

include "conexion/dataBase.php";
require_once 'vendor/autoload.php';
use Intervention\Image\ImageManagerStatic as Image;


class UsuarioController {
    
    function __construct() {

    }

    function selectUser($id) {
        $dataBase = new DataBase;

        $consulta = $dataBase->mysqli()->query("SELECT * FROM usuario WHERE id_perfil=2 AND id <> '$id' AND estatus = 1");
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
            return $array;
        } else {
            return 'No existe usuarios registrados';
        }
    }

    function update($id, $nombre, $apellido, $correo, $password) {
        $dataBase = new DataBase;

        $sql = "UPDATE usuario SET nombre='$nombre', apellido='$apellido', correo='$correo', clave='$password'  WHERE id = '$id'";
        if ($dataBase->mysqli()->query($sql) === TRUE || $dataBase->mysqli()->query($sql) === true) {
            $consulta = $dataBase->mysqli()->query("SELECT * FROM usuario WHERE id='$id'");
            $datos = $consulta->fetch_array(MYSQLI_ASSOC);
            return $datos;
        } else {
            return 'El usuario no se pudo actualizar';
        }
        
    }

    function photo($id, $photo) {
        $dataBase = new DataBase;

        $image = base64_decode($photo);
        $png_url = "img-".time().".jpg"; 
        $folderName = '/images/users/'.$png_url;
        $destinationPath = realpath(dirname(__FILE__) . '/..').$folderName;

        $img = Image::make($image);
        $img->encode('jpg', 80);
        $img->save($destinationPath);


        $sql = "UPDATE usuario SET foto='$folderName'  WHERE id = '$id'";
        if ($dataBase->mysqli()->query($sql) === TRUE || $dataBase->mysqli()->query($sql) === true) {
            $consulta = $dataBase->mysqli()->query("SELECT * FROM usuario WHERE id='$id'");
            $datos = $consulta->fetch_array(MYSQLI_ASSOC);
            return $datos;
        } else {
            return 'El usuario no se pudo actualizar';
        }
    }

    function deletes($id) {
        $dataBase = new DataBase;

        $sql = "UPDATE usuario SET estatus = 0  WHERE id = '$id'";
        if ($dataBase->mysqli()->query($sql) === TRUE || $dataBase->mysqli()->query($sql) === true) {
            $consulta = $dataBase->mysqli()->query("SELECT * FROM usuario WHERE id='$id'");
            $datos = $consulta->fetch_array(MYSQLI_ASSOC);
            return 'Usuario eliminado';
        } else {
            return 'Error al eliminar el usuario';
        }
    }
}

?>