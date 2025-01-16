import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { Redis } from '@upstash/redis';

export const GET: RequestHandler = async () => {
	try {
		// 1. Connect to Upstash Redis
		const redis = new Redis({
			url: env.UPSTASH_REDIS_URL,
			token: env.UPSTASH_REDIS_TOKEN
		});

		// 2. Get a random profile from the 'profiles' set
		const randomProfile = await redis.srandmember<string>('profiles');

		// 3. Return as JSON
		return new Response(JSON.stringify({ profile: randomProfile }), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error: any) {
		console.error('Failed to get random profile:', error);
		return new Response(JSON.stringify({ error: 'Failed to retrieve a random profile.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
