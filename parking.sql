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

 Date: 12/09/2023 14:23:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for additional_qualification_types
-- ----------------------------
DROP TABLE IF EXISTS `additional_qualification_types`;
CREATE TABLE `additional_qualification_types`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of additional_qualification_types
-- ----------------------------

-- ----------------------------
-- Table structure for aircraft_types
-- ----------------------------
DROP TABLE IF EXISTS `aircraft_types`;
CREATE TABLE `aircraft_types`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of aircraft_types
-- ----------------------------

-- ----------------------------
-- Table structure for airfields
-- ----------------------------
DROP TABLE IF EXISTS `airfields`;
CREATE TABLE `airfields`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED NOT NULL,
  `spaces_count` tinyint(3) UNSIGNED NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `primary_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone_number` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `manager_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `operating_license_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` tinyint(3) UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of airfields
-- ----------------------------
INSERT INTO `airfields` VALUES (1, 2, 5, 'address airfield 1', 'primary@mail.com', '0123456789', 'manager name 1', NULL, 1);
INSERT INTO `airfields` VALUES (2, 2, 5, 'address airfield 2', 'primary@mail1.com', '0123456789', 'manager name 2', NULL, 0);

-- ----------------------------
-- Table structure for airfields_sources
-- ----------------------------
DROP TABLE IF EXISTS `airfields_sources`;
CREATE TABLE `airfields_sources`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `airfield_id` int(10) UNSIGNED NOT NULL,
  `file_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of airfields_sources
-- ----------------------------
INSERT INTO `airfields_sources` VALUES (1, 10, 'uploads/users/owners/661368ad8f6eb3e741a9663e2abe7171e046879a.jpeg');
INSERT INTO `airfields_sources` VALUES (2, 10, 'uploads/users/owners/bb74d1cd0cdf23d906f2fd176ab638e074e29f97.jpeg');
INSERT INTO `airfields_sources` VALUES (3, 11, 'uploads/users/owners/f37d417873b9f8900f85101083c2fd35e3454190.jpeg');
INSERT INTO `airfields_sources` VALUES (4, 11, 'uploads/users/owners/1ad1d876d9c1751a53c4f0ef79c2e66996ef172e.jpeg');
INSERT INTO `airfields_sources` VALUES (5, 12, 'uploads/users/owners/ca6b3d6440f9e16ea1266e0a6fb2a964351c14fd.jpeg');
INSERT INTO `airfields_sources` VALUES (6, 12, 'uploads/users/owners/aad04921e5faee43d1ca586a9cfd9d937accb016.jpeg');

