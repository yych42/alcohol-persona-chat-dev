<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { nanoid } from 'nanoid';
	import MessageList from '$lib/components/Chat/MessageList.svelte';
	import MessageInput from '$lib/components/Chat/MessageInput.svelte';
	import NavBar from '$lib/components/Chat/NavBar/NavBar.svelte';
	import CopyTranscriptButton from '$lib/components/Chat/NavBar/Items/CopyTranscriptButton.svelte';

	let conversationId = nanoid();

	const { input, messages, isLoading, handleSubmit, setMessages } = useChat({
		onFinish: async (message) => {},
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

		<MessageList
			{messages}
			{setMessages}
			infoCards={[
				{
					color: 'blue',
					remixIcon: 'ri-information-line',
					header: 'Welcome to the Chat Playground',
					body: 'This is a simple chat playground where you can test out the chat component. Feel free to send messages and test out the features.'
				}
			]}
		/>
		<MessageInput {input} {isLoading} {handleSubmit} />
	</div>
</div>
