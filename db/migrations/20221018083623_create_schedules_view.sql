-- migrate:up
CREATE VIEW schedules_view AS (SELECT
schedules.id,
clinics.id as clinic_id,
clinics.name,
clinics.adress,
clinics.contact,
schedules.date,
date_format(schedules.time,'%H:%i') as time
FROM
schedules
LEFT JOIN clinics ON clinics.id = schedules.clinic_id
ORDER BY date, time, name)

-- migrate:down
SET FOREIGN_KEY_CHECKS = 0;
DROP VIEW schedules_view;
SET FOREIGN_KEY_CHECKS = 1;

