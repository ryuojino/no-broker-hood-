import express from 'express'

const router = express.Router()

// GET all SOS alerts
router.get('/', (req, res) => {
  res.json({ message: 'Get all SOS alerts', data: [] })
})

// GET SOS alert by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get SOS alert ${req.params.id}`, data: {} })
})

// POST - Trigger SOS alert
router.post('/trigger', (req, res) => {
  const { residentId, emergencyType, locationDetails, contactNumber } = req.body
  res.status(201).json({
    message: 'SOS alert triggered',
    data: {
      id: Date.now(),
      residentId,
      emergencyType,
      locationDetails,
      contactNumber,
      status: 'active',
      triggerTime: new Date()
    }
  })
})

// PUT - Update SOS alert status
router.put('/:id/status', (req, res) => {
  const { status } = req.body
  res.json({ message: `SOS alert ${req.params.id} status updated`, data: { id: req.params.id, status } })
})

// PUT - Record response to SOS
router.put('/:id/respond', (req, res) => {
  const { responderType, responderName, responseTime } = req.body
  res.json({
    message: `Response recorded for SOS alert ${req.params.id}`,
    data: { id: req.params.id, responderType, responderName, responseTime, respondedAt: new Date() }
  })
})

// GET SOS history
router.get('/history/all', (req, res) => {
  res.json({ message: 'Get SOS history', data: [] })
})

// DELETE SOS alert
router.delete('/:id', (req, res) => {
  res.json({ message: `SOS alert ${req.params.id} deleted` })
})

export default router
