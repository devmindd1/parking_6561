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

 Date: 03/10/2023 16:47:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users_additional_qualification_types_map
-- ----------------------------
DROP TABLE IF EXISTS `users_additional_qualification_types_map`;
CREATE TABLE `users_additional_qualification_types_map`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED NOT NULL,
  `additional_qualification_type_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_additional_qualification_types_map
-- ----------------------------
INSERT INTO `users_additional_qualification_types_map` VALUES (1, 7, '1');
INSERT INTO `users_additional_qualification_types_map` VALUES (2, 7, '2');
INSERT INTO `users_additional_qualification_types_map` VALUES (3, 7, '3');
INSERT INTO `users_additional_qualification_types_map` VALUES (4, 8, '1');
INSERT INTO `users_additional_qualification_types_map` VALUES (5, 8, '2');
INSERT INTO `users_additional_qualification_types_map` VALUES (6, 8, '3');
INSERT INTO `users_additional_qualification_types_map` VALUES (7, 9, '1');
INSERT INTO `users_additional_qualification_types_map` VALUES (8, 9, '2');
INSERT INTO `users_additional_qualification_types_map` VALUES (9, 9, '3');
INSERT INTO `users_additional_qualification_types_map` VALUES (10, 13, 'Night flight');

SET FOREIGN_KEY_CHECKS = 1;
