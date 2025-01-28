<script lang="ts">
	import type { Readable, Writable } from 'svelte/store';
	import type { CreateMessage, Message } from '@ai-sdk/svelte';
	import type { InfoCardProps } from '$lib/types/props';
	import InfoCard from '$lib/components/Chat/InfoCard.svelte';
	import type { ChatRequestOptions } from 'ai';

	interface Props {
		messages: Readable<Message[]>;
		infoCards?: InfoCardProps[];
		suggestedResponses?: Writable<string[]>;
		append: (
			message: Message | CreateMessage,
			chatRequestOptions?: ChatRequestOptions
		) => Promise<string | null | undefined>;
	}

	let { messages, infoCards = [], suggestedResponses, append }: Props = $props();

	function scrollTo(element: HTMLDivElement) {
		setTimeout(() => {
			element.scrollIntoView({ behavior: 'smooth' });
		}, 5);
	}

	function handleSuggestionClick(response: string) {
		append({ role: 'user', content: response });
		suggestedResponses.set([]);
	}
</script>

<div class="relative h-full w-full overflow-y-auto">
	<div class="h-full w-full">
		<div class="flex flex-col items-center">
			{#if $messages.length === 0 && infoCards.length > 0}
				{#each infoCards as infoCard}
					<InfoCard {...infoCard}></InfoCard>
				{/each}
			{/if}

			{#each $messages as message}
				{#if message.role == 'system'}
					<div
						class="flex items-start bg-white py-4 px-3 w-full space-x-2 last:mb-14 font-mono text-sm"
					>
						{#if message.content.includes('Extended background')}
							<div class="flex items-start space-x-2 text-green-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="w-6 h-6 flex-shrink-0"
								>
									<path
										d="M13 14.0619V22H4C4 17.5817 7.58172 14 12 14C12.3387 14 12.6724 14.021 13 14.0619ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM17.7929 19.9142L21.3284 16.3787L22.7426 17.7929L17.7929 22.7426L14.2574 19.2071L15.6716 17.7929L17.7929 19.9142Z"
									></path>
								</svg>
								<p class="my-auto">Persona loaded</p>
							</div>
						{:else}
							<div class="flex items-start space-x-2 text-red-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="w-6 h-6 flex-shrink-0"
								>
									<path
										d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
									></path>
								</svg>
								<p class="my-auto">Persona failed to load</p>
							</div>
						{/if}
					</div>
				{/if}
				{#if message.role === 'user'}
					<div
						use:scrollTo
						class="flex items-start first:border-t-0 border-t border-b bg-gray-50 py-4 px-3 w-full space-x-2"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="w-6 h-6 flex-shrink-0"
						>
							<path
								d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
							/>
						</svg>
						<p>{message.content}</p>
					</div>
				{:else if message.role === 'assistant'}
					<div use:scrollTo class="flex items-start bg-white py-4 px-3 w-full space-x-2 last:mb-14">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="w-6 h-6 text-blue-700 fill-current flex-shrink-0"
						>
							<path
								d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM7 12H9C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12H17C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z"
							/>
						</svg>
						<p>{message.content}</p>
					</div>
					{#if $suggestedResponses?.length > 0 && $messages[$messages.length - 1].content === message.content}
						<div
							use:scrollTo
							class="flex items-start first:border-t-0 border-t border-b bg-gray-50 py-4 px-3 w-full space-x-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="w-6 h-6 flex-shrink-0"
							>
								<path
									d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
								/>
							</svg>
							<div class="flex flex-col bg-gray-50 w-full space-y-2">
								{#each $suggestedResponses as response}
									<button
										onclick={() => handleSuggestionClick(response)}
										class="text-left hover:underline">{response}</button
									>
									<div class="border-b border-gray-200 last:hidden"></div>
								{/each}
							</div>
						</div>
					{/if}
				{/if}
			{/each}
		</div>
	</div>
</div>
