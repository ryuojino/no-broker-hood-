import express from 'express'

const router = express.Router()

// GET all notices
router.get('/', (req, res) => {
  res.json({ message: 'Get all notices', data: [] })
})

// GET notice by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get notice ${req.params.id}`, data: {} })
})

// POST - Create new notice
router.post('/create', (req, res) => {
  const { userName, noticeType, title, content, attachments } = req.body
  res.status(201).json({
    message: 'Notice created',
    data: {
      id: Date.now(),
      userName,
      noticeType,
      title,
      content,
      attachments,
      createdAt: new Date(),
      views: 0
    }
  })
})

// PUT - Update notice
router.put('/:id/update', (req, res) => {
  const { title, content, noticeType } = req.body
  res.json({ message: `Notice ${req.params.id} updated`, data: { id: req.params.id, title, content, noticeType } })
})

// DELETE notice
router.delete('/:id', (req, res) => {
  res.json({ message: `Notice ${req.params.id} deleted` })
})

export default router
