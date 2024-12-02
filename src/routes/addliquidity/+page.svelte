<script lang="ts">
	import LiquidityMonsterImage from '$lib/assets/img/liquidity_monster.png';
	import { SelectToken } from '$lib/components';

	type Token = {
		name: string;
		icon: string;
	};
	type Pool = {
		id: number;
	};
	type Share = {
		id: number;
	};

	// Token states
	let selectedTopToken: Token | null = null;
	let selectedBottomToken: Token | null = null;
	// let totalPool:
	// let poolShare:
</script>

<div class="relative flex flex-col px-64 py-64">
	<!-- Liquidity Image -->
	<img
		src={LiquidityMonsterImage}
		alt="Liquidity monster"
		class="absolute left-1/2 top-32 z-0 mx-auto h-auto w-full max-w-[225px] -translate-x-1/2 transform"
	/>

	<!-- Main Card Container -->
	<div
		class="grid h-[575px] w-full max-w-[1114px] grid-cols-1 gap-3 rounded-[50px] bg-[#5800CA]/30 px-10 py-8 text-white backdrop-blur-[4px] lg:grid-cols-4"
	>
		<div
			class="absolute right-[150px] top-[50px] flex flex-row items-center space-x-[100px] justify-self-end"
		>
			<!-- Top Token -->
			<div class="flex h-[100px] w-[100px] flex-col items-center">
				{#if selectedTopToken}
					<img
						src={selectedTopToken.icon}
						alt={selectedTopToken.name}
						class="h-full w-full rounded-full object-cover"
					/>
					<!-- Token Name under the logo -->
					<div class="mt-2 text-sm text-white">{selectedTopToken.name}</div>
				{:else}
					<div class="h-full w-full rounded-full"></div>
				{/if}
			</div>

			<!-- Bottom Token -->
			<div class="flex h-[100px] w-[100px] flex-col items-center">
				{#if selectedBottomToken}
					<img
						src={selectedBottomToken.icon}
						alt={selectedBottomToken.name}
						class="h-full w-full rounded-full object-cover"
					/>
					<!-- Token Name under the logo -->
					<div class="mt-2 text-sm text-white">{selectedBottomToken.name}</div>
				{:else}
					<div class="h-full w-full rounded-full"></div>
				{/if}
			</div>
		</div>
		<!-- Title -->
		<h1
			class="font-roboto mb-[20px] text-center text-[35px] font-bold
		"
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

		<div
			class="absolute right-[200px] top-[200px] flex flex-col items-center space-x-4 justify-self-end rounded-[20px] border border-fuchsia-600 px-4 py-6"
		>
			<h3 class="font-roboto flex items-center text-xl font-bold">Your Pool Data</h3>

			<!-- Your Total Pool Tokens -->
			<div class="mt-4">
				<span class="font-roboto">Your total pool tokens:</span>

				<!-- Display Pooled Top Token -->
				<div class="mt-2 flex items-center space-x-2">
					{#if selectedTopToken}
						<span class="font-roboto">Pooled {selectedTopToken.name}:</span>
						<img
							src={selectedTopToken.icon}
							alt={selectedTopToken.name}
							class="h-6 w-6 rounded-full"
						/>
					{:else}
						<span class="font-roboto">Pooled :</span>
					{/if}
				</div>

				<!-- Display Pooled Bottom Token -->
				<div class="mt-2 flex items-center space-x-2">
					{#if selectedBottomToken}
						<span class="font-roboto">Pooled {selectedBottomToken.name}:</span>
						<img
							src={selectedBottomToken.icon}
							alt={selectedBottomToken.name}
							class="h-6 w-6 rounded-full"
						/>
					{:else}
						<span class="font-roboto">Pooled :</span>
					{/if}
				</div>
			</div>

			<!-- Your Pool Share -->
			<div class="mt-4 flex items-center justify-between">
				<span>Your pool share:</span>
				<span>0.00%</span>
				<!-- Replace this with dynamic data -->
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
				class="font-roboto hover:shadow-app-button hover:shadow-app_pink flex items-center gap-2.5 rounded-full border border-solid border-fuchsia-600 px-10 py-2.5 text-[20px] font-bold transition-all duration-500 hover:bg-[#E018FF]"
			>
				Approve
			</button>
		</div>

		<!-- Disclaimer -->
		<div class="font-roboto col-span-1 text-center text-sm text-gray-400 lg:col-span-4">
			Cryptocurrencies are highly risky and volatile. The value of your holding could fall to zero.
			Consider your financial circumstances and risk appetite.
		</div>
	</div>
</div>
