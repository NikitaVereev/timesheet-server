import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const projectSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
		isActive: { type: Boolean, default: false },
		tasks: [
			{
				type: ObjectId,
				ref: 'Tasks',
				required: true,
			},
		],
	},
	{
		minimize: false,
		timestamps: true,
	}
)

const Project = mongoose.model('Project', projectSchema)

export default Project
