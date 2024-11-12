<script lang="ts">
	import type { Message } from 'ai/svelte';

	function generatePrettyTranscript() {
		const prettyMessages = messages.map(({ role, content }) => ({ role, content }));
		return JSON.stringify({ messages: prettyMessages }, null, 2);
	}

	interface Props {
		messages: Message[];
	}

	let { messages }: Props = $props();
</script>

<button
	class="text-sm font-mono"
	onclick={() => navigator.clipboard.writeText(generatePrettyTranscript())}>Copy</button
>
