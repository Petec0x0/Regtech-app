const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');

router.get('/', CustomerController.getCustomers);
router.get('/:linkId', CustomerController.getOneCustomer);
router.post('/onboard-customer', CustomerController.onboardCustomer);
router.post('/update-customer-status', CustomerController.updateCustomerStatus);

module.exports = router