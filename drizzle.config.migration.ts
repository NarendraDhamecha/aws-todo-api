import * as dotenv from 'dotenv'
import { Config, defineConfig } from 'drizzle-kit'

dotenv.config()

export default defineConfig({
	schema: './src/schema.ts',
	dialect: 'postgresql',
	out: './migrations',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
} as Config)
