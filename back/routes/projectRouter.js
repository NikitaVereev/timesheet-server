import express from 'express'
import {
	createNewProject,
	getProjects,
	getProject,
	updateProject,
	deleteProject,
	updateProjectTasks,
} from '../controllers/projects/projectsController.js'
import {
	createNewTasks,
	getTasks,
	deleteTask,
	updateTask,
	getTask,
	updateCompleteTask,
} from '../controllers/tasks/taskController.js'

import {
	createNewPosting,
	getPosting,
	deletePosting,
	changePosting,
} from '../controllers/posting/postingController.js'

import {
	createNewTransactions,
	deleteTransactions,
	getTransaction,
	getTransactions,
	getTransactionByDays,
} from '../controllers/tarnsactions/transacrionsController.js'

const router = express.Router()

router
	.route('/')
	.get(getProjects)
	.post(createNewProject)
	.put(updateProject)
	.delete(deleteProject)

router.route('/:id').get(getProject).put(updateProjectTasks)

// router
// 	.route('/:id/task')
// 	.get(getTasks)
// 	.post(createNewTasks)
// 	.put(updateTask)
// 	.delete(deleteTask)

// router.route('/:id/task/:id').get(getTask).put(updateCompleteTask)

// router
// 	.route('/:id/task/:id/transactions')
// 	.post(createNewTransactions)
// 	.get(getTransactions)
// 	.delete(deleteTransactions)

// router.route('/:id/task/:id/transactions/:id').get(getTransaction)
// router
// 	.route('/:id/task/:id/transactions/:id/posts')
// 	.post(createNewPosting)
// 	.get(getPosting)
// 	.delete(deletePosting)
// 	.put(changePosting)
// router
// 	.route('/:id/task/:id/transactions/date/:itsMyDate')
// 	.get(getTransactionByDays)

export default router
