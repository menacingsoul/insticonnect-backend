const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// User registration
router.post('/register', UserController.register);

// User login
router.post('/login', UserController.login);

// Other user-related routes (e.g., profile, update, delete, etc.)

module.exports = router;
