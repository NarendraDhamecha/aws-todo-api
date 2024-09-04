import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	completed: boolean('completed').default(false),
	created_at: timestamp('created_at').defaultNow(),
	due_date: timestamp('due_date'),
})
