const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user:    { type: String, required: true },
  rating:  { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true, min: 0 },
  oldPrice:    { type: Number, default: null },
  image:       { type: String, required: true },
  images:      [{ type: String }],
  category:    { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  tag:         { type: String, enum: ['featured', 'special', 'popular'], default: 'featured' },
  stock:       { type: Number, default: 10 },
  rating:      { type: Number, default: 0 },
  reviews:     [reviewSchema],
  isFeatured:  { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
