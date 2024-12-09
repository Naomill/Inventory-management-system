const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const customerRoutes = require('./routes/customers');
const supplierRoutes = require('./routes/supplier');
const orderRoutes = require('./routes/orders');
const exportOrderRoutes = require('./routes/export_orders');

const app = express();

// เปิดใช้งาน CORS
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/export-orders', exportOrderRoutes);

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

