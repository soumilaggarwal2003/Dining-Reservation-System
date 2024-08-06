require('dotenv').config(); // Add this line at the top to load environment variables

const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  // Extract token from Bearer format if used
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).send({
        message: "Require Admin Role!",
      });
    }
    next();
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

module.exports = {
  verifyToken,
  isAdmin
};
