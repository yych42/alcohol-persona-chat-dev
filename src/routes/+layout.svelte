<script lang="ts">
	import '../app.postcss';

	let { children } = $props();
</script>

<div>
	{@render children()}
</div>
