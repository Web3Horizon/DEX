<script lang="ts">
	//**************************************************//
	//** Imports from packages **//
	//**************************************************//
	import Icon from '@iconify/svelte';

	//**************************************************//
	//** Imports from library **//
	//**************************************************//
	import { coinImagePaths } from '$lib/constants/coinImagePaths';
	import type { UserLiquidity } from '$lib/constants/userLiquidity';

	//**************************************************//
	//** Local type declarations **//
	//**************************************************//
	type SingleUserLiquidityParameters = {
		data: UserLiquidity;
	};

	//**************************************************//
	//** Component properties **//
	//**************************************************//
	let { data }: SingleUserLiquidityParameters = $props();

	//**************************************************//
	//** Component state variables **//
	//**************************************************//
	let isExpanded = $state(false);

	//**************************************************//
	//** Local constants **//
	//**************************************************//
	const tiker1Image = coinImagePaths[data.coin1.ticker as keyof typeof coinImagePaths];
	const tiker2Image = coinImagePaths[data.coin2.ticker as keyof typeof coinImagePaths];
	const userLiquidityDetails = [
		{
			property: 'Your total pool tokens:',
			value: data.poolTokenAmount,
			image: null,
			ticker: null
		},
		{
			property: `Pooled ${data.coin1.ticker}:`,
			value: data.coin1.pooledAmount,
			image: tiker1Image,
			ticker: data.coin1.ticker
		},
		{
			property: `Polled ${data.coin2.ticker}:`,
			value: data.coin2.pooledAmount,
			image: tiker2Image,
			ticker: data.coin2.ticker
		},
		{
			property: 'Your pool share:',
			value: data.poolShare,
			image: null,
			ticker: null
		}
	];
	const liquidityControllers = [
		{
			title: 'add',
			// WARN: add the actual path
			href: ''
		},
		{
			title: 'remove',
			// WARN: add the actual path
			href: ''
		}
	];

	//**************************************************//
	//** Component functions **//
	//**************************************************//
	function toggle(): void {
		isExpanded = !isExpanded;
	}
</script>

<div
	class="flex flex-col gap-8 rounded-3xl border border-app_pink bg-gradient-to-t from-[#5100BA] to-[#1A053B] px-4 py-3"
>
	<div class="flex w-full items-center justify-between">
		<div class="flex items-center gap-1">
			<div class="flex gap-0.5">
				<img src={tiker1Image} alt="{data.coin1.ticker} coin" class="h-8" />
				<img src={tiker2Image} alt="{data.coin2.ticker} coin" class="h-8" />
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
