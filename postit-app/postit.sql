-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 01, 2021 at 07:05 PM
-- Server version: 8.0.23-0ubuntu0.20.04.1
-- PHP Version: 7.3.27-9+ubuntu20.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `postit`
--

-- --------------------------------------------------------

--
-- Table structure for table `anotacoes`
--

CREATE TABLE `anotacoes` (
  `id` int NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `texto` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `anotacoes`
--

INSERT INTO `anotacoes` (`id`, `titulo`, `texto`, `createdAt`, `updatedAt`) VALUES
(10, 'Ver filmes Netflix', 'Vingadores\r\nA ilha\r\nShow de Truman\r\n...', '2021-04-20 20:10:42', '2021-04-20 20:10:42'),
(11, 'Compras', 'Alicate\r\nChave de fenda\r\nTesoura\r\n...', '2021-04-20 20:14:00', '2021-04-20 20:14:00'),
(12, 'Estudar', 'Programação JS\r\nDocker\r\nReact\r\n...\r\n', '2021-04-20 20:16:26', '2021-04-20 20:16:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anotacoes`
--
ALTER TABLE `anotacoes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anotacoes`
--
ALTER TABLE `anotacoes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
