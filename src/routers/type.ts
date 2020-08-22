import express, { Response } from 'express'
import { saveType, updateType, deleteType } from '@models/Type'

const router = express.Router()

const handleError = (err: any, res: Response) => {
  res.json({ success: 0, err: err.toString() })
}

router.get('/', (req, res) => {
  res.json({ msg: 'get types ok' })
})

router.post('/', async (req, res) => {
  try {
    const type = req.body
    const savedType = await saveType(type)
    res.json({ success: 1, savedType })
  } catch (err) {
    handleError(err, res)
  }
})

router.put('/', async (req, res) => {
  try {
    const item = req.body
    const updatedItem = await updateType(item)
    res.json({ success: 1, updatedItem })
  } catch (err) {
    handleError(err, res)
  }
})

router.delete('/', async (req, res) => {
  try {
    const _id: any = req.query._id
    const deletedItem = await deleteType(_id)
    res.json({ success: 1, deletedItem })
  } catch (err) {
    handleError(err, res)
  }
})

export default router;