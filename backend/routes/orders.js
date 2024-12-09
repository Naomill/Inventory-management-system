const express = require('express');
const router = express.Router();
const db = require('../db');

// Show all orders
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                o.order_id,
                o.supplier_id,
                s.supplier_name,
                o.product_id,
                p.product_name,
                o.order_date,
                o.quantity,
                o.subtotal,
                o.total_amount,
                o.status
            FROM orders o
            JOIN supplier s ON o.supplier_id = s.supplier_id
            JOIN products p ON o.product_id = p.product_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Show an order by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const [rows] = await db.query(`
            SELECT 
                o.order_id,
                o.supplier_id,
                s.supplier_name,
                o.product_id,
                p.product_name,
                o.order_date,
                o.quantity,
                o.subtotal,
                o.total_amount,
                o.status
            FROM orders o
            JOIN supplier s ON o.supplier_id = s.supplier_id
            JOIN products p ON o.product_id = p.product_id
            WHERE o.order_id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new order
router.post('/products', async (req, res) => {
    const { product_name, sku, category_id, description, quantity, unit_price } = req.body;

    // ตรวจสอบว่าฟิลด์ที่สำคัญทั้งหมดมีค่าและประเภทข้อมูลถูกต้อง
    if (!product_name || !sku || !category_id || !quantity || !unit_price) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const result = await db.query(
            'INSERT INTO Products (product_name, sku, category_id, description, quantity, unit_price) VALUES (?, ?, ?, ?, ?, ?)',
            [product_name, sku, category_id, description, quantity, unit_price]
        );

        res.status(201).json({
            success: true,
            product_id: result.insertId,
            message: "Product added successfully",
        });
    } catch (err) {
        console.error("Error inserting product:", err);
        res.status(500).json({ error: "Failed to add product" });
    }
});


// Update an order by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { supplier_id, product_id, quantity, subtotal, total_amount, status } = req.body;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const [existingOrder] = await db.query('SELECT * FROM orders WHERE order_id = ?', [id]);
        if (existingOrder.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        await db.query(`
            UPDATE orders
            SET supplier_id = ?, product_id = ?, quantity = ?, subtotal = ?, total_amount = ?, status = ?
            WHERE order_id = ?
        `, [supplier_id, product_id, quantity, subtotal, total_amount, status || 'Pending', id]);

        const [updatedOrder] = await db.query('SELECT * FROM orders WHERE order_id = ?', [id]);
        res.status(200).json(updatedOrder[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Change order status by ID
router.patch('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    if (!['Pending', 'Completed', 'Cancelled'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    try {
        const [existingOrder] = await db.query('SELECT * FROM orders WHERE order_id = ?', [id]);
        if (existingOrder.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        await db.query(`
            UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE order_id = ?
        `, [status, id]);

        const [updatedOrder] = await db.query('SELECT * FROM orders WHERE order_id = ?', [id]);
        res.status(200).json({
            message: `Order status updated successfully to ${status}`,
            order: updatedOrder[0],
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
