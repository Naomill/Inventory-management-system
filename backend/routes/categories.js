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
    const { category_name, description } = req.body;

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
            `UPDATE categories SET category_name = ?, description = ? WHERE category_id = ?`,
            [updatedCategoryName, updatedDescription, id]
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

// Change status of category by Id
router.patch('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { is_active } = req.body;

    console.log("Patch request received:", { id, is_active });

    if (!id || isNaN(id)) {
        console.error("Invalid ID format");
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    if (typeof is_active !== 'boolean') {
        console.error("Invalid is_active value");
        return res.status(400).json({ error: 'Invalid is_active value. Must be true or false' });
    }

    try {
        // ตรวจสอบว่า Category มีอยู่ในฐานข้อมูลหรือไม่
        const [existingCategory] = await db.query('SELECT * FROM categories WHERE category_id = ?', [id]);
        if (existingCategory.length === 0) {
            console.error("Category not found");
            return res.status(404).json({ error: 'Category not found' });
        }

        // อัปเดตสถานะ is_active
        await db.query(
            `UPDATE categories SET is_active = ? WHERE category_id = ?`,
            [is_active, id]
        );

        // ดึงข้อมูล category ที่อัปเดตกลับมา
        const [updatedCategory] = await db.query('SELECT * FROM categories WHERE category_id = ?', [id]);
        console.log("Category updated successfully:", updatedCategory);

        // ส่งผลลัพธ์กลับไปที่ Client
        res.status(200).json({
            message: `Category status updated successfully to ${is_active ? 'active' : 'inactive'}`,
            category: {
                ...updatedCategory[0],
                updated_at: undefined // ซ่อนหรือไม่ส่งข้อมูล updated_at
            },
        });
    } catch (err) {
        console.error("Error in PATCH /categories/:id/status:", err.message);
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