const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image:   { type: String, required: true },
  author:  { type: String, default: 'Rustik Plank Team' },
  slug:    { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
