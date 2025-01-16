import type { RequestHandler } from '@sveltejs/kit';
import Database from 'better-sqlite3';

export const GET: RequestHandler = async () => {
	try {
		// 1. Open the SQLite database
		const db = new Database('profiles.db');

		// 2. Query for a random profile
		//    The RANDOM() function in SQLite will pick a random row
		const row = db
			.prepare('SELECT profile FROM profiles ORDER BY RANDOM() LIMIT 1')
			.get();

		// 3. Close the database
		db.close();

		// 4. Return the result as JSON
		return new Response(JSON.stringify(row), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error: any) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Failed to get random profile.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};