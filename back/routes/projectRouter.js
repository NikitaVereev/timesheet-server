import express from 'express'
import {
	createNewProject,
	getProjects,
	getProject,
	updateProject,
	deleteProject,
	updateProjectTasks,
} from '../controllers/projects/projectsController.js'

const router = express.Router()

router
	.route('/')
	.get(getProjects)
	.post(createNewProject)
	.put(updateProject)
	.delete(deleteProject)

router.route('/:id').get(getProject).put(updateProjectTasks)

export default router
