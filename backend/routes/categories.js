const express = require('express');
const router = express.Router();
const db = require('../db')

// show all categories
router.get('/', async(req,res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Categories');
        res.json(rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

// show a category by Id
router.get('/:id', async(req,res) => {
    const { id } = req.params;

    // Validation: if Id isn't number
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format'});
    }

    try {
        const [rows]  = await db.query('SELECT * FROM Categories WHERE category_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Category not found'})
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Create a new Category
router.post('/', async(req,res) => {
    const { category_name, description } = res.body;

    // Validation 
    if (!product_name) {
        return res.status(400).json({ error: 'Missing required fields'})
    }

    try {
        const [result] = await db.query('INSERT INTO Categories (category_name, description) VALUES (?, ?)',
            [category_name, description]
        );
        res.status(201).json({ id: result.insertId, category_name, description});
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

// update a product by Id
router.put('/:id', async(req,res) => {
    const { id } = req.params;
    const { category_name, description } = req.body;
    
    // Validation: if Id isn't number
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format'});
    }
    
    try {
        const [existingCategory] = await db.query('SELECT * FROM Categories WHERE category_id = ?', [id]);
        if (existingCategory.length === 0) {
            return res.status(404).json({ error: 'Category not found'})
        }

        const [result] = await db.query(
            `UPDATE Categories
            SET category_name = ?, description = ?
            WHERE catagory_id = ?`,
            [category_name, description]
        );

        res.status(200).json({
            message: 'Catagory update successfully',
            category: {
                id,
                category_name,
                description
            }
        })
    } catch (err) {
        res.status(500).json({error: err.message })
    }
})

module.exports = router;