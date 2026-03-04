-- MySQL dump 10.13  Distrib 9.5.0, for macos14.7 (arm64)
--
-- Host: localhost    Database: bikuren
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '9a2ae612-b9d7-11f0-8751-1892973b6445:1-333';

--
-- Table structure for table `BIKES`
--

DROP TABLE IF EXISTS `BIKES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BIKES` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `plate_number` varchar(20) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('available','rented','maintenance') DEFAULT 'available',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `plate_number` (`plate_number`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BIKES`
--

LOCK TABLES `BIKES` WRITE;
/*!40000 ALTER TABLE `BIKES` DISABLE KEYS */;
INSERT INTO `BIKES` VALUES (1,'Honda Vario 125','DK 1234 AA',100000.00,'available','2026-01-25 09:38:07','2026-01-25 09:47:03',NULL,'uploads/bikes/617c9617-d1ff-40c5-abb6-68f26d39b9cf-2026-01-25.png'),(2,'Yamaha NMAX','DK 2345 BB',150000.00,'available','2026-01-25 09:38:07','2026-01-25 09:38:07',NULL,NULL),(3,'Honda PCX 160','DK 3456 CC',160000.00,'rented','2026-01-25 09:38:07','2026-01-25 09:38:07',NULL,NULL),(4,'Yamaha Aerox','DK 4567 DD',140000.00,'maintenance','2026-01-25 09:38:07','2026-01-25 09:38:07',NULL,NULL),(5,'Suzuki Nex II','DK 5678 EE',90000.00,'available','2026-01-25 09:38:07','2026-01-25 09:38:07',NULL,NULL),(6,'Honda Beat','DK 6789 FF',80000.00,'available','2026-01-25 09:38:07','2026-01-25 09:38:07',NULL,NULL),(7,'Yamaha Mio','DK 7890 GG',75000.00,'rented','2026-01-25 09:38:07','2026-01-25 09:38:07',NULL,NULL),(8,'Honda Scoopy','DK 8901 HH',95000.00,'available','2026-01-25 09:38:07','2026-01-25 09:38:07',NULL,NULL),(9,'Yamaha Fazzio','DK 9012 II',110000.00,'maintenance','2026-01-25 09:38:07','2026-01-25 09:38:07',NULL,NULL),(10,'Honda Genio','DK 0123 JJ',90000.00,'available','2026-01-25 09:38:07','2026-01-25 09:38:07',NULL,NULL);
/*!40000 ALTER TABLE `BIKES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rental_details`
--

DROP TABLE IF EXISTS `rental_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rental_details` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `rental_id` int NOT NULL,
  `bike_id` int NOT NULL,
  `rental_date` date NOT NULL,
  `finish_at` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_rental_details_rental` (`rental_id`),
  KEY `fk_rental_details_bike` (`bike_id`),
  CONSTRAINT `fk_rental_details_bike` FOREIGN KEY (`bike_id`) REFERENCES `bikes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_rental_details_rental` FOREIGN KEY (`rental_id`) REFERENCES `rentals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rental_details`
--

LOCK TABLES `rental_details` WRITE;
/*!40000 ALTER TABLE `rental_details` DISABLE KEYS */;
INSERT INTO `rental_details` VALUES (21,1,1,'2026-01-01','2026-01-03','2026-01-25 09:38:19','2026-01-25 09:38:19',NULL),(22,1,2,'2026-01-01','2026-01-03','2026-01-25 09:38:19','2026-01-25 09:38:19',NULL),(23,2,3,'2026-01-02','2026-01-05','2026-01-25 09:38:19','2026-01-25 09:38:19',NULL),(24,3,1,'2026-01-05','2026-01-06','2026-01-25 09:38:19','2026-01-25 09:38:19',NULL),(25,4,2,'2026-01-06','2026-01-09','2026-01-25 09:38:19','2026-01-25 09:38:19',NULL),(26,4,3,'2026-01-06','2026-01-09','2026-01-25 09:38:19','2026-01-25 09:38:19',NULL),(27,5,4,'2026-01-07','2026-01-08','2026-01-25 09:38:19','2026-01-25 09:38:19',NULL),(28,6,5,'2026-01-08','2026-01-11','2026-01-25 09:38:19','2026-01-25 09:38:19',NULL),(29,7,2,'2026-01-09','2026-01-10','2026-01-25 09:38:19','2026-01-25 09:38:19',NULL),(30,8,3,'2026-01-10','2026-01-12','2026-01-25 09:38:19','2026-01-25 09:38:19',NULL),(31,8,4,'2026-01-10','2026-01-12','2026-01-25 09:38:19','2026-01-25 09:38:19',NULL),(32,9,1,'2026-01-12','2026-01-15','2026-01-25 09:38:19','2026-01-25 09:38:19',NULL),(33,10,5,'2026-01-14','2026-01-18','2026-01-25 09:38:19','2026-01-25 09:38:19',NULL);
/*!40000 ALTER TABLE `rental_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rentals`
--

DROP TABLE IF EXISTS `rentals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rentals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total` decimal(12,2) NOT NULL,
  `status` enum('pending','ongoing','finished','cancelled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rentals_user` (`user_id`),
  CONSTRAINT `fk_rentals_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rentals`
--

LOCK TABLES `rentals` WRITE;
/*!40000 ALTER TABLE `rentals` DISABLE KEYS */;
INSERT INTO `rentals` VALUES (1,44,300000.00,'pending','2026-01-25 09:36:41','2026-01-25 09:36:41',NULL),(2,45,450000.00,'ongoing','2026-01-25 09:36:41','2026-01-25 09:36:41',NULL),(3,44,200000.00,'finished','2026-01-25 09:36:41','2026-01-25 09:36:41',NULL),(4,45,600000.00,'pending','2026-01-25 09:36:41','2026-01-25 09:36:41',NULL),(5,44,350000.00,'ongoing','2026-01-25 09:36:41','2026-01-25 09:36:41',NULL),(6,45,500000.00,'finished','2026-01-25 09:36:41','2026-01-25 09:36:41',NULL),(7,44,250000.00,'cancelled','2026-01-25 09:36:41','2026-01-25 09:36:41',NULL),(8,45,400000.00,'pending','2026-01-25 09:36:41','2026-01-25 09:36:41',NULL),(9,44,550000.00,'ongoing','2026-01-25 09:36:41','2026-01-25 09:36:41',NULL),(10,45,700000.00,'finished','2026-01-25 09:36:41','2026-01-25 09:36:41',NULL);
/*!40000 ALTER TABLE `rentals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `country` varchar(50) NOT NULL,
  `passport` varchar(25) DEFAULT NULL,
  `address` text,
  `room_number` varchar(10) DEFAULT NULL,
  `role` enum('admin','member') DEFAULT 'member',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT '0',
  `verification_token` varchar(255) DEFAULT NULL,
  `verification_token_expiry` timestamp NULL DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (44,'Gus Surya','suryanegara1209@gmail.com','$2b$10$ZMdwuFes.ZTkTVv/EcdJeezgW/el15TaPPEToNETqdPn9ZP6sfHjK','+6281337359934','Indonesia','A0984873','Jl. Singosari No. 4, Br. Tengah Blahkiuh, Abiansemal','9999','admin','2026-01-25 09:21:02','2026-01-25 09:52:47',NULL,1,NULL,NULL,'uploads/profiles/91a1c16f-84b8-4c3d-bd18-6fdfef07c301-2026-01-25.png'),(45,'Krisna Widiatmika','krisnawidiatmika17@gmail.com','$2b$10$qhhZbdXtQ504RN1dVIdEBeYZ7ZDvcD5HcU.Vlt92gfk.4ciGIxUBm','+6285858909657','Indonesia','A09124412','Jl. Tiying Tutul, Canggu','9998','member','2026-01-25 09:31:29','2026-01-25 09:55:36',NULL,1,NULL,NULL,'uploads/profiles/911d05bd-c55f-48a6-b274-be6f4dae3694-2026-01-25.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-25 18:36:02
