import express, { Response } from 'express'
import { initUser, updateUser } from '@models/User'
import { savePerson, PersonDocument } from '@models/Person'
import { saveType } from '@models/Type'

const router = express.Router()
const handleError = (err: any, res: Response) => {
  res.json({ success: 0, err: err.toString() })
}

router.get('/init', async (req, res) => {
  try {
    const start = +(new Date())
    const newUser: any = await initUser()
    const { _id: userId } = newUser

    await savePerson({ name: "Anonymous", userId })
    await saveType({ name: "Ăn uống", userId })
    await saveType({ name: "Mua đồ dùng gia đình", userId })
    await saveType({ name: "Mua quần áo", userId })
    await saveType({ name: "Đi chơi với bạn", userId })
    await saveType({ name: "Đổ xăng, gửi xe", userId })
    await saveType({ name: "Tiền nhà", userId })
    await saveType({ name: "Tiền điện thoại", userId })
    await saveType({ name: "Tiền ăn cưới, thăm hỏi", userId })
    await saveType({ name: "Lương", userId })
    await saveType({ name: "Thu nhập khác", userId })
    await saveType({ name: "Trả nợ / cho vay", userId })

    const end = +(new Date())

    res.json({ succes: 1, message: "Initialized new user data", newUser, time: ((end - start) / 1000) })
  } catch (err) { handleError(err, res) }
})

router.get('/', (req, res) => {
  try {
    // TODO: get all users
    res.json({ success: 1, message: "WIP" })
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
