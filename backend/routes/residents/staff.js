import express from 'express'

const router = express.Router()

// GET all staff records
router.get('/', (req, res) => {
  res.json({ message: 'Get all staff records', data: [] })
})

// GET staff by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get staff ${req.params.id}`, data: {} })
})

// POST - Add new staff member
router.post('/add', (req, res) => {
  const { residentId, staffName, staffType, phone, workingDays, salary } = req.body
  res.status(201).json({
    message: 'Staff member added',
    data: { id: Date.now(), residentId, staffName, staffType, phone, workingDays, salary, joinDate: new Date() }
  })
})

// PUT - Record staff attendance/timestamp
router.put('/:id/attendance', (req, res) => {
  const { checkInTime, checkOutTime } = req.body
  res.json({
    message: `Attendance recorded for staff ${req.params.id}`,
    data: { id: req.params.id, checkInTime, checkOutTime, date: new Date() }
  })
})

// GET staff attendance records
router.get('/:id/attendance', (req, res) => {
  res.json({ message: `Get attendance for staff ${req.params.id}`, data: [] })
})

// DELETE staff record
router.delete('/:id', (req, res) => {
  res.json({ message: `Staff ${req.params.id} deleted` })
})

export default router
