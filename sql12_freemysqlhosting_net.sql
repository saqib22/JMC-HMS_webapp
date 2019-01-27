-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql12.freemysqlhosting.net
-- Generation Time: Aug 09, 2018 at 06:38 AM
-- Server version: 5.5.58-0ubuntu0.14.04.1
-- PHP Version: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql12248991`
--
CREATE DATABASE IF NOT EXISTS `sql12248991` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `sql12248991`;

-- --------------------------------------------------------

--
-- Table structure for table `Admins`
--

CREATE TABLE `Admins` (
  `userID` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Appointments`
--

CREATE TABLE `Appointments` (
  `appointmentID` int(11) NOT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `patientID` int(11) DEFAULT NULL,
  `doctorID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Appointments`
--

INSERT INTO `Appointments` (`appointmentID`, `startDate`, `endDate`, `notes`, `createdAt`, `updatedAt`, `patientID`, `doctorID`) VALUES
(1, '2018-08-05 15:30:00', '2018-08-05 16:30:00', 'abc', '2018-08-05 15:22:03', '2018-08-05 15:22:03', 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Checkups`
--

CREATE TABLE `Checkups` (
  `id` int(11) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `baseFee` int(11) DEFAULT NULL,
  `additional` int(11) DEFAULT NULL,
  `subtract` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `totalFee` int(11) DEFAULT NULL,
  `doctorShare` int(11) DEFAULT NULL,
  `lab` tinyint(1) DEFAULT NULL,
  `labFee` int(11) DEFAULT NULL,
  `labShare` int(11) DEFAULT NULL,
  `createDate` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `patientID` int(11) DEFAULT NULL,
  `doctorID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Checkups`
--

INSERT INTO `Checkups` (`id`, `notes`, `baseFee`, `additional`, `subtract`, `discount`, `totalFee`, `doctorShare`, `lab`, `labFee`, `labShare`, `createDate`, `createdAt`, `updatedAt`, `patientID`, `doctorID`) VALUES
(1, NULL, 5000, 0, 0, 0, 5000, 2000, 1, 2000, 1000, '2018-08-04', '2018-08-04 00:00:00', '2018-08-04 00:00:00', 2, 1),
(2, NULL, 7000, 0, 0, 0, 7000, 2000, 0, 0, 0, '2018-08-04', '2018-08-04 00:00:00', '2018-08-04 00:00:00', 3, 3),
(3, 'Notes', 900, 500, 0, 0, 1400, 560, 1, 1000, 200, '2018-08-05', '2018-08-05 16:53:15', '2018-08-05 16:53:15', 2, 3),
(4, NULL, 5000, 0, 0, 0, 5000, 500, 0, 0, 0, '2018-08-05', '2018-08-05 16:55:22', '2018-08-05 16:55:22', 2, 1),
(5, NULL, 5000, 0, 0, 0, 5000, 500, 1, 5000, 500, '2018-08-05', '2018-08-05 16:56:37', '2018-08-05 16:56:37', 2, 2),
(6, NULL, 5000, 0, 0, 0, 5000, 500, 1, 6000, 600, '2018-08-05', '2018-08-05 16:58:32', '2018-08-05 16:58:32', 2, 1),
(7, NULL, 900, 0, 0, 0, 900, 360, 0, 0, 0, '2018-08-05', '2018-08-05 17:03:05', '2018-08-05 17:03:05', 2, 3),
(8, NULL, 5000, 0, 0, 0, 5000, 500, 1, 500, 50, '2018-08-05', '2018-08-05 17:06:11', '2018-08-05 17:06:11', 3, 1),
(9, NULL, 900, 0, 0, 0, 900, 360, 0, 0, 0, '2018-08-05', '2018-08-05 17:10:08', '2018-08-05 17:10:08', 2, 3),
(10, NULL, 900, 0, 0, 0, 900, 360, 0, 0, 0, '2018-08-06', '2018-08-06 04:49:25', '2018-08-06 04:49:25', 2, 3),
(11, NULL, 900, 0, 0, 0, 900, 360, 0, 0, 0, '2018-08-06', '2018-08-06 04:50:22', '2018-08-06 04:50:22', 2, 3),
(12, NULL, 900, 0, 0, 0, 900, 360, 0, 0, 0, '2018-08-06', '2018-08-06 04:58:20', '2018-08-06 04:58:20', 3, 3),
(13, NULL, 5000, 0, 0, 0, 5000, 500, 0, 0, 0, '2018-08-06', '2018-08-06 05:32:23', '2018-08-06 05:32:23', 2, 1),
(14, NULL, 900, 0, 0, 0, 900, 360, 0, 0, 0, '2018-08-06', '2018-08-06 11:16:41', '2018-08-06 11:16:41', 4, 3),
(15, NULL, 800, 0, 0, 0, 800, 120, 0, 0, 0, '2018-08-06', '2018-08-06 15:57:47', '2018-08-06 15:57:47', 6, 4),
(16, NULL, 800, 0, 0, 0, 800, 120, 0, 0, 0, '2018-08-06', '2018-08-06 15:58:59', '2018-08-06 15:58:59', 6, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Doctors`
--

CREATE TABLE `Doctors` (
  `doctorID` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `cnic` varchar(15) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `fee` int(11) DEFAULT NULL,
  `share` int(11) DEFAULT NULL,
  `labShare` int(11) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `dues` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Doctors`
--

INSERT INTO `Doctors` (`doctorID`, `firstName`, `lastName`, `cnic`, `phone`, `gender`, `birthDate`, `address`, `fee`, `share`, `labShare`, `specialization`, `createdAt`, `updatedAt`, `dues`) VALUES
(1, 'Doctor', 'One', '12345', '12345', 'M', NULL, 'address', 5000, 10, 10, 'B', '2018-08-01 05:08:23', '2018-08-06 05:32:24', 2150),
(2, 'Doctor', 'Two', '12345', '12345', 'F', NULL, 'address', 5000, 10, 10, 'C', '2018-08-01 05:09:36', '2018-08-05 14:24:07', 1100),
(3, 'imran', 'tahir', '1234567890', '000333222111', 'M', NULL, 'rawalpindi', 900, 40, 20, 'B', '2018-08-02 08:01:11', '2018-08-06 16:08:16', 0),
(4, 'Ali ', 'Sibtain', '9000113537537', '0321900000', 'M', '2018-08-06', 'Lahore', 800, 15, 10, 'Eye Specialist', '2018-08-06 15:55:21', '2018-08-06 15:58:59', 240);

-- --------------------------------------------------------

--
-- Table structure for table `Finances`
--

CREATE TABLE `Finances` (
  `id` int(11) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `meal_tea` int(11) DEFAULT NULL,
  `electricity` int(11) DEFAULT NULL,
  `gas` int(11) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `rent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Finances`
--

INSERT INTO `Finances` (`id`, `date`, `meal_tea`, `electricity`, `gas`, `salary`, `total`, `createdAt`, `updatedAt`, `rent`) VALUES
(1, '2018-07-31', 500, 200, 100, 60000, 60800, '2018-08-01 07:36:31', '2018-08-01 07:36:31', 0),
(2, '2018-08-01', 0, 500, 300, 0, 800, '2018-08-01 07:36:47', '2018-08-01 07:36:47', 0),
(3, '2018-08-05', 500, 500, 0, 0, 1300, '2018-08-05 18:06:01', '2018-08-05 18:06:01', 300);

-- --------------------------------------------------------

--
-- Table structure for table `MedicineSales`
--

CREATE TABLE `MedicineSales` (
  `saleID` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `totalCostPrice` int(11) DEFAULT NULL,
  `totalSalePrice` int(11) DEFAULT NULL,
  `totalProfit` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `medicineID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `MedicineSales`
--

INSERT INTO `MedicineSales` (`saleID`, `quantity`, `totalCostPrice`, `totalSalePrice`, `totalProfit`, `date`, `createdAt`, `updatedAt`, `medicineID`) VALUES
(1, 1, 3, 4, 1, '2018-07-30', '2018-07-30 07:56:17', '2018-07-30 07:56:17', 1),
(2, 1, 8, 10, 2, '2018-07-30', '2018-07-30 07:56:36', '2018-07-30 07:56:36', 2),
(3, 1, 8, 10, 2, '2018-07-30', '2018-07-30 07:57:47', '2018-07-30 07:57:47', 2),
(4, 1, 8, 10, 2, '2018-07-30', '2018-07-30 07:58:51', '2018-07-30 07:58:51', 2),
(5, 1, 8, 10, 2, '2018-07-30', '2018-07-30 07:59:16', '2018-07-30 07:59:16', 2),
(6, 1, 8, 10, 2, '2018-07-30', '2018-07-30 08:00:39', '2018-07-30 08:00:39', 2),
(7, 1, 8, 10, 2, '2018-07-30', '2018-07-30 08:01:17', '2018-07-30 08:01:17', 2),
(8, 0, 0, 0, 0, '2018-07-30', '2018-07-30 08:01:41', '2018-07-30 08:01:41', 1),
(9, 0, 0, 0, 0, '2018-07-30', '2018-07-30 08:02:54', '2018-07-30 08:02:54', 1),
(10, 0, 0, 0, 0, '2018-07-30', '2018-07-30 08:04:20', '2018-07-30 08:04:20', 1),
(11, 0, 0, 0, 0, '2018-07-30', '2018-07-30 08:05:04', '2018-07-30 08:05:04', 1),
(12, 0, 0, 0, 0, '2018-07-30', '2018-07-30 08:05:38', '2018-07-30 08:05:38', 1),
(13, 0, 0, 0, 0, '2018-07-30', '2018-07-30 08:05:49', '2018-07-30 08:05:49', 1),
(14, 0, 0, 0, 0, '2018-07-30', '2018-07-30 08:06:10', '2018-07-30 08:06:10', 1),
(15, 0, 0, 0, 0, '2018-07-30', '2018-07-30 08:06:47', '2018-07-30 08:06:47', 1),
(16, 0, 0, 0, 0, '2018-07-30', '2018-07-30 08:06:58', '2018-07-30 08:06:58', 1),
(17, 0, 0, 0, 0, '2018-07-30', '2018-07-30 08:08:50', '2018-07-30 08:08:50', 1),
(18, 0, 0, 0, 0, '2018-07-30', '2018-07-30 08:10:35', '2018-07-30 08:10:35', 1),
(19, 0, 0, 0, 0, '2018-07-30', '2018-07-30 08:11:36', '2018-07-30 08:11:36', 1),
(20, 0, 0, 0, 0, '2018-07-30', '2018-07-30 08:12:48', '2018-07-30 08:12:48', 1),
(21, 1, 3, 4, 1, '2018-07-30', '2018-07-30 10:05:52', '2018-07-30 10:05:52', 1),
(23, 1, 3, 4, 1, '2018-07-30', '2018-07-30 11:27:11', '2018-07-30 11:27:11', 1),
(24, 1, 3, 4, 1, '2018-07-30', '2018-07-30 16:34:27', '2018-07-30 16:34:27', 1),
(25, 0, 0, 0, 0, '2018-07-31', '2018-07-31 07:39:46', '2018-07-31 07:39:46', 1),
(26, 0, 0, 0, 0, '2018-07-31', '2018-07-31 08:01:11', '2018-07-31 08:01:11', 1),
(27, 2, 6, 8, 4, '2018-07-31', '2018-07-31 08:40:38', '2018-07-31 08:40:38', 1),
(28, 3, 9, 12, 9, '2018-07-31', '2018-07-31 08:40:47', '2018-07-31 08:40:47', 1),
(29, 3, 9, 12, 9, '2018-07-31', '2018-07-31 08:41:55', '2018-07-31 08:41:55', 1),
(30, 2, 6, 8, 4, '2018-07-31', '2018-07-31 08:42:09', '2018-07-31 08:42:09', 1),
(31, 3, 9, 12, 9, '2018-07-31', '2018-07-31 08:42:22', '2018-07-31 08:42:22', 1),
(32, 3, 9, 12, 9, '2018-07-31', '2018-07-31 08:43:40', '2018-07-31 08:43:40', 1),
(33, 2, 6, 8, 2, '2018-07-31', '2018-07-31 09:29:13', '2018-07-31 09:29:13', 1),
(34, 10, 30, 40, 10, '2018-07-31', '2018-07-31 09:29:17', '2018-07-31 09:29:17', 1),
(35, 2, 6, 8, 2, '2018-07-31', '2018-07-31 11:14:17', '2018-07-31 11:14:17', 1),
(36, 2, 6, 8, 2, '2018-07-31', '2018-07-31 11:27:34', '2018-07-31 11:27:34', 1),
(37, 2, 6, 8, 2, '2018-07-31', '2018-07-31 11:28:09', '2018-07-31 11:28:09', 1),
(38, 4, 12, 16, 4, '2018-07-31', '2018-07-31 11:28:40', '2018-07-31 11:28:40', 1),
(39, 2, 6, 8, 2, '2018-07-31', '2018-07-31 11:48:06', '2018-07-31 11:48:06', 1),
(40, 2, 6, 8, 2, '2018-07-31', '2018-07-31 12:03:28', '2018-07-31 12:03:28', 1),
(41, 2, 6, 8, 2, '2018-07-31', '2018-07-31 12:04:02', '2018-07-31 12:04:02', 1),
(42, 2, 6, 8, 2, '2018-07-31', '2018-07-31 12:11:41', '2018-07-31 12:11:41', 1),
(43, 1, 3, 4, 1, '2018-08-01', '2018-08-01 13:42:25', '2018-08-01 13:42:25', 1),
(44, 1, 3, 4, 1, '2018-08-01', '2018-08-01 15:03:29', '2018-08-01 15:03:29', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Medicines`
--

CREATE TABLE `Medicines` (
  `medicineID` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `costPrice` int(11) DEFAULT NULL,
  `salePrice` int(11) DEFAULT NULL,
  `profit` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Medicines`
--

INSERT INTO `Medicines` (`medicineID`, `name`, `quantity`, `costPrice`, `salePrice`, `profit`, `createdAt`, `updatedAt`) VALUES
(1, 'Medicine One', 2, 3, 4, 1, '2018-07-30 04:59:28', '2018-08-01 15:03:29'),
(2, 'Medicine Two', 73, 7, 10, 2, '2018-07-30 04:59:36', '2018-08-08 11:02:53'),
(3, 'Medicine Three', 5, 3, 5, 2, '2018-08-02 11:02:32', '2018-08-02 11:02:32'),
(4, 'Medicine Four', 6, 7, 8, 1, '2018-08-02 11:16:32', '2018-08-02 11:16:32'),
(5, 'Medicine Four', 3, 4, 5, 1, '2018-08-02 11:16:45', '2018-08-02 11:16:45'),
(6, 'Bandage', 25, 100, 175, 75, '2018-08-02 11:25:16', '2018-08-02 11:25:16'),
(7, 'Panadol', 200, 100, 250, -25, '2018-08-02 11:25:52', '2018-08-02 11:26:57'),
(8, 'Gnc', 1000, 2000, 3000, 1000, '2018-08-06 16:19:31', '2018-08-06 16:19:31');

-- --------------------------------------------------------

--
-- Table structure for table `PaidDues`
--

CREATE TABLE `PaidDues` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `paid` int(11) DEFAULT NULL,
  `remaining` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `doctorID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Patients`
--

CREATE TABLE `Patients` (
  `patientID` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `cnic` varchar(15) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createDate` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Patients`
--

INSERT INTO `Patients` (`patientID`, `firstName`, `lastName`, `cnic`, `phone`, `gender`, `birthDate`, `address`, `createDate`, `createdAt`, `updatedAt`) VALUES
(2, 'Daniyal', 'Khalid', '12345', '12345', 'M', '2018-08-03', 'address', '2018-08-03', '2018-08-03 07:18:40', '2018-08-03 07:18:40'),
(3, 'Patient ', 'Two', '123', '123456', 'M', '2018-08-04', 'address', '2018-08-04', '2018-08-04 12:26:26', '2018-08-04 12:26:26'),
(4, 'asad', 'tabaani', '1330113537537', '03345555865', 'M', NULL, 'Banigala', NULL, '2018-08-06 11:15:28', '2018-08-06 11:15:28'),
(5, 'Qurat', 'Ul Ain', '2330113537537', '03345558654', 'F', NULL, 'Bara kahu', NULL, '2018-08-06 12:35:18', '2018-08-06 12:35:18'),
(6, 'Mahnoor', 'Khan', '1220113527527', '03216000000', 'F', '2018-07-10', 'Jehlum', NULL, '2018-08-06 15:56:41', '2018-08-06 15:56:41');

-- --------------------------------------------------------

--
-- Table structure for table `Pharmacists`
--

CREATE TABLE `Pharmacists` (
  `userID` int(11) NOT NULL,
  `prescriptionsServed` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Pharmacists`
--

INSERT INTO `Pharmacists` (`userID`, `prescriptionsServed`, `createdAt`, `updatedAt`) VALUES
(1, 0, '2018-07-23 20:14:33', '2018-07-23 20:14:33');

-- --------------------------------------------------------

--
-- Table structure for table `Prescriptions`
--

CREATE TABLE `Prescriptions` (
  `prescriptionID` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `currentlyTaking` tinyint(1) DEFAULT NULL,
  `served` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `patientID` int(11) DEFAULT NULL,
  `doctorID` int(11) DEFAULT NULL,
  `medicineID` int(11) DEFAULT NULL,
  `pharmacistID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Receptionists`
--

CREATE TABLE `Receptionists` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Receptionists`
--

INSERT INTO `Receptionists` (`id`, `createdAt`, `updatedAt`, `userID`) VALUES
(1, '2018-07-23 20:14:33', '2018-07-23 20:14:33', 2);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `cnic` varchar(15) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userType` varchar(255) DEFAULT NULL,
  `registeredBy` int(11) DEFAULT NULL,
  `contact` varchar(11) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`userID`, `firstName`, `lastName`, `cnic`, `phone`, `gender`, `birthDate`, `email`, `password`, `userType`, `registeredBy`, `contact`, `picture`, `createdAt`, `updatedAt`) VALUES
(1, 'Pharmacist', 'One', '12345-6789', '12345', 'M', '1990-10-12', 'ph1@gmail.com', '123', 'Pharmacist', 1, NULL, NULL, '2018-07-23 20:14:33', '2018-07-23 20:14:33'),
(2, 'Receptionist', 'One', '12345-6789', '12345', 'M', '1990-10-12', 'r1@gmail.com', '123', 'Receptionist', 1, NULL, NULL, '2018-07-23 20:14:33', '2018-07-23 20:14:33'),
(99, 'Admin', '', '', '', '', '0000-00-00', 'admin@gmail.com', '123', 'Admin', 1, NULL, NULL, '2018-07-26 04:10:01', '2018-07-26 04:10:01'),
(100, NULL, NULL, NULL, NULL, NULL, NULL, 'r2@gmail.com', '123', 'Receptionist', NULL, NULL, NULL, '2018-07-30 05:26:35', '2018-07-30 05:26:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admins`
--
ALTER TABLE `Admins`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `Appointments`
--
ALTER TABLE `Appointments`
  ADD PRIMARY KEY (`appointmentID`),
  ADD KEY `patientID` (`patientID`),
  ADD KEY `doctorID` (`doctorID`);

--
-- Indexes for table `Checkups`
--
ALTER TABLE `Checkups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patientID` (`patientID`),
  ADD KEY `doctorID` (`doctorID`);

--
-- Indexes for table `Doctors`
--
ALTER TABLE `Doctors`
  ADD PRIMARY KEY (`doctorID`);

--
-- Indexes for table `Finances`
--
ALTER TABLE `Finances`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `MedicineSales`
--
ALTER TABLE `MedicineSales`
  ADD PRIMARY KEY (`saleID`),
  ADD KEY `medicineID` (`medicineID`);

--
-- Indexes for table `Medicines`
--
ALTER TABLE `Medicines`
  ADD PRIMARY KEY (`medicineID`);

--
-- Indexes for table `PaidDues`
--
ALTER TABLE `PaidDues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctorID` (`doctorID`);

--
-- Indexes for table `Patients`
--
ALTER TABLE `Patients`
  ADD PRIMARY KEY (`patientID`);

--
-- Indexes for table `Pharmacists`
--
ALTER TABLE `Pharmacists`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `Prescriptions`
--
ALTER TABLE `Prescriptions`
  ADD PRIMARY KEY (`prescriptionID`),
  ADD KEY `patientID` (`patientID`),
  ADD KEY `doctorID` (`doctorID`),
  ADD KEY `medicineID` (`medicineID`),
  ADD KEY `pharmacistID` (`pharmacistID`);

--
-- Indexes for table `Receptionists`
--
ALTER TABLE `Receptionists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Appointments`
--
ALTER TABLE `Appointments`
  MODIFY `appointmentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `Checkups`
--
ALTER TABLE `Checkups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `Doctors`
--
ALTER TABLE `Doctors`
  MODIFY `doctorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `Finances`
--
ALTER TABLE `Finances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `MedicineSales`
--
ALTER TABLE `MedicineSales`
  MODIFY `saleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `Medicines`
--
ALTER TABLE `Medicines`
  MODIFY `medicineID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `PaidDues`
--
ALTER TABLE `PaidDues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Patients`
--
ALTER TABLE `Patients`
  MODIFY `patientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `Prescriptions`
--
ALTER TABLE `Prescriptions`
  MODIFY `prescriptionID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Receptionists`
--
ALTER TABLE `Receptionists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Admins`
--
ALTER TABLE `Admins`
  ADD CONSTRAINT `Admins_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Appointments`
--
ALTER TABLE `Appointments`
  ADD CONSTRAINT `Appointments_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `Patients` (`patientID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Appointments_ibfk_2` FOREIGN KEY (`doctorID`) REFERENCES `Doctors` (`doctorID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Checkups`
--
ALTER TABLE `Checkups`
  ADD CONSTRAINT `Checkups_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `Patients` (`patientID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Checkups_ibfk_2` FOREIGN KEY (`doctorID`) REFERENCES `Doctors` (`doctorID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `MedicineSales`
--
ALTER TABLE `MedicineSales`
  ADD CONSTRAINT `MedicineSales_ibfk_1` FOREIGN KEY (`medicineID`) REFERENCES `Medicines` (`medicineID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `PaidDues`
--
ALTER TABLE `PaidDues`
  ADD CONSTRAINT `PaidDues_ibfk_1` FOREIGN KEY (`doctorID`) REFERENCES `Doctors` (`doctorID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Pharmacists`
--
ALTER TABLE `Pharmacists`
  ADD CONSTRAINT `Pharmacists_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Receptionists`
--
ALTER TABLE `Receptionists`
  ADD CONSTRAINT `Receptionists_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
