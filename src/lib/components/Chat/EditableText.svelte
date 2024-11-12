<script lang="ts">
	import { run } from 'svelte/legacy';

	import { createEventDispatcher } from 'svelte';

	interface Props {
		text: string;
	}

	let { text }: Props = $props();
	const dispatch = createEventDispatcher();

	let isEditing = $state(false);
	let editableText = $state(text);

	run(() => {
		editableText = text;
	});

	function handleBlur() {
		isEditing = false;
		dispatch('edit', editableText);
	}

	function handleEnter(event: any) {
		if (event.key === 'Enter') {
			isEditing = false;
			dispatch('edit', editableText);
		}
	}

	function startEditing() {
		isEditing = true;
		editableText = text; // Reset to the initial value if not saved
	}

	function adjustHeight(textarea: HTMLTextAreaElement) {
		// Reset height to auto to calculate scrollHeight correctly
		textarea.style.height = 'auto';
		// Set height based on scrollHeight to accommodate the text
		textarea.style.height = `${textarea.scrollHeight}px`;
	}
</script>

{#if isEditing}
	<textarea
		bind:value={editableText}
		onblur={handleBlur}
		onkeydown={handleEnter}
		use:adjustHeight
		class="border p-1 rounded resize-none overflow-hidden w-full"
		autofocus
	></textarea>
{:else}
	<p onclick={startEditing} class="cursor-pointer whitespace-pre-wrap">
		{editableText}
	</p>
{/if}
