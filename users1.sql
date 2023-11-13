/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50733
 Source Host           : localhost:3306
 Source Schema         : coach4nature

 Target Server Type    : MySQL
 Target Server Version : 50733
 File Encoding         : 65001

 Date: 09/11/2023 16:55:19
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
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `_token` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `role` enum('user','admin') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'user',
  `country_id` int(10) UNSIGNED NULL DEFAULT 0,
  `gender_id` tinyint(3) UNSIGNED NULL DEFAULT NULL,
  `phone_code_id` int(10) UNSIGNED NULL DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_active_timestamp` int(10) UNSIGNED NULL DEFAULT NULL,
  `notification_flag` tinyint(3) UNSIGNED NULL DEFAULT 1,
  `forgot_password_code` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `device_token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 93 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (2, 1, 'test11', 'admin@admin.com', 'adminL', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'ed6edb7e62cb1eed434c3f0b544e49f7c875b6efd86976177ca545b71e9eeb1f', 'admin', 0, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (66, 1, 'hhhhhhhhhhhhhhhhh', 'test@test.com', 'dfgfdg', '$2b$04$acfll5gigrbc/XhaRB6o4.AHB52Jr379il0h6q314tCaA6/JqVSku', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjYsImVtYWlsIjoidGVzdEB0ZXN0LmNvbTEiLCJmaXJzdE5hbWUiOiJoaGhoaGhoaGhoaGhoaGhoaCIsImlhdCI6MTY5Mjg4MTc1MywiZXhwIjoxNjk0MTc3NzUzfQ.h4TzutzbqLEgPfvbeVpgCMz8QZztV8zv-QzUlUjPCeY', 'user', 0, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (67, 1, 'Name', 'test@te11st.com', 'Last name ', '$2b$04$IjNVglbyE6hBQqaQD.CdgOkPtqhSGX2qvyxKFI1/JMoGwrlFEzJVO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZTExc3QuY29tIiwiZmlyc3ROYW1lIjoiTmFtZSIsImlhdCI6MTY5MTczOTg0MywiZXhwIjoxNjk0MzMxODQzfQ.dKubRy5Iv0bm31276DSnOvIYOoenxcmz4dhDSNSV98E', 'user', 0, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (68, 1, 'Name', 'test@te1hh1st.com', 'Last name ', '$2b$04$wtYBJYzBEOGVnj325yaH8Ojbu7oED28tigf3ikD4vncYeS5PnSFIe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjgsImVtYWlsIjoidGVzdEB0ZTFoaDFzdC5jb20iLCJmaXJzdE5hbWUiOiJOYW1lIiwiaWF0IjoxNjkyMTg1Mzc0LCJleHAiOjE2OTQ3NzczNzR9.ya50jsAD_AKbqMz28WGF0D74K6l1yCydvoa5H-IMiag', 'user', 0, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (69, 1, 'Name', 'tesgggt@te1hh1st.com', 'Last name ', '$2b$04$glhesiWQoGDB1vfyuyqDmuzWuZdHx/3Lcd3.rX7HlLCXCXste5uwa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksImVtYWlsIjoidGVzZ2dndEB0ZTFoaDFzdC5jb20iLCJmaXJzdE5hbWUiOiJOYW1lIiwiaWF0IjoxNjkyMTkwNzQyLCJleHAiOjE2OTQ3ODI3NDJ9.Qyyd1P25PWBHB6JlG9NsoCRBPFMVmRuYa06gqdDlkY4', 'user', 0, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (70, 1, 'user', 'petrosyankhachatur1@gmail.com', 'user', '$2b$04$Rlv2jcb8YxyJkeqoXEIbeu5Po0MspofJjHC.Gcjmg/aLH8ee/C2Tu', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJ1c2VyIiwiaWF0IjoxNjkyNzAyNjkwLCJleHAiOjE2OTUyOTQ2OTB9.2rkOlhnEv1jocxb6Rbpx-8CGGD8AWBUKVzE6Vinr9mU', 'user', 5, NULL, NULL, NULL, NULL, NULL, 1, '', NULL);
INSERT INTO `users` VALUES (71, 1, 'user', 'freelancetoptalent@gmail.com', '+37488552299', '$2b$04$VYMCso.grI/i10FYCvB.LuizjbmFUf4DWZ0SUWBfcYRFj7DDoJJvW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzEsImVtYWlsIjoidXNlcjFAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoidXNlciIsImlhdCI6MTY5MjE5MTI0MCwiZXhwIjoxNjk0NzgzMjQwfQ.rl9ya6E-UPiwcVkyWv_57xCAVy6MsWXxw2K5NI3Aijg', 'user', 5, 1, NULL, NULL, '/uploads/users/profile/f7085064a870394c6f3374ac42a710976076723d.png', NULL, 1, '', NULL);
INSERT INTO `users` VALUES (72, 1, 'user', 'user2@gmail.com', 'user', '$2b$04$nJEn67D8MrwcMpP5AolOz.PzC20Ihq6Q3DwFh71.1HlBcEZJwaH5G', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzIsImVtYWlsIjoidXNlcjJAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoidXNlciIsImlhdCI6MTY5MjE5NDY3NSwiZXhwIjoxNjk0Nzg2Njc1fQ.vtWJUkWbZSv5SBfijoTqFmxTyP0odoGsbGMEI-V-Byk', 'user', 6, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (73, 1, 'sdsdsd', 'test@tsssest.com', '654654888', '$2b$04$xPBdLvkvN1elUOrWb.NR8uoBRumhzux2q9J72sIA5LjLYr5jksEI2', NULL, 'user', 1, 1, 2, 'sdfdsf', '', NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (74, 1, 'sdsdsd', 'test@tsssiiiest.com', '654654888', '$2b$04$A54y4H2z1gbRYkc9ew/WLeoxXjlUokHy1.1M7IUbsr7Km8di/h2ue', NULL, 'user', 1, 1, 2, 'sdfdsf', '', NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (75, 1, 'sdsdsd', 'test@tssiiiisiiiest.com', '654654888', '$2b$04$o5YZpd1G5PzKOGwgpc9Ib.MihOxMIhHedh6bG1mNp/OwqJg93M3wK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdHNzaWlpaXNpaWllc3QuY29tIiwibmFtZSI6InNkc2RzZCIsImlhdCI6MTY5MzU1NzA1MSwiZXhwIjoxNjk2MTQ5MDUxfQ.DeemCk2r3SQN-phF-hU2ljvGeDHj1QUoVJOsl-Mdmkk', 'user', 1, 1, 2, 'sdfdsf', '', NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (76, 1, 'sdsdsd', 'test@uuuuuuuuu.com', '654654888', '$2b$04$MFWp7J3rmJkHgP1qzBiO0uU4vVVdEdHLr0BAibWxPNxFSGrbCt85m', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdXV1dXV1dXV1LmNvbSIsIm5hbWUiOiJzZHNkc2QiLCJpYXQiOjE2OTM1NTcwNjgsImV4cCI6MTY5NjE0OTA2OH0.cbtPM1a2LAsl8QljmIws9J2rbjK4ttvXsVgrzGUu_O8', 'user', 1, 1, 2, 'sdfdsf', '', NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (77, 1, 'sdsdsd', 'test@uuuuuuuuu.comdd', '654654888', '$2b$04$SkpEJgatPw/ZtI3EpTxz/O8dRGNAZRLWhKaDSFFIT6914ZonWud5K', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdXV1dXV1dXV1LmNvbWRkIiwibmFtZSI6InNkc2RzZCIsImlhdCI6MTY5MzU2MDM0MywiZXhwIjoxNjk2MTUyMzQzfQ.wfltQgY-tdH_BWnittx6W0q7Vr6MC4vj-0QWEbcOIko', 'user', 1, 1, 2, 'sdfdsf', '', NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (78, 1, 'sdsdsd', 'test@uuuuujjuuuu.comdd', '654654888', '$2b$04$mz4pikF1xQ0zFHIgMXFbGuDE2oxkw1pBB8xAjWwXwNEEmK1NHw2lK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdXV1dXVqanV1dXUuY29tZGQiLCJuYW1lIjoic2RzZHNkIiwiaWF0IjoxNjkzNTYwMzcwLCJleHAiOjE2OTYxNTIzNzB9.O6fLcdzFug1LWW3TEdazl1n9DLlKMdVmzQNl3WMm47U', 'user', 1, 1, 2, 'sdfdsf', NULL, NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (79, 1, 'sdsdsd', 'test@uuuujjujjuuuu.comdd', '654654888', '$2b$04$UwmuCh6vnWFQDLT31/ZKV.eiclVLBeu9PN9REf/Lo43uucPJB9sjW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdXV1dWpqdWpqdXV1dS5jb21kZCIsIm5hbWUiOiJzZHNkc2QiLCJpYXQiOjE2OTM1NjA0NDksImV4cCI6MTY5NjE1MjQ0OX0.f9u0PhdrAfZERSpDMr20o0VedC53SF1b34W2lg9uMTE', 'user', 1, 1, 2, 'sdfdsf', NULL, NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (80, 1, 'sdsdsd', 'test@uuudddujjujjuuuu.comdd', '654654888', '$2b$04$q/Jg/XY2j9QgSdi.M6jBYuxYgKHi0b89hZGVLxbAICQVYthe8X9/u', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODAsImVtYWlsIjoidGVzdEB1dXVkZGR1amp1amp1dXV1LmNvbWRkIiwibmFtZSI6InNkc2RzZCIsImltZyI6InB1YmxpYy91cGxvYWRzL3VzZXJzL3Byb2ZpbGUvY2RkMzBhOGU0NjVmZTM1ZGE1YjIxZThhY2M4MTQxZjk5MmVhNGVmMS5wbmciLCJpYXQiOjE2OTM1NjE2ODksImV4cCI6MTY5NjE1MzY4OX0.5HxRfQLQOmpGzOE-WPGBIm7N1kWtsjz2Ig81r6w3NCk', 'user', 1, 1, 2, 'sdfdsf', 'public/uploads/users/profile/cdd30a8e465fe35da5b21e8acc8141f992ea4ef1.png', NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (81, 1, 'sadasddddddddd', 'test@uggguudddujjujjuuuu.comdd', '654654888', '$2b$04$HZnyH0f8qFJrYt2BXLBRROZRFvpxIhIKSB3koiQBIyGgmhs3hCKgK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODEsImVtYWlsIjoidGVzdEB1Z2dndXVkZGR1amp1amp1dXV1LmNvbWRkIiwibmFtZSI6InNkc2RzZCIsImltZyI6InB1YmxpYy91cGxvYWRzL3VzZXJzL3Byb2ZpbGUvMDkyNzllNjczMmVjYmNlNmU2NWNlMTFmNjRjZDkxMWVlZGNhMzY3Yy5wbmciLCJpYXQiOjE2OTM1NjI4MTksImV4cCI6MTY5NjE1NDgxOX0.fPGJZ7HeBs0-K920b_z2SaTba3M1lWnFlYQnfPNM6Sg', 'user', 5, 1, 2, 'sadsad', '/uploads/users/profile/c710c3f3497005cab1cd1012282a01caa3729848.jpeg', NULL, 1, NULL, 'asdasd');
INSERT INTO `users` VALUES (82, 1, 'sdsdsd', 'test@ugggugggudddujjujjuuuu.comdd', '654654888', '$2b$04$aVd/Z3d8BuIFyyzHrwX8lu5xsGv.3aPKPUjs4vAQnX6TG0NvkizH.', NULL, 'user', 1, 1, 2, 'sdfdsf', 'public/uploads/users/profile/8f8874db3f7c8f2051bde66a3a5fa7343c242a63.png', NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (83, 1, 'name surname', 'test@uggguggg44juuuu.comdd', '+37498660697', '$2b$04$gksiBpLucKZB8mL2Me9YE.1e5ycx1sxsQNq0fiIu1zivF6ld48Vb.', NULL, 'user', 5, 1, NULL, 'state', 'uploads/users/profile/bbc5c6f0f1936af2f45bb38d4fe68856a85d319a.png', NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (84, 1, 'User', 'user1@gmail.com', '+37493516118', '$2b$04$hJ97g3n/em2HYcIQdeR8NO4hwTi08OlnKT1xH91fsWkhK/ydjVLJa', NULL, 'user', 11, 0, NULL, 'State', NULL, NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (85, 1, 'user2', 'user3@gmail.com', '+112345678', '$2b$04$9GiP0jlbM6JheXtA3iOV6Oa.gh7NVuG2mE/HYguQggM0ipTW4JTDi', NULL, 'user', 30, 1, NULL, 'State', NULL, NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (86, 1, 'name surname', 'test@uggguggg44juu88uu.comdd', '+37498660697', '$2b$04$jgIGR4ALIKcnhNoOdRrSl./dXl7ms3Iaa1.8ao60vxExM7DgqbuqO', NULL, 'user', 5, 1, NULL, 'state', 'uploads/users/profile/f7085064a870394c6f3374ac42a710976076723d.png', NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (87, 1, 'adas', 't4463668@gmail.com', '+11516513', '$2b$04$K2JuGQ8GaBemoeDkpdH4t.C5XZb/lXp95Zon1qU0TDIWTDJe8y57m', NULL, 'user', 11, 0, NULL, 'asdasd', NULL, NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (88, 1, 'name surname', 'test@ugiijuu88uu.comdd', '+37498660697', '$2b$04$pi0iMtBt1W2FXnevIDmVS.D62nMfdcF7AkWcX32rDp1arIqxn3hqq', NULL, 'user', 5, 1, NULL, 'state', NULL, NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (89, 1, 'name surname', 'test@ugiijuup88uu.comdd', '+37498660697', '$2b$04$62yGLXjZ4I6kLl7DYWf1UuBwijcVb2.PhCGtrQn4aHHOJM4bARaqO', NULL, 'user', 5, 1, NULL, 'state', NULL, NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (90, 1, 'name surname', 'test@ugiiuujuup88uu.comdd', '+37498660697', '$2b$04$vXl1iqmz3R9/M2w5TeKtnuRs.VD6AqnsusMZGH3PdKj7uA4YAeA.O', NULL, 'user', 5, 1, NULL, 'state', NULL, NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (91, 1, 'name surname', 'test@ugiiuyuujuup88uu.comdd', '+37498660697', '$2b$04$FVHccpWTPLTWCEW3Ke.qp.CKdSlFFPx3HWg10iq49aiw3G3AHyqVy', NULL, 'user', 5, 1, NULL, 'state', '', NULL, 1, NULL, NULL);
INSERT INTO `users` VALUES (92, 1, 'User', 'liketodev3@gmail.com', '+1545414515145', '$2b$04$zQL3ABfJssG0ZGymMYEFSu13m5ZgFXpVGIu/b/rad7QfDcrQXQoQG', NULL, 'user', 2, 0, NULL, 'State', '', NULL, 1, '', NULL);

SET FOREIGN_KEY_CHECKS = 1;
