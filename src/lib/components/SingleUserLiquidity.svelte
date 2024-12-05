<script lang="ts">
	//**************************************************//
	//** Imports from packages **//
	//**************************************************//
	import Icon from '@iconify/svelte';

	//**************************************************//
	//** Imports from library **//
	//**************************************************//
	import type { UserLiquidity } from '$lib/constants/userLiquidity';
	import { goto } from '$app/navigation';
	import { availableTokens } from '$lib/constants/availableTokens';

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
	const tiker1Image = availableTokens[data.coin1.ticker].imgPath;
	const tiker2Image = availableTokens[data.coin2.ticker].imgPath;
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
			action: () => {
				goto('/addliquidity', { state: data });
			}
		},
		{
			title: 'remove',
			action: () => {
				goto('/remove-liquidity', { state: data });
			}
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
	<!-------------------------------------------------->
	<!-- Visible content even when not expanded -->
	<!-------------------------------------------------->
	<div class="flex w-full items-center justify-between">
		<div class="flex items-center gap-1">
			<div class="flex gap-0.5">
				<img src={tiker1Image} alt="{data.coin1.ticker} coin" class="h-8" />
				<img src={tiker2Image} alt="{data.coin2.ticker} coin" class="h-8" />
			</div>
			<div class="font-roboto text-xl font-bold text-white">
				{data.coin1.ticker}/{data.coin2.ticker}
			</div>
		</div>

		<!-------------------------------------------------->
		<!-- Button to expand/show and condense details  -->
		<!-------------------------------------------------->
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

	<!-------------------------------------------------->
	<!-- Content that is visible when expanded -->
	<!-------------------------------------------------->
	{#if isExpanded}
		<div class="flex justify-between font-roboto text-2xl font-bold text-white">
			<!-------------------------------------------------->
			<!-- Properties - left side -->
			<!-------------------------------------------------->
			<div class="flex flex-col gap-6">
				{#each userLiquidityDetails as detail}
					<h3>{detail.property}</h3>
				{/each}
			</div>

			<!-------------------------------------------------->
			<!-- Values of the corresponding properties -->
			<!-- right side -->
			<!-------------------------------------------------->
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

		<!-------------------------------------------------->
		<!-- Liquidity controllers (add/remove) -->
		<!-------------------------------------------------->
		<div class="mb-6 flex justify-around text-xl font-bold text-white">
			{#each liquidityControllers as controller}
				<button
					onclick={controller.action}
					class="w-64 rounded-full border-3 border-app_pink py-3 text-center shadow transition-all duration-200 hover:bg-app_pink hover:shadow-app-button hover:shadow-app_pink"
				>
					<span class="capitalize">{controller.title}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>
