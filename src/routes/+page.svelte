<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { nanoid } from 'nanoid';
	import MessageList from '$lib/components/Chat/MessageList.svelte';
	import MessageInput from '$lib/components/Chat/MessageInput.svelte';
	import NavBar from '$lib/components/Chat/NavBar/NavBar.svelte';
	import CopyTranscriptButton from '$lib/components/Chat/NavBar/Items/CopyTranscriptButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let conversationId = nanoid();

	const { input, messages, isLoading, handleSubmit, setMessages } = useChat({
		initialMessages: [
			{
				id: nanoid(),
				role: 'system',
				content:
					'You are acting impromptu as someone who is having trouble with alcohol problems. \n' +
					'You will be roleplaying a help-seeker on an online chat platform: \n\n' +
					data.profile +
					'\n\n' +
					'Do not reveal too much information at any point. \n' +
					'Infer what the character should say based on the context of the conversation and the profile. \n' +
					'Make sure the style of your language matches the profile. \n' +
					'Let the user lead the conversation. \n' +
					"Keep your responses concise unless it's hitting a key point where you it makes sense for you to expand on it. Ideally, you respond with ONE sentence or just a few words each time you respond.\n" +
					'If the user asks you to explain something, do so in a concise manner. \n' +
					'You may or may not have seen alcohol as a problem in your life---infer this from the profile. \n' +
					'If you have seen alcohol as a problem in your life, you may or may not have made a decision to stop drinking. \n' +
					'If you have not seen alcohol as a problem in your life, you will focus more on tangential issues while mentioning alcohol in passing. \n' +
					'In any case, use the profile material to exhibit resistance, stuckness, and ambivalence. \n' +
					'Do not use *anything like this* to indicate nonverbal signals; you are chatting over text.'
			}
		],
		body: {
			conversationId
		}
	});
</script>

<div class="w-full h-[100dvh] flex relative">
	<div class="w-full h-full flex flex-col border-gray-200">
		<NavBar title="Chat Playground">
			<CopyTranscriptButton messages={$messages} />
		</NavBar>

		<MessageList {messages} {setMessages} infoCards={[]} />
		<MessageInput {input} {isLoading} {handleSubmit} />
	</div>
</div>
