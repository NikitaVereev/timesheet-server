import asyncHandler from 'express-async-handler'
import Project from '../../models/projectModel.js'

//post /api/projects

export const createNewProject = asyncHandler(async (req, res) => {
	const { title, body, isActive, taskIdx } = req.body

	const project = await Project.create({
		title,
		body,
		isActive,
		tasks: taskIdx,
	})

	res.json(project)
})

//get /api/projects

export const getProjects = asyncHandler(async (req, res) => {
	const projects = await Project.find({}).populate('tasks')

	res.json(projects)
})

// get /api/projects/:id

export const getProject = asyncHandler(async (req, res) => {
	const project = await Project.findById(req.params.id).populate('tasks').lean()

	res.json({ ...project })
})

// put /api/projects/:id

export const updateProjectTasks = asyncHandler(async (req, res) => {
	const { taskIdx } = req.body

	const project = await Project.findById(req.params.id)

	if (!project) {
		res.status(404)
		throw new Error('Проект не найден')
	}

	project.tasks = taskIdx

	const updatedProject = await project.save()

	res.json(updatedProject)
})

// put /api/projects

export const updateProject = asyncHandler(async (req, res) => {
	const { title, body, projectId } = req.body

	const project = await Project.findById(projectId)

	if (!project) {
		res.status(404)
		throw new Error('Проект не найден')
	}

	project.title = title
	project.body = body

	const updatedProject = await project.save()

	res.json(updatedProject)
})

// delete /api/projects

export const deleteProject = asyncHandler(async (req, res) => {
	const { projectId } = req.body

	const project = await Project.findById(projectId)

	if (!project) {
		res.status(404)
		throw new Error('Проект не найден')
	}
	await project.remove()

	res.json({ message: 'Проект удален!' })
})
