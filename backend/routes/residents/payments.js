import express from 'express'

const router = express.Router()

// GET all payments for resident
router.get('/', (req, res) => {
  res.json({ message: 'Get all payments', data: [] })
})

// GET payment by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get payment ${req.params.id}`, data: {} })
})

// POST - Record new payment
router.post('/record', (req, res) => {
  const { residentId, billType, amount, paymentMethod, transactionId } = req.body
  res.status(201).json({
    message: 'Payment recorded',
    data: { id: Date.now(), residentId, billType, amount, paymentMethod, transactionId, status: 'completed', date: new Date() }
  })
})

// GET payment history
router.get('/history/all', (req, res) => {
  res.json({ message: 'Get payment history', data: [] })
})

// POST - Submit payment receipt
router.post('/:id/receipt', (req, res) => {
  res.json({ message: `Receipt submitted for payment ${req.params.id}`, data: { id: req.params.id, receiptUrl: '' } })
})

// PUT - Update payment status
router.put('/:id/status', (req, res) => {
  const { status } = req.body
  res.json({ message: `Payment ${req.params.id} status updated`, data: { id: req.params.id, status } })
})

// DELETE payment record
router.delete('/:id', (req, res) => {
  res.json({ message: `Payment ${req.params.id} deleted` })
})

export default router
