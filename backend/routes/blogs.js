const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');

router.get('/', blogsController.getAllBlogs);
router.post('/', blogsController.createBlog);
// Define other routes like GET /:id, PUT /:id, DELETE /:id here

module.exports = router;