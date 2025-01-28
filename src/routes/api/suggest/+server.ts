import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import type { Message } from 'ai';

const openai = createOpenAI({
	apiKey: env.OPENPIPE_API_KEY,
	baseURL: env.OPENPIPE_API_BASE_URL
});

export const POST = (async ({ request }) => {
	const { messages } = (await request.json()) as { messages: Message[] };

	const response = await generateText({
		model: openai(env.MODEL_NAME),
		messages: messages,
		temperature: 0.8
	});

	return new Response(response.text);
}) satisfies RequestHandler;
