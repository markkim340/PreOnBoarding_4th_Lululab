-- migrate:up
CREATE TABLE `bookings` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `booking_number` varchar(20) UNIQUE KEY NOT NULL,
  `user_id` int NOT NULL,
  `schedule_id` int NOT NULL,
  `booking_type_id` int NOT NULL,
  `booking_confirmed` tinyint (1) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP on update current_timestamp,
  FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`booking_type_id`) REFERENCES `booking_types` (`id`)
);

-- migrate:down
SET foreign_key_checks = 0;
DROP TABLE bookings;
SET foreign_key_checks = 1;
