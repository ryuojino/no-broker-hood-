import express from 'express'

const router = express.Router()

// GET all complaints
router.get('/', (req, res) => {
  res.json({ message: 'Get all complaints', data: [] })
})

// GET complaint by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get complaint ${req.params.id}`, data: {} })
})

// POST - Create new complaint
router.post('/create', (req, res) => {
  const { residentName, unitNumber, complaintCategory, description, priority } = req.body
  res.status(201).json({
    message: 'Complaint created',
    data: {
      id: Date.now(),
      residentName,
      unitNumber,
      complaintCategory,
      description,
      priority,
      status: 'open',
      createdDate: new Date(),
      assignedTo: null
    }
  })
})

// GET complaints filtered by status
router.get('/filter/:status', (req, res) => {
  res.json({ message: `Get complaints with status: ${req.params.status}`, data: [] })
})

// PUT - Assign complaint to staff
router.put('/:id/assign', (req, res) => {
  const { staffId, staffName, staffEmail } = req.body
  res.json({
    message: `Complaint ${req.params.id} assigned`,
    data: { id: req.params.id, assignedTo: staffName, staffId, assignedDate: new Date() }
  })
})

// PUT - Update complaint status
router.put('/:id/status', (req, res) => {
  const { status } = req.body
  res.json({ message: `Complaint ${req.params.id} status updated`, data: { id: req.params.id, status } })
})

// DELETE complaint
router.delete('/:id', (req, res) => {
  res.json({ message: `Complaint ${req.params.id} deleted` })
})

export default router
