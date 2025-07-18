const express = require('express');
const cors = require('cors');
require('dotenv').config();

const blogsRouter = require('./routes/blogs');
const authRouter = require('./routes/auth');
const qnaRouter = require('./routes/qna');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001']
}));
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.use('/api/blogs', blogsRouter);
app.use('/api/auth', authRouter);
app.use('/api/qna', qnaRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});