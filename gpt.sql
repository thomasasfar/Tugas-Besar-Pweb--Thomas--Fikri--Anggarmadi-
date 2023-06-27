-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2023 at 10:55 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gpt`
--

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `form_id` varchar(50) NOT NULL,
  `user_id` int(10) DEFAULT 0,
  `title` varchar(50) NOT NULL,
  `description` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
REPLACE INTO `forms` (`form_id`, `user_id`, `title`, `description`, `created_at`, `updated_at`) VALUES
	('Dj3CdCkQ', 1, 'Ujian Kah', 'Isi pilihannya ya', '2023-06-12 14:26:14', '2023-06-12 14:26:14'),
	('DLWtjQWy', 1, 'coba kuy12', 'bisa yok12', '2023-06-12 14:22:31', '2023-06-12 14:22:31'),
	('ZIxqWERq', 1, 'Ujian Kah 2', 'Isi pilihannya ya', '2023-06-12 14:26:21', '2023-06-12 14:26:21');
--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `user_id` int(10) NOT NULL DEFAULT 0,
  `form_id` varchar(50) NOT NULL,
  `uploaded_file` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
REPLACE INTO `submissions` (`user_id`, `form_id`, `uploaded_file`, `description`, `created_at`, `updated_at`) VALUES
	(1, 'Dj3CdCkQ', 'files_upload\\1687422452539GDSc.txt', 'Bimillah bisa', '2023-06-22 08:27:32', '2023-06-22 08:27:32');

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) NOT NULL,
  `username` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` int(10) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
REPLACE INTO `users` (`user_id`, `username`, `name`, `email`, `password`, `active`, `avatar`, `created_at`, `updated_at`) VALUES
	(1, 'madd', 'Angga', 'madd@comp.co', '$2b$10$1jo.zs/Y8RKQ2RkYo/pmDeywG/bIXdL7m37E.l3Gu6ygdVrqrIdni', 1, NULL, '2023-06-12 14:07:25', '2023-06-12 14:07:25'),
	(2, 'admin', 'Admin', 'karir@adm.unand.ac.id', '$2b$10$310weJpT2uR2T08FMNNOnuovg1PGBLamD7IcDJXC1EfDVaOrgpZu6', 1, NULL, '2023-06-12 14:15:48', '2023-06-12 14:15:48');

-- Indexes for dumped tables
--

--
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`form_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD KEY `user_id` (`user_id`,`form_id`),
  ADD KEY `form_id` (`form_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `forms`
--
ALTER TABLE `forms`
  ADD CONSTRAINT `forms_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `submissions`
--
ALTER TABLE `submissions`
  ADD CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `submissions_ibfk_2` FOREIGN KEY (`form_id`) REFERENCES `forms` (`form_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
