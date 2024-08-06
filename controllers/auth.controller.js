const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.User;
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if all required fields are provided
    if (!username || !password || !email) {
      return res.status(400).json({
        status: "Missing required fields",
        status_code: 400
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({
        status: "Username already exists",
        status_code: 400
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create a new user
    const user = await User.create({ username, password: hashedPassword, email });

    res.status(201).json({
      status: "Account successfully created",
      status_code: 201,
      user_id: user.id
    });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({
      status: "Error creating account",
      status_code: 500
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({
        status: "Incorrect username/password provided. Please retry",
        status_code: 401
      });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Incorrect username/password provided. Please retry",
        status_code: 401
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({
      status: "Login successful",
      status_code: 200,
      user_id: user.id,
      access_token: token
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      status: "Error logging in",
      status_code: 500
    });
  }
};
