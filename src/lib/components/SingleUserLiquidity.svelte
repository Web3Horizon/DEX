<script lang="ts">
	import Icon from '@iconify/svelte';
	import { coinImagePaths } from '$lib/constants/coinImagePaths';
	import type { UserLiquidity } from '$lib/constants/userLiquidity';

	let { ticker1, ticker2 }: UserLiquidity = $props();

	const tiker1Image = coinImagePaths[ticker1];
	const tiker2Image = coinImagePaths[ticker2];

	// let isExpanded = $state(false);
</script>

<div
	class="flex items-center justify-between rounded-3xl border border-app_pink bg-gradient-to-t from-[#5100BA] to-[#1A053B] px-4 py-3"
>
	<div class="flex items-center gap-1">
		<div class="flex gap-0.5">
			<img src={tiker1Image} alt="{ticker1} coin" class="h-8" />
			<img src={tiker2Image} alt="{ticker2} coin" class="h-8" />
		</div>
		<div class="font-roboto text-xl font-bold text-white">UNI/UNI</div>
	</div>
	<button class="group flex items-center gap-0.5 text-app_pink">
		<span class="font-roboto text-xl font-light capitalize">manage</span>
		<Icon
			icon="fluent:chevron-up-12-filled"
			width="20"
			height="20"
			class="rotate-180 transform transition-transform duration-200 group-hover:translate-y-0.5"
		/>
	</button>
</div>
