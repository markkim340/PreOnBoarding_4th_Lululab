-- migrate:up
INSERT INTO `users` (`id`,`name`,`phone`,`birth`,`gender`,`no_show_history`,`created_at`,`updated_at`) VALUES (1,'테스트','01077777777','900707','female',1,'2022-10-18 14:56:00','2022-10-18 14:56:00');
INSERT INTO `users` (`id`,`name`,`phone`,`birth`,`gender`,`no_show_history`,`created_at`,`updated_at`) VALUES (2,'김코딩','01022222222','001231','male',0,'2022-10-18 14:57:08','2022-10-18 14:57:08');


-- migrate:down
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE users;
SET FOREIGN_KEY_CHECKS = 1;

