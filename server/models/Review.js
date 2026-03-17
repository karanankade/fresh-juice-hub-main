const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  approved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
