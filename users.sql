/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50733
 Source Host           : localhost:3306
 Source Schema         : parking

 Target Server Type    : MySQL
 Target Server Version : 50733
 File Encoding         : 65001

 Date: 03/11/2023 13:41:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `first_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` enum('user','admin','owner') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'user',
  `address` varchar(255) CHARACTER SET utf32 COLLATE utf32_general_ci NULL DEFAULT '',
  `country_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `date_of_birth` datetime NOT NULL,
  `_token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `home_base` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `aircraft_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `color_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `color_id_1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `issue_date` datetime NULL DEFAULT NULL,
  `license_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `valid_until_date` datetime NULL DEFAULT NULL,
  `issuing_country_id` int(10) UNSIGNED NULL DEFAULT NULL,
  `forgot_password_code` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `stripe_customer_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `weight_type_id` int(10) UNSIGNED NULL DEFAULT NULL,
  `registration_number_id` int(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 1, 'admin@admin.com', 'super ', 'admin', 'admin', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'admin', '', 0, '2023-09-12 12:33:37', '5920136bf759c78aeb2ba1a936e07e115427b647ea0ea5115cabd55c7a049d67', NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL, '1', '', NULL, NULL);
INSERT INTO `users` VALUES (2, 1, 'customer@customer.com', 'customer1', 'customer 1', 'customer 1', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'owner', '', 0, '2023-09-05 17:40:14', 'cdf5bbfd005b3b4656d6e781f401104dd3c7d2e60a34e5f7bfdc530329a35c81', NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL, '1', '', NULL, NULL);
INSERT INTO `users` VALUES (3, 1, 'test1@customer1.com', 'customer2', 'customer 2', 'customer 2', 'test', 'user', '', 0, '2023-09-05 17:41:08', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL, '1', '', NULL, NULL);
INSERT INTO `users` VALUES (4, 1, 'test2@customer2.com', 'customer3', 'customer 3', 'customer 3', 'test', 'user', '', 0, '2023-09-14 17:41:54', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL, '1', '', NULL, NULL);
INSERT INTO `users` VALUES (5, 1, 'asda@mail.com', 'sdas', 'sdfsd', 'sdfsdf', '$2b$04$O8b9uiif.y8zo2XBuP7HNOumtUXv1U5xGAfNTkufR462erxUEetIe', 'user', '', 5, '2012-12-12 00:00:00', NULL, '', 'sd4fs65d4f4s', '0', NULL, '2012-12-11 00:00:00', 's6fd54sd654f', '2012-12-15 00:00:00', 5, '1', '', NULL, NULL);
INSERT INTO `users` VALUES (6, 1, 'as888da@mail.com', 'sdas', 'sdfsd', 'sdfsdf', '$2b$04$5lShrXrklZkB2SX6l.ezmeNljqIGEZr0EGFfc7h.YDV8xWAS55yG6', 'user', '', 5, '2012-12-12 00:00:00', NULL, '', 'sd4fs65d4f4s', '0', NULL, '2012-12-11 00:00:00', 's6fd54sd654f', '2012-12-15 00:00:00', 5, '1', '', NULL, NULL);
INSERT INTO `users` VALUES (7, 1, 'as888d88a@mail.com', 'sdas', 'sdfsd', 'sdfsdf', '$2b$04$MlmKz3ppUuhVQ79Ei.yX0uSy/5qBeIlsVjq7oNWiVPfyqFNlYjzt6', 'user', '', 5, '2012-12-12 00:00:00', NULL, '', 'sd4fs65d4f4s', '0', NULL, '2012-12-11 00:00:00', 's6fd54sd654f', '2012-12-15 00:00:00', 5, '1', '', NULL, NULL);
INSERT INTO `users` VALUES (8, 1, 'as88ii8d88a@mail.com', 'sdas', 'sdfsd', 'sdfsdf', '$2b$04$Od473k5ZX53jxj9GfRjR4u8zsLGlv0hNZ12Ly6Y6gqJjf8peoW.Mu', 'user', '', 5, '2012-12-12 00:00:00', NULL, '', 'sd4fs65d4f4s', '0', NULL, '2012-12-11 00:00:00', 's6fd54sd654f', '2012-12-15 00:00:00', 5, '1', '', NULL, NULL);
INSERT INTO `users` VALUES (9, 1, 'asdd88ii8d88a@mail.com', 'sdas', 'sdfsd', 'sdfsdf', '$2b$04$uWWnxFZGs1fM6TBwy4JH9u3oXCIlHN4KAZA2SzQCo.2QHeR687VYm', 'user', '', 5, '2012-12-12 00:00:00', NULL, '', 'sd4fs65d4f4s', '0', NULL, '2012-12-11 00:00:00', 's6fd54sd654f', '2012-12-15 00:00:00', 5, '1', 'cus_OqEHlBVUW9y21x', NULL, NULL);
INSERT INTO `users` VALUES (10, 1, 'asd@gmail.com', 'asda', 'asd', 'asd', '$2b$04$Iu0jminmbNdmYUrgyPV/Qequybq9ud8au5V/PuDIrvefMod2Wm5DC', 'user', '', 7, '1926-01-01 00:00:00', NULL, 'asd', '{\"id\":111191,\"number\":\"F-GASD\",\"aircraft\":\"REIMS AVIATION CESSNA F 172 N\"}', '#ff477b', NULL, '2023-10-26 00:00:00', '2023/10/26', '2023-10-26 00:00:00', 3, '1', 'cus_OqEKmPVLINytdi', NULL, NULL);
INSERT INTO `users` VALUES (11, 1, 'asd15555@gmail.com', 'asda', 'gfgfcgb', 'asdasd', '$2b$04$XOc9YxzaBPhVbz8DBerWeuCIuMPy3OFGrXtD3X4bEBaYM14HrOJFC', 'user', '', 3, '2023-10-18 00:00:00', NULL, 'asd', '{\"id\":138012,\"number\":\"F-CASD\",\"aircraft\":\"ASK 14\"}', '#ff7cca', NULL, '2023-10-10 00:00:00', '2023/10/25', '2023-10-03 00:00:00', 4, '1', '', NULL, NULL);
INSERT INTO `users` VALUES (12, 1, 'asd1666@gmail.com', 'asda', 'gfgfcgb', 'asdasd', '$2b$04$SWOL.3ttIExk3fpq0oEr1eFpX0aoVykFVpmCuoqUHKA7Lot5Iobr.', 'user', '', 3, '2023-10-18 00:00:00', NULL, 'asd', '{\"id\":138012,\"number\":\"F-CASD\",\"aircraft\":\"ASK 14\"}', '#ff7cca', NULL, '2023-10-10 00:00:00', '2023/10/25', '2023-10-03 00:00:00', 4, '1', '', NULL, NULL);
INSERT INTO `users` VALUES (13, 1, 'asd1@gmail.com', 'asda', 'gfgfcgb', 'asdasd', '$2b$04$atm1gSZBJGBFmjWsLfmb2Od7wH6RsUst/dx1APZQcFW8yMcLLZRF.', 'user', '', 3, '2023-10-18 00:00:00', NULL, 'asd', '{\"id\":138012,\"number\":\"F-CASD\",\"aircraft\":\"ASK 14\"}', '#ff7cca', NULL, '2023-10-10 00:00:00', '2023/10/25', '2023-10-03 00:00:00', 4, '1', '', NULL, NULL);
INSERT INTO `users` VALUES (14, 1, 'test111@mail.com', 'sdas', 'sdfsd', 'sdfsdf', '$2b$04$eIwTnOnyHhdPhbNfnzmqguxvqPAkt0H4mquT7IDv3OQiJnlT8HThy', 'user', '', 5, '2012-12-12 00:00:00', NULL, '', 'sd4fs65d4f4s', '0', NULL, '2012-12-11 00:00:00', 's6fd54sd654f', '2012-12-15 00:00:00', 5, '1', 'cus_OgXI9nshn8gaK7', NULL, NULL);
INSERT INTO `users` VALUES (15, 1, 'tuuuest111@mail.com', 'sdas', 'sdfsd', 'sdfsdf', '$2b$04$c.uE/sqJcpcm6R0NE2qteOqBm9x9ezeIqtM9/NWnvlxe/t8Dly59a', 'user', '', 5, '2012-12-12 00:00:00', NULL, '', 'sd4fs65d4f4s', '0', NULL, '2012-12-11 00:00:00', 's6fd54sd654f', '2012-12-15 00:00:00', 5, '1', '', NULL, NULL);
INSERT INTO `users` VALUES (16, 1, 'test123@mail.com', 'sdas', 'first_name', 'dfsdfs', '$2b$04$HH.OwD1tU929mvxij6wkguP6QFT3MSoM3wmUfG3KGa79D0KguVfcK', 'user', '', 5, '1995-12-12 00:00:00', NULL, '', 'sd4fs65d4f4s', '0', NULL, '2012-12-11 00:00:00', 's6fd54sd654f', '2012-12-15 00:00:00', 5, '1', '', NULL, NULL);
INSERT INTO `users` VALUES (17, 1, 'test1f23@mail.com', 'sdas', 'sdfsd', 'sdfsdf', '$2b$04$yLE/zcaDPLxXd/KgDxpLiedlwDyhzFT9ZPE/4qG9gvkUofELWzgHq', 'user', '', 5, '2012-12-12 00:00:00', NULL, '', 'sd4fs65d4f4s', '0', NULL, '2012-12-11 00:00:00', 's6fd54sd654f', '2012-12-15 00:00:00', 5, '', 'cus_OqEHlBVUW9y21x', NULL, NULL);
INSERT INTO `users` VALUES (18, 1, 'test1f23@maooil.com', 'sdas', 'sdfsd', 'sdfsdf', '$2b$04$yvlz.24Ft21EZRKJ7Xm1vempQtMAOW6eS09jHtCfosHNepbL/Wcee', 'user', '', 5, '2012-12-12 00:00:00', NULL, '', 'sd4fs65d4f4s', '0', NULL, '2012-12-11 00:00:00', 's6fd54sd654f', '2012-12-15 00:00:00', 5, NULL, 'cus_OqEHlBVUW9y21x', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
