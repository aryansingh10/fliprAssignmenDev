const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');

// Get all shippings
router.get('/', shippingController.getAllShippings);

// Get shipping by ID
router.get('/:id', shippingController.getShippingById);

// Create a new shipping
router.post('/', shippingController.createShipping);

// Update shipping by ID
router.put('/:id', shippingController.updateShipping);

// Delete shipping by ID
router.delete('/:id', shippingController.deleteShipping);

module.exports = router;
