import express from 'express'
import { saveItem } from 'src/models/Item'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ msg: 'get item ok' })
})

router.post('/', (req, res) => {
  const item = req.body
  saveItem(item)
})

export default router;