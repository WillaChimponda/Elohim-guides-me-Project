const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('794056152748-5jl64o6vth79cijk6gucq8ea9t8st50s.apps.googleusercontent.com');
const db = require('../models/db');

router.post('/register', register);
router.post('/login', login);

router.post('/google', async (req, res) => {
  console.log('Google route hit');
  const { token } = req.body;
  console.log('Received Google token:', token); // <-- Add this line
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '794056152748-5jl64o6vth79cijk6gucq8ea9t8st50s.apps.googleusercontent.com',
    });
    // ...rest of your code...
    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    // Check if user exists in DB
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    let user;
    if (rows.length > 0) {
      user = rows[0];
    } else {
      // Create new user
      const [result] = await db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, 'google-oauth']
      );
      user = { id: result.insertId, name, email, is_admin: false };
    }

    // You should generate a real JWT here; for now, use a dummy token
    res.json({ user: { ...user, is_admin: user.is_admin }, token: 'dummy-jwt-token' });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(401).json({ error: 'Invalid Google token' });
  }
});

module.exports = router; 