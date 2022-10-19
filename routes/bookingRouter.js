const express = require('express');
const bookingController = require('../controllers/bookingController');
const errorHandler = require('../middlewares/errorHandler');

const router = express.Router();

router.get('/clinics', errorHandler(bookingController.getAvailableClinics));
router.get('/times', errorHandler(bookingController.getAvailableTimes));
router.post('/booking', errorHandler(bookingController.createBooking));
router.get('/booking', errorHandler(bookingController.getBookingInfo));
router.patch('/booking', errorHandler(bookingController.updagteBookingInfo));

module.exports = router;
