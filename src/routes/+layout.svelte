<script lang="ts">
	// Applies styles to the whole app
	import '../app.css';

	let { children } = $props();
</script>

<!-- Render all the children, i.e. +page.svelte -->
{@render children()}

<style lang="postcss">
</style>
