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
-- CREATE DATABASE IF NOT EXISTS `chat`;
-- USE `chat`;

-- Volcando estructura para tabla chat.contacto
CREATE TABLE IF NOT EXISTS `contacto` (
  `id` int(11) NOT NULL,
  `amigo` varchar(45) DEFAULT NULL,
  `bloquear` varchar(45) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_contacto_usuario1` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla chat.contacto: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `contacto` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacto` ENABLE KEYS */;

-- Volcando estructura para tabla chat.mensaje
CREATE TABLE IF NOT EXISTS `mensaje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_sala` int(11) NOT NULL,
  `mensaje` varchar(500) DEFAULT NULL,
  `fecha_hora` datetime DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_mensaje_usuario` (`id_usuario`),
  KEY `FK_mensaje_sala` (`id_sala`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;

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

-- Volcando estructura para tabla chat.sala
CREATE TABLE IF NOT EXISTS `sala` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

-- Volcando estructura para tabla chat.sala_usuario
CREATE TABLE IF NOT EXISTS `sala_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_sala` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_contacto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_sala_usuario_usuario` (`id_usuario`),
  KEY `FK_sala_usuario_sala` (`id_sala`),
  KEY `FK_sala_usuario_usuario_2` (`id_contacto`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

-- Volcando estructura para tabla chat.tipo_sala
CREATE TABLE IF NOT EXISTS `tipo_sala` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla chat.tipo_sala: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `tipo_sala` DISABLE KEYS */;
INSERT INTO `tipo_sala` (`id`, `nombre`) VALUES
	(1, 'Privado'),
	(2, 'Grupo');
/*!40000 ALTER TABLE `tipo_sala` ENABLE KEYS */;

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
  `estatus` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario_perifl1` (`id_perfil`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla chat.usuario: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `correo`, `clave`, `foto`, `perfil`, `id_perfil`, `estatus`) VALUES
	(1, 'Administrador', 'Admin 2', 'admin@gmail.com', '123456', NULL, NULL, 1, 1),
	(2, 'Pedro', 'Perez', 'pedro@gmail.com', '123456', NULL, NULL, 2, 1),
	(3, 'Maria', 'Alvarez', 'maria@gmail.com', '123456', 'NULL', NULL, 2, 1),
	(4, 'Rafael', 'Blasco', 'rafael@gmail.com', '123456', 'NULL', NULL, 2, 0);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

ALTER TABLE `contacto`
  ADD CONSTRAINT `fk_contacto_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `mensaje`
  ADD CONSTRAINT `FK_mensaje_sala` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id`),
  ADD CONSTRAINT `FK_mensaje_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

ALTER TABLE `sala_usuario`
  ADD CONSTRAINT `FK_sala_usuario_sala` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id`),
  ADD CONSTRAINT `FK_sala_usuario_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `FK_sala_usuario_usuario_2` FOREIGN KEY (`id_contacto`) REFERENCES `usuario` (`id`);

ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_perifl1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;