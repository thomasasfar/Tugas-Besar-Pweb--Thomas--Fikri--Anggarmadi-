-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table gpt-team.forms
DROP TABLE IF EXISTS `forms`;
CREATE TABLE IF NOT EXISTS `forms` (
  `form_id` varchar(50) NOT NULL,
  `user_id` int NOT NULL DEFAULT '0',
  `title` varchar(50) NOT NULL,
  `description` longtext NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`form_id`),
  KEY `fk_forms_users` (`user_id`),
  CONSTRAINT `fk_forms_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table gpt-team.forms: ~2 rows (approximately)
REPLACE INTO `forms` (`form_id`, `user_id`, `title`, `description`, `created_at`, `updated_at`) VALUES
	('Dj3CdCkQ', 1, 'Ujian Kah', 'Isi pilihannya ya', '2023-06-12 14:26:14', '2023-06-12 14:26:14'),
	('DLWtjQWy', 1, 'coba kuy12', 'bisa yok12', '2023-06-12 14:22:31', '2023-06-12 14:22:31'),
	('ZIxqWERq', 1, 'Ujian Kah 2', 'Isi pilihannya ya', '2023-06-12 14:26:21', '2023-06-12 14:26:21');

-- Dumping structure for table gpt-team.submissions
DROP TABLE IF EXISTS `submissions`;
CREATE TABLE IF NOT EXISTS `submissions` (
  `user_id` int NOT NULL DEFAULT '0',
  `form_id` varchar(50) NOT NULL,
  `uploaded_file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  KEY `fk_submission_forms` (`form_id`),
  KEY `fk_submission_users` (`user_id`),
  CONSTRAINT `fk_submission_forms` FOREIGN KEY (`form_id`) REFERENCES `forms` (`form_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_submission_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table gpt-team.submissions: ~0 rows (approximately)
REPLACE INTO `submissions` (`user_id`, `form_id`, `uploaded_file`, `description`, `created_at`, `updated_at`) VALUES
	(1, 'Dj3CdCkQ', 'files_upload\\1687422452539GDSc.txt', 'Bimillah bisa', '2023-06-22 08:27:32', '2023-06-22 08:27:32');

-- Dumping structure for table gpt-team.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `active` int DEFAULT '1',
  `avatar` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table gpt-team.users: ~2 rows (approximately)
REPLACE INTO `users` (`user_id`, `username`, `name`, `email`, `password`, `active`, `avatar`, `created_at`, `updated_at`) VALUES
	(1, 'madd', 'Angga', 'madd@comp.co', '$2b$10$1jo.zs/Y8RKQ2RkYo/pmDeywG/bIXdL7m37E.l3Gu6ygdVrqrIdni', 1, NULL, '2023-06-12 14:07:25', '2023-06-12 14:07:25'),
	(2, 'admin', 'Admin', 'karir@adm.unand.ac.id', '$2b$10$310weJpT2uR2T08FMNNOnuovg1PGBLamD7IcDJXC1EfDVaOrgpZu6', 1, NULL, '2023-06-12 14:15:48', '2023-06-12 14:15:48');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
