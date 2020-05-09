-- MySQL dump 10.16  Distrib 10.3.9-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: playsocceronline
-- ------------------------------------------------------
-- Server version	10.1.26-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exercises_videos`
--

DROP TABLE IF EXISTS `exercises_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercises_videos` (
  `UNIQUE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `EXERCISE_LEVEL` varchar(100) COLLATE utf16_bin DEFAULT NULL,
  `EXERCISE_NUMBER` decimal(3,0) DEFAULT NULL,
  `EXERCISE_ID` varchar(5) COLLATE utf16_bin DEFAULT NULL,
  `VIDEO_NAME` varchar(100) COLLATE utf16_bin DEFAULT NULL,
  PRIMARY KEY (`UNIQUE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf16 COLLATE=utf16_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises_videos`
--

LOCK TABLES `exercises_videos` WRITE;
/*!40000 ALTER TABLE `exercises_videos` DISABLE KEYS */;
INSERT INTO `exercises_videos` VALUES (15,'1',1,'1.1','N1_1.1 5x.mpg'),(16,'1',2,'1.2','N1_1.2 10x.mp4'),(17,'1',3,'1.3','N1_1.2 15x.mp4'),(18,'1',4,'1.4','N1_2.1 5x.mp4'),(19,'1',5,'1.5','N1_2.2 10x.mp4'),(20,'1',6,'1.6','N1_2.3 15x.mp4'),(21,'1',7,'1.7','N1_3.1 3x.mp4'),(22,'1',8,'1.8','N1_3.2 5x.mp4'),(23,'1',9,'1.9','N1_3.3 10x.mp4'),(24,'1',10,'1.10','N1_4.1 3x.mp4'),(25,'1',11,'1.11','N1_4.2 5x.mp4'),(26,'1',12,'1.12','N1_4.3 10x.mp4'),(27,'1',13,'1.13','N1_5.1 3x.mp4'),(28,'1',14,'1.14','N1_5.2 5x.mp4'),(29,'1',15,'1.15','N1_6.1 3x.mp4'),(30,'1',16,'1.16','N1_6.2 5x.mp4'),(31,'2',17,'2.17','N1_6.3 10x.mp4'),(32,'2',18,'2.18','N1_7.1 5x.mp4'),(33,'2',19,'2.19','N1_7.2 10x.mp4'),(34,'2',20,'2.20','N1_7.3 15x.mp4'),(35,'2',21,'2.21','N1_8.1 3x_dir.mp4'),(36,'2',22,'2.22','N1_8.2 3x_esq.mp4'),(37,'2',23,'2.23','N1_8.3 3x_alt.mp4'),(38,'2',24,'2.24','N1_8.4 5x_dir.mp4'),(39,'2',25,'2.25','N1_8.5 5x_esq.mp4'),(40,'2',26,'2.26','N1_8.6 5x_alt.mp4'),(41,'2',27,'2.27','N1_9.1 3x.mp4'),(42,'2',28,'2.28','N1_9.2 5x.mp4'),(43,'3',29,'3.29','N3_9.2 5x.mp4'),(44,'3',30,'3.30','N3_9.2 5x.mp4'),(45,'3',31,'3.31','N3_9.2 5x.mp4'),(46,'3',32,'3.32','N3_9.2 5x.mp4'),(47,'3',33,'3.33','N3_9.2 5x.mp4');
/*!40000 ALTER TABLE `exercises_videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_videos`
--

DROP TABLE IF EXISTS `player_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player_videos` (
  `UNIQUE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PLAYER_ID` decimal(20,0) DEFAULT NULL,
  `FILE_NAME` varchar(1000) COLLATE utf16_bin DEFAULT NULL,
  `EXERCISE_LEVEL` decimal(3,0) DEFAULT NULL,
  `EXERCISE_NUMBER` decimal(3,0) DEFAULT NULL,
  `EXERCISE_ID` varchar(5) COLLATE utf16_bin DEFAULT NULL,
  `VIDEO_UPLOADED` tinyint(1) DEFAULT '1',
  `VIDEO_REVIEWED` tinyint(1) DEFAULT '0',
  `CREATED_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UNIQUE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf16 COLLATE=utf16_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_videos`
--

LOCK TABLES `player_videos` WRITE;
/*!40000 ALTER TABLE `player_videos` DISABLE KEYS */;
INSERT INTO `player_videos` VALUES (1,1,'AfterFinishAndApprove.mp4',1,1,'1.1',1,0,'2020-04-19 16:14:43'),(2,1,'AfterFinishAndApprove.mp4',1,12,'1.12',1,0,'2020-04-21 17:08:34'),(3,3,'AfterFinishAndApprove.mp4',1,12,'1.12',1,0,'2020-04-28 20:53:45'),(4,3,'PR_IE_worklist-issue.mp4',1,24,'1.24',1,0,'2020-04-28 20:54:16'),(5,3,'PR_IE_worklist-issue.mp4',1,8,'1.8',1,0,'2020-04-28 20:55:27'),(6,3,'PR_IE_worklist-issue.mp4',1,12,'1.12',1,0,'2020-04-28 21:15:47'),(7,3,'PR_IE_worklist-issue.mp4',1,16,'1.16',1,0,'2020-04-28 21:17:19'),(8,3,'AfterFinishAndApprove.mp4',1,12,'1.12',1,0,'2020-04-28 21:33:31'),(9,3,'AfterFinishAndApprove.mp4',1,12,'1.12',1,0,'2020-04-28 21:35:51');
/*!40000 ALTER TABLE `player_videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `FIRST_NAME` varchar(50) DEFAULT NULL,
  `LAST_NAME` varchar(50) DEFAULT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PLAYER_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `PASSWORD` varchar(500) NOT NULL,
  `ITERATIONS` int(10) NOT NULL,
  `ROLE` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`PLAYER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Adérito','Oliveira','aderito.nelson1@gmail.com',1,'87489a38f3b72beca127efa57f141fdff63db76041de678499a22789e05fcce208f37fead16b2654b12a6214a756b2ee98fcaa6adad73dd27e70042a0a6b955b',100,'Player'),('admin','admin','admin@gmail.com',2,'87489a38f3b72beca127efa57f141fdff63db76041de678499a22789e05fcce208f37fead16b2654b12a6214a756b2ee98fcaa6adad73dd27e70042a0a6b955b',100,'Admin'),('António','Fagundes','aderito1@gmail.com',3,'87489a38f3b72beca127efa57f141fdff63db76041de678499a22789e05fcce208f37fead16b2654b12a6214a756b2ee98fcaa6adad73dd27e70042a0a6b955b',100,'Player');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'playsocceronline'
--
