/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 10.4.27-MariaDB : Database - hotel_njt
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`hotel_njt` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;

USE `hotel_njt`;

/*Table structure for table `city` */

DROP TABLE IF EXISTS `city`;

CREATE TABLE `city` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `zipcode` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_5ssnl0pksajjiqb62cah37kto` (`zipcode`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `city` */

insert  into `city`(`id`,`name`,`zipcode`) values 
(1,'Beograd',11000),
(2,'Zajecar',19000),
(3,'Novi Sad',21000),
(4,'Leskovac',16000),
(5,'Nis',18000),
(6,'Vranje',17500),
(7,'Subotica',24000),
(8,'Valjevo',14000),
(9,'Kragujevac',34000);

/*Table structure for table `city_seq` */

DROP TABLE IF EXISTS `city_seq`;

CREATE TABLE `city_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `city_seq` */

insert  into `city_seq`(`next_val`) values 
(1);

/*Table structure for table `guest` */

DROP TABLE IF EXISTS `guest`;

CREATE TABLE `guest` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `birthdate` date DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `city_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKo2g28hagcl3gmn38tjkocki28` (`city_id`),
  CONSTRAINT `FKo2g28hagcl3gmn38tjkocki28` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `guest` */

insert  into `guest`(`id`,`birthdate`,`first_name`,`last_name`,`city_id`) values 
(1,'2000-01-01','Luka','Lukic',1),
(2,'2000-01-01','Ana','Anic',2),
(3,'2000-01-01','Zika','Zikic',3),
(4,'2000-01-01','Mitar','Miric',2),
(5,'2000-01-01','Pera','Peric',1),
(6,'2000-01-01','Steva','Stevic',3),
(7,'2000-01-01','Iva','Ivic',1);

/*Table structure for table `guest_seq` */

DROP TABLE IF EXISTS `guest_seq`;

CREATE TABLE `guest_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `guest_seq` */

insert  into `guest_seq`(`next_val`) values 
(1);

/*Table structure for table `rating` */

DROP TABLE IF EXISTS `rating`;

CREATE TABLE `rating` (
  `rating` int(11) NOT NULL,
  `room_id` bigint(20) NOT NULL,
  `guest_id` bigint(20) NOT NULL,
  PRIMARY KEY (`guest_id`,`room_id`),
  KEY `FKr8ro1xmfi29ax6feq647uuh11` (`room_id`),
  CONSTRAINT `FKaa1vm2ib665f37uf8td5us0n2` FOREIGN KEY (`guest_id`) REFERENCES `guest` (`id`),
  CONSTRAINT `FKr8ro1xmfi29ax6feq647uuh11` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `rating` */

insert  into `rating`(`rating`,`room_id`,`guest_id`) values 
(3,1,1),
(3,2,1),
(4,1,2),
(5,2,2);

/*Table structure for table `reservation` */

DROP TABLE IF EXISTS `reservation`;

CREATE TABLE `reservation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `guest_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8rduaf1n8es4jf5wagbjhjepj` (`guest_id`),
  CONSTRAINT `FK8rduaf1n8es4jf5wagbjhjepj` FOREIGN KEY (`guest_id`) REFERENCES `guest` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `reservation` */

insert  into `reservation`(`id`,`date_from`,`date_to`,`guest_id`) values 
(19,'2023-06-05','2023-06-10',2),
(20,'2023-03-02','2023-06-10',2);

/*Table structure for table `reservation_seq` */

DROP TABLE IF EXISTS `reservation_seq`;

CREATE TABLE `reservation_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `reservation_seq` */

insert  into `reservation_seq`(`next_val`) values 
(251);

/*Table structure for table `reservationitem` */

DROP TABLE IF EXISTS `reservationitem`;

CREATE TABLE `reservationitem` (
  `item_number` bigint(20) NOT NULL,
  `reservation_id` bigint(20) NOT NULL,
  `guest_id` bigint(20) DEFAULT NULL,
  `room_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`item_number`,`reservation_id`),
  KEY `FK5pysmiysacve1hrrtpu5b2th0` (`guest_id`),
  KEY `FKor79yyljiubyfrlpi1n4hw0t4` (`reservation_id`),
  KEY `FK2peyywlb5j8a2t4t9buhi4duj` (`room_id`),
  CONSTRAINT `FK2peyywlb5j8a2t4t9buhi4duj` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `FK5pysmiysacve1hrrtpu5b2th0` FOREIGN KEY (`guest_id`) REFERENCES `guest` (`id`),
  CONSTRAINT `FKor79yyljiubyfrlpi1n4hw0t4` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `reservationitem` */

insert  into `reservationitem`(`item_number`,`reservation_id`,`guest_id`,`room_id`) values 
(1,19,2,1),
(1,20,2,2),
(2,19,1,1),
(2,20,7,2),
(3,20,1,2),
(5,20,5,3),
(6,20,6,3);

/*Table structure for table `room` */

DROP TABLE IF EXISTS `room`;

CREATE TABLE `room` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `floor` int(11) NOT NULL,
  `status` bit(1) NOT NULL,
  `room_type_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKo3tqw5da8v4r3gaiao5c85rel` (`room_type_id`),
  CONSTRAINT `FKo3tqw5da8v4r3gaiao5c85rel` FOREIGN KEY (`room_type_id`) REFERENCES `roomtype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `room` */

insert  into `room`(`id`,`floor`,`status`,`room_type_id`) values 
(1,0,'',1),
(2,0,'',2),
(3,1,'',1),
(4,0,'\0',2),
(5,2,'\0',3),
(6,1,'\0',2);

/*Table structure for table `room_seq` */

DROP TABLE IF EXISTS `room_seq`;

CREATE TABLE `room_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `room_seq` */

insert  into `room_seq`(`next_val`) values 
(1);

/*Table structure for table `roomtype` */

DROP TABLE IF EXISTS `roomtype`;

CREATE TABLE `roomtype` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `area` int(11) NOT NULL,
  `beds` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `roomtype` */

insert  into `roomtype`(`id`,`area`,`beds`) values 
(1,65,2),
(2,75,3),
(3,85,4);

/*Table structure for table `roomtype_seq` */

DROP TABLE IF EXISTS `roomtype_seq`;

CREATE TABLE `roomtype_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `roomtype_seq` */

insert  into `roomtype_seq`(`next_val`) values 
(1);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`password`,`username`) values 
(1,'Branislav Trajkov','$2a$12$ZOSt.I2PdJ1wAlUs.H.xUePwic9BNn36zV/CHCOdQ1CX3BjXlW9RO','bane'),
(2,'Nikola Mijailovic','$2a$12$vAtj4jygnre1dXXIFVBsA.dhkBkF2GikXr.NHMmphF4YrJKaN5MuW','nikola'),
(3,'Ivana Milanovic','$2a$12$U4LKHNHk5I4.o.hz3uWNv.uZDB1RZM.f0APYtq7rLdXS/YKfPRFy6','ivana');

/*Table structure for table `user_seq` */

DROP TABLE IF EXISTS `user_seq`;

CREATE TABLE `user_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `user_seq` */

insert  into `user_seq`(`next_val`) values 
(1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
