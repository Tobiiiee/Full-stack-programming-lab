const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');
const Cart    = require('../models/Cart');

router.post('/', async (req, res) => {
  try {
    const { sessionId, shippingAddress, paymentMethod } = req.body;
    const cart = await Cart.findOne({ sessionId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const items = cart.items.map(item => ({
      product:  item.product._id,
      name:     item.product.name,
      image:    item.product.image,
      price:    item.product.price,
      quantity: item.quantity,
    }));

    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = new Order({ sessionId, items, totalAmount, shippingAddress, paymentMethod });
    await order.save();
    await Cart.findOneAndDelete({ sessionId });

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get('/:sessionId', async (req, res) => {
  try {
    const orders = await Order.find({ sessionId: req.params.sessionId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
