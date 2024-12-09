<script>
	import Icon from '@iconify/svelte';
</script>

<!-- FailContent.svelte -->
<div class="flex flex-col items-center gap-4 px-5 text-white">
	<p class="text-xl">Failed to add liquidity</p>
	<div class="flex h-12 w-12 items-center justify-center rounded-full border-4 border-red-500">
		<!-- <Icon icon="mdi:close-circle" class="stroke-red-500" width="26" /> -->
		<Icon icon="radix-icons:cross-2" width="32" height="32" color="rgb(239 68 68)" />
	</div>
</div>
