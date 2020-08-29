import express, { Response } from 'express'
import { getTypesByUser, saveType, updateType, deleteType } from '@models/Type'

const router = express.Router()

const handleError = (err: any, res: Response) => {
	res.json({ success: 0, err: err.toString() })
}

router.get('/', async (req, res) => {
	try {
		const userId: any = req.query.userId
		const types = await getTypesByUser(userId)
		res.json({ success: 1, types })
	} catch (err) {
		handleError(err, res)
	}
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
		const type = req.body
		const updatedType = await updateType(type)
		res.json({ success: 1, updatedType })
	} catch (err) {
		handleError(err, res)
	}
})

router.delete('/', async (req, res) => {
	try {
		const _id: any = req.query._id
		const deletedType = await deleteType(_id)
		res.json({ success: 1, deletedType })
	} catch (err) {
		handleError(err, res)
	}
})

export default router;
