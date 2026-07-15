import express from 'express'

const router = express.Router()

// GET all patrol routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all patrol routes', data: [] })
})

// GET patrol route by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get patrol route ${req.params.id}`, data: {} })
})

// POST - Create patrol route
router.post('/create', (req, res) => {
  const { routeName, checkpoints, frequency, description } = req.body
  res.status(201).json({
    message: 'Patrol route created',
    data: {
      id: Date.now(),
      routeName,
      checkpoints,
      frequency,
      description,
      createdDate: new Date(),
      status: 'active'
    }
  })
})

// POST - Log checkpoint
router.post('/:id/log-checkpoint', (req, res) => {
  const { checkpointName, checkpointTime, guardName, observations } = req.body
  res.status(201).json({
    message: `Checkpoint logged for route ${req.params.id}`,
    data: {
      logId: Date.now(),
      routeId: req.params.id,
      checkpointName,
      checkpointTime,
      guardName,
      observations,
      loggedAt: new Date()
    }
  })
})

// GET patrol logs for route
router.get('/:id/logs', (req, res) => {
  res.json({ message: `Get patrol logs for route ${req.params.id}`, data: [] })
})

// PUT - Update patrol route
router.put('/:id/update', (req, res) => {
  const { routeName, frequency, status } = req.body
  res.json({
    message: `Patrol route ${req.params.id} updated`,
    data: { id: req.params.id, routeName, frequency, status }
  })
})

// DELETE patrol route
router.delete('/:id', (req, res) => {
  res.json({ message: `Patrol route ${req.params.id} deleted` })
})

export default router
