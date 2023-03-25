import PostingAccounting from '../../models/postingModel.js'
import asyncHandler from 'express-async-handler'
import { request } from 'http'

//post /api/task/:id/transactions/:id/posting

export const createNewPosting = asyncHandler(async (req, res) => {
	const { hours, description, taskId } = req.body

	const posting = await PostingAccounting.create({
		hours,
		description,
		transactionId: req.params.id,
		taskId,
	})
	res.json(posting)
})

// get /api/task/:id/transactions/:id/posting

export const getPosting = asyncHandler(async (req, res) => {
	const posting = await PostingAccounting.find({})

	res.json(posting)
})

// delete /api/task/:id/transactions/:id/posting

export const deletePosting = asyncHandler(async (req, res) => {
	const { postingId } = req.body

	const posting = await PostingAccounting.findById(postingId)

	if (!posting) {
		res.status(404)
		throw new Error('Не удалишь')
	}
	await posting.remove()

	res.json({ message: 'Проводка удалена' })
})

//put /api/task/:id/transactions/:id/posting

export const changePosting = asyncHandler(async (req, res) => {
	const { isActive, postingId, completedTime } = req.body

	const posting = await PostingAccounting.findById(postingId)

	if (!posting) {
		res.status(404)
		throw new Error('Что-то не тo')
	}

	posting.isActive = isActive
	posting.completedTime = completedTime

	const updatedPosting = await posting.save()

	res.json(updatedPosting)
})
