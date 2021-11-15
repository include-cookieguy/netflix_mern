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
    actors: {
      type: String,
    },
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

MovieSchema.index({ title: "text", actors: "text" });
MovieSchema.index({ title: 1 });
MovieSchema.index({ actors: 1 });

module.exports = mongoose.model("Movie", MovieSchema);
