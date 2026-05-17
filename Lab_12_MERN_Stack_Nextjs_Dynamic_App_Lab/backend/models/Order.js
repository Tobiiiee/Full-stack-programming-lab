const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name:     String,
  image:    String,
  price:    Number,
  quantity: Number,
});

const orderSchema = new mongoose.Schema({
  sessionId:      { type: String, required: true },
  items:          [orderItemSchema],
  totalAmount:    { type: Number, required: true },
  shippingAddress: {
    fullName: String,
    address:  String,
    city:     String,
    postcode: String,
    country:  String,
  },
  status: {
    type:    String,
    enum:    ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentMethod: { type: String, default: 'cod' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
