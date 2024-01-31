-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: Coupons
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

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

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `coupon_id` int NOT NULL AUTO_INCREMENT,
  `store_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `coupon_code` varchar(50) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `ref_link` varchar(1000) DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `user_count` int DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `isVerified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`coupon_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `coupons_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` VALUES (2,4,'Redmi Note 12 For Just £199 at Xiaomi','93h$85n','Codes','https://www.amazon.in/Starshine-Storage-Powered-MediaTek-Display/dp/B0CMTWQYFM/ref=sr_1_2?keywords=redmi%2Bnote%2B15&qid=1703503885&sr=8-2&th=1','2023-12-29 00:00:00',0,'2023-12-25 12:30:13','     Processor: High performance MediaTek G85 ; Enhance gaming with 1GHz GPU | 16GB of RAM including 8GB virtual | 6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection | 50MP AI Triple camera |Fast Side fingerprint | 5000mAh Battery     6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection, 600nits in High Brightness mode     50MP AI Triple camera with Primary sensor of f/1.8 (4-in-1 super pixel) with the following modes: Photo | Portrait | Night | Video | 50MP mode | Time-lapse | Classic film filters | Frame | HDR | Google lens | Voice Shutter',1),(3,4,'Redmi Note 15 For Just £199 at Xiaomi','93h$85n','Deals','https://www.amazon.in/Starshine-Storage-Powered-MediaTek-Display/dp/B0CMTWQYFM/ref=sr_1_2?keywords=redmi%2Bnote%2B15&qid=1703503885&sr=8-2&th=1','2023-12-29 00:00:00',0,'2023-12-25 12:30:38','     Processor: High performance MediaTek G85 ; Enhance gaming with 1GHz GPU | 16GB of RAM including 8GB virtual | 6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection | 50MP AI Triple camera |Fast Side fingerprint | 5000mAh Battery     6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection, 600nits in High Brightness mode     50MP AI Triple camera with Primary sensor of f/1.8 (4-in-1 super pixel) with the following modes: Photo | Portrait | Night | Video | 50MP mode | Time-lapse | Classic film filters | Frame | HDR | Google lens | Voice Shutter',1),(4,4,'Redmi Note 15 For Just £199 at Xiaomi','93h$85n','Mobile','https://www.amazon.in/Starshine-Storage-Powered-MediaTek-Display/dp/B0CMTWQYFM/ref=sr_1_2?keywords=redmi%2Bnote%2B15&qid=1703503885&sr=8-2&th=1','2023-12-29 00:00:00',0,'2023-12-25 11:33:25','     Processor: High performance MediaTek G85 ; Enhance gaming with 1GHz GPU | 16GB of RAM including 8GB virtual | 6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection | 50MP AI Triple camera |Fast Side fingerprint | 5000mAh Battery     6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection, 600nits in High Brightness mode     50MP AI Triple camera with Primary sensor of f/1.8 (4-in-1 super pixel) with the following modes: Photo | Portrait | Night | Video | 50MP mode | Time-lapse | Classic film filters | Frame | HDR | Google lens | Voice Shutter',1),(5,4,'Redmi Note 15 For Just £199 at Xiaomi','93h$85n','Mobile','https://www.amazon.in/Starshine-Storage-Powered-MediaTek-Display/dp/B0CMTWQYFM/ref=sr_1_2?keywords=redmi%2Bnote%2B15&qid=1703503885&sr=8-2&th=1','2023-12-29 00:00:00',0,'2023-12-25 11:33:25','     Processor: High performance MediaTek G85 ; Enhance gaming with 1GHz GPU | 16GB of RAM including 8GB virtual | 6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection | 50MP AI Triple camera |Fast Side fingerprint | 5000mAh Battery     6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection, 600nits in High Brightness mode     50MP AI Triple camera with Primary sensor of f/1.8 (4-in-1 super pixel) with the following modes: Photo | Portrait | Night | Video | 50MP mode | Time-lapse | Classic film filters | Frame | HDR | Google lens | Voice Shutter',1),(6,4,'Redmi Note 15 For Just £199 at Xiaomi','93h$85n','Mobile','https://www.amazon.in/Starshine-Storage-Powered-MediaTek-Display/dp/B0CMTWQYFM/ref=sr_1_2?keywords=redmi%2Bnote%2B15&qid=1703503885&sr=8-2&th=1','2023-12-29 00:00:00',0,'2023-12-25 11:33:25','     Processor: High performance MediaTek G85 ; Enhance gaming with 1GHz GPU | 16GB of RAM including 8GB virtual | 6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection | 50MP AI Triple camera |Fast Side fingerprint | 5000mAh Battery     6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection, 600nits in High Brightness mode     50MP AI Triple camera with Primary sensor of f/1.8 (4-in-1 super pixel) with the following modes: Photo | Portrait | Night | Video | 50MP mode | Time-lapse | Classic film filters | Frame | HDR | Google lens | Voice Shutter',1),(7,4,'Redmi Note 15 For Just £199 at Xiaomi','93h$85n','Mobile','https://www.amazon.in/Starshine-Storage-Powered-MediaTek-Display/dp/B0CMTWQYFM/ref=sr_1_2?keywords=redmi%2Bnote%2B15&qid=1703503885&sr=8-2&th=1','2023-12-29 00:00:00',0,'2023-12-25 11:33:25','     Processor: High performance MediaTek G85 ; Enhance gaming with 1GHz GPU | 16GB of RAM including 8GB virtual | 6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection | 50MP AI Triple camera |Fast Side fingerprint | 5000mAh Battery     6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection, 600nits in High Brightness mode     50MP AI Triple camera with Primary sensor of f/1.8 (4-in-1 super pixel) with the following modes: Photo | Portrait | Night | Video | 50MP mode | Time-lapse | Classic film filters | Frame | HDR | Google lens | Voice Shutter',1),(8,4,'Redmi Note 15 For Just £199 at Xiaomi','93h$85n','Mobile','https://www.amazon.in/Starshine-Storage-Powered-MediaTek-Display/dp/B0CMTWQYFM/ref=sr_1_2?keywords=redmi%2Bnote%2B15&qid=1703503885&sr=8-2&th=1','2023-12-29 00:00:00',0,'2023-12-25 11:33:25','     Processor: High performance MediaTek G85 ; Enhance gaming with 1GHz GPU | 16GB of RAM including 8GB virtual | 6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection | 50MP AI Triple camera |Fast Side fingerprint | 5000mAh Battery     6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection, 600nits in High Brightness mode     50MP AI Triple camera with Primary sensor of f/1.8 (4-in-1 super pixel) with the following modes: Photo | Portrait | Night | Video | 50MP mode | Time-lapse | Classic film filters | Frame | HDR | Google lens | Voice Shutter',1),(9,4,'Redmi Note 15 For Just £199 at Xiaomi','93h$85n','Mobile','https://www.amazon.in/Starshine-Storage-Powered-MediaTek-Display/dp/B0CMTWQYFM/ref=sr_1_2?keywords=redmi%2Bnote%2B15&qid=1703503885&sr=8-2&th=1','2023-12-29 00:00:00',0,'2023-12-25 11:33:26','     Processor: High performance MediaTek G85 ; Enhance gaming with 1GHz GPU | 16GB of RAM including 8GB virtual | 6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection | 50MP AI Triple camera |Fast Side fingerprint | 5000mAh Battery     6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection, 600nits in High Brightness mode     50MP AI Triple camera with Primary sensor of f/1.8 (4-in-1 super pixel) with the following modes: Photo | Portrait | Night | Video | 50MP mode | Time-lapse | Classic film filters | Frame | HDR | Google lens | Voice Shutter',1),(10,4,'Redmi Note 15 For Just £199 at Xiaomi','93h$85n','Mobile','https://www.amazon.in/Starshine-Storage-Powered-MediaTek-Display/dp/B0CMTWQYFM/ref=sr_1_2?keywords=redmi%2Bnote%2B15&qid=1703503885&sr=8-2&th=1','2023-12-29 00:00:00',0,'2023-12-25 11:33:26','     Processor: High performance MediaTek G85 ; Enhance gaming with 1GHz GPU | 16GB of RAM including 8GB virtual | 6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection | 50MP AI Triple camera |Fast Side fingerprint | 5000mAh Battery     6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection, 600nits in High Brightness mode     50MP AI Triple camera with Primary sensor of f/1.8 (4-in-1 super pixel) with the following modes: Photo | Portrait | Night | Video | 50MP mode | Time-lapse | Classic film filters | Frame | HDR | Google lens | Voice Shutter',1),(11,4,'Redmi Note 15 For Just £199 at Xiaomi','93h$85n','Mobile','https://www.amazon.in/Starshine-Storage-Powered-MediaTek-Display/dp/B0CMTWQYFM/ref=sr_1_2?keywords=redmi%2Bnote%2B15&qid=1703503885&sr=8-2&th=1','2023-12-29 00:00:00',0,'2023-12-25 11:33:26','     Processor: High performance MediaTek G85 ; Enhance gaming with 1GHz GPU | 16GB of RAM including 8GB virtual | 6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection | 50MP AI Triple camera |Fast Side fingerprint | 5000mAh Battery     6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection, 600nits in High Brightness mode     50MP AI Triple camera with Primary sensor of f/1.8 (4-in-1 super pixel) with the following modes: Photo | Portrait | Night | Video | 50MP mode | Time-lapse | Classic film filters | Frame | HDR | Google lens | Voice Shutter',1),(12,4,'Redmi Note 15 For Just £199 at Xiaomi','93h$85n','Mobile','https://www.amazon.in/Starshine-Storage-Powered-MediaTek-Display/dp/B0CMTWQYFM/ref=sr_1_2?keywords=redmi%2Bnote%2B15&qid=1703503885&sr=8-2&th=1','2023-12-29 00:00:00',0,'2023-12-25 11:33:26','     Processor: High performance MediaTek G85 ; Enhance gaming with 1GHz GPU | 16GB of RAM including 8GB virtual | 6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection | 50MP AI Triple camera |Fast Side fingerprint | 5000mAh Battery     6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection, 600nits in High Brightness mode     50MP AI Triple camera with Primary sensor of f/1.8 (4-in-1 super pixel) with the following modes: Photo | Portrait | Night | Video | 50MP mode | Time-lapse | Classic film filters | Frame | HDR | Google lens | Voice Shutter',1),(13,4,'Redmi Note 15 For Just £199 at Xiaomi','93h$85n','Mobile','https://www.amazon.in/Starshine-Storage-Powered-MediaTek-Display/dp/B0CMTWQYFM/ref=sr_1_2?keywords=redmi%2Bnote%2B15&qid=1703503885&sr=8-2&th=1','2023-12-14 00:00:00',0,'2023-12-25 11:33:32','     Processor: High performance MediaTek G85 ; Enhance gaming with 1GHz GPU | 16GB of RAM including 8GB virtual | 6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection | 50MP AI Triple camera |Fast Side fingerprint | 5000mAh Battery     6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection, 600nits in High Brightness mode     50MP AI Triple camera with Primary sensor of f/1.8 (4-in-1 super pixel) with the following modes: Photo | Portrait | Night | Video | 50MP mode | Time-lapse | Classic film filters | Frame | HDR | Google lens | Voice Shutter',1),(14,4,'Redmi Note 15 For Just £199 at Xiaomi','93h$85n','Mobile','https://www.amazon.in/Starshine-Storage-Powered-MediaTek-Display/dp/B0CMTWQYFM/ref=sr_1_2?keywords=redmi%2Bnote%2B15&qid=1703503885&sr=8-2&th=1','2023-12-14 00:00:00',0,'2023-12-25 11:33:32','     Processor: High performance MediaTek G85 ; Enhance gaming with 1GHz GPU | 16GB of RAM including 8GB virtual | 6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection | 50MP AI Triple camera |Fast Side fingerprint | 5000mAh Battery     6.74\" HD+ 90Hz display with Corning Gorilla Glass 3 Protection, 600nits in High Brightness mode     50MP AI Triple camera with Primary sensor of f/1.8 (4-in-1 super pixel) with the following modes: Photo | Portrait | Night | Video | 50MP mode | Time-lapse | Classic film filters | Frame | HDR | Google lens | Voice Shutter',1),(15,1,'15% Off your purchase','COMEBACK','Deals','https://www.amazon.com/ref=nav_logo','2023-12-27 00:00:00',4,'2023-12-25 11:58:34','EXCLUSIONS Ends 12/31/2023 Exclusions apply DETAILS Tap offer to copy the coupon code. Remember to paste code when you check out. Online only.',1),(16,5,'Spofify music premium for 1 month','494kr$0r','Entertainment','https://www.amazon.in/Starshine-Storage-Powered-MediaTek-Display/dp/B0CMTWQYFM/ref=sr_1_2?keywords=redmi%2Bnote%2B15&qid=1703503885&sr=8-2&th=1','2023-12-29 00:00:00',0,'2023-12-25 11:46:15','This coupon offers an exclusive discount on a wide range of electronic products. Whether you\'re looking for the latest gadgets or upgrading your home appliances, use this coupon to save big on your purchase.',1),(17,4,'Spotify user coupon','8$#98hd-','Sale',NULL,'2023-12-28 00:00:00',0,'2023-12-25 11:53:23','To redeem this coupon, simply add your desired electronic products to the cart and enter the coupon code at checkout.',0),(18,1,'50% Off for Friends','lmzwnns','coupon','https://www.amazon.com/ref=nav_logo','2024-01-01 00:00:00',0,'2023-12-25 11:59:32','DETAILS Ends 08/01/2030 Tap offer to copy the coupon code. Remember to paste code when you check out. Online only.',1),(19,1,'25% Off with Macy\'s Text Sign Up','lmzwnns','Codes','https://www.amazon.com/ref=nav_logo','2024-01-01 00:00:00',0,'2023-12-25 12:08:45','DETAILS Ends 08/01/2030 Tap offer to copy the coupon code. Remember to paste code when you check out. Online only.',1),(20,1,'After Christmas Sale! Up to 60% Off + 20% Off Select Items','JOY','Codes','https://www.amazon.com/ref=nav_logo','2023-12-18 00:00:00',0,'2023-12-25 12:28:50','DETAILS Ends 08/01/2030 Tap offer to copy the coupon code. Remember to paste code when you check out. Online only.',1),(21,5,'Buy Online and Get Free Curbside Pickup!','JOY','Codes','https://www.spotify.com/in-en/free/?utm_source=in-en_brand_contextual_text&utm_medium=paidsearch&utm_campaign=alwayson_asia_in_premiumbusiness_core_brand_neev+contextual+in-en+google&gad_source=1&gclid=Cj0KCQiA7aSsBhCiARIsALFvovxds2m4SOsC3y_qngLvnq-rVZalCaNdG96b_ynizH7ThYNhyH75DVgaApqjEALw_wcB&gclsrc=aw.ds','2023-12-27 00:00:00',0,'2023-12-25 12:34:25','DETAILS Ends 08/01/2030 Tap offer to copy the coupon code. Remember to paste code when you check out. Online only.',1),(22,5,'25% Off On Spotify','Entertainment ','Deals','https://www.spotify.com/in-en/free/?utm_source=in-en_brand_contextual_text&utm_medium=paidsearch&utm_campaign=alwayson_asia_in_premiumbusiness_core_brand_neev+contextual+in-en+google&gad_source=1&gclid=Cj0KCQiA7aSsBhCiARIsALFvovxds2m4SOsC3y_qngLvnq-rVZalCaNdG96b_ynizH7ThYNhyH75DVgaApqjEALw_wcB&gclsrc=aw.ds','2023-12-11 00:00:00',0,'2023-12-25 12:36:23','EXCLUSIONS Ends 12/31/2023 Exclusions apply DETAILS Tap offer to copy the coupon code. Remember to paste code when you check out. Online only.',1),(23,6,'10% Off Christmas Offer','Merry Chritmas','Codes','https://www.amazon.com/ref=nav_logo','2023-12-30 00:00:00',0,'2023-12-25 12:39:01','EXCLUSIONS Ends 12/31/2023 Exclusions apply DETAILS Tap offer to copy the coupon code. Remember to paste code when you check out. Online only.',1),(24,6,'10% Off Christmas Offer','Merry Chritmas','Codes','https://www.amazon.com/ref=nav_logo','2023-12-30 00:00:00',0,'2023-12-25 12:39:05','EXCLUSIONS Ends 12/31/2023 Exclusions apply DETAILS Tap offer to copy the coupon code. Remember to paste code when you check out. Online only.',1),(25,6,'10% Off Christmas Offer','Merry Chritmas','Codes','https://www.amazon.com/ref=nav_logo','2023-12-30 00:00:00',0,'2023-12-25 12:39:05','EXCLUSIONS Ends 12/31/2023 Exclusions apply DETAILS Tap offer to copy the coupon code. Remember to paste code when you check out. Online only.',1),(26,6,'10% Off Christmas Offer','Merry Chritmas','Deals','https://www.amazon.com/ref=nav_logo','2023-12-30 00:00:00',0,'2023-12-25 12:40:50','EXCLUSIONS Ends 12/31/2023 Exclusions apply DETAILS Tap offer to copy the coupon code. Remember to paste code when you check out. Online only.',1),(27,6,'50% Off Christmas Offer','Merry Chritmas','Deals','https://www.amazon.com/ref=nav_logo','2023-12-11 00:00:00',0,'2023-12-25 12:39:40','EXCLUSIONS Ends 12/31/2023 Exclusions apply DETAILS Tap offer to copy the coupon code. Remember to paste code when you check out. Online only.',1),(28,6,'50% Off Christmas Offer','Merry Chritmas','Deals','https://www.amazon.com/ref=nav_logo','2023-12-11 00:00:00',0,'2023-12-25 12:39:41','EXCLUSIONS Ends 12/31/2023 Exclusions apply DETAILS Tap offer to copy the coupon code. Remember to paste code when you check out. Online only.',1),(29,6,'50% Off Christmas Offer','Merry Chritmas','Deals','https://www.amazon.com/ref=nav_logo','2023-12-11 00:00:00',0,'2023-12-25 12:40:02','EXCLUSIONS Ends 12/31/2023 Exclusions apply DETAILS Tap offer to copy the coupon code. Remember to paste code when you check out. Online only.',1),(30,7,'50% discount Christmas ','Christmas ','Codes ','https://www.amazon.com/?_encoding=UTF8&camp=1789&creative=390957&linkCode=ur2&tag=ret-20&ascsubtag=uuu22804846-54BE-438F-A5AA-AB6911E11AE8','2024-01-01 00:00:00',0,'2023-12-25 15:35:22','Merry Christmas ',1),(31,6,'Bb','Gh','Code',NULL,'2023-12-22 00:00:00',0,'2023-12-25 19:35:12','Bbb',0),(32,6,'Bb','Gh','Code',NULL,'2023-12-22 00:00:00',0,'2023-12-25 19:35:12','Bbb',0),(33,1,'10% off on All orders at amazon','10off','Code',NULL,'2023-12-30 00:00:00',0,'2023-12-26 06:51:40','get 10% discount on your order by using this code',0),(34,1,'Amazon','Enjoy','Code',NULL,'2024-01-01 00:00:00',0,'2023-12-26 11:17:14','EXCLUSIONS Ends 12/31/2023 Exclusions apply DETAILS Tap offer to copy the coupon code. Remember to paste code when you check out. Online only.',0),(35,1,'has','4j3k4','Sale',NULL,'2023-12-21 00:00:00',0,'2023-12-28 16:49:15','ejkekjbv',0),(36,1,'Form Reset','83974$94gh4','Code',NULL,'2023-12-30 00:00:00',0,'2023-12-29 16:15:47','I am a description',0),(37,1,'New coupons ','Asdd','Code',NULL,'2024-01-05 00:00:00',0,'2024-01-03 07:35:07','Biggest Drop in milk products',0);
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `festivalshowcase`
--

DROP TABLE IF EXISTS `festivalshowcase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `festivalshowcase` (
  `id` int NOT NULL AUTO_INCREMENT,
  `festival_name` varchar(255) NOT NULL,
  `discount` int DEFAULT '0',
  `storeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `storeId` (`storeId`),
  CONSTRAINT `festivalshowcase_ibfk_1` FOREIGN KEY (`storeId`) REFERENCES `store` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `festivalshowcase`
--

LOCK TABLES `festivalshowcase` WRITE;
/*!40000 ALTER TABLE `festivalshowcase` DISABLE KEYS */;
/*!40000 ALTER TABLE `festivalshowcase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_coupons`
--

DROP TABLE IF EXISTS `saved_coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_coupons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `coupon_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `coupon_id` (`coupon_id`),
  CONSTRAINT `saved_coupons_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `saved_coupons_ibfk_2` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`coupon_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_coupons`
--

LOCK TABLES `saved_coupons` WRITE;
/*!40000 ALTER TABLE `saved_coupons` DISABLE KEYS */;
INSERT INTO `saved_coupons` VALUES (35,NULL,19),(44,7,16);
/*!40000 ALTER TABLE `saved_coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `description` text,
  `moreAbout` text,
  `hint` text,
  `faq` json DEFAULT NULL,
  `total_ratings` bigint DEFAULT '0',
  `ratings_count` int DEFAULT '0',
  `coupons` int DEFAULT '0',
  `offers` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,'Amazon','Verified Amazon India Coupons & Promo offer','https://res.cloudinary.com/dr5fhtxon/image/upload/v1703500217/Store_logos/msijoz8qtglszbg6pids.png','Electronic','Amazon.in endeavors to build that same destination in India by giving customers more of what they want – vast selection, low prices, with fast and reliable shipping','Amazon.in endeavors to build that same destination in India by giving customers more of what they want – vast selection, low prices, with fast and reliable shippingAmazon.in endeavors to build that same destination in India by giving customers more of what they want – vast selection, low prices, with fast and reliable shippingAmazon.in endeavors to build that same destination in India by giving customers more of what they want – vast selection, low prices, with fast and reliable shipping','How can I get a  discount? Coupons are probably what Macy\'s is most famous for—the retailer always seems to be running a discount of some kind—whether that\'s in the form of a printable coupon that appears in your mailbox or a virtual Macy\'s promo code that appears in your inbox','[{\"answer\": \"Coupons are probably what Macy\'s is most famous for—the retailer always seems to be running a discount of some kind—whether that\'s in the form of a printable coupon that appears in your mailbox or a virtual Macy\'s promo code that appears in your inbox\", \"question\": \"How can I get a  discount? \"}]',30,7,9,0),(4,'Xiaomi','Xiaomi','https://res.cloudinary.com/dr5fhtxon/image/upload/v1703503575/Store_logos/dhv3pzs4u9svyf6wwzim.png','Electronic','This coupon offers an exclusive discount on a wide range of electronic products. Whether you\'re looking for the latest gadgets or upgrading your home appliances, use this coupon to save big on your purchase.','Explore the world of technology with our exclusive electronics discount coupon. From smartphones and laptops to smart home devices, this coupon opens the door to a world of possibilities. Don\'t miss out on the chance to get the latest tech at unbeatable prices.','Question 1 : How can I redeem this coupon?\r\nAnswer : To redeem this coupon, simply add your desired electronic products to the cart and enter the coupon code at checkout.\",\r\nQuestion 1: Is the discount applicable to all electronic brands?\",\r\nAnswer : Yes, the discount is applicable to products from all electronic brands available on our platform.\",\r\nQuestion 1: Are there any restrictions on the minimum purchase amount?\",\r\nAnswer: No, there is no minimum purchase amount required to use this coupon. Enjoy the discount on any eligible product.\",\r\nQuestion 1: Can I combine this coupon with other promotions?\",\r\nAnswer: Unfortunately, this coupon cannot be combined with other promotions or discounts.\",\r\nQuestion 1: What is the expiry date of this coupon?\",\r\nAnswer: This coupon is valid until [expiry date]. Make sure to use it before it expires.\"',NULL,0,0,14,0),(5,'Spotify','Spotify','https://res.cloudinary.com/dr5fhtxon/image/upload/v1703504099/Store_logos/zrf9lmfn97momnlla1xv.png','Entertainment','This coupon offers an exclusive discount on a wide range of electronic products. Whether you\'re looking for the latest gadgets or upgrading your home appliances, use this coupon to save big on your purchase.','Explore the world of technology with our exclusive electronics discount coupon. From smartphones and laptops to smart home devices, this coupon opens the door to a world of possibilities. Don\'t miss out on the chance to get the latest tech at unbeatable prices.','Question 1 : How can I redeem this coupon?\r\nAnswer : To redeem this coupon, simply add your desired electronic products to the cart and enter the coupon code at checkout.\",\r\nQuestion 1: Is the discount applicable to all electronic brands?\",\r\nAnswer : Yes, the discount is applicable to products from all electronic brands available on our platform.\",\r\nQuestion 1: Are there any restrictions on the minimum purchase amount?\",\r\nAnswer: No, there is no minimum purchase amount required to use this coupon. Enjoy the discount on any eligible product.\",\r\nQuestion 1: Can I combine this coupon with other promotions?\",\r\nAnswer: Unfortunately, this coupon cannot be combined with other promotions or discounts.\",\r\nQuestion 1: What is the expiry date of this coupon?\",\r\nAnswer: This coupon is valid until [expiry date]. Make sure to use it before it expires.\"','[{\"answer\": \"Coupons are probably what is most famous for—the retailer always seems to be running a discount of some kind—whether that\'s in the form of a printable coupon that appears in your mailbox or a virtual Macy\'s promo code that appears in your inbox.\", \"question\": \"How can I get a  discount? \"}]',0,0,3,0),(6,'Ultra Beauty','Ultra Beauty','https://res.cloudinary.com/dr5fhtxon/image/upload/v1703503639/Store_logos/baaiyavgmtiacpduz08v.jpg','Baby Toddler','This coupon offers an exclusive discount on a wide range of electronic products. Whether you\'re looking for the latest gadgets or upgrading your home appliances, use this coupon to save big on your purchase.','Explore the world of technology with our exclusive electronics discount coupon. From smartphones and laptops to smart home devices, this coupon opens the door to a world of possibilities. Don\'t miss out on the chance to get the latest tech at unbeatable prices.','Question 1 : How can I redeem this coupon?\r\nAnswer : To redeem this coupon, simply add your desired electronic products to the cart and enter the coupon code at checkout.\",\r\nQuestion 1: Is the discount applicable to all electronic brands?\",\r\nAnswer : Yes, the discount is applicable to products from all electronic brands available on our platform.\",\r\nQuestion 1: Are there any restrictions on the minimum purchase amount?\",\r\nAnswer: No, there is no minimum purchase amount required to use this coupon. Enjoy the discount on any eligible product.\",\r\nQuestion 1: Can I combine this coupon with other promotions?\",\r\nAnswer: Unfortunately, this coupon cannot be combined with other promotions or discounts.\",\r\nQuestion 1: What is the expiry date of this coupon?\",\r\nAnswer: This coupon is valid until [expiry date]. Make sure to use it before it expires.\"',NULL,6,2,9,0),(7,'Fitbit','Fitbit','https://res.cloudinary.com/dr5fhtxon/image/upload/v1703503678/Store_logos/bxytkwxq4dtltjdmhz1p.png','Health Fitness','This coupon offers an exclusive discount on a wide range of electronic products. Whether you\'re looking for the latest gadgets or upgrading your home appliances, use this coupon to save big on your purchase.','Explore the world of technology with our exclusive electronics discount coupon. From smartphones and laptops to smart home devices, this coupon opens the door to a world of possibilities. Don\'t miss out on the chance to get the latest tech at unbeatable prices.','Question 1 : How can I redeem this coupon?\r\nAnswer : To redeem this coupon, simply add your desired electronic products to the cart and enter the coupon code at checkout.\",\r\nQuestion 1: Is the discount applicable to all electronic brands?\",\r\nAnswer : Yes, the discount is applicable to products from all electronic brands available on our platform.\",\r\nQuestion 1: Are there any restrictions on the minimum purchase amount?\",\r\nAnswer: No, there is no minimum purchase amount required to use this coupon. Enjoy the discount on any eligible product.\",\r\nQuestion 1: Can I combine this coupon with other promotions?\",\r\nAnswer: Unfortunately, this coupon cannot be combined with other promotions or discounts.\",\r\nQuestion 1: What is the expiry date of this coupon?\",\r\nAnswer: This coupon is valid until [expiry date]. Make sure to use it before it expires.\"',NULL,0,0,1,0);
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_display`
--

DROP TABLE IF EXISTS `store_display`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_display` (
  `id` int NOT NULL AUTO_INCREMENT,
  `store_id` int DEFAULT NULL,
  `coupon_id` int DEFAULT NULL,
  `show_in_carousel` tinyint(1) DEFAULT '0',
  `show_in_card` tinyint(1) DEFAULT '0',
  `show_in_fetured` tinyint(1) DEFAULT '0',
  `show_in_top` tinyint(1) DEFAULT '0',
  `coupons_count` int DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `ref_link` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `store_display_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_display`
--

LOCK TABLES `store_display` WRITE;
/*!40000 ALTER TABLE `store_display` DISABLE KEYS */;
INSERT INTO `store_display` VALUES (1,1,NULL,1,0,0,0,NULL,'https://res.cloudinary.com/dr5fhtxon/image/upload/v1703501706/Store_logos/xhocfnuq8iignw3qlsre.jpg',NULL,'https://www.amazon.in/'),(4,5,NULL,1,0,0,0,NULL,'https://res.cloudinary.com/dr5fhtxon/image/upload/v1703504143/Store_logos/phawhqc9rgeybgqgqj5b.jpg',NULL,'https://www.amazon.in/Starshine-Storage-Powered-MediaTek-Display/dp/B0CMTWQYFM/ref=sr_1_2?keywords=redmi%2Bnote%2B15&qid=1703503885&sr=8-2&th=1'),(5,5,NULL,0,1,0,0,NULL,'https://res.cloudinary.com/dr5fhtxon/image/upload/v1703504195/Store_logos/ot89fvlixflxptoyg5gl.png','15 % off on this product',NULL),(6,5,NULL,0,1,0,0,NULL,'https://res.cloudinary.com/dr5fhtxon/image/upload/v1703504196/Store_logos/yv6sebblaipct6dfvtsf.png','15 % off on this product',NULL),(7,5,NULL,0,0,1,0,0,NULL,NULL,NULL),(8,4,NULL,1,0,0,0,NULL,'https://res.cloudinary.com/dr5fhtxon/image/upload/v1703504420/Store_logos/nhofh7qtlld8twojx0a1.jpg',NULL,''),(9,4,NULL,0,1,0,0,NULL,'https://res.cloudinary.com/dr5fhtxon/image/upload/v1703504443/Store_logos/q5hmtnwgh0uhdm3h0euw.jpg','',NULL),(10,4,NULL,0,0,1,0,11,NULL,NULL,NULL),(11,6,NULL,1,0,0,0,NULL,'https://res.cloudinary.com/dr5fhtxon/image/upload/v1703504489/Store_logos/j6g0yneqhytgaev7y7nu.jpg',NULL,''),(12,6,NULL,0,1,0,0,NULL,'https://res.cloudinary.com/dr5fhtxon/image/upload/v1703504507/Store_logos/poab0vwu65rqotyswole.png','',NULL),(13,6,NULL,0,0,1,0,0,NULL,NULL,NULL),(14,4,2,0,0,0,1,NULL,'https://res.cloudinary.com/dr5fhtxon/image/upload/v1703504687/Store_logos/ukxdnruvtwcmspqakexe.jpg',NULL,NULL),(15,1,15,0,0,0,1,NULL,'https://res.cloudinary.com/dr5fhtxon/image/upload/v1703504713/Store_logos/l2jejozp8pqworkcewp0.jpg',NULL,NULL),(16,5,16,0,0,0,1,NULL,'https://res.cloudinary.com/dr5fhtxon/image/upload/v1703504795/Store_logos/imdbxvreex41ss2vn0gx.webp',NULL,NULL),(17,1,18,0,0,0,1,NULL,'https://res.cloudinary.com/dr5fhtxon/image/upload/v1703505568/Store_logos/cbdxffmhcfjwtpnflxgr.jpg',NULL,NULL);
/*!40000 ALTER TABLE `store_display` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_ids`
--

DROP TABLE IF EXISTS `store_ids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_ids` (
  `id` int NOT NULL AUTO_INCREMENT,
  `store_id` int DEFAULT NULL,
  `store_type` enum('similar','popular') DEFAULT NULL,
  `sId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `store_ids_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_ids`
--

LOCK TABLES `store_ids` WRITE;
/*!40000 ALTER TABLE `store_ids` DISABLE KEYS */;
INSERT INTO `store_ids` VALUES (3,5,'similar',1),(4,1,'similar',4);
/*!40000 ALTER TABLE `store_ids` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'general',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ridham','$2a$10$E7IeGPaRpwgEMc9PPjs2tecVgXaGdw4t/D3zoGbBvz97f..VmLdBe','ridhamchauhan693@gmail.com','General'),(4,'Ridham','$2a$10$5lviAgXRJLs7OMf1.R0d0umxCpARPCGCz6k/MVdV1bVjnyUB43ulC','20itcha082@ldce.ac.in','General'),(5,'Admin','$2a$10$8YErwuQcnVGfSq0uwW0iEesojKeuJbaAd31LMZbXNfjdlvgC4lvNq','admin@gmail.com','Admin'),(6,'Ridham','$2a$10$OsP8lpaQ7AYwchUNGTAfBezEbSwsR195K6lSrxizZFBMTAgdcm1h2','abcd@gmail.com','General'),(7,'Harshal S. Kahar','$2a$10$yiU4iPzyzFRPbmnl5zR/O.O.TVZAVSizzPZSR3Q03FUAg7FYSPV9.','harshalskahar389@gmail.com','General'),(8,'Xyz','$2a$10$/WcsgGXZZW8fGfHy91qFVe2rrPPqaG1w0A2gUVTbTkTbzm6tUF7Za','xyz@gmail.com','General'),(9,'Admin Again','$2a$10$1JJ5nOQ.z2w/Z4Hd17JhROGYRhhW3nJH22eUUc4c5sP4oBL4wT1F6','adminagain@gmail.com','General'),(10,'Admin Again','$2a$10$mpgPw3qsJhZTzVlkQJUGU.ce1qwgoXHLs75sDYDyyyYkg9ikVmi8O','adminadmin@gmail.com','General'),(11,'Darshan','$2a$10$4SNxz5WsEBfMaw7mB7XffuTLBRCnMBQXdTr7iQbDt3P5MGQGu2KlS','darshanpanchal557@gmail.com','General');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-03 17:16:23
