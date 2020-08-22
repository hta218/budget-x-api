import express, { Response } from 'express'
import { saveItem, updateItem, deleteItem } from '@models/Item'

const router = express.Router()

const handleError = (err: any, res: Response) => {
  res.json({ success: 0, err: err.toString() })
}

router.get('/', (req, res) => {
  res.json({ msg: 'get item ok' })
})

router.post('/', async (req, res) => {
  try {
    const item = req.body
    const savedItem = await saveItem(item)
    res.json({ success: 1, savedItem })
  } catch (err) {
    handleError(err, res)
  }
})

router.put('/', async (req, res) => {
  try {
    const item = req.body
    const updatedItem = await updateItem(item)
    res.json({ success: 1, updatedItem })
  } catch (err) {
    handleError(err, res)
  }
})

router.delete('/', async (req, res) => {
  try {
    const _id: any = req.query._id
    const deletedItem = await deleteItem(_id)
    res.json({ success: 1, deletedItem })
  } catch (err) {
    handleError(err, res)
  }
})

export default router;