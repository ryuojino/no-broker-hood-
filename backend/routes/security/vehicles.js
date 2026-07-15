import express from 'express'

const router = express.Router()

// GET all registered vehicles
router.get('/', (req, res) => {
  res.json({ message: 'Get all registered vehicles', data: [] })
})

// GET vehicle by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get vehicle ${req.params.id}`, data: {} })
})

// POST - Register vehicle
router.post('/register', (req, res) => {
  const { ownerName, unitNumber, vehicleType, registrationNumber, color, parkingSlot } = req.body
  res.status(201).json({
    message: 'Vehicle registered',
    data: {
      id: Date.now(),
      ownerName,
      unitNumber,
      vehicleType,
      registrationNumber,
      color,
      parkingSlot,
      registrationDate: new Date(),
      status: 'active'
    }
  })
})

// POST - Log violation
router.post('/violation/log', (req, res) => {
  const { registrationNumber, violationType, description, violationDate } = req.body
  res.status(201).json({
    message: 'Vehicle violation logged',
    data: {
      violationId: Date.now(),
      registrationNumber,
      violationType,
      description,
      violationDate,
      status: 'recorded',
      loggedAt: new Date()
    }
  })
})

// GET violations
router.get('/violations/all', (req, res) => {
  res.json({ message: 'Get all vehicle violations', data: [] })
})

// PUT - Update vehicle details
router.put('/:id/update', (req, res) => {
  const { color, parkingSlot } = req.body
  res.json({
    message: `Vehicle ${req.params.id} updated`,
    data: { id: req.params.id, color, parkingSlot }
  })
})

// DELETE vehicle registration
router.delete('/:id', (req, res) => {
  res.json({ message: `Vehicle ${req.params.id} deleted` })
})

export default router
