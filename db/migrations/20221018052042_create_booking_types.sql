-- migrate:up
CREATE TABLE `booking_types` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `type` varchar(30) NOT NULL
);

-- migrate:down
SET foreign_key_checks = 0;
DROP TABLE treatment_types;
SET foreign_key_checks = 1;
