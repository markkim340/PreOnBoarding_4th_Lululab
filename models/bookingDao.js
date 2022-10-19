const { myDataSource } = require('../utils/dataSource');
const { BaseError } = require('../middlewares/appError');

const getBookedScheduleId = async () => {
  try {
    const bookedSchedulesId = await myDataSource.query(`
    SELECT 
    schedule_id 
    FROM 
    bookings;
  `);
    return bookedSchedulesId;
  } catch (err) {
    throw new BaseError('INVALID_DATA_INPUT', 500);
  }
};

const existCheckSchedules = async (scheduleId) => {
  try {
    const schedules = await myDataSource.query(
      `
    SELECT exists (
      SELECT
      *
      FROM
      bookings
      WHERE schedule_id = ${scheduleId}
      ) AS isExists
    `
    );
    return +schedules[0].isExists;
  } catch (err) {
    throw new BaseError('INVALID_DATA_INPUT', 500);
  }
};

const existCheckUsers = async (phone) => {
  try {
    const users = await myDataSource.query(
      `
    SELECT exists (
      SELECT
      *
      FROM
      users
      WHERE phone = ${phone}
      ) AS isExists
    `
    );
    return +users[0].isExists;
  } catch (err) {
    throw new BaseError('INVALID_DATA_INPUT', 500);
  }
};

const getAvailableClinics = async (bookedSchedulesList) => {
  try {
    const clinics = await myDataSource.query(
      `
    SELECT DISTINCT
    clinic_id,
    name,
    adress,
    contact
    FROM
    schedules_view
    WHERE schedules_view.id NOT IN (?)
    `,
      [bookedSchedulesList]
    );
    return clinics;
  } catch (err) {
    throw new BaseError('INVALID_DATA_INPUT', 500);
  }
};

const getAvailableTimes = async (bookedSchedulesList, date, clinicId) => {
  try {
    const availableTimes = await myDataSource.query(
      `
    SELECT DISTINCT
    schedules_view.id as schedule_id,
    name,
    adress,
    contact,
    time
    FROM
    schedules_view
    WHERE schedules_view.id NOT IN (?)
    AND date = ?
    AND clinic_id = ?
    `,
      [bookedSchedulesList, date, clinicId]
    );
    return availableTimes;
  } catch (err) {
    throw new BaseError('INVALID_DATA_INPUT', 500);
  }
};

const createUser = async (name, phone, birth, gender) => {
  try {
    const userId = await myDataSource.query(
      `
      INSERT INTO 
      users 
      (name,phone,birth,gender) 
      VALUES 
      (?,?,?,?)
    `,
      [name, phone, birth, gender]
    );
    return userId.insertId;
  } catch (err) {
    throw new BaseError('INVALID_DATA_INPUT', 500);
  }
};

const createBooking = async (userId, schedule_id, booking_type_id) => {
  try {
    const bookingNumber = await myDataSource.query(
      `
      INSERT INTO 
      bookings 
      (booking_number, user_id, schedule_id, booking_type_id) 
      VALUES 
      (concat(date_format(now(), '%y%m%d'),(FLOOR(1000 + (RAND() * 8999)))),
      '?','?','?');
    `,
      [userId, schedule_id, booking_type_id]
    );
    return bookingNumber.insertId;
  } catch (err) {
    throw new BaseError('INVALID_DATA_INPUT', 500);
  }
};

const getUserId = async (phone) => {
  try {
    const user = await myDataSource.query(
      `
      SELECT 
      users.id
      FROM
      users
      WHERE phone = ?
    `,
      [phone]
    );
    return Object.values(user[0])[0];
  } catch (err) {
    throw new BaseError('INVALID_DATA_INPUT', 500);
  }
};

const getBookingNumber = async (bookingId) => {
  try {
    const bookingNumber = await myDataSource.query(
      `
      SELECT 
      booking_number
      FROM
      bookings
      WHERE bookings.id = ?
    `,
      [bookingId]
    );
    return bookingNumber[0];
  } catch (err) {
    throw new BaseError('INVALID_DATA_INPUT', 500);
  }
};

const getBookingInfo = async (searcher) => {
  try {
    const bookingInfo = await myDataSource.query(
      `
      SELECT
      bookings.id as booking_id,
      booking_number,
      users.id as user_id,
      users.name,
      users.birth,
      users.phone,
      schedules.date,
      schedules.time,
      booking_types.type,
      IF(booking_confirmed = '1', '예약확정', '확정대기중' ) as confirmed,
      bookings.updated_at
      FROM
      bookings
      LEFT JOIN users ON bookings.user_id = users.id
      LEFT JOIN schedules ON bookings.schedule_id = schedules.id
      LEFT JOIN booking_types ON bookings.booking_type_id = booking_types.id
      ${searcher}
    `
    );
    return bookingInfo;
  } catch (err) {
    throw new BaseError('INVALID_DATA_INPUT', 500);
  }
};

const updateUserNameByUserId = async (name, userId) => {
  try {
    await myDataSource.query(
      `
      UPDATE users SET name = '${name}'
      WHERE users.id = ${userId}`
    );
  } catch (err) {
    throw new BaseError('INVALID_DATA_INPUT', 500);
  }
};

const updateBookingByBookingNumber = async (updateInfo, bookingNumber) => {
  try {
    await myDataSource.query(
      `
      UPDATE bookings SET
      ${updateInfo}
      WHERE booking_number = ${bookingNumber}
    `
    );
  } catch (err) {
    throw new BaseError('INVALID_DATA_INPUT', 500);
  }
};

module.exports = {
  getBookedScheduleId,
  existCheckSchedules,
  existCheckUsers,
  getAvailableClinics,
  getAvailableTimes,
  createUser,
  createBooking,
  getUserId,
  getBookingNumber,
  getBookingInfo,
  updateUserNameByUserId,
  updateBookingByBookingNumber,
};
