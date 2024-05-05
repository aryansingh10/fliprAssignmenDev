const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const shippingDetailsSchema = new mongoose.Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    orderId: { type:Schema.Types.ObjectId, ref: 'PurchaseOrder', required: true },
    customerId: { type:Schema.Types.ObjectId, ref: 'Customer', required: true },
});

module.exports = mongoose.model('ShippingDetails', shippingDetailsSchema);
