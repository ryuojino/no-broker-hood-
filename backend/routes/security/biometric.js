import express from 'express'

const router = express.Router()

// GET all biometric records
router.get('/', (req, res) => {
  res.json({ message: 'Get all biometric records', data: [] })
})

// GET biometric record by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get biometric record ${req.params.id}`, data: {} })
})

// POST - Enroll biometric
router.post('/enroll', (req, res) => {
  const { staffName, staffType, enrollmentType, biometricData } = req.body
  res.status(201).json({
    message: 'Biometric enrolled',
    data: {
      id: Date.now(),
      staffName,
      staffType,
      enrollmentType,
      enrolledDate: new Date(),
      status: 'active'
    }
  })
})

// POST - Record attendance
router.post('/:id/attendance', (req, res) => {
  const { checkInTime } = req.body
  res.status(201).json({
    message: `Attendance recorded for staff ${req.params.id}`,
    data: {
      attendanceId: Date.now(),
      staffId: req.params.id,
      checkInTime,
      date: new Date()
    }
  })
})

// GET attendance records
router.get('/:id/attendance', (req, res) => {
  res.json({ message: `Get attendance records for staff ${req.params.id}`, data: [] })
})

// PUT - Update biometric status
router.put('/:id/status', (req, res) => {
  const { status } = req.body
  res.json({ message: `Biometric record ${req.params.id} status updated`, data: { id: req.params.id, status } })
})

// DELETE biometric record
router.delete('/:id', (req, res) => {
  res.json({ message: `Biometric record ${req.params.id} deleted` })
})

export default router
