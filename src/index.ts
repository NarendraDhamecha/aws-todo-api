import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import { db } from '../drizzle.config'
import { todos } from './schema'
import { eq } from 'drizzle-orm'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(express.json())
app.use(
	cors({
		origin: '*',
	})
)
// Get all todos
app.get('/todos', async (req: Request, res: Response) => {
	const allTodos = await db.select().from(todos)
	res.json(allTodos)
})

// Get a single todo by id
app.get('/todos/:id', async (req: Request, res: Response) => {
	const { id } = req.params
	const todo = await db
		.select()
		.from(todos)
		.where(eq(todos.id, Number(id)))

	if (todo.length > 0) {
		res.json(todo[0])
	} else {
		res.status(404).json({ error: 'Todo not found' })
	}
})

// Create a new todo
app.post('/todos', async (req: Request, res: Response) => {
	const { title, description } = req.body
	const newTodo = await db.insert(todos).values({
		title,
		description,
	})
	res.json(newTodo)
})

// Update a todo
app.put('/todos/:id', async (req: Request, res: Response) => {
	const { id } = req.params
	const { title, description, completed } = req.body
	const updatedTodo = await db
		.update(todos)
		.set({
			title,
			description,
			completed,
		})
		.where(eq(todos.id, Number(id)))
	res.json(updatedTodo)
})

// Delete a todo
app.delete('/todos/:id', async (req: Request, res: Response) => {
	const { id } = req.params
	const deletedTodo = await db.delete(todos).where(eq(todos.id, Number(id)))
	res.json(deletedTodo)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
