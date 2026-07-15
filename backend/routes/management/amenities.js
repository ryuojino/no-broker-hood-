import express from 'express'

const router = express.Router()

// GET all amenities
router.get('/', (req, res) => {
  res.json({ message: 'Get all amenities', data: [] })
})

// GET amenity by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get amenity ${req.params.id}`, data: {} })
})

// POST - Add new amenity
router.post('/add', (req, res) => {
  const { amenityName, capacity, hourlyRate, description } = req.body
  res.status(201).json({
    message: 'Amenity added',
    data: {
      id: Date.now(),
      amenityName,
      capacity,
      hourlyRate,
      description,
      available: true,
      createdDate: new Date()
    }
  })
})

// POST - Create booking
router.post('/booking/create', (req, res) => {
  const { amenityId, residentName, residentPhone, bookingDate, startTime, endTime } = req.body
  res.status(201).json({
    message: 'Amenity booked',
    data: {
      bookingId: Date.now(),
      amenityId,
      residentName,
      residentPhone,
      bookingDate,
      startTime,
      endTime,
      status: 'confirmed',
      bookingDate: new Date()
    }
  })
})

// GET bookings for amenity
router.get('/:id/bookings', (req, res) => {
  res.json({ message: `Get bookings for amenity ${req.params.id}`, data: [] })
})

// PUT - Cancel booking
router.put('/booking/:bookingId/cancel', (req, res) => {
  res.json({ message: `Booking ${req.params.bookingId} cancelled`, data: { bookingId: req.params.bookingId, status: 'cancelled' } })
})

// DELETE amenity
router.delete('/:id', (req, res) => {
  res.json({ message: `Amenity ${req.params.id} deleted` })
})

export default router
