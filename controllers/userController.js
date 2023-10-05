const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token for the new user
    const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });

    // Respond with the token and user data (you may choose to exclude the password field)
    res.status(201).json({ token, user: { _id: newUser._id, username, email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // If the user doesn't exist
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      // If passwords don't match
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token for the user
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
  
      // Respond with the token and user data (you may choose to exclude the password field)
      res.status(200).json({ token, user: { _id: user._id, username: user.username, email: user.email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
