<script lang="ts">
	import liquidityimage from '$lib/assets/img/liquiditypic.png';
	import SelectToken from '$lib/components/buttons/SelectToken.svelte';

	type Token = {
		name: string;
		icon: string;
	};

	// Token states
	let selectedTopToken: Token | null = null;
	let selectedBottomToken: Token | null = null;
</script>

<div class="flex flex-col items-center px-4 sm:px-8 lg:px-16">
	<!-- Liquidity Image -->
	<img src={liquidityimage} alt="liquidity" class="mb-8 h-auto w-full max-w-[200px]" />

	<!-- Main Card Container -->
	<div
		class="grid w-full max-w-[1114px] grid-cols-1 gap-4 rounded-[50px] bg-[#5800CA]/30 px-6 py-8 text-white backdrop-blur-[4px] lg:grid-cols-4"
	>
		<!-- Title -->
		<h1
			class="font-roboto col-span-1 mb-6 text-center text-2xl font-bold lg:col-span-4 lg:mb-0 lg:text-left lg:text-4xl"
		>
			Add Liquidity
		</h1>

		<!-- Amount Card1 (Top) -->
		<div
			class="col-span-1 flex h-[160px] max-w-[474px] flex-col items-center space-y-4 rounded-[50px] border-[3px] border-[#E018FF] bg-[#3A176D] px-6 py-4 lg:col-span-4"
		>
			<!-- Amount Label -->
			<label for="amount" class="font-roboto self-start text-[16px] font-medium text-gray-400">
				Amount
			</label>

			<!-- Input Row with SelectToken -->
			<div class="flex w-full items-center space-x-4">
				<!-- Amount Input -->
				<input
					id="amounttop"
					type="number"
					placeholder="0"
					class="font-roboto flex-grow bg-transparent text-2xl text-white placeholder-gray-400 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
				/>

				<!-- Select Token Component -->
				<SelectToken bind:selectedToken={selectedTopToken} excludeToken={selectedBottomToken} />
			</div>

			<!-- Max and Balance Section -->
			<div class="flex w-full items-center space-x-4">
				<button
					class="font-roboto flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#6F00FF] text-[12px] font-bold text-white"
				>
					Max
				</button>

				<div class="font-roboto text-[16px] text-white">Balance: 0</div>
			</div>
		</div>

		<!-- Amount Card2 (Bottom) -->
		<div
			class="col-span-1 flex h-[160px] max-w-[474px] flex-col items-center space-y-4 rounded-[50px] border-[3px] border-[#E018FF] bg-[#3A176D] px-6 py-4 lg:col-span-4"
		>
			<!-- Amount Label -->
			<label for="amount" class="font-roboto self-start text-[16px] font-medium text-gray-400">
				Amount
			</label>

			<!-- Input Row with SelectToken -->
			<div class="flex w-full items-center space-x-4">
				<!-- Amount Input -->
				<input
					id="amountbotton"
					type="number"
					placeholder="0"
					class="font-roboto flex-grow bg-transparent text-2xl text-white placeholder-gray-400 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
				/>

				<!-- Select Token Component (Bottom) -->
				<SelectToken bind:selectedToken={selectedBottomToken} excludeToken={selectedTopToken} />
			</div>

			<!-- Max and Balance Section -->
			<div class="flex w-full items-center space-x-4">
				<!-- Max Button -->
				<button
					class="font-roboto flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#6F00FF] text-[12px] font-bold text-white"
				>
					Max
				</button>
				<!-- Balance Text -->
				<div class="font-roboto text-[16px] text-white">Balance: 0</div>
			</div>
		</div>

		<!-- Get Started Button -->
		<div class="col-span-1 mt-6 flex justify-center lg:col-span-4">
			<button
				class="font-roboto rounded-[25px] bg-[#6F00FF] px-6 py-3 text-base font-bold text-white transition-all duration-300 hover:bg-[#9747FF] hover:shadow-lg"
			>
				Get Started
			</button>
		</div>

		<!-- Disclaimer -->
		<div class="col-span-1 mt-6 text-center text-sm text-gray-300 lg:col-span-4 lg:text-base">
			Cryptocurrencies are highly risky and volatile. The value of your holding could fall to zero.
			Consider your financial circumstances and risk appetite.
		</div>
	</div>
</div>
