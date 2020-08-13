import express, { Response } from 'express'
import { saveItem } from '@models/Item'

const router = express.Router()

const handleError = (err: Error, res: Response) => {
  console.log(err)
  res.json({ success: 0, message: "Failed to save item!", err })
}

router.get('/', (req, res) => {
  res.json({ msg: 'get item ok' })
})

router.post('/', (req, res) => {
  try {
    const item = req.body
    saveItem(item)
      .then(savedItem => {
        res.json({ success: 1, savedItem })
      })
      .catch(err => handleError(err, res))
  } catch (err) {
    handleError(err, res)
  }
})

export default router;