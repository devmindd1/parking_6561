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

 Date: 29/09/2023 16:34:13
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
  `issue_date` datetime NULL DEFAULT NULL,
  `license_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `valid_until_date` datetime NULL DEFAULT NULL,
  `issuing_country_id` int(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 1, 'admin@admin.com', 'super ', 'admin', 'admin', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'admin', '', 0, '2023-09-12 12:33:37', '5920136bf759c78aeb2ba1a936e07e115427b647ea0ea5115cabd55c7a049d67', NULL, '0', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (2, 1, 'customer@customer.com', 'customer1', 'customer 1', 'customer 1', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'owner', '', 0, '2023-09-05 17:40:14', '7da3053c7585d056382f3be7a8c026ece8af6edd0b7b8805a38780594209ef64', NULL, '0', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (3, 1, 'test1@customer1.com', 'customer2', 'customer 2', 'customer 2', 'test', 'user', '', 0, '2023-09-05 17:41:08', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (4, 1, 'test2@customer2.com', 'customer3', 'customer 3', 'customer 3', 'test', 'user', '', 0, '2023-09-14 17:41:54', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (5, 1, 'asda@mail.com', 'sdas', 'sdfsd', 'sdfsdf', '$2b$04$O8b9uiif.y8zo2XBuP7HNOumtUXv1U5xGAfNTkufR462erxUEetIe', 'user', '', 5, '2012-12-12 00:00:00', NULL, '', 'sd4fs65d4f4s', '0', '2012-12-11 00:00:00', 's6fd54sd654f', '2012-12-15 00:00:00', 5);
INSERT INTO `users` VALUES (6, 1, 'as888da@mail.com', 'sdas', 'sdfsd', 'sdfsdf', '$2b$04$5lShrXrklZkB2SX6l.ezmeNljqIGEZr0EGFfc7h.YDV8xWAS55yG6', 'user', '', 5, '2012-12-12 00:00:00', NULL, '', 'sd4fs65d4f4s', '0', '2012-12-11 00:00:00', 's6fd54sd654f', '2012-12-15 00:00:00', 5);
INSERT INTO `users` VALUES (7, 1, 'as888d88a@mail.com', 'sdas', 'sdfsd', 'sdfsdf', '$2b$04$MlmKz3ppUuhVQ79Ei.yX0uSy/5qBeIlsVjq7oNWiVPfyqFNlYjzt6', 'user', '', 5, '2012-12-12 00:00:00', NULL, '', 'sd4fs65d4f4s', '0', '2012-12-11 00:00:00', 's6fd54sd654f', '2012-12-15 00:00:00', 5);
INSERT INTO `users` VALUES (8, 1, 'as88ii8d88a@mail.com', 'sdas', 'sdfsd', 'sdfsdf', '$2b$04$Od473k5ZX53jxj9GfRjR4u8zsLGlv0hNZ12Ly6Y6gqJjf8peoW.Mu', 'user', '', 5, '2012-12-12 00:00:00', NULL, '', 'sd4fs65d4f4s', '0', '2012-12-11 00:00:00', 's6fd54sd654f', '2012-12-15 00:00:00', 5);
INSERT INTO `users` VALUES (9, 1, 'asdd88ii8d88a@mail.com', 'sdas', 'sdfsd', 'sdfsdf', '$2b$04$uWWnxFZGs1fM6TBwy4JH9u3oXCIlHN4KAZA2SzQCo.2QHeR687VYm', 'user', '', 5, '2012-12-12 00:00:00', NULL, '', 'sd4fs65d4f4s', '0', '2012-12-11 00:00:00', 's6fd54sd654f', '2012-12-15 00:00:00', 5);

SET FOREIGN_KEY_CHECKS = 1;
