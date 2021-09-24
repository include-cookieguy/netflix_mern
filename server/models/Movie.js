const mongoose = require('mongoose');

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
    },
    genre: {
      type: String,
      required: true,
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Movie', MovieSchema);
