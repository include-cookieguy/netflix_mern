const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({ msg: 'Invalid Authentication!' });
    } else {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log(decoded);
      if (!decoded) {
        return res.status(400).json({ msg: 'Invalid Authentication!' });
      }

      const user = await User.findOne({ _id: decoded.id });
      req.user = user;
      next();
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
