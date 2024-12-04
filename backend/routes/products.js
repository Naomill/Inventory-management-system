const express = require('express');
const router = express.Router();
const db = require('../db');

// show all products
router.get('/', async(req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Products');
        res.json(rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

// Show all products with category name
router.get('/with-categories', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                p.product_id, 
                p.product_name, 
                p.sku, 
                c.category_name, 
                p.description, 
                p.quantity, 
                CAST(p.unit_price AS DECIMAL(10,2)) AS unit_price, 
                p.created_at, 
                p.updated_at
            FROM Products p
            JOIN Categories c ON p.category_id = c.category_id
        `);
        // console.log(rows);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// show a product by Id
router.get('/:id', async(req, res) => {
    const { id }  = req.params;

    // Validation: if Id isn't number
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format'});
    }

    try {
        const [rows] = await db.query('SELECT * FROM Products WHERE product_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found'});
        }

        res.json(rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

// add a new product
router.post('/', async (req, res) => {
    const { product_name, sku, category_id, description, quantity, unit_price } = req.body;
    // Validation 
    if (!product_name || !sku || !category_id || !quantity || !unit_price) {
        return res.status(400).json({ error: 'Missing required fields'})
    }

    try {
        const [result] = await db.query(
            'INSERT INTO Products (product_name, sku, category_id, description, quantity, unit_price) VALUES (?, ?, ?, ?, ?, ?)',
            [product_name, sku, category_id, description, quantity, unit_price]
        );
        res.status(201).json({ id: result.insertId, product_name, sku, category_id, description, quantity, unit_price });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// update a product by Id
router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const { product_name, sku, category_id, description, quantity, unit_price } = req.body;

    // Validation: if Id isn't number
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format'});
    }
    // Validation: Quantity and Unit Price > 0
    if (quantity < 0 || unit_price < 0) {
        return res.status(400).json({ error: 'Quantity and Unit Price must be positive numbers' });
    }

    try {
        const [existingProduct] = await db.query('SELECT * FROM Products WHERE product_id = ?', [id]);
        if (existingProduct.length === 0) {
            return res.status(404).json({ error: 'Product not found'})
        }

        const [result] = await db.query(
            `UPDATE Products
            SET product_name = ?, sku = ?, category_id = ?, description = ?, quantity = ?, unit_price = ?
            WHERE product_id = ?`,
            [product_name, sku, category_id, description, quantity, unit_price, id]
        );

        res.status(200).json({
            message: 'Product updated successfully',
            product: {
                id,
                product_name,
                sku,
                category_id,
                description,
                quantity,
                unit_price
            }
        });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    // Validation: if Id isn't number
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        // Check if there is a product you want to delete.
        const [existingProduct] = await db.query('SELECT * FROM Products WHERE product_id = ?', [id]);
        if (existingProduct.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await db.query('DELETE FROM Products WHERE product_id = ?', [id]);

        res.status(200).json({ message: `Product with ID ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;