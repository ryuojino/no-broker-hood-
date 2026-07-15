import express from 'express'

const router = express.Router()

// GET all vendors
router.get('/', (req, res) => {
  res.json({ message: 'Get all vendors', data: [] })
})

// GET vendor by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get vendor ${req.params.id}`, data: {} })
})

// POST - Add new vendor
router.post('/add', (req, res) => {
  const { vendorName, vendorType, contactPerson, phone, email, address } = req.body
  res.status(201).json({
    message: 'Vendor added',
    data: {
      id: Date.now(),
      vendorName,
      vendorType,
      contactPerson,
      phone,
      email,
      address,
      addedDate: new Date()
    }
  })
})

// POST - Record payment to vendor
router.post('/:id/payment', (req, res) => {
  const { amount, description, paymentDate } = req.body
  res.status(201).json({
    message: `Payment recorded for vendor ${req.params.id}`,
    data: {
      paymentId: Date.now(),
      vendorId: req.params.id,
      amount,
      description,
      paymentDate,
      status: 'completed'
    }
  })
})

// GET vendor payment history
router.get('/:id/payments', (req, res) => {
  res.json({ message: `Get payment history for vendor ${req.params.id}`, data: [] })
})

// PUT - Update vendor details
router.put('/:id/update', (req, res) => {
  const { contactPerson, phone, email, address } = req.body
  res.json({
    message: `Vendor ${req.params.id} updated`,
    data: { id: req.params.id, contactPerson, phone, email, address }
  })
})

// DELETE vendor
router.delete('/:id', (req, res) => {
  res.json({ message: `Vendor ${req.params.id} deleted` })
})

export default router
