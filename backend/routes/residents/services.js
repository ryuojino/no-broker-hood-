import express from 'express'

const router = express.Router()

// GET all service requests
router.get('/', (req, res) => {
  res.json({ message: 'Get all service requests', data: [] })
})

// GET service request by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get service request ${req.params.id}`, data: {} })
})

// POST - Request a home service
router.post('/request', (req, res) => {
  const { residentId, serviceType, description, budget, preferredDate, preferredTime } = req.body
  res.status(201).json({
    message: 'Service request created',
    data: {
      id: Date.now(),
      residentId,
      serviceType,
      description,
      budget,
      preferredDate,
      preferredTime,
      status: 'pending',
      requestDate: new Date()
    }
  })
})

// PUT - Update service request status
router.put('/:id/status', (req, res) => {
  const { status } = req.body
  res.json({ message: `Service request ${req.params.id} status updated`, data: { id: req.params.id, status } })
})

// PUT - Assign service provider
router.put('/:id/assign', (req, res) => {
  const { providerId, providerName, providerPhone } = req.body
  res.json({
    message: `Service provider assigned to request ${req.params.id}`,
    data: { id: req.params.id, providerId, providerName, providerPhone, assignedDate: new Date() }
  })
})

// GET service history
router.get('/history/all', (req, res) => {
  res.json({ message: 'Get service history', data: [] })
})

// DELETE service request
router.delete('/:id', (req, res) => {
  res.json({ message: `Service request ${req.params.id} deleted` })
})

export default router
