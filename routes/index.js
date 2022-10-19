const express = require('express');
const router = express.Router();

const bookingRouter = require('./bookingRouter');

router.use('/', bookingRouter);

module.exports = router;
