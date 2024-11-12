import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { createOpenAI } from '@ai-sdk/openai';

import { streamText } from 'ai';
import type { Message } from 'ai';

const openai = createOpenAI({
	apiKey: env.OPENAI_API_KEY,
	baseURL: env.OPENAI_API_BASE_URL
});

export const POST = (async ({ request }) => {
	const { messages } = (await request.json()) as { messages: Message[] };

	const result = await streamText({
		model: openai(env.MODEL_NAME),
		messages
	});

	return result.toDataStreamResponse();
}) satisfies RequestHandler;
