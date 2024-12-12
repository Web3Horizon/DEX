<script>
	import { Tick } from '$lib/assets/icons';

	let { title = 'success', msg = null } = $props();
</script>

<div class="mb-2 flex flex-col items-center gap-4 px-5 text-white">
	<p class="text-xl">{title}</p>
	{#if msg}
		<p class="text-base">{msg}</p>
	{/if}
	<div class="flex h-12 w-12 justify-center rounded-full border-4 border-app_green">
		<Tick class="stroke-app_green" width="26" />
	</div>
</div>
