<script lang="ts">
	import { SelectToken } from '$lib/components';
	import { Swapicon } from '$lib/assets/icons';

	type Token = {
		name: string;
		icon: string;
	};
	// for show the price to the user
	type Price = {
		id: number;
	};

	// Token states
	let selectedTopToken: Token | null = null;
	let selectedBottomToken: Token | null = null;
	// let totalPool:
	// let poolShare:
	const taglines = [
		'S',
		'w',
		'a',
		'p',
		' ',
		'a',
		'n',
		'y',
		'w',
		'h',
		'e',
		'r',
		'e',
		',',
		' ',
		'a',
		'n',
		'y',
		't',
		'i',
		'm',
		'e',
		'.'
	];
</script>

<div class=" flex flex-col pb-32 pl-32 pt-32">
	<div class="  flex w-[490px]">
		<h1
			class="font-roboto col-span-2 text-balance text-center text-[45px] font-bold text-[#ffffff]"
		>
			{#each taglines as letter, index}
				<span class="fade-in inline-block" style="animation-delay: {index * 0.075}s">
					{letter === ' ' ? '\u00A0' : letter}
				</span>
				{#if letter === ','}
					<br />
				{/if}
			{/each}
		</h1>
	</div>

	<!-- Main Card Container -->
	<div
		class="grid h-[516] w-full max-w-[490px] grid-cols-3 gap-3 rounded-[50px] bg-[#5800CA]/30 px-8 py-8 text-white backdrop-blur-[4px]"
	>
		<!-- icon swapping -->
		<div class=" absolute left-[225px] top-44">
			<Swapicon class="theme-color-cycle h-11 w-full" />
		</div>

		<!-- Amount Card1 (Top) -->
		<div
			class="col-span-1 flex h-[160px] max-w-[474px] flex-col items-center space-y-2 rounded-[50px] border-[3px] border-[#E018FF] bg-[#3A176D] px-6 py-4 lg:col-span-4"
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
					class="font-roboto w-3 flex-grow bg-transparent text-2xl text-white placeholder-gray-400 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
				/>

				<!-- Select Token Component -->
				<SelectToken bind:selectedToken={selectedTopToken} excludeToken={selectedBottomToken} />
			</div>

			<!-- Max and Balance Section -->
			<div class="flex w-full items-center space-x-4">
				<div class="font-roboto text-[16px] text-white">$0</div>
			</div>
		</div>
		<!-- Amount Card2 (Bottom) -->
		<div
			class="col-span-1 flex h-[160px] max-w-[474px] flex-col items-center space-y-2 rounded-[50px] border-[3px] border-[#E018FF] bg-[#3A176D] px-6 py-4 lg:col-span-4"
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
					class="font-roboto w-3 flex-grow bg-transparent text-2xl text-white placeholder-gray-400 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
				/>
				<!-- Select Token Component (Bottom) -->
				<SelectToken bind:selectedToken={selectedBottomToken} excludeToken={selectedTopToken} />
			</div>

			<!-- Max and Balance Section -->
			<div class="flex w-full items-center space-x-4">
				<!-- Balance Text -->
				<div class="font-roboto text-[16px] text-white">$0</div>
			</div>
		</div>

		<!-- Get Started Button -->
		<div class="col-span-1 mt-6 flex justify-center lg:col-span-4">
			<button
				class="font-roboto hover:shadow-app-button hover:shadow-app_pink flex items-center gap-2.5 rounded-full border border-solid border-fuchsia-600 px-10 py-2.5 text-[20px] font-bold transition-all duration-200 hover:bg-[#E018FF]"
			>
				Get Started
			</button>
		</div>

		<!-- Disclaimer -->
		<div class="font-roboto col-span-1 text-center text-sm text-gray-400 lg:col-span-4">
			Cryptocurrencies are highly risky and volatile. The value of your holding could fall to zero.
			Consider your financial circumstances and risk appetite.
		</div>
	</div>
</div>
