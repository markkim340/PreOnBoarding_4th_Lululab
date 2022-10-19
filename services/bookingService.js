const bookingDao = require('../models/bookingDao');
const { BaseError } = require('../middlewares/appError');
const { validationName } = require('../utils/validation');

const getBookedSchedulesId = async () => {
  const getBookedSchedulesId = await bookingDao.getBookedScheduleId();
  let list = [];

  for (let i = 0; i < getBookedSchedulesId.length; i++) {
    const value = Object.values(getBookedSchedulesId[i])[0];
    list.push(value);
  }

  return list.join(',');
};

const getAvailableClinics = async () => {
  const bookedSchedulesList = await getBookedSchedulesId();

  const availableClinics = await bookingDao.getAvailableClinics(bookedSchedulesList);
  return availableClinics;
};

const getAvailableTimes = async (date, clinicId) => {
  if (!date && !clinicId) {
    throw new BaseError('INVALID_DATA_INPUT', 400);
  }
  const bookedSchedulesList = await getBookedSchedulesId();

  const availableTimes = await bookingDao.getAvailableTimes(bookedSchedulesList, date, clinicId);
  return availableTimes;
};

const createBooking = async (name, phone, birth, gender, scheduleId, bookingTypeId) => {
  if (!name || !phone || !birth || !gender || !scheduleId || !bookingTypeId) {
    throw new BaseError('INVALID_DATA_INPUT', 400);
  }
  validationName(name);

  const existCheckSchedules = await bookingDao.existCheckSchedules(scheduleId);
  if (existCheckSchedules) {
    throw new BaseError('SCHEDULE_ID_ALREADY_EXISTS', 400);
  }

  const getUserId = async (name, phone, birth, gender) => {
    const existCheckUsers = await bookingDao.existCheckUsers(phone);

    if (existCheckUsers) {
      const userId = await bookingDao.getUserId(phone);
      return userId;
    } else if (!existCheckUsers) {
      const userId = await bookingDao.createUser(name, phone, birth, gender);
      return userId;
    }
  };

  const userId = await getUserId(name, phone, birth, gender);

  const bookingId = await bookingDao.createBooking(userId, scheduleId, bookingTypeId);
  const bookingNumber = await bookingDao.getBookingNumber(bookingId);

  return bookingNumber;
};

const getBookingInfo = async (name, bookingNumber) => {
  if (!name && !bookingNumber) {
    throw new BaseError('INVALID_DATA_INPUT', 400);
  }
  const searcher = await searchFilter(name, bookingNumber);

  const bookingInfo = await bookingDao.getBookingInfo(searcher);
  return bookingInfo;
};

const searchFilter = (name, bookingNumber) => {
  const searchFilterType = {
    NAME: `WHERE users.name = '${name}'`,
    BOOKINGNUMBER: `WHERE booking_number = ${bookingNumber}`,
  };

  if (name && bookingNumber) {
    throw new BaseError('INVALID_DATA_INPUT', 400);
  }
  if (name) {
    return searchFilterType.NAME;
  }
  if (bookingNumber) {
    return searchFilterType.BOOKINGNUMBER;
  }
};

const updateBookingInfo = async (bookingNumber, name, scheduleId, bookingTypeId) => {
  if (!bookingNumber) {
    throw new BaseError('INVALID_DATA_INPUT', 400);
  }
  const searcher = await searchFilter(0, bookingNumber);
  const userInfo = await bookingDao.getBookingInfo(searcher);
  const userId = userInfo[0].user_id;
  const updateInfo = updateFilter(scheduleId, bookingTypeId);

  await bookingDao.updateBookingByBookingNumber(updateInfo, bookingNumber);

  if (name) {
    await bookingDao.updateUserNameByUserId(name, userId);
  }
};

const updateFilter = (scheduleId, bookingTypeId) => {
  const updateFilterType = {
    SCHEDULE: `schedule_id = ${scheduleId}`,
    BOOKING_TYPE: `booking_type_id = ${bookingTypeId}`,
  };

  if (scheduleId && bookingTypeId) {
    return updateFilterType.SCHEDULE + ',' + updateFilterType.BOOKING_TYPE;
  }
  if (scheduleId) {
    return updateFilterType.SCHEDULE;
  }
  if (bookingTypeId) {
    return updateFilterType.BOOKING_TYPE;
  }
};

module.exports = {
  getAvailableClinics,
  getAvailableTimes,
  createBooking,
  getBookingInfo,
  updateBookingInfo,
};
