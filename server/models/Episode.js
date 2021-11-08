const mongoose = require("mongoose");

const EpisodeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    belongsToMovie: {
      seasonName: {
        type: Number,
      },
      movieName: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Episode", EpisodeSchema);
