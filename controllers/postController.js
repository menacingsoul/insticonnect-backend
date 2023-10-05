const Post = require('../models/post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Create and save the post to the database
    const newPost = new Post({ title, content });
    await newPost.save();
    
    res.json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    // Retrieve all posts from the database
    const posts = await Post.find();
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
