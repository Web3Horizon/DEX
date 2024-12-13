<script>
	import Icon from '@iconify/svelte';

	let { title = 'success', msg = null } = $props();
</script>

<div class="flex flex-col items-center gap-4 px-5 text-white">
	<p class="text-xl">{title}</p>
	{#if msg}
		<p class="text-base">{msg}</p>
	{/if}
	<div class="flex h-12 w-12 items-center justify-center rounded-full border-4 border-red-500">
		<Icon icon="radix-icons:cross-2" width="32" height="32" color="rgb(239 68 68)" />
	</div>
</div>
