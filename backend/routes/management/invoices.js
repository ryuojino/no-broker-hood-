import express from 'express'

const router = express.Router()

// GET all invoices
router.get('/', (req, res) => {
  res.json({ message: 'Get all invoices', data: [] })
})

// GET invoice by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get invoice ${req.params.id}`, data: {} })
})

// POST - Generate new invoice
router.post('/generate', (req, res) => {
  const { unitNumber, residentName, maintenanceCharge, otherCharges, gstRate } = req.body
  const total = (maintenanceCharge + otherCharges) * (1 + gstRate / 100)
  res.status(201).json({
    message: 'Invoice generated',
    data: {
      id: Date.now(),
      unitNumber,
      residentName,
      maintenanceCharge,
      otherCharges,
      gstRate,
      total,
      status: 'pending',
      generatedDate: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  })
})

// PUT - Update invoice status
router.put('/:id/status', (req, res) => {
  const { status } = req.body
  res.json({ message: `Invoice ${req.params.id} status updated`, data: { id: req.params.id, status } })
})

// PUT - Mark invoice as paid
router.put('/:id/paid', (req, res) => {
  res.json({ message: `Invoice ${req.params.id} marked as paid`, data: { id: req.params.id, status: 'paid', paidDate: new Date() } })
})

// GET invoice download
router.get('/:id/download', (req, res) => {
  res.json({ message: `Download invoice ${req.params.id}`, data: { invoiceUrl: '' } })
})

// DELETE invoice
router.delete('/:id', (req, res) => {
  res.json({ message: `Invoice ${req.params.id} deleted` })
})

export default router
