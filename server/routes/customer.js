const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');

router.post('/onboard-customer', CustomerController.onboardCustomer);

module.exports = router