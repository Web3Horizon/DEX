<script lang="ts">
	//**************************************************//
	//** Imports from library **//
	//**************************************************//
	import type { UserLiquidity } from '$lib/constants/userLiquidity';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { availableTokens } from '$lib/constants/availableTokens';

	// Data that will be loaded when passed to the
	// page in state
	let data: UserLiquidity | null = null;
	if (browser) {
		data = history?.state?.['sveltekit:states'] || null;

		// If data is still missing the page becomes useless and user
		// get redirected to "Your Liquidity" page
		if (data === null) {
			goto('/your-liquidity');
		}
	}

	let removeAmount: number | null = $state(null);
	$effect(() => {
		if (removeAmount && removeAmount <= 0) removeAmount = 0;
	});
	let token1ExpectedToBeReturned = 0;
	let token2ExpectedToBeReturned = 0;

	//**************************************************//
	//** Local constants **//
	//**************************************************//
	const ticker1Image = data?.coin1?.ticker ? availableTokens[data.coin1.ticker].imgPath : null;
	const ticker2Image = data?.coin2?.ticker ? availableTokens[data.coin2.ticker].imgPath : null;

	const removeAmountQuickButtons = [
		{
			title: '25%'
		},
		{
			title: '50%'
		},
		{
			title: '75%'
		},
		{
			title: 'Max'
		}
	];
	const userCoinsToBeReturned = data
		? [
				{
					ticker: data.coin1.ticker,
					amount: token1ExpectedToBeReturned,
					image: ticker1Image
				},
				{
					ticker: data.coin2.ticker,
					amount: token2ExpectedToBeReturned,
					image: ticker2Image
				}
			]
		: [];

	const userLiquidityDetails = data
		? [
				{
					title: 'Your pool share:',
					value: `${data.poolShare}%`
				},
				{
					title: data.coin1.ticker.toUpperCase(),
					value: data.coin1.pooledAmount
				},
				{
					title: data.coin2.ticker.toUpperCase(),
					value: data.coin2.pooledAmount
				}
			]
		: [];

	//**************************************************//
	//** Component methods **//
	//**************************************************//
</script>

<section class="flex justify-center pt-36 font-roboto text-white">
	<div
		class="flex flex-col items-center gap-14 rounded-4xl border border-app_pink bg-gradient-to-t from-[#5100BA] to-[#1A053B] px-9 py-8"
	>
		<div class="flex flex-col items-center gap-8">
			<!-------------------------------------------------->
			<!-- Page Heading -->
			<!-------------------------------------------------->
			<h2 class=" text-3xl font-bold capitalize">remove liquidity</h2>
			
			<!-------------------------------------------------->
			<!-- Remove amount controller box -->
			<!-------------------------------------------------->
			<div
				class="flex flex-col gap-8 rounded-3xl border border-app_pink bg-gradient-to-t from-[#5100BA] to-[#1A053B] px-4 pb-8 pt-4"
			>
				<h3 class="text-xl font-bold capitalize leading-6">remove amount</h3>
				<div class="flex flex-col gap-5">
					<!-------------------------------------------------->
					<!-- Remove amount input -->
					<!-------------------------------------------------->
					<input
						bind:value={removeAmount}
						type="number"
						class="rounded-full border-3 border-app_pink bg-transparent p-3 text-xl font-bold placeholder:opacity-10 focus:outline-none"
						placeholder="Enter your amount"
					/>
					<!-------------------------------------------------->
					<!-- Quick input buttons -->
					<!-------------------------------------------------->
					<div class="grid grid-cols-4 gap-5">
						{#each removeAmountQuickButtons as button}
							<button
								class="rounded-lg border border-app_pink p-2.5 transition-all duration-200 hover:bg-app_pink hover:bg-opacity-10"
							>
								<span class="text-2xl font-light">{button.title}</span>
							</button>
						{/each}
					</div>
				</div>
				<!-------------------------------------------------->
				<!-- Expected amount af tokens to be returned -->
				<!-------------------------------------------------->
				<div class="flex flex-col gap-6 font-light">
					{#each userCoinsToBeReturned as coin}
						<div class="flex justify-between">
							<div class="flex items-center gap-1">
								<img src={coin.image} alt="" class="h-6" />
								<span class="text-xl">{coin.ticker}</span>
							</div>
							<span class="text-2xl">{coin.amount}</span>
						</div>
					{/each}
				</div>
			</div>
			<!-------------------------------------------------->
			<!-- Approve remove liquidity button -->
			<!-------------------------------------------------->
			<button
				class="w-56 rounded-full border-3 border-app_pink py-3 text-center shadow transition-all duration-200 hover:bg-app_pink hover:shadow-app-button hover:shadow-app_pink"
			>
				<span class="text-xl font-bold capitalize">approve</span>
			</button>
		</div>
		<!-------------------------------------------------->
		<!-- User liquidity details -->
		<!-------------------------------------------------->
		<div
			class="flex w-3/4 flex-col gap-8 rounded-3xl border border-app_pink bg-gradient-to-t from-[#13002B] to-[#26065A] px-2.5 py-8 text-xl font-normal"
		>
			{#each userLiquidityDetails as detail}
				<div class="flex justify-between">
					<span>{detail.title}</span>
					<span>{detail.value}</span>
				</div>
			{/each}
		</div>
	</div>
</section>
