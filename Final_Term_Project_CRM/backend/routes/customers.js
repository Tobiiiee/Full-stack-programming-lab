const express = require('express')
const router = express.Router()
const Customer = require('../models/Customer')
const { protect } = require('../middleware/auth')

router.use(protect)

// GET /api/customers
router.get('/', async (req, res) => {
  try {
    const { search, status } = req.query
    let filter = { createdBy: req.user._id }

    if (status && status !== 'All') {
      filter.status = status
    }

    if (search) {
      filter.name = { $regex: search, $options: 'i' }
    }

    const customers = await Customer.find(filter).sort({ createdAt: -1 })
    res.json(customers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/customers/:id
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    })

    if (!customer)
      return res.status(404).json({ message: 'Customer not found' })

    res.json(customer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST /api/customers
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, status, address, notes } = req.body

    if (!name || !email || !phone)
      return res.status(400).json({ message: 'Name, email and phone are required' })

    const customer = await Customer.create({
      name, email, phone, company, status, address, notes,
      createdBy: req.user._id,
    })

    res.status(201).json(customer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// PUT /api/customers/:id
router.put('/:id', async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    )

    if (!customer)
      return res.status(404).json({ message: 'Customer not found' })

    res.json(customer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// DELETE /api/customers/:id
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    })

    if (!customer)
      return res.status(404).json({ message: 'Customer not found' })

    res.json({ message: 'Customer deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router