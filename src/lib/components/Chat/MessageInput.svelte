<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	let { input, isLoading, handleSubmit } = $props();
</script>

<form
	onsubmit={preventDefault(handleSubmit)}
	class="h-11 flex items-center rounded-full border bg-white/80 backdrop-blur-lg mb-4 absolute bottom-0 left-4 right-4"
>
	<input
		class="flex h-8 w-full py-2 px-4 text-sm bg-transparent outline-none shadow-gray-50 transition-all disabled:cursor-not-allowed disabled:opacity-50 flex-grow"
		id="message-input"
		type="text"
		placeholder="Type your message here..."
		bind:value={$input}
	/>
	<div class="fixed right-0 p-1">
		<button
			type="submit"
			class="hover:shadow-sm transition-all bg-blue-600 text-white inline-flex items-center justify-center rounded-full text-sm font-medium disabled:pointer-events-none disabled:opacity-50 p-2"
			disabled={$isLoading || $input === ''}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
				<path
					d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"
				/>
			</svg>
		</button>
	</div>
</form>
