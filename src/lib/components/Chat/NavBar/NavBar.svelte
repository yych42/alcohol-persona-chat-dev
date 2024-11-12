<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children?: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<div class="h-14 w-full border-b flex items-center px-4 justify-between z-50">
	<h1 class="font-mono text-sm font-semibold">{title}</h1>
	{@render children?.()}
</div>
