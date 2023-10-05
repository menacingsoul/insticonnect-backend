const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

// Create a new post
router.post('/create', PostController.createPost);

// Get all posts
router.get('/', PostController.getAllPosts);

module.exports = router;
