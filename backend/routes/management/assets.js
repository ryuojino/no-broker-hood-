import express from 'express'

const router = express.Router()

// GET all assets
router.get('/', (req, res) => {
  res.json({ message: 'Get all assets', data: [] })
})

// GET asset by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get asset ${req.params.id}`, data: {} })
})

// POST - Add new asset
router.post('/add', (req, res) => {
  const { assetName, assetCategory, location, purchaseDate, purchasePrice, condition } = req.body
  res.status(201).json({
    message: 'Asset added',
    data: {
      id: Date.now(),
      assetName,
      assetCategory,
      location,
      purchaseDate,
      purchasePrice,
      condition,
      addedDate: new Date()
    }
  })
})

// PUT - Update asset condition
router.put('/:id/condition', (req, res) => {
  const { condition } = req.body
  res.json({ message: `Asset ${req.params.id} condition updated`, data: { id: req.params.id, condition } })
})

// PUT - Record maintenance payment
router.put('/:id/maintenance', (req, res) => {
  const { vendorId, amount, maintenanceDate } = req.body
  res.json({
    message: `Maintenance recorded for asset ${req.params.id}`,
    data: { id: req.params.id, vendorId, amount, maintenanceDate }
  })
})

// GET asset maintenance history
router.get('/:id/maintenance', (req, res) => {
  res.json({ message: `Get maintenance history for asset ${req.params.id}`, data: [] })
})

// DELETE asset
router.delete('/:id', (req, res) => {
  res.json({ message: `Asset ${req.params.id} deleted` })
})

export default router
