const bookingService = require('../services/bookingService');

const getAvailableClinics = async (req, res) => {
  const availableClinics = await bookingService.getAvailableClinics();
  res.status(200).json({ data: availableClinics });
};

const getAvailableTimes = async (req, res) => {
  const { date, clinicId } = req.query;
  const availableTimes = await bookingService.getAvailableTimes(date, clinicId);
  res.status(200).json({ data: availableTimes });
};

const createBooking = async (req, res) => {
  const { name, phone, birth, gender, scheduleId, bookingTypeId } = req.body;
  const bookingNumber = await bookingService.createBooking(name, phone, birth, gender, scheduleId, bookingTypeId);
  res.status(200).json({ data: bookingNumber });
};

const getBookingInfo = async (req, res) => {
  const { name, bookingNumber } = req.query;
  const bookingInfo = await bookingService.getBookingInfo(name, bookingNumber);
  res.status(200).json({ data: bookingInfo });
};

const updagteBookingInfo = async (req, res) => {
  const { bookingNumber, name, scheduleId, bookingTypeId } = req.body;
  await bookingService.updateBookingInfo(bookingNumber, name, scheduleId, bookingTypeId);
  res.status(200).json({ message: 'UPDATED_BOOKING_INFO' });
};

module.exports = {
  getAvailableClinics,
  getAvailableTimes,
  createBooking,
  getBookingInfo,
  updagteBookingInfo,
};
