import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { createAnthropic } from '@ai-sdk/anthropic';

import { streamText } from 'ai';
import type { Message } from 'ai';

const anthropic = createAnthropic({
	apiKey: env.ANTHROPIC_API_KEY,
	baseURL: env.ANTHROPIC_API_BASE_URL
});

export const POST = (async ({ request }) => {
	const { messages } = (await request.json()) as { messages: Message[] };

	const result = await streamText({
		model: anthropic('claude-3-5-sonnet-20241022'),
		temperature: 0.8,
		messages
	});

	return result.toDataStreamResponse();
}) satisfies RequestHandler;
