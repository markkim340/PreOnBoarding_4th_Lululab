-- migrate:up
CREATE TABLE `clinics` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `adress` varchar(100) NOT NULL,
  `contact` varchar(20) NOT NULL
);

-- migrate:down
SET foreign_key_checks = 0;
DROP TABLE clinics;
SET foreign_key_checks = 1;
