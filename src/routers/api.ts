import express from 'express'
import itemAPI from './item'
import typeAPI from './type'

const router = express.Router()

router.use("/item", itemAPI)
router.use("/type", typeAPI)

export default router