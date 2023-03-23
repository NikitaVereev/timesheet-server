import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'
import path from 'path'
import cors from 'cors'
/* Config */
import { connectDB } from './config/db.js'

/* Middleware */
import { notFound } from './middleware/errorMiddleware.js'

/* Routes */

import projectRoutes from './routes/projectRouter.js'
import taskRouter from './routes/taskTouter.js'

dotenv.config()

connectDB()

const app = express()
app.use(cors())

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(express.json())

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))

app.use('/api/projects', projectRoutes)
app.use('/api/task', taskRouter)

if (process.env.NODE_ENV === 'production') {
	// Step 1:
	app.use(express.static(path.resolve(__dirname, './client/build')))
	// Step 2:
	app.get('*', function (request, response) {
		response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
	})
}

app.use(notFound)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)
