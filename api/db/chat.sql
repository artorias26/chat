-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 01-07-2020 a las 04:35:54
-- Versión del servidor: 5.7.19
-- Versión de PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

DROP TABLE IF EXISTS `contacto`;
CREATE TABLE IF NOT EXISTS `contacto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amigo` varchar(45) DEFAULT NULL,
  `bloquear` varchar(45) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_contacto_usuario1` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto_mensaje`
--

DROP TABLE IF EXISTS `contacto_mensaje`;
CREATE TABLE IF NOT EXISTS `contacto_mensaje` (
  `id_mensaje` int(11) NOT NULL,
  `id_contacto` int(11) NOT NULL,
  PRIMARY KEY (`id_mensaje`,`id_contacto`),
  KEY `fk_mensaje_has_contacto_contacto1` (`id_contacto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje`
--

DROP TABLE IF EXISTS `mensaje`;
CREATE TABLE IF NOT EXISTS `mensaje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mensaje` varchar(45) DEFAULT NULL,
  `emisor` varchar(45) DEFAULT NULL,
  `receptor` varchar(45) DEFAULT NULL,
  `fecha_hora` date DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perifl`
--

DROP TABLE IF EXISTS `perfil`;
CREATE TABLE IF NOT EXISTS `perfil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
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
  KEY `fk_usuario_perifl1` (`id_perfil`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD CONSTRAINT `fk_contacto_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `contacto_mensaje`
--
ALTER TABLE `contacto_mensaje`
  ADD CONSTRAINT `fk_mensaje_has_contacto_contacto1` FOREIGN KEY (`id_contacto`) REFERENCES `contacto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_mensaje_has_contacto_mensaje` FOREIGN KEY (`id_mensaje`) REFERENCES `mensaje` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_perifl1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

INSERT INTO `perfil` (`id`, `nombre`) VALUES
  (1, 'Administrador'),
  (2, 'Usuario');

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `correo`, `clave`, `foto`, `perfil`, `id_perfil`) VALUES
  (1, 'Administrador', 'Admin 2', 'admin@gmail.com', '123456', NULL, NULL, 1),
  (2, 'Pedro', 'Perez', 'pedro@gmail.com', '123456', NULL, NULL, 2);

