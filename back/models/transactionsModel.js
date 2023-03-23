import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const transactionsSchema = mongoose.Schema(
	{
		taskId: {
			type: ObjectId,
			ref: 'Tasks',
			required: true,
		},
		itsMyDay: {
			type: Date,
			default: new Date().toISOString().slice(0, 10) + 'T03:00:00.000Z',
		},
	},
	{
		minimize: false,
		timestamps: true,
	}
)

const Transactions = mongoose.model('Transactions', transactionsSchema)

export default Transactions
