const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authCtrl = {
  register: async (req, res) => {
    try {
      const { username, email, password, birthday } = req.body;

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        password: passwordHash,
        birthday,
      });

      const access_token = createAccessToken({
        id: newUser._id,
        isAdmin: newUser.isAdmin,
      });

      const refresh_token = createRefreshToken({
        id: newUser._id,
        isAdmin: newUser.isAdmin,
      });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      await newUser.save();

      res.json({
        msg: 'Register successfully!',
        access_token,
        user: {
          ...newUser._doc,
          password: '',
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  registerEmail: async (req, res) => {
    try {
      const { email } = req.body;

      const user_email = await User.findOne({ email });

      if (user_email) {
        return res.status(400).json({
          msg: 'Sorry, the email you have entered is already registered. Please use another email.',
        });
      }

      res.json({
        msg: 'Your email is valid.',
        email,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          msg: "Sorry, we can't find an account with this email address. Please try again or create a new account.",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          msg: 'Incorrect password. Please try again or you can reset your password.',
        });
      }

      const access_token = createAccessToken({
        id: user._id,
        isAdmin: user.isAdmin,
      });
      const refresh_token = createRefreshToken({
        id: user._id,
        isAdmin: user.isAdmin,
      });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      res.json({
        msg: 'Login successully!',
        access_token,
        user: {
          ...user._doc,
          password: '',
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: '/api/refresh_token' });
      return res.json({ msg: 'Logged out.' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: 'Please login now.' });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: 'Please login now.' });

          const user = await User.findById(result.id).select('-password');

          if (!user) {
            return res.status(400).json({ msg: 'This user does not exist.' });
          }

          const access_token = createAccessToken({ id: result.id });

          res.json({
            access_token,
            refresh_token: rf_token,
            user,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '20s',
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = authCtrl;
