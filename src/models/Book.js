const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    author: { type: String },
    genre: { type: String },          // 🔹 Added for suggestions
    ageGroup: { type: Number },       // 🔹 Minimum age suitable
    price: { type: Number, required: true },
    description: {type: String },
    stock: { type: Number, default: 0 },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Book', bookSchema);
