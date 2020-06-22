-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.7.24 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para chat
CREATE DATABASE IF NOT EXISTS `chat` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `chat`;

-- Volcando estructura para tabla chat.contacto
CREATE TABLE IF NOT EXISTS `contacto` (
  `id` int(11) NOT NULL,
  `amigo` varchar(45) DEFAULT NULL,
  `bloquear` varchar(45) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_contacto_usuario1` (`id_usuario`),
  CONSTRAINT `fk_contacto_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla chat.contacto: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `contacto` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacto` ENABLE KEYS */;

-- Volcando estructura para tabla chat.contacto_mensaje
CREATE TABLE IF NOT EXISTS `contacto_mensaje` (
  `id_mensaje` int(11) NOT NULL,
  `id_contacto` int(11) NOT NULL,
  PRIMARY KEY (`id_mensaje`,`id_contacto`),
  KEY `fk_mensaje_has_contacto_contacto1` (`id_contacto`),
  CONSTRAINT `fk_mensaje_has_contacto_contacto1` FOREIGN KEY (`id_contacto`) REFERENCES `contacto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mensaje_has_contacto_mensaje` FOREIGN KEY (`id_mensaje`) REFERENCES `mensaje` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla chat.contacto_mensaje: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `contacto_mensaje` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacto_mensaje` ENABLE KEYS */;

-- Volcando estructura para tabla chat.mensaje
CREATE TABLE IF NOT EXISTS `mensaje` (
  `id` int(11) NOT NULL,
  `mensaje` varchar(45) DEFAULT NULL,
  `emisor` varchar(45) DEFAULT NULL,
  `receptor` varchar(45) DEFAULT NULL,
  `fecha_hora` date DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla chat.mensaje: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `mensaje` DISABLE KEYS */;
/*!40000 ALTER TABLE `mensaje` ENABLE KEYS */;

-- Volcando estructura para tabla chat.perfil
CREATE TABLE IF NOT EXISTS `perfil` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla chat.perfil: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` (`id`, `nombre`) VALUES
	(1, 'Administrador'),
	(2, 'Usuario');
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;

-- Volcando estructura para tabla chat.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `clave` varchar(45) DEFAULT NULL,
  `foto` varchar(45) DEFAULT NULL,
  `perfil` varchar(45) DEFAULT NULL,
  `id_perfil` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario_perifl1` (`id_perfil`),
  CONSTRAINT `fk_usuario_perifl1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla chat.usuario: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `correo`, `clave`, `foto`, `perfil`, `id_perfil`) VALUES
	(1, 'Administrador', 'Admin', 'admin@gmail.com', '123456', NULL, NULL, 1),
	(2, 'Pedro', 'Perez', 'pedro@gmail.com', '123456', NULL, NULL, 2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
