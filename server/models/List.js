const mongoose = require('mongoose');

const ListSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    content: { type: mongoose.Types.ObjectId, ref: 'Movie' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('List', ListSchema);
