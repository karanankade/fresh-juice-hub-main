const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: String,
  content: String,
  category: { type: String, default: "Health" },
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
