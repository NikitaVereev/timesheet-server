import express from 'express'
import {
	createNewProject,
	getProjects,
	getProject,
	updateProject,
	deleteProject,
	updateProjectTasks,
	updateCompletedProjectTime,
} from '../controllers/projects/projectsController.js'

const router = express.Router()

router
	.route('/')
	.get(getProjects)
	.post(createNewProject)
	.put(updateProject)
	.delete(deleteProject)

router.route('/:id').get(getProject).put(updateProjectTasks)

router.route('/:id/completed').put(updateCompletedProjectTime)

export default router
