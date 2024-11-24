<script lang="ts">
	import { Header } from '$lib/components';
	import Background from '$lib/components/Background.svelte';

	// Applies styles to the whole app
	import '../app.css';

	let { children } = $props();
</script>

<Header></Header>
<Background></Background>
<!-- Render all the children, i.e. nested routes -->
{@render children()}

<style lang="postcss">
</style>
