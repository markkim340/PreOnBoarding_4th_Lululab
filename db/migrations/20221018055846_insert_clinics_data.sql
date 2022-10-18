-- migrate:up
INSERT INTO `clinics` (`id`,`name`,`adress`,`contact`) VALUES (1,'리버스의원','서울 강남구','0211112222');
INSERT INTO `clinics` (`id`,`name`,`adress`,`contact`) VALUES (2,'눈에미소의원','서울 서초구','0233337777');
INSERT INTO `clinics` (`id`,`name`,`adress`,`contact`) VALUES (3,'루덴플러스치과의원','서울 강북구','0255558888');
INSERT INTO `clinics` (`id`,`name`,`adress`,`contact`) VALUES (4,'경기피부과의원','경기 안산시','0316661111');
INSERT INTO `clinics` (`id`,`name`,`adress`,`contact`) VALUES (5,'좋은마음내과의원','경기 수원시','0312229999');

-- migrate:down
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE clinics;
SET FOREIGN_KEY_CHECKS = 1;
