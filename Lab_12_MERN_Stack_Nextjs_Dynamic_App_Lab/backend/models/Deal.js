const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  subtitle:   { type: String },
  image:      { type: String, required: true },
  discount:   { type: String, required: true },
  badgeColor: { type: String, default: '#F16E10' },
  link:       { type: String, default: '/' },
  isActive:   { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Deal', dealSchema);
