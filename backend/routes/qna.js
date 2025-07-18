const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM qna ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Add a new question
router.post('/', async (req, res) => {
  const { user, question } = req.body;
  if (!user || !question) return res.status(400).json({ error: 'Missing user or question' });
  try {
    await db.query('INSERT INTO qna (user, question) VALUES (?, ?)', [user, question]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add question' });
  }
});

// Delete a question (only by owner)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req.body; // user is the name or email of the current user
  if (!user) return res.status(400).json({ error: 'Missing user' });
  try {
    // Check ownership
    const [rows] = await db.query('SELECT * FROM qna WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Question not found' });
    if (rows[0].user !== user) return res.status(403).json({ error: 'Not authorized to delete this question' });
    await db.query('DELETE FROM qna WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete question' });
  }
});

// Edit a question (only by owner)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { user, question } = req.body;
  if (!user || !question) return res.status(400).json({ error: 'Missing user or question' });
  try {
    // Check ownership
    const [rows] = await db.query('SELECT * FROM qna WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Question not found' });
    if (rows[0].user !== user) return res.status(403).json({ error: 'Not authorized to edit this question' });
    await db.query('UPDATE qna SET question = ? WHERE id = ?', [question, id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to edit question' });
  }
});

// Admin (Liz) can add or edit a response to a question
router.put('/:id/response', async (req, res) => {
  const { id } = req.params;
  const { user, response, is_admin } = req.body;
  if (!user || typeof is_admin === 'undefined') return res.status(400).json({ error: 'Missing user or admin status' });
  if (!is_admin) return res.status(403).json({ error: 'Only admin can add or edit a response' });
  try {
    const [rows] = await db.query('SELECT * FROM qna WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Question not found' });
    await db.query('UPDATE qna SET response = ? WHERE id = ?', [response, id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update response' });
  }
});

module.exports = router; 