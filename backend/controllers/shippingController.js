const Shipping = require('../models/shippingDetails');

exports.getAllShippings = async (req, res) => {
    try {
        const shippings = await Shipping.find();
        res.json(shippings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getShippingById = async (req, res) => {
    try {
        const shipping = await Shipping.findById(req.params.id);
        if (!shipping) {
            return res.status(404).json({ message: 'Shipping not found' });
        }
        res.json(shipping);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createShipping = async (req, res) => {
    try {
        const { address, city, pincode, orderId, customerId } = req.body;
        const newShipping = new Shipping({
            address,
            city,
            pincode,
            orderId,
            customerId
        });
        const savedShipping = await newShipping.save();
        res.status(201).json(savedShipping);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateShipping = async (req, res) => {
    try {
        const { address, city, pincode, orderId, customerId } = req.body;
        const updatedShipping = await Shipping.findByIdAndUpdate(
            req.params.id,
            { address, city, pincode, orderId, customerId },
            { new: true }
        );
        if (!updatedShipping) {
            return res.status(404).json({ message: 'Shipping not found' });
        }
        res.json(updatedShipping);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteShipping = async (req, res) => {
    try {
        const deletedShipping = await Shipping.findByIdAndDelete(req.params.id);
        if (!deletedShipping) {
            return res.status(404).json({ message: 'Shipping not found' });
        }
        res.json({ message: 'Shipping deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
