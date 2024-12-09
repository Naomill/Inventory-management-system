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
// Create a new order
router.post('/', async (req, res) => {
    const { supplier_id, product_id, quantity, subtotal, total_amount, status } = req.body;

    if (!supplier_id || !product_id || !quantity || !subtotal || !total_amount) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO orders (supplier_id, product_id, quantity, subtotal, total_amount, status)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [supplier_id, product_id, quantity, subtotal, total_amount, status || 'Pending']
        );

        res.status(201).json({
            success: true,
            order_id: result.insertId,
            message: "Order created successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create order" });
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
