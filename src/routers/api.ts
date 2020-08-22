import express from 'express'
import userAPI from './user'
import itemAPI from './item'
import typeAPI from './type'
import personAPI from './person'

const router = express.Router()

router.use("/user", userAPI)
router.use("/item", itemAPI)
router.use("/type", typeAPI)
router.use("/person", personAPI)

export default router