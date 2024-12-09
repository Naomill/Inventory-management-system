const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const productRoutes = require('./routes/products')
const categoryRoutes = require('./routes/categories')
const customerRoutes = require('./routes/customers')
const supplierRoutes = require('./routes/supplier')
const orderRoutes = require('./routes/orders')
const exportOrderRoutes = require('./routes/export_orders')

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // URL ของ Frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // หากใช้ Cookies หรือ Auth Headers
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/export-orders', exportOrderRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))