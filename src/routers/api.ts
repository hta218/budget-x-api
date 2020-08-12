import express from 'express'
import itemAPI from './item'

const router = express.Router()

router.use("/item", itemAPI)

export default router