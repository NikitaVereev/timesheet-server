import Tasks from '../../models/taskModel.js'
import asyncHandler from 'express-async-handler'

// post /api/post

export const createNewTasks = asyncHandler(async (req, res) => {
	const { title, body, isActive, time } = req.body

	const tasks = await Tasks.create({
		title,
		body,
		isActive,
		time,
	})
	res.json(tasks)
})

// get /api/task

export const getTasks = asyncHandler(async (req, res) => {
	const tasks = await Tasks.find({})

	res.json(tasks)
})

// get /api/task/:id

export const getTask = asyncHandler(async (req, res) => {
	const task = await Tasks.findById(req.params.id).lean()

	res.json({ ...task })
})

// put /api/task/:id/complete

export const updateCompleteTask = asyncHandler(async (req, res) => {
	const { taskId, isActive, completedTime } = req.body

	const task = await Tasks.findById(taskId)

	if (!task) {
		res.status(404)
		throw new Error('Не найдено')
	}
	task.isActive = isActive
	task.completedTime = completedTime
	const updatedTask = await task.save()

	res.json(updatedTask)
})

export const updateTaskWithProject = asyncHandler(async (req, res) => {
	const { projectId, taskId } = req.body

	const task = await Tasks.findById(taskId)

	if (!task) {
		res.status(404)
		throw new Error('Не получилось')
	}

	task.projectId = projectId
	const updatedTask = await task.save()

	res.json(updatedTask)
})

// put /api/task

export const updateTask = asyncHandler(async (req, res) => {
	const { title, body, taskId, isActive, completedTime } = req.body

	const task = await Tasks.findById(taskId)

	if (!task) {
		res.status(404)
		throw new Error('Задача не найдена')
	}

	task.title = title
	task.body = body
	task.isActive = isActive
	task.completedTime = completedTime

	const updatedTask = await task.save()

	res.json(updatedTask)
})

// delete /api/task

export const deleteTask = asyncHandler(async (req, res) => {
	const { taskId } = req.body

	const task = await Tasks.findById(taskId)

	if (!task) {
		res.status(404)
		throw new Error('Задача не найдена')
	}

	await task.remove()

	res.json({ message: 'Задача была успешно удалена!' })
})