-- ----------------------------
-- Table structure for airfields_spaces
-- ----------------------------
DROP TABLE IF EXISTS `airfields_spaces`;
CREATE TABLE `airfields_spaces`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `airfield_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `color` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 71 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of airfields_spaces
-- ----------------------------
INSERT INTO `airfields_spaces` VALUES (1, 1, '0', '#8cc45a');
INSERT INTO `airfields_spaces` VALUES (2, 1, '1', '#d69841');
INSERT INTO `airfields_spaces` VALUES (3, 1, '2', '#059aff');
INSERT INTO `airfields_spaces` VALUES (4, 1, '3', '#e71f33');
INSERT INTO `airfields_spaces` VALUES (5, 1, '4', '#ff5722');
INSERT INTO `airfields_spaces` VALUES (6, 2, '0', NULL);
INSERT INTO `airfields_spaces` VALUES (7, 2, '1', NULL);
INSERT INTO `airfields_spaces` VALUES (8, 2, '2', NULL);
INSERT INTO `airfields_spaces` VALUES (9, 2, '3', NULL);
INSERT INTO `airfields_spaces` VALUES (10, 2, '4', NULL);
INSERT INTO `airfields_spaces` VALUES (11, 3, '0', NULL);
INSERT INTO `airfields_spaces` VALUES (12, 3, '1', NULL);
INSERT INTO `airfields_spaces` VALUES (13, 3, '2', NULL);
INSERT INTO `airfields_spaces` VALUES (14, 3, '3', NULL);
INSERT INTO `airfields_spaces` VALUES (15, 3, '4', NULL);
INSERT INTO `airfields_spaces` VALUES (16, 4, '0', NULL);
INSERT INTO `airfields_spaces` VALUES (17, 4, '1', NULL);
INSERT INTO `airfields_spaces` VALUES (18, 4, '2', NULL);
INSERT INTO `airfields_spaces` VALUES (19, 4, '3', NULL);
INSERT INTO `airfields_spaces` VALUES (20, 4, '4', NULL);
INSERT INTO `airfields_spaces` VALUES (21, 5, '0', NULL);
INSERT INTO `airfields_spaces` VALUES (22, 5, '1', NULL);
INSERT INTO `airfields_spaces` VALUES (23, 5, '2', NULL);
INSERT INTO `airfields_spaces` VALUES (24, 5, '3', NULL);
INSERT INTO `airfields_spaces` VALUES (25, 5, '4', NULL);
INSERT INTO `airfields_spaces` VALUES (26, 6, '0', NULL);
INSERT INTO `airfields_spaces` VALUES (27, 6, '1', NULL);
INSERT INTO `airfields_spaces` VALUES (28, 6, '2', NULL);
INSERT INTO `airfields_spaces` VALUES (29, 6, '3', NULL);
INSERT INTO `airfields_spaces` VALUES (30, 6, '4', NULL);
INSERT INTO `airfields_spaces` VALUES (31, 7, '0', NULL);
INSERT INTO `airfields_spaces` VALUES (32, 7, '1', NULL);
INSERT INTO `airfields_spaces` VALUES (33, 7, '2', NULL);
INSERT INTO `airfields_spaces` VALUES (34, 7, '3', NULL);
INSERT INTO `airfields_spaces` VALUES (35, 7, '4', NULL);
INSERT INTO `airfields_spaces` VALUES (36, 10, '0', NULL);
INSERT INTO `airfields_spaces` VALUES (37, 10, '1', NULL);
INSERT INTO `airfields_spaces` VALUES (38, 10, '2', NULL);
INSERT INTO `airfields_spaces` VALUES (39, 10, '3', NULL);
INSERT INTO `airfields_spaces` VALUES (40, 10, '4', NULL);
INSERT INTO `airfields_spaces` VALUES (41, 11, '0', NULL);
INSERT INTO `airfields_spaces` VALUES (42, 11, '1', NULL);
INSERT INTO `airfields_spaces` VALUES (43, 11, '2', NULL);
INSERT INTO `airfields_spaces` VALUES (44, 11, '3', NULL);
INSERT INTO `airfields_spaces` VALUES (45, 11, '4', NULL);
INSERT INTO `airfields_spaces` VALUES (46, 12, '0', NULL);
INSERT INTO `airfields_spaces` VALUES (47, 12, '1', NULL);
INSERT INTO `airfields_spaces` VALUES (48, 12, '2', NULL);
INSERT INTO `airfields_spaces` VALUES (49, 12, '3', NULL);
INSERT INTO `airfields_spaces` VALUES (50, 12, '4', NULL);
INSERT INTO `airfields_spaces` VALUES (51, 13, '0', NULL);
INSERT INTO `airfields_spaces` VALUES (52, 13, '1', NULL);
INSERT INTO `airfields_spaces` VALUES (53, 13, '2', NULL);
INSERT INTO `airfields_spaces` VALUES (54, 13, '3', NULL);
INSERT INTO `airfields_spaces` VALUES (55, 13, '4', NULL);
INSERT INTO `airfields_spaces` VALUES (56, 14, '0', NULL);
INSERT INTO `airfields_spaces` VALUES (57, 14, '1', NULL);
INSERT INTO `airfields_spaces` VALUES (58, 14, '2', NULL);
INSERT INTO `airfields_spaces` VALUES (59, 14, '3', NULL);
INSERT INTO `airfields_spaces` VALUES (60, 14, '4', NULL);
INSERT INTO `airfields_spaces` VALUES (61, 15, '0', NULL);
INSERT INTO `airfields_spaces` VALUES (62, 15, '1', NULL);
INSERT INTO `airfields_spaces` VALUES (63, 15, '2', NULL);
INSERT INTO `airfields_spaces` VALUES (64, 15, '3', NULL);
INSERT INTO `airfields_spaces` VALUES (65, 15, '4', NULL);
INSERT INTO `airfields_spaces` VALUES (66, 16, '0', NULL);
INSERT INTO `airfields_spaces` VALUES (67, 16, '1', NULL);
INSERT INTO `airfields_spaces` VALUES (68, 16, '2', NULL);
INSERT INTO `airfields_spaces` VALUES (69, 16, '3', NULL);
INSERT INTO `airfields_spaces` VALUES (70, 16, '4', NULL);

-- ----------------------------
-- Table structure for airfields_spaces_bookings
-- ----------------------------
DROP TABLE IF EXISTS `airfields_spaces_bookings`;
CREATE TABLE `airfields_spaces_bookings`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED NULL DEFAULT NULL,
  `airfields_space_id` int(10) UNSIGNED NOT NULL,
  `start_timestamp` datetime NOT NULL,
  `end_timestamp` datetime NOT NULL,
  `status` tinyint(3) UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of airfields_spaces_bookings
-- ----------------------------
INSERT INTO `airfields_spaces_bookings` VALUES (1, 2, 1, '2023-09-13 17:12:36', '2023-09-13 21:12:46', 0);
INSERT INTO `airfields_spaces_bookings` VALUES (2, 2, 1, '2023-09-14 21:30:00', '2023-09-15 13:00:00', 0);
INSERT INTO `airfields_spaces_bookings` VALUES (3, 3, 6, '2023-09-14 17:14:04', '2023-09-15 17:14:17', 1);
INSERT INTO `airfields_spaces_bookings` VALUES (4, 4, 2, '2023-09-16 17:12:36', '2023-09-18 21:12:46', 0);
INSERT INTO `airfields_spaces_bookings` VALUES (5, 2, 6, '2023-09-06 21:30:00', '2023-09-06 23:00:00', 1);
INSERT INTO `airfields_spaces_bookings` VALUES (6, 3, 7, '2023-09-07 17:14:04', '2023-09-07 23:14:17', 0);
INSERT INTO `airfields_spaces_bookings` VALUES (7, 4, 3, '2023-09-19 17:12:36', '2023-09-19 21:12:46', 1);
INSERT INTO `airfields_spaces_bookings` VALUES (8, 3, 7, '2023-09-07 11:30:00', '2023-09-07 16:00:00', 1);
INSERT INTO `airfields_spaces_bookings` VALUES (9, 4, 3, '2023-09-26 17:14:04', '2023-09-26 22:14:17', 0);

-- ----------------------------
-- Table structure for colors
-- ----------------------------
DROP TABLE IF EXISTS `colors`;
CREATE TABLE `colors`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of colors
-- ----------------------------

-- ----------------------------
-- Table structure for countries
-- ----------------------------
DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` char(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 247 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of countries
-- ----------------------------
INSERT INTO `countries` VALUES (1, 'AF', 'Afghanistan');
INSERT INTO `countries` VALUES (2, 'AL', 'Albania');
INSERT INTO `countries` VALUES (3, 'DZ', 'Algeria');
INSERT INTO `countries` VALUES (4, 'AS', 'American Samoa');
INSERT INTO `countries` VALUES (5, 'AD', 'Andorra');
INSERT INTO `countries` VALUES (6, 'AO', 'Angola');
INSERT INTO `countries` VALUES (7, 'AI', 'Anguilla');
INSERT INTO `countries` VALUES (8, 'AQ', 'Antarctica');
INSERT INTO `countries` VALUES (9, 'AG', 'Antigua and Barbuda');
INSERT INTO `countries` VALUES (10, 'AR', 'Argentina');
INSERT INTO `countries` VALUES (11, 'AM', 'Armenia');
INSERT INTO `countries` VALUES (12, 'AW', 'Aruba');
INSERT INTO `countries` VALUES (13, 'AU', 'Australia');
INSERT INTO `countries` VALUES (14, 'AT', 'Austria');
INSERT INTO `countries` VALUES (15, 'AZ', 'Azerbaijan');
INSERT INTO `countries` VALUES (16, 'BS', 'Bahamas');
INSERT INTO `countries` VALUES (17, 'BH', 'Bahrain');
INSERT INTO `countries` VALUES (18, 'BD', 'Bangladesh');
INSERT INTO `countries` VALUES (19, 'BB', 'Barbados');
INSERT INTO `countries` VALUES (20, 'BY', 'Belarus');
INSERT INTO `countries` VALUES (21, 'BE', 'Belgium');
INSERT INTO `countries` VALUES (22, 'BZ', 'Belize');
INSERT INTO `countries` VALUES (23, 'BJ', 'Benin');
INSERT INTO `countries` VALUES (24, 'BM', 'Bermuda');
INSERT INTO `countries` VALUES (25, 'BT', 'Bhutan');
INSERT INTO `countries` VALUES (26, 'BO', 'Bolivia');
INSERT INTO `countries` VALUES (27, 'BA', 'Bosnia and Herzegovina');
INSERT INTO `countries` VALUES (28, 'BW', 'Botswana');
INSERT INTO `countries` VALUES (29, 'BV', 'Bouvet Island');
INSERT INTO `countries` VALUES (30, 'BR', 'Brazil');
INSERT INTO `countries` VALUES (31, 'IO', 'British Indian Ocean Territory');
INSERT INTO `countries` VALUES (32, 'BN', 'Brunei Darussalam');
INSERT INTO `countries` VALUES (33, 'BG', 'Bulgaria');
INSERT INTO `countries` VALUES (34, 'BF', 'Burkina Faso');
INSERT INTO `countries` VALUES (35, 'BI', 'Burundi');
INSERT INTO `countries` VALUES (36, 'KH', 'Cambodia');
INSERT INTO `countries` VALUES (37, 'CM', 'Cameroon');
INSERT INTO `countries` VALUES (38, 'CA', 'Canada');
INSERT INTO `countries` VALUES (39, 'CV', 'Cape Verde');
INSERT INTO `countries` VALUES (40, 'KY', 'Cayman Islands');
INSERT INTO `countries` VALUES (41, 'CF', 'Central African Republic');
INSERT INTO `countries` VALUES (42, 'TD', 'Chad');
INSERT INTO `countries` VALUES (43, 'CL', 'Chile');
INSERT INTO `countries` VALUES (44, 'CN', 'China');
INSERT INTO `countries` VALUES (45, 'CX', 'Christmas Island');
INSERT INTO `countries` VALUES (46, 'CC', 'Cocos (Keeling) Islands');
INSERT INTO `countries` VALUES (47, 'CO', 'Colombia');
INSERT INTO `countries` VALUES (48, 'KM', 'Comoros');
INSERT INTO `countries` VALUES (49, 'CD', 'Democratic Republic of the Congo');
INSERT INTO `countries` VALUES (50, 'CG', 'Republic of Congo');
INSERT INTO `countries` VALUES (51, 'CK', 'Cook Islands');
INSERT INTO `countries` VALUES (52, 'CR', 'Costa Rica');
INSERT INTO `countries` VALUES (53, 'HR', 'Croatia (Hrvatska)');
INSERT INTO `countries` VALUES (54, 'CU', 'Cuba');
INSERT INTO `countries` VALUES (55, 'CY', 'Cyprus');
INSERT INTO `countries` VALUES (56, 'CZ', 'Czech Republic');
INSERT INTO `countries` VALUES (57, 'DK', 'Denmark');
INSERT INTO `countries` VALUES (58, 'DJ', 'Djibouti');
INSERT INTO `countries` VALUES (59, 'DM', 'Dominica');
INSERT INTO `countries` VALUES (60, 'DO', 'Dominican Republic');
INSERT INTO `countries` VALUES (61, 'TL', 'East Timor');
INSERT INTO `countries` VALUES (62, 'EC', 'Ecuador');
INSERT INTO `countries` VALUES (63, 'EG', 'Egypt');
INSERT INTO `countries` VALUES (64, 'SV', 'El Salvador');
INSERT INTO `countries` VALUES (65, 'GQ', 'Equatorial Guinea');
INSERT INTO `countries` VALUES (66, 'ER', 'Eritrea');
INSERT INTO `countries` VALUES (67, 'EE', 'Estonia');
INSERT INTO `countries` VALUES (68, 'ET', 'Ethiopia');
INSERT INTO `countries` VALUES (69, 'FK', 'Falkland Islands (Malvinas)');
INSERT INTO `countries` VALUES (70, 'FO', 'Faroe Islands');
INSERT INTO `countries` VALUES (71, 'FJ', 'Fiji');
INSERT INTO `countries` VALUES (72, 'FI', 'Finland');
INSERT INTO `countries` VALUES (73, 'FR', 'France');
INSERT INTO `countries` VALUES (74, 'FX', 'France, Metropolitan');
INSERT INTO `countries` VALUES (75, 'GF', 'French Guiana');
INSERT INTO `countries` VALUES (76, 'PF', 'French Polynesia');
INSERT INTO `countries` VALUES (77, 'TF', 'French Southern Territories');
INSERT INTO `countries` VALUES (78, 'GA', 'Gabon');
INSERT INTO `countries` VALUES (79, 'GM', 'Gambia');
INSERT INTO `countries` VALUES (80, 'GE', 'Georgia');
INSERT INTO `countries` VALUES (81, 'DE', 'Germany');
INSERT INTO `countries` VALUES (82, 'GH', 'Ghana');
INSERT INTO `countries` VALUES (83, 'GI', 'Gibraltar');
INSERT INTO `countries` VALUES (84, 'GG', 'Guernsey');
INSERT INTO `countries` VALUES (85, 'GR', 'Greece');
INSERT INTO `countries` VALUES (86, 'GL', 'Greenland');
INSERT INTO `countries` VALUES (87, 'GD', 'Grenada');
INSERT INTO `countries` VALUES (88, 'GP', 'Guadeloupe');
INSERT INTO `countries` VALUES (89, 'GU', 'Guam');
INSERT INTO `countries` VALUES (90, 'GT', 'Guatemala');
INSERT INTO `countries` VALUES (91, 'GN', 'Guinea');
INSERT INTO `countries` VALUES (92, 'GW', 'Guinea-Bissau');
INSERT INTO `countries` VALUES (93, 'GY', 'Guyana');
INSERT INTO `countries` VALUES (94, 'HT', 'Haiti');
INSERT INTO `countries` VALUES (95, 'HM', 'Heard and Mc Donald Islands');
INSERT INTO `countries` VALUES (96, 'HN', 'Honduras');
INSERT INTO `countries` VALUES (97, 'HK', 'Hong Kong');
INSERT INTO `countries` VALUES (98, 'HU', 'Hungary');
INSERT INTO `countries` VALUES (99, 'IS', 'Iceland');
INSERT INTO `countries` VALUES (100, 'IN', 'India');
INSERT INTO `countries` VALUES (101, 'IM', 'Isle of Man');
INSERT INTO `countries` VALUES (102, 'ID', 'Indonesia');
INSERT INTO `countries` VALUES (103, 'IR', 'Iran (Islamic Republic of)');
INSERT INTO `countries` VALUES (104, 'IQ', 'Iraq');
INSERT INTO `countries` VALUES (105, 'IE', 'Ireland');
INSERT INTO `countries` VALUES (106, 'IL', 'Israel');
INSERT INTO `countries` VALUES (107, 'IT', 'Italy');
INSERT INTO `countries` VALUES (108, 'CI', 'Ivory Coast');
INSERT INTO `countries` VALUES (109, 'JE', 'Jersey');
INSERT INTO `countries` VALUES (110, 'JM', 'Jamaica');
INSERT INTO `countries` VALUES (111, 'JP', 'Japan');
INSERT INTO `countries` VALUES (112, 'JO', 'Jordan');
INSERT INTO `countries` VALUES (113, 'KZ', 'Kazakhstan');
INSERT INTO `countries` VALUES (114, 'KE', 'Kenya');
INSERT INTO `countries` VALUES (115, 'KI', 'Kiribati');
INSERT INTO `countries` VALUES (116, 'KP', 'Korea, Democratic People\'s Republic of');
INSERT INTO `countries` VALUES (117, 'KR', 'Korea, Republic of');
INSERT INTO `countries` VALUES (118, 'XK', 'Kosovo');
INSERT INTO `countries` VALUES (119, 'KW', 'Kuwait');
INSERT INTO `countries` VALUES (120, 'KG', 'Kyrgyzstan');
INSERT INTO `countries` VALUES (121, 'LA', 'Lao People\'s Democratic Republic');
INSERT INTO `countries` VALUES (122, 'LV', 'Latvia');
INSERT INTO `countries` VALUES (123, 'LB', 'Lebanon');
INSERT INTO `countries` VALUES (124, 'LS', 'Lesotho');
INSERT INTO `countries` VALUES (125, 'LR', 'Liberia');
INSERT INTO `countries` VALUES (126, 'LY', 'Libyan Arab Jamahiriya');
INSERT INTO `countries` VALUES (127, 'LI', 'Liechtenstein');
INSERT INTO `countries` VALUES (128, 'LT', 'Lithuania');
INSERT INTO `countries` VALUES (129, 'LU', 'Luxembourg');
INSERT INTO `countries` VALUES (130, 'MO', 'Macau');
INSERT INTO `countries` VALUES (131, 'MK', 'North Macedonia');
INSERT INTO `countries` VALUES (132, 'MG', 'Madagascar');
INSERT INTO `countries` VALUES (133, 'MW', 'Malawi');
INSERT INTO `countries` VALUES (134, 'MY', 'Malaysia');
INSERT INTO `countries` VALUES (135, 'MV', 'Maldives');
INSERT INTO `countries` VALUES (136, 'ML', 'Mali');
INSERT INTO `countries` VALUES (137, 'MT', 'Malta');
INSERT INTO `countries` VALUES (138, 'MH', 'Marshall Islands');
INSERT INTO `countries` VALUES (139, 'MQ', 'Martinique');
INSERT INTO `countries` VALUES (140, 'MR', 'Mauritania');
INSERT INTO `countries` VALUES (141, 'MU', 'Mauritius');
INSERT INTO `countries` VALUES (142, 'YT', 'Mayotte');
INSERT INTO `countries` VALUES (143, 'MX', 'Mexico');
INSERT INTO `countries` VALUES (144, 'FM', 'Micronesia, Federated States of');
INSERT INTO `countries` VALUES (145, 'MD', 'Moldova, Republic of');
INSERT INTO `countries` VALUES (146, 'MC', 'Monaco');
INSERT INTO `countries` VALUES (147, 'MN', 'Mongolia');
INSERT INTO `countries` VALUES (148, 'ME', 'Montenegro');
INSERT INTO `countries` VALUES (149, 'MS', 'Montserrat');
INSERT INTO `countries` VALUES (150, 'MA', 'Morocco');
INSERT INTO `countries` VALUES (151, 'MZ', 'Mozambique');
INSERT INTO `countries` VALUES (152, 'MM', 'Myanmar');
INSERT INTO `countries` VALUES (153, 'NA', 'Namibia');
INSERT INTO `countries` VALUES (154, 'NR', 'Nauru');
INSERT INTO `countries` VALUES (155, 'NP', 'Nepal');
INSERT INTO `countries` VALUES (156, 'NL', 'Netherlands');
INSERT INTO `countries` VALUES (157, 'AN', 'Netherlands Antilles');
INSERT INTO `countries` VALUES (158, 'NC', 'New Caledonia');
INSERT INTO `countries` VALUES (159, 'NZ', 'New Zealand');
INSERT INTO `countries` VALUES (160, 'NI', 'Nicaragua');
INSERT INTO `countries` VALUES (161, 'NE', 'Niger');
INSERT INTO `countries` VALUES (162, 'NG', 'Nigeria');
INSERT INTO `countries` VALUES (163, 'NU', 'Niue');
INSERT INTO `countries` VALUES (164, 'NF', 'Norfolk Island');
INSERT INTO `countries` VALUES (165, 'MP', 'Northern Mariana Islands');
INSERT INTO `countries` VALUES (166, 'NO', 'Norway');
INSERT INTO `countries` VALUES (167, 'OM', 'Oman');
INSERT INTO `countries` VALUES (168, 'PK', 'Pakistan');
INSERT INTO `countries` VALUES (169, 'PW', 'Palau');
INSERT INTO `countries` VALUES (170, 'PS', 'Palestine');
INSERT INTO `countries` VALUES (171, 'PA', 'Panama');
INSERT INTO `countries` VALUES (172, 'PG', 'Papua New Guinea');
INSERT INTO `countries` VALUES (173, 'PY', 'Paraguay');
INSERT INTO `countries` VALUES (174, 'PE', 'Peru');
INSERT INTO `countries` VALUES (175, 'PH', 'Philippines');
INSERT INTO `countries` VALUES (176, 'PN', 'Pitcairn');
INSERT INTO `countries` VALUES (177, 'PL', 'Poland');
INSERT INTO `countries` VALUES (178, 'PT', 'Portugal');
INSERT INTO `countries` VALUES (179, 'PR', 'Puerto Rico');
INSERT INTO `countries` VALUES (180, 'QA', 'Qatar');
INSERT INTO `countries` VALUES (181, 'RE', 'Reunion');
INSERT INTO `countries` VALUES (182, 'RO', 'Romania');
INSERT INTO `countries` VALUES (183, 'RU', 'Russian Federation');
INSERT INTO `countries` VALUES (184, 'RW', 'Rwanda');
INSERT INTO `countries` VALUES (185, 'KN', 'Saint Kitts and Nevis');
INSERT INTO `countries` VALUES (186, 'LC', 'Saint Lucia');
INSERT INTO `countries` VALUES (187, 'VC', 'Saint Vincent and the Grenadines');
INSERT INTO `countries` VALUES (188, 'WS', 'Samoa');
INSERT INTO `countries` VALUES (189, 'SM', 'San Marino');
INSERT INTO `countries` VALUES (190, 'ST', 'Sao Tome and Principe');
INSERT INTO `countries` VALUES (191, 'SA', 'Saudi Arabia');
INSERT INTO `countries` VALUES (192, 'SN', 'Senegal');
INSERT INTO `countries` VALUES (193, 'RS', 'Serbia');
INSERT INTO `countries` VALUES (194, 'SC', 'Seychelles');
INSERT INTO `countries` VALUES (195, 'SL', 'Sierra Leone');
INSERT INTO `countries` VALUES (196, 'SG', 'Singapore');
INSERT INTO `countries` VALUES (197, 'SK', 'Slovakia');
INSERT INTO `countries` VALUES (198, 'SI', 'Slovenia');
INSERT INTO `countries` VALUES (199, 'SB', 'Solomon Islands');
INSERT INTO `countries` VALUES (200, 'SO', 'Somalia');
INSERT INTO `countries` VALUES (201, 'ZA', 'South Africa');
INSERT INTO `countries` VALUES (202, 'GS', 'South Georgia South Sandwich Islands');
INSERT INTO `countries` VALUES (203, 'SS', 'South Sudan');
INSERT INTO `countries` VALUES (204, 'ES', 'Spain');
INSERT INTO `countries` VALUES (205, 'LK', 'Sri Lanka');
INSERT INTO `countries` VALUES (206, 'SH', 'St. Helena');
INSERT INTO `countries` VALUES (207, 'PM', 'St. Pierre and Miquelon');
INSERT INTO `countries` VALUES (208, 'SD', 'Sudan');
INSERT INTO `countries` VALUES (209, 'SR', 'Suriname');
INSERT INTO `countries` VALUES (210, 'SJ', 'Svalbard and Jan Mayen Islands');
INSERT INTO `countries` VALUES (211, 'SZ', 'Eswatini');
INSERT INTO `countries` VALUES (212, 'SE', 'Sweden');
INSERT INTO `countries` VALUES (213, 'CH', 'Switzerland');
INSERT INTO `countries` VALUES (214, 'SY', 'Syrian Arab Republic');
INSERT INTO `countries` VALUES (215, 'TW', 'Taiwan');
INSERT INTO `countries` VALUES (216, 'TJ', 'Tajikistan');
INSERT INTO `countries` VALUES (217, 'TZ', 'Tanzania, United Republic of');
INSERT INTO `countries` VALUES (218, 'TH', 'Thailand');
INSERT INTO `countries` VALUES (219, 'TG', 'Togo');
INSERT INTO `countries` VALUES (220, 'TK', 'Tokelau');
INSERT INTO `countries` VALUES (221, 'TO', 'Tonga');
INSERT INTO `countries` VALUES (222, 'TT', 'Trinidad and Tobago');
INSERT INTO `countries` VALUES (223, 'TN', 'Tunisia');
INSERT INTO `countries` VALUES (224, 'TR', 'Turkey');
INSERT INTO `countries` VALUES (225, 'TM', 'Turkmenistan');
INSERT INTO `countries` VALUES (226, 'TC', 'Turks and Caicos Islands');
INSERT INTO `countries` VALUES (227, 'TV', 'Tuvalu');
INSERT INTO `countries` VALUES (228, 'UG', 'Uganda');
INSERT INTO `countries` VALUES (229, 'UA', 'Ukraine');
INSERT INTO `countries` VALUES (230, 'AE', 'United Arab Emirates');
INSERT INTO `countries` VALUES (231, 'GB', 'United Kingdom');
INSERT INTO `countries` VALUES (232, 'US', 'United States');
INSERT INTO `countries` VALUES (233, 'UM', 'United States minor outlying islands');
INSERT INTO `countries` VALUES (234, 'UY', 'Uruguay');
INSERT INTO `countries` VALUES (235, 'UZ', 'Uzbekistan');
INSERT INTO `countries` VALUES (236, 'VU', 'Vanuatu');
INSERT INTO `countries` VALUES (237, 'VA', 'Vatican City State');
INSERT INTO `countries` VALUES (238, 'VE', 'Venezuela');
INSERT INTO `countries` VALUES (239, 'VN', 'Vietnam');
INSERT INTO `countries` VALUES (240, 'VG', 'Virgin Islands (British)');
INSERT INTO `countries` VALUES (241, 'VI', 'Virgin Islands (U.S.)');
INSERT INTO `countries` VALUES (242, 'WF', 'Wallis and Futuna Islands');
INSERT INTO `countries` VALUES (243, 'EH', 'Western Sahara');
INSERT INTO `countries` VALUES (244, 'YE', 'Yemen');
INSERT INTO `countries` VALUES (245, 'ZM', 'Zambia');
INSERT INTO `countries` VALUES (246, 'ZW', 'Zimbabwe');

-- ----------------------------
-- Table structure for equipment_types
-- ----------------------------
DROP TABLE IF EXISTS `equipment_types`;
CREATE TABLE `equipment_types`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of equipment_types
-- ----------------------------

-- ----------------------------
-- Table structure for license_types
-- ----------------------------
DROP TABLE IF EXISTS `license_types`;
CREATE TABLE `license_types`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of license_types
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `surname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` enum('user','admin','owner') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'user',
  `company` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `address` varchar(255) CHARACTER SET utf32 COLLATE utf32_general_ci NULL DEFAULT '',
  `country_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `date_of_birth` datetime NOT NULL,
  `_token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `home_base` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 1, 'admin@admin.com', 'super ', 'admin', 'admin', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'admin', '', '', 0, '2023-09-12 12:33:37', '5920136bf759c78aeb2ba1a936e07e115427b647ea0ea5115cabd55c7a049d67', NULL);
