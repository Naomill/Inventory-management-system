const express = require('express');
const router = express.Router();
const db = require('../db');

// Show all categories
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categories');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Show a category by Id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const [rows] = await db.query('SELECT * FROM categories WHERE category_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new category
router.post('/', async (req, res) => {
    const { category_name, description } = req.body;

    if (!category_name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO categories (category_name, description) VALUES (?, ?)',
            [category_name, description]
        );

        const [newCategory] = await db.query('SELECT * FROM categories WHERE category_id = ?', [result.insertId]);
        res.status(201).json(newCategory[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a category by Id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { category_name, description, is_active } = req.body;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const [existingCategory] = await db.query('SELECT * FROM categories WHERE category_id = ?', [id]);
        if (existingCategory.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const updatedCategoryName = category_name || existingCategory[0].category_name;
        const updatedDescription = description || existingCategory[0].description;

        await db.query(
            `UPDATE categories SET category_name = ?, description = ?, is_active = ? WHERE category_id = ?`,
            [updatedCategoryName, updatedDescription, is_active, id]
        );

        const [updatedCategory] = await db.query('SELECT * FROM categories WHERE category_id = ?', [id]);
        res.status(200).json({
            message: 'Category updated successfully',
            category: updatedCategory[0],
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const [result] = await db.query('DELETE FROM categories WHERE category_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully!' });
    } catch (err) {
        console.error("Error deleting category:", err.message);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;