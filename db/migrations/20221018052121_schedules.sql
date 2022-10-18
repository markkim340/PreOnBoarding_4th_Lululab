-- migrate:up
CREATE TABLE `schedules` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `clinic_id` int NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`id`)
);

-- migrate:down
SET foreign_key_checks = 0;
DROP TABLE schedules;
SET foreign_key_checks = 1;

