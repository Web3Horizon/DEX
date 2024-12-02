<script lang="ts">
	// NOTE: import is temporary
	import UNI from '$lib/assets/img/uniswap_coin.png';

	//**************************************************//
	//** Local constants **//
	//**************************************************//
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

	// WARN: this will come from blockchain, code is temporary,
	// for representing purposes only
	// TODO: make proper type binding, possibly to already existing types
	const userPooledCoins = [
		{
			ticker: 'UNI',
			amount: '2.2555'
		},
		{
			ticker: 'UNI',
			amount: '2.9'
		}
	];
</script>

<section class="flex justify-center pt-36 font-roboto text-white">
	<div
		class="rounded-4xl flex flex-col items-center gap-14 border border-app_pink bg-gradient-to-t from-[#5100BA] to-[#1A053B] px-9 py-8"
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
					<!-- DEBUG: user can input negative amount -->
					<input
						type="number"
						class="border-3 rounded-full border-app_pink bg-transparent p-3 text-xl font-bold placeholder:opacity-10 focus:outline-none"
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
				<!-- User pooled coins -->
				<!-------------------------------------------------->
				<div class="flex flex-col gap-6 font-light">
					{#each userPooledCoins as coin}
						<div class="flex justify-between">
							<div class="flex items-center gap-1">
								<img src={UNI} alt="" class="h-6" />
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
				class="border-3 hover:shadow-app-button w-56 rounded-full border-app_pink py-3 text-center shadow transition-all duration-200 hover:bg-app_pink hover:shadow-app_pink"
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
			<div class="flex justify-between">
				<span>Your pool share:</span>
				<span>0.00065%</span>
			</div>
			<div class="flex justify-between">
				<span>TIC:</span>
				<span>1.500</span>
			</div>
			<div class="flex justify-between">
				<span>TIC:</span>
				<span>0.56548</span>
			</div>
		</div>
	</div>
</section>
