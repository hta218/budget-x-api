import express, { Response, Request, NextFunction } from 'express'
import { Types } from 'mongoose'
import userAPI from './user'
import itemAPI from './item'
import typeAPI from './type'
import personAPI from './person'
import { getUserById } from '@models/User'

const router = express.Router()

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
	if (req.method === "DELETE") {
		next()
		return
	}

	const { userId } = req.query
	if (!userId) {
		res.json({ success: 0, message: "Missing user's id" })
	} else if (!Types.ObjectId.isValid(userId as string)) {
		res.json({ success: 0, message: "Invalid user's id" })
	} else {
		const user = await getUserById(userId as string);
		if (!user) {
			res.json({ success: 0, message: "User not found!!" })
		} else {
			next()
		}
	}
}

router.use("/user", userAPI)
router.use("/item", [verifyUser], itemAPI)
router.use("/type", [verifyUser], typeAPI)
router.use("/person", [verifyUser], personAPI)

export default router
