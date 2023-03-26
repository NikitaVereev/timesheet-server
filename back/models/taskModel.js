import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const taskSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
		isActive: { type: Boolean, default: false },
		time: { type: Number, default: 0 },
		completedTime: { type: Number, default: 0 },
		projectId: {
			type: ObjectId,
			ref: 'Project',
			required: false,
		},
	},
	{
		minimize: true,
		timestamps: true,
	}
)

const Tasks = mongoose.model('Tasks', taskSchema)

export default Tasks
