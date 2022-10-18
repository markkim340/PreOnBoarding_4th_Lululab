-- migrate:up
INSERT INTO `booking_types` (`id`,`type`) VALUES (1,'외래진료');
INSERT INTO `booking_types` (`id`,`type`) VALUES (2,'건강검진');
INSERT INTO `booking_types` (`id`,`type`) VALUES (3,'정기검진');
INSERT INTO `booking_types` (`id`,`type`) VALUES (4,'재검진');
INSERT INTO `booking_types` (`id`,`type`) VALUES (5,'약처방');

-- migrate:down
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE booking_types;
SET FOREIGN_KEY_CHECKS = 1;
