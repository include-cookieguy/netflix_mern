const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: Object,
      required: true,
    },
    profilePic: {
      type: String,
      default: function () {
        const arr = [
          "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
          "https://pbs.twimg.com/media/DmBraqkXcAA1Yco.jpg",
          "https://pbs.twimg.com/profile_images/1356333120992149505/-qvakEK7_400x400.jpg",
          "https://i.pinimg.com/originals/b4/0f/9f/b40f9f8fc0fb88aabf2a8acbc39c0ac0.png",
        ];

        return arr[Math.floor(Math.random() * arr.length)];
      },
    },
    favouriteMovie: [{ type: mongoose.Types.ObjectId, ref: "Movie" }],
    watchAgain: [{ type: Object }],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
