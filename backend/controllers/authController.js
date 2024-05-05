const Customer = require('../models/customer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

exports.signup = async (req, res) => {
    try {
        const { name, email, mobileNumber, city, password } = req.body;
        const existingCustomer = await Customer.findOne({ email })
        if (existingCustomer) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const customer = new Customer({
            name,
            email,
            mobileNumber,
            city,
            password: hashedPassword
        });

        await customer.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, customer.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ customerId: customer._id }, process.env.JWT_SECRET) 
            res
            .cookie('access_token', token, { httpOnly: true })

            .status(200).json({ message: "Login successful" })
    } catch {
        res.status(400).json({ message: err.message });
    }
}