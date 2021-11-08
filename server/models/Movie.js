const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    posterTitle: {
      type: String,
      required: true,
    },
    posterSm: {
      type: String,
      required: true,
    },
    posterCard: {
      type: String,
    },
    trailer: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    limitAge: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    imdb: {
      type: String,
      required: true,
    },
    actors: [{ type: mongoose.Types.ObjectId, ref: "Actor" }],
    isSeries: {
      type: Boolean,
      default: false,
    },
    seasons: [
      {
        seasonName: {
          type: Number,
        },
        seasonContent: [{ type: Object }],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", MovieSchema);
