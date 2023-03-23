import Transactions from '../../models/transactionsModel.js'
import asyncHandler from 'express-async-handler'
import { request } from 'http'

//post /api/task/:id/transactions

export const createNewTransactions = asyncHandler(async (req, res) => {
	const { date } = req.body
	const transactions = await Transactions.create({
		date,
		taskId: req.params.id,
	})
	res.json(transactions)
})
//get api/task/:id/transactions

export const getTransactions = asyncHandler(async (req, res) => {
	const transaction = await Transactions.find({})
	res.json(transaction)
})

//delete api/task/:id/transactions

export const deleteTransactions = asyncHandler(async (req, res) => {
	const { transactionId } = req.body

	const transaction = await Transactions.findById(transactionId)

	if (!transaction) {
		res.status(404)
		throw new Error('Удаление не прошло')
	}
	await transaction.remove()

	res.json({ message: 'Удаление прошло' })
})

//get api/task/:id/transactions/:id

export const getTransaction = asyncHandler(async (req, res) => {
	const transaction = await Transactions.findById(req.params.id).lean()

	res.json({ ...transaction })
})

//get /api/task/:id/transactions/:id/?days=2020/20/20

export const getTransactionByDays = asyncHandler(async (req, res) => {
	const filters = await Transactions.find({
		itsMyDay: req.params.itsMyDay,
	})

	res.json({ filters })
})
