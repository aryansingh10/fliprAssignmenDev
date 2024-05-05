const express=require('express');
const app=express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(cookieParser());

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/orders', require('./routes/purchaseOrderRoutes'));
app.use('/api/shipping', require('./routes/shippingRoutes'));

app.get('/', (req, res) => {
    res.send('Hello World!');
})

mongoose.connect('mongodb://localhost:27017/flipr', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));
