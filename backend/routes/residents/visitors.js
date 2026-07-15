import express from 'express'

const router = express.Router()

// GET all visitors for a resident
router.get('/', (req, res) => {
  res.json({ message: 'Get all visitors', data: [] })
})

// GET visitor by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get visitor ${req.params.id}`, data: {} })
})

// POST - Pre-authorize a visitor
router.post('/pre-authorize', (req, res) => {
  const { guestName, relationship, phone, vehicleNumber, visitDate, visitTime, unitNumber, residentId } = req.body
  res.status(201).json({
    message: 'Visitor pre-authorized',
    data: { id: Date.now(), guestName, relationship, phone, vehicleNumber, visitDate, visitTime, unitNumber, status: 'pending' }
  })
})

// PUT - Approve visitor
router.put('/:id/approve', (req, res) => {
  res.json({ message: `Visitor ${req.params.id} approved`, data: { id: req.params.id, status: 'approved' } })
})

// PUT - Deny visitor
router.put('/:id/deny', (req, res) => {
  res.json({ message: `Visitor ${req.params.id} denied`, data: { id: req.params.id, status: 'denied' } })
})

// PUT - Record visitor check-in
router.put('/:id/checkin', (req, res) => {
  res.json({ message: `Visitor ${req.params.id} checked in`, data: { id: req.params.id, status: 'checked-in', checkInTime: new Date() } })
})

// PUT - Record visitor check-out
router.put('/:id/checkout', (req, res) => {
  res.json({ message: `Visitor ${req.params.id} checked out`, data: { id: req.params.id, status: 'checked-out', checkOutTime: new Date() } })
})

// DELETE visitor
router.delete('/:id', (req, res) => {
  res.json({ message: `Visitor ${req.params.id} deleted` })
})

export default router
