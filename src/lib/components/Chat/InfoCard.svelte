<script lang="ts">
	import type { InfoCardProps } from '$lib/types/props';

	let { color = 'blue', remixIcon, header, body }: InfoCardProps = $props();
</script>

<div class={`rounded-md bg-${color}-50 text-${color}-500 p-4 mx-4 mt-4 max-w-sm`}>
	<i class={`${remixIcon} ri-xl`}></i>

	<p class="font-semibold mt-3 mb-1">{header}</p>

	<p>{body}</p>
</div>
