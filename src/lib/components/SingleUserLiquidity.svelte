<script lang="ts">
	import Icon from '@iconify/svelte';
	import { coinImagePaths } from '$lib/constants/coinImagePaths';
	import type { UserLiquidity } from '$lib/constants/userLiquidity';

	let { ticker1, ticker2 }: UserLiquidity = $props();

	const tiker1Image = coinImagePaths[ticker1 as keyof typeof coinImagePaths];
	const tiker2Image = coinImagePaths[ticker2 as keyof typeof coinImagePaths];

	let isExpanded = $state(false);

	const toggle = () => (isExpanded = !isExpanded);

	const userLiquidityDetails = [
		{
			property: 'Your total pool tokens:',
			value: '1.1111111',
			image: null,
			ticker: null
		},
		{
			property: `Pooled ${ticker1}:`,
			value: '1.1',
			image: tiker1Image,
			ticker: ticker1
		},
		{
			property: `Polled ${ticker2}:`,
			value: '1.1',
			image: tiker2Image,
			ticker: ticker2
		},
		{
			property: 'Your pool share:',
			value: '1.1%',
			image: null,
			ticker: null
		}
	];
	const liquidityControllers = [
		{
			title: 'add',
			href: '/'
		},
		{
			title: 'remove',
			href: '/'
		}
	];
</script>

<div
	class="flex flex-col gap-8 rounded-3xl border border-app_pink bg-gradient-to-t from-[#5100BA] to-[#1A053B] px-4 py-3"
>
	<div class="flex w-full items-center justify-between">
		<div class="flex items-center gap-1">
			<div class="flex gap-0.5">
				<img src={tiker1Image} alt="{ticker1} coin" class="h-8" />
				<img src={tiker2Image} alt="{ticker2} coin" class="h-8" />
			</div>
			<div class="font-roboto text-xl font-bold text-white">UNI/UNI</div>
		</div>
		<button class="group flex items-center gap-0.5 text-app_pink" onclick={toggle}>
			<span class="font-roboto text-xl font-light capitalize">manage</span>
			<Icon
				icon="fluent:chevron-up-12-filled"
				width="20"
				height="20"
				class={`transform transition-transform duration-200 group-hover:translate-y-0.5 ${isExpanded ? '' : 'rotate-180'}`}
			/>
		</button>
	</div>
	{#if isExpanded}
		<div class="flex justify-between font-roboto text-2xl font-bold text-white">
			<div class="flex flex-col gap-6">
				{#each userLiquidityDetails as detail}
					<h3>{detail.property}</h3>
				{/each}
			</div>
			<div class="flex flex-col items-center gap-6">
				{#each userLiquidityDetails as detail}
					<div class="flex items-center gap-1">
						<span>{detail.value}</span>
						{#if detail.image != null && detail.ticker != null}
							<img src={detail.image} alt="{detail.ticker} coin" class="h-5" />
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<div class="mb-6 flex justify-around text-xl font-bold text-white">
			{#each liquidityControllers as controller}
				<a
					href={controller.href}
					class="border-3 hover:shadow-app-button w-64 rounded-full border-app_pink py-3 text-center shadow transition-all duration-200 hover:bg-app_pink hover:shadow-app_pink"
				>
					<span class="capitalize">{controller.title}</span>
				</a>
			{/each}
		</div>
	{/if}
</div>
