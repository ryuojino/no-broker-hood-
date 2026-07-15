import express from 'express'

const router = express.Router()

// GET all gate entries
router.get('/', (req, res) => {
  res.json({ message: 'Get all gate entries', data: [] })
})

// GET gate entry by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get gate entry ${req.params.id}`, data: {} })
})

// POST - Record entry
router.post('/entry', (req, res) => {
  const { visitorType, visitorName, unitNumber, vehicleNumber, purposeOfVisit } = req.body
  res.status(201).json({
    message: 'Entry recorded',
    data: {
      id: Date.now(),
      visitorType,
      visitorName,
      unitNumber,
      vehicleNumber,
      purposeOfVisit,
      entryTime: new Date(),
      status: 'inside'
    }
  })
})

// POST - Record exit
router.post('/:id/exit', (req, res) => {
  res.json({
    message: `Exit recorded for entry ${req.params.id}`,
    data: { id: req.params.id, exitTime: new Date(), status: 'exited' }
  })
})

// GET entries for today
router.get('/filter/today', (req, res) => {
  res.json({ message: 'Get todays gate entries', data: [] })
})

// GET all historical entries
router.get('/filter/all', (req, res) => {
  res.json({ message: 'Get all historical gate entries', data: [] })
})

// PUT - Update entry details
router.put('/:id/update', (req, res) => {
  const { visitorName, unitNumber } = req.body
  res.json({ message: `Gate entry ${req.params.id} updated`, data: { id: req.params.id, visitorName, unitNumber } })
})

// DELETE entry
router.delete('/:id', (req, res) => {
  res.json({ message: `Gate entry ${req.params.id} deleted` })
})

export default router
