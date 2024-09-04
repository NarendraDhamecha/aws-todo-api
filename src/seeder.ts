import { db } from '../drizzle.config'
import { todos } from './schema'

async function seed() {
	await db.insert(todos).values([
		{ title: 'Learn TypeScript', description: 'Study TypeScript basics' },
		{ title: 'Build To-Do App', description: 'Develop a fullstack to-do app' },
	])

	console.log('Database seeded')
}

seed()
