import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const postingAccountingSchema = mongoose.Schema(
	{
		hours: { type: Number, required: true },
		description: { type: String, required: true },
		isActive: { type: Boolean, default: false },
		transactionId: {
			type: ObjectId,
			ref: 'Transactions',
			required: true,
		},
		taskId: {
			type: ObjectId,
			ref: 'Tasks',
			required: false,
		},
		completedTime: { type: Number, default: 0 },
	},
	{
		minimize: false,
		timestamps: true,
	}
)

const PostingAccounting = mongoose.model(
	'PostingAccounting',
	postingAccountingSchema
)

export default PostingAccounting
