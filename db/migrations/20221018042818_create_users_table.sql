-- migrate:up
CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `phone` varchar(11) UNIQUE KEY NOT NULL,
  `birth` varchar(6) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `no_show_history` tinyint (1) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP on update current_timestamp
);
-- migrate:down
SET foreign_key_checks = 0;
DROP TABLE users;
SET foreign_key_checks = 1;