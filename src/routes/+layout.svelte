<script lang="ts">
	import { Header, Background, Footer } from '$lib/components';

	// Applies styles to the whole app
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen">
	<Header></Header>
	<Background></Background>

	<!-- Render all the children, i.e. nested routes -->
	{@render children()}
</div>

<Footer></Footer>
