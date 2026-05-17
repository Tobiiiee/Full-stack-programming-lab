const express = require('express');
const router  = express.Router();
const Deal    = require('../models/Deal');

router.get('/', async (req, res) => {
  try {
    const deals = await Deal.find({ isActive: true }).limit(4);
    res.json({ success: true, deals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const deal = new Deal(req.body);
    await deal.save();
    res.status(201).json({ success: true, deal });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
