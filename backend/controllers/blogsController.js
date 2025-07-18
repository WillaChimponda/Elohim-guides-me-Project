const db = require('../models/db');

exports.getAllBlogs = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM blogs ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error getting blogs:', err);
    res.status(500).json({ error: 'Failed to get blogs' });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, content, category, image, quote, user } = req.body;
    // Only allow admins
    if (!user || !user.is_admin) {
      return res.status(403).json({ error: 'Only admins can create blogs' });
    }
    // Validate required fields
    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Title, content, and category are required' });
    }
    const [result] = await db.query(
      'INSERT INTO blogs (title, content, category, image, quote) VALUES (?, ?, ?, ?, ?)',
      [title, content, category, image || null, quote || null]
    );
    const [newBlog] = await db.query('SELECT * FROM blogs WHERE id = ?', [result.insertId]);
    res.status(201).json(newBlog[0]);
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({ error: 'Failed to create blog' });
  }
};

// Add other functions like getBlogById, updateBlog, deleteBlog here if needed

