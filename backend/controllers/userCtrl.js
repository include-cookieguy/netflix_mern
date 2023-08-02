const User = require("../models/User");
const bcrypt = require("bcrypt");
const Movie = require("../models/Movie");

const userCtrl = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json({ message: "Get users error" });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateAvatar: async (req, res) => {
    try {
      const { profilePic } = req.body;

      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          profilePic,
        }
      );

      res.json({ msg: "Update avatar successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUsername: async (req, res) => {
    try {
      const { username } = req.body;

      await User.findByIdAndUpdate(req.user._id, {
        username,
      });

      res.json({ msg: "Update username successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updatePassword: async (req, res) => {
    try {
      const { password } = req.body;

      const passwordHash = await bcrypt.hash(password, 12);

      await User.findByIdAndUpdate(req.user._id, {
        password: passwordHash,
      });

      res.json({ msg: "Update password successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getMovieFav: async (req, res) => {
    try {
      const favList = await User.findById(req.user.id)
        .select("favouriteMovie")
        .populate("favouriteMovie");

      res.json(favList);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  addMovieToFav: async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res.status(500).json({ msg: "This movie does not exist." });
      }

      const movieAdded = await User.find({
        _id: req.user.id,
        favouriteMovie: req.params.id,
      });

      if (movieAdded.length > 0) {
        return res.status(500).json({ msg: "You added this movie before." });
      }

      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          favouriteMovie: req.params.id,
        },
      });

      res.json({
        msg: "This movie has been added to your favourite list!",
        movie: movie,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  removeMovieFromFav: async (req, res) => {
    try {
      const movieRemoved = await User.find({
        _id: req.user.id,
        favouriteMovie: req.params.id,
      });

      if (movieRemoved.length === 0) {
        return res.status(500).json({ msg: "This movie isn't in your list." });
      }

      await User.findByIdAndUpdate(req.user.id, {
        $pull: {
          favouriteMovie: req.params.id,
        },
      });

      res.json({
        msg: "This movie has been removed from your favourite list!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  removeAllMovieFromFav: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $set: {
          favouriteMovie: [],
        },
      });
      res.json({
        msg: "All movie in favourite list has been deleted!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getPausedAtList: async (req, res) => {
    try {
      const getPauses = await User.findById(req.user.id, { watchAgain: 1 });

      if (getPauses) {
        res.json(getPauses.watchAgain);
      } else {
        res.json({ msg: "You haven't watched any movies" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createPausedAt: async (req, res) => {
    try {
      const result = await User.findByIdAndUpdate(req.user.id, {
        $push: {
          watchAgain: req.body,
        },
      });

      res.json(result);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  setPausedAt: async (req, res) => {
    try {
      const abc = await User.findOneAndUpdate(
        {
          _id: req.user.id,
          "watchAgain.title": req.body.title,
        },
        {
          $set: { "watchAgain.$": req.body },
        }
      );

      res.json({
        msg: "Set paused done!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  expirePausedAt: async (req, res) => {
    try {
      const deleteWatchAgain = await User.findById(req.user.id, {
        watchAgain: 1,
      });

      const result = deleteWatchAgain.watchAgain.filter(
        (e) => e._id !== req.params.id
      );

      await User.findByIdAndUpdate(req.user.id, {
        $set: {
          watchAgain: result,
        },
      });

      res.json({
        msg: "Delete paused done!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteAccount: async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: "This account has been deleted." });
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    } else {
      return res.status(500).json({ msg: "You can delete only your account!" });
    }
  },

  newUser: async (req, res) => {
    try {
      const { username, email, password, birthday, isAdmin } = req.body;

      const user_email = await User.findOne({ email });
      if (user_email) {
        return res.status(400).json({
          msg: "This email is already registered. Please use another email.",
        });
      }
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        password: passwordHash,
        birthday,
        isAdmin,
      });
      await newUser.save();

      res.json({ msg: "Create successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUserById: async (req, res) => {
    let { _id, username, email, newPassword, profilePic, birthday, isAdmin } =
      req.body;
    try {
      if (newPassword) {
        newPassword = await bcrypt.hash(newPassword, 12);
        await User.findByIdAndUpdate(_id, {
          username,
          email,
          password: newPassword,
          profilePic,
          birthday,
          isAdmin,
        });
      } else {
        await User.findByIdAndUpdate(_id, {
          username,
          email,
          profilePic,
          birthday,
          isAdmin,
        });
      }

      return res.status(200).json({ msg: "Update successfully!" });
    } catch (err) {
      return res.status(400).json({ msg: "Edit user error!" });
    }
  },
};

module.exports = userCtrl;
