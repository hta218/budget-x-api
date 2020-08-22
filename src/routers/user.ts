import express, { Response } from 'express'
import { initUser, updateUser } from '@models/User'

const router = express.Router()
const handleError = (err: any, res: Response) => {
  res.json({ success: 0, err: err.toString() })
}

router.get('/init', async (req, res) => {
  try {
    const newUser = await initUser()
    res.json({ succes: 1, message: "Initialized new user data", newUser })
  } catch (err) { handleError(err, res) }
})

router.get('/', (req, res) => {
  try {
    const _id: any = req.query._id

  } catch (err) { handleError(err, res) }
})

router.put('/', async (req, res) => {
  try {
    const user = req.body
    if (!user._id) {
      res.json({ success: 0, message: "Missing user's id" })
      return
    }
    const updatedUser = await updateUser(user)
    res.json({ success: 1, updatedUser })
  } catch (err) {
    handleError(err, res)
  }
})

export default router
