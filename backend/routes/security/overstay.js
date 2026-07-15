import express from 'express'

const router = express.Router()

// GET all overstay alerts
router.get('/', (req, res) => {
  res.json({ message: 'Get all overstay alerts', data: [] })
})

// GET alert by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get alert ${req.params.id}`, data: {} })
})

// POST - Create overstay alert
router.post('/create', (req, res) => {
  const { visitorName, unitNumber, expectedCheckoutTime, currentTime } = req.body
  const overstayDuration = new Date(currentTime) - new Date(expectedCheckoutTime)
  const severity = overstayDuration > 2 * 60 * 60 * 1000 ? 'critical' : 'warning'
  
  res.status(201).json({
    message: 'Overstay alert created',
    data: {
      id: Date.now(),
      visitorName,
      unitNumber,
      expectedCheckoutTime,
      currentTime,
      overstayDuration: `${Math.floor(overstayDuration / 1000 / 60)} minutes`,
      severity,
      status: 'active',
      createdDate: new Date()
    }
  })
})

// GET alerts filtered by status
router.get('/filter/:status', (req, res) => {
  res.json({ message: `Get overstay alerts with status: ${req.params.status}`, data: [] })
})

// PUT - Contact resident
router.put('/:id/contact-resident', (req, res) => {
  res.json({
    message: `Resident contacted for alert ${req.params.id}`,
    data: { id: req.params.id, contacted: true, contactedAt: new Date() }
  })
})

// PUT - Mark alert as resolved
router.put('/:id/resolve', (req, res) => {
  res.json({
    message: `Overstay alert ${req.params.id} marked as resolved`,
    data: { id: req.params.id, status: 'resolved', resolvedAt: new Date() }
  })
})

// DELETE alert
router.delete('/:id', (req, res) => {
  res.json({ message: `Overstay alert ${req.params.id} deleted` })
})

export default router
