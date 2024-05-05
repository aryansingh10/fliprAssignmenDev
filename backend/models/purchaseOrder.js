const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const purchaseOrderSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    pricing: { type: Number, required: true },
    mrp: { type: Number, required: true },
    customerId: { type:Schema.Types.ObjectId, ref: 'Customer', required: true },
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