INSERT INTO `users` VALUES (2, 1, 'customer@customer.com', 'customer1', 'customer 1', 'customer 1', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'owner', '', '', 0, '2023-09-05 17:40:14', '618eabb54f4638d277dd3a8d436b23c84f7d3d9b3cb6fba227a7675d790db32a', NULL);
INSERT INTO `users` VALUES (3, 1, 'test1@customer1.com', 'customer2', 'customer 2', 'customer 2', 'test', 'user', '', '', 0, '2023-09-05 17:41:08', NULL, NULL);
INSERT INTO `users` VALUES (4, 1, 'test2@customer2.com', 'customer3', 'customer 3', 'customer 3', 'test', 'user', '', '', 0, '2023-09-14 17:41:54', NULL, NULL);

-- ----------------------------
-- Table structure for users_aircrafts
-- ----------------------------
DROP TABLE IF EXISTS `users_aircrafts`;
CREATE TABLE `users_aircrafts`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED NOT NULL,
  `aircraft_type_id` int(10) UNSIGNED NOT NULL,
  `color_id` int(11) NOT NULL,
  `registration_number` varchar(0) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_aircrafts
-- ----------------------------

-- ----------------------------
-- Table structure for users_aircrafts_equipment_types_map
-- ----------------------------
DROP TABLE IF EXISTS `users_aircrafts_equipment_types_map`;
CREATE TABLE `users_aircrafts_equipment_types_map`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_aircraft_id` int(10) UNSIGNED NOT NULL,
  `equipment_type_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_aircrafts_equipment_types_map
-- ----------------------------

-- ----------------------------
-- Table structure for users_cards
-- ----------------------------
DROP TABLE IF EXISTS `users_cards`;
CREATE TABLE `users_cards`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name_on_card` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cvv` tinyint(4) NOT NULL,
  `card_number` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `valid_thru_date` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_cards
-- ----------------------------

-- ----------------------------
-- Table structure for users_qualifications
-- ----------------------------
DROP TABLE IF EXISTS `users_qualifications`;
CREATE TABLE `users_qualifications`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED NOT NULL,
  `license_type_id` int(10) UNSIGNED NOT NULL,
  `country_id` int(10) UNSIGNED NOT NULL,
  `issue_date` datetime NOT NULL,
  `calendar_date` datetime NOT NULL,
  `input` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_qualifications
-- ----------------------------

-- ----------------------------
-- Table structure for users_qualifications_additional_qualification_types_map
-- ----------------------------
DROP TABLE IF EXISTS `users_qualifications_additional_qualification_types_map`;
CREATE TABLE `users_qualifications_additional_qualification_types_map`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED NOT NULL,
  `additional_qualification_type_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_qualifications_additional_qualification_types_map
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
