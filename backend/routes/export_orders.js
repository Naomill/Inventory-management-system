const express = require('express');
const router = express.Router();
const db = require('../db');

// show all export order
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                eo.export_order_id,
                eo.customer_id,
                c.customer_name,
                eo.product_id,
                p.product_name,
                eo.order_date,
                eo.shipping_date,
                eo.shipping_address,
                eo.shipping_status,
                eo.quantity,
                eo.subtotal,
                eo.total_amount,
                eo.status
            FROM export_orders eo
            JOIN customers c ON eo.customer_id = c.customer_id
            JOIN products p ON eo.product_id = p.product_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// show a export order by Id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const [rows] = await db.query(`
            SELECT 
                eo.export_order_id,
                eo.customer_id,
                c.customer_name,
                eo.product_id,
                p.product_name,
                eo.order_date,
                eo.shipping_date,
                eo.shipping_address,
                eo.shipping_status,
                eo.quantity,
                eo.subtotal,
                eo.total_amount,
                eo.status
            FROM export_orders eo
            JOIN customers c ON eo.customer_id = c.customer_id
            JOIN products p ON eo.product_id = p.product_id
            WHERE eo.export_order_id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Export Order not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// create a new export order
router.post('/', async (req, res) => {
    const {
        customer_id,
        shipping_date,
        shipping_address,
        shipping_status,
        product_id,
        quantity,
        subtotal,
        total_amount,
        status
    } = req.body;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!customer_id || !shipping_address || !product_id || !quantity || !subtotal || !total_amount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // ตรวจสอบว่าลูกค้าและสินค้ามีอยู่จริง
        const [customerExists] = await db.query('SELECT * FROM customers WHERE customer_id = ?', [customer_id]);
        const [productExists] = await db.query('SELECT * FROM products WHERE product_id = ?', [product_id]);

        if (customerExists.length === 0) {
            return res.status(400).json({ error: 'Invalid customer_id. Customer does not exist' });
        }
        if (productExists.length === 0) {
            return res.status(400).json({ error: 'Invalid product_id. Product does not exist' });
        }

        // เพิ่ม Export Order ใหม่
        const [result] = await db.query(`
            INSERT INTO export_orders (
                customer_id,
                shipping_date,
                shipping_address,
                shipping_status,
                product_id,
                quantity,
                subtotal,
                total_amount,
                status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            customer_id,
            shipping_date,
            shipping_address,
            shipping_status || 'Pending',
            product_id,
            quantity,
            subtotal,
            total_amount,
            status || 'Pending'
        ]);

        // ดึงข้อมูล Export Order ที่เพิ่งสร้าง
        const [newOrder] = await db.query('SELECT * FROM export_orders WHERE export_order_id = ?', [result.insertId]);
        res.status(201).json(newOrder[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// updata export Order by Id
router.put('/:id', async (req, res) => {
    const { id } = req.params;

    console.log("Request Params ID:", id); // Log id ที่ได้รับ
    console.log("Request Body:", req.body); // Log body ที่ได้รับ

    // ตรวจสอบว่า id เป็นตัวเลขและ req.body ไม่ว่างเปล่า
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    if (!req.body) {
        return res.status(400).json({ error: 'Request body is missing' });
    }

    // ดึงข้อมูลจาก req.body
    const {
        customer_id,
        shipping_date,
        shipping_address,
        shipping_status,
        product_id,
        quantity,
        subtotal,
        total_amount,
        status
    } = req.body;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!customer_id || !shipping_address || !product_id || !quantity || !subtotal || !total_amount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // ตรวจสอบว่า Export Order มีอยู่จริง
        const [existingOrder] = await db.query('SELECT * FROM export_orders WHERE export_order_id = ?', [id]);
        if (existingOrder.length === 0) {
            return res.status(404).json({ error: 'Export Order not found' });
        }

        // ตรวจสอบว่าลูกค้าและสินค้ามีอยู่จริง
        const [customerExists] = await db.query('SELECT * FROM customers WHERE customer_id = ?', [customer_id]);
        const [productExists] = await db.query('SELECT * FROM products WHERE product_id = ?', [product_id]);

        if (customerExists.length === 0) {
            return res.status(400).json({ error: 'Invalid customer_id. Customer does not exist' });
        }
        if (productExists.length === 0) {
            return res.status(400).json({ error: 'Invalid product_id. Product does not exist' });
        }

        // อัปเดต Export Order
        await db.query(`
            UPDATE export_orders
            SET
                customer_id = ?,
                shipping_date = ?,
                shipping_address = ?,
                shipping_status = ?,
                product_id = ?,
                quantity = ?,
                subtotal = ?,
                total_amount = ?,
                status = ?
            WHERE export_order_id = ?
        `, [
            customer_id,
            shipping_date,
            shipping_address,
            shipping_status ?? 'Pending', // ใช้ค่า Default หากเป็น null หรือ undefined
            product_id,
            quantity,
            subtotal,
            total_amount,
            status ?? 'Pending', // ใช้ค่า Default หากเป็น null หรือ undefined
            id
        ]);

        // ดึงข้อมูล Export Order ที่อัปเดตแล้ว
        const [updatedOrder] = await db.query('SELECT * FROM export_orders WHERE export_order_id = ?', [id]);
        res.status(200).json(updatedOrder[0]);
    } catch (err) {
        console.error("Error in PUT /export-orders/:id:", err.message);
        res.status(500).json({ error: err.message });
    }
});


// change status of export order by ID
router.patch('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { shipping_status, status } = req.body;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    if (!shipping_status && !status) {
        return res.status(400).json({ error: 'No status provided to update' });
    }

    try {
        const [existingOrder] = await db.query('SELECT * FROM export_orders WHERE export_order_id = ?', [id]);
        if (existingOrder.length === 0) {
            return res.status(404).json({ error: 'Export Order not found' });
        }

        // อัปเดตสถานะ
        if (shipping_status && !['Pending', 'In Transit', 'Delivered', 'Returned', 'Failed'].includes(shipping_status)) {
            return res.status(400).json({ error: 'Invalid shipping_status value' });
        }

        if (status && !['Pending', 'Completed', 'Cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        await db.query(`
            UPDATE export_orders
            SET
                shipping_status = COALESCE(?, shipping_status),
                status = COALESCE(?, status),
                updated_at = CURRENT_TIMESTAMP
            WHERE export_order_id = ?
        `, [shipping_status, status, id]);

        // ดึงข้อมูล Export Order ที่อัปเดตแล้ว
        const [updatedOrder] = await db.query('SELECT * FROM export_orders WHERE export_order_id = ?', [id]);
        res.status(200).json({
            message: 'Export Order status updated successfully',
            order: updatedOrder[0],
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
