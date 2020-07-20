<?php

include "conexion/dataBase.php";

class ChatController {
    
    function __construct() {

    }

    function registrarSala($tipoSala, $idUsuario, $idContacto) {
        $dataBase = new DataBase;

        $salaExiste = $dataBase->mysqli()->query("SELECT * FROM sala_usuario WHERE id_usuario = '$idUsuario' AND id_contacto = '$idContacto'");

        if ($salaExiste->num_rows > 0) {
            $selectSala = $salaExiste->fetch_array(MYSQLI_ASSOC);
            return array('idSala' => $selectSala['id_sala']); 
        } else {
            $date = date('Y-m-d H:i:s');

            $sql = "INSERT INTO sala(id, id_tipo, fecha) VALUES(NULL, '$tipoSala', '$date')";
            $dataBase->mysqli()->query($sql) or die('Failed:<br><br>' . $dataBase->mysqli()->error);

            $sala = $dataBase->mysqli()->query("SELECT * FROM sala WHERE id=(SELECT MAX(id) FROM sala)");
            $selectSala = $sala->fetch_array(MYSQLI_ASSOC);
            $idSala = $selectSala['id'];

            $sql2 = "INSERT INTO sala_usuario(id, id_sala, id_usuario, id_contacto) VALUES(NULL, '$idSala', '$idUsuario', '$idContacto')";
            $dataBase->mysqli()->query($sql2) or die('Failed:<br><br>' . $dataBase->mysqli()->error);

            $sql3 = "INSERT INTO sala_usuario(id, id_sala, id_usuario, id_contacto) VALUES(NULL, '$idSala', '$idContacto', '$idUsuario')";
            $dataBase->mysqli()->query($sql3) or die('Failed:<br><br>' . $dataBase->mysqli()->error);

            return array('idSala' => $idSala);
        }
    }

    function listarMensajeSala($idSala) {
        $dataBase = new DataBase;
        $select = $dataBase->mysqli()->query("
            SELECT mensaje.*, usuario.nombre, usuario.apellido, usuario.foto FROM mensaje 
            INNER JOIN usuario
            ON mensaje.id_usuario = usuario.id
            WHERE id_sala = '$idSala' ORDER BY mensaje.id ASC
        ");

        if ($select->num_rows > 0) {
            while ($data = $select->fetch_array(MYSQLI_ASSOC)) {
                $array[] = array(
                    'id' => $data['id'],
                    'idUsuario' => $data['id_usuario'],
                    'idSala' => $data['id_sala'],
                    'mensaje' => $data['mensaje'],
                    'fecha_hora' => $data['fecha_hora'],
                    'url' => $data['url'],
                    'nombre' => $data['nombre'],
                    'apellido' => $data['apellido'],
                    'foto' => $data['foto']
                );
            }
            return $array;
        } else {
            return $select->num_rows;
        }
    }

    function mensajeSala($idUsuario, $idSala, $mensaje, $url) {
        $dataBase = new DataBase;
        $date = date('Y-m-d H:i:s');

        $sql = "INSERT INTO mensaje(id, id_usuario, id_sala, mensaje, fecha_hora, url) VALUES(NULL, '$idUsuario', '$idSala', '$mensaje', '$date', '$url')";
        $dataBase->mysqli()->query($sql) or die('Failed:<br><br>' . $dataBase->mysqli()->error);

        $select = $dataBase->mysqli()->query("
            SELECT mensaje.*, usuario.nombre, usuario.apellido, usuario.foto FROM mensaje 
            INNER JOIN usuario
            ON mensaje.id_usuario = usuario.id
            WHERE mensaje.id=(SELECT MAX(mensaje.id) FROM mensaje)
        ");

        while ($data = $select->fetch_array(MYSQLI_ASSOC)) {
            $array[] = array(
                'id' => $data['id'],
                'idUsuario' => $data['id_usuario'],
                'idSala' => $data['id_sala'],
                'mensaje' => $data['mensaje'],
                'fecha_hora' => $data['fecha_hora'],
                'url' => $data['url'],
                'nombre' => $data['nombre'],
                'apellido' => $data['apellido'],
                'foto' => $data['foto']
            );
        }

        return $array[0];
    }

    function mensajeReciente($idUsuario) {
        $dataBase = new DataBase;

        $select = $dataBase->mysqli()->query("
            SELECT sala_usuario.*, usuario.nombre, usuario.apellido, usuario.foto FROM sala_usuario 
            INNER JOIN usuario
            ON sala_usuario.id_contacto = usuario.id
            WHERE sala_usuario.id_usuario = '$idUsuario' AND usuario.estatus = 1 ORDER BY sala_usuario.id DESC
        ");

        while ($data = $select->fetch_array(MYSQLI_ASSOC)) {
            $array[] = array(
                'id' => $data['id'],
                'idSala' => $data['id_sala'],
                'idUsuario' => $data['id_usuario'],
                'idContacto' => $data['id_contacto'],
                'nombre' => $data['nombre'],
                'apellido' => $data['apellido'],
                'foto' => $data['foto']
            );
        }

        return $array;
    }
}

?>