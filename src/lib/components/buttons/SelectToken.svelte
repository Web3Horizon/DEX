<script lang="ts">
	//**************************************************//
	//** Imports from application library **//
	//**************************************************//
	import { availableTokens } from '$lib/constants/availableTokens';
	import { Modal } from '$lib/components';
	import Search from '$lib/assets/icons/Search.svelte';
	import type { TokenInfo } from '$lib/types/tokens/Token';
	import { TokenTickers } from '$lib/types/tokens/AvailableTokens';
	import { tick } from 'svelte';

	//**************************************************//
	//** Local types **//
	//**************************************************//
	type ComponentProps = {
		selectedTicker: TokenTickers | null;
		tickerToExclude: TokenTickers | null;
		onSelectTicker: (() => Promise<void>) | null;
	};

	//**************************************************//
	//** Local variables **//
	//**************************************************//

	// Component props passed to the component
	let {
		selectedTicker = $bindable(null),
		tickerToExclude = $bindable(null),
		onSelectTicker = null
	}: ComponentProps = $props();

	let selectedTokenInfo: TokenInfo | null = $state(null);

	// Modal state controller
	let isModalOpen: boolean = $state(false);

	// List of available tokens, converted from Map 'availableTokens'
	let availableTokensList: string[] = Object.keys(TokenTickers);

	// Search input value
	let searchQuery: string = $state('');

	// Initialize filtered tokens with the full list
	// later in the code will be modified by user input
	let filteredTokens: string[] = $state(availableTokensList);

	//**************************************************//
	//** Component functions **//
	//**************************************************//

	// Toggle modal visibility
	const toggleModal = () => (isModalOpen = !isModalOpen);

	// Filter tokens based on the search query and exclude selected token
	const searchTokens = () => {
		filteredTokens = availableTokensList.filter((token: string) =>
			token.includes(searchQuery.toUpperCase())
		);
	};

	// Handle token selection and close modal
	const selectToken = async (ticker: TokenTickers) => {
		selectedTicker = ticker;
		isModalOpen = false;

		await tick();
		if (onSelectTicker) {
			await onSelectTicker();
		}
	};

	//**************************************************//
	//** Component effects **//
	//**************************************************//
	// Filter out the excluded token from the list
	$effect(() => {
		filteredTokens = tickerToExclude
			? availableTokensList.filter((token: string) => token !== tickerToExclude)
			: availableTokensList;
	});

	$effect(() => {
		if (selectedTicker) selectedTokenInfo = availableTokens[selectedTicker];
	});
</script>

<button
	class="flex items-center justify-center gap-2 text-nowrap rounded-[25px] bg-[#6F00FF] px-4 py-2 text-base font-bold text-white transition-all duration-300 hover:bg-[#9747FF]"
	onclick={toggleModal}
>
	{#if selectedTicker && selectedTokenInfo}
		<div class="flex items-center gap-0.5">
			<img
				src={selectedTokenInfo.imgPath}
				alt="{selectedTokenInfo.ticker} icon"
				class="h-6 w-6 rounded-full"
			/>
			<span class="text-white">{selectedTokenInfo.ticker}</span>
		</div>
	{:else}
		<span class="text-white">Select Token</span>
	{/if}
</button>

<!-- Modal Component Usage -->
<Modal bind:isOpen={isModalOpen}>
	<div class="flex h-[500px] w-[400px] flex-col gap-2 rounded-[25px] px-[30px] py-[10px]">
		<h2 class="font-roboto text-[35px] font-bold text-[#ffffff]">Select Token</h2>

		<!-- Pass search and token list as dynamic content -->
		<div>
			<div class="flex items-center">
				<Search class="absolute h-auto w-max pl-2" />
				<input
					type="text"
					placeholder="Search token"
					bind:value={searchQuery}
					oninput={searchTokens}
					class="my-4 w-full rounded-[50px] border-[3px] border-[#6F00FF] bg-transparent py-4 pl-12 pr-4 text-[24px] text-white focus:border-[#E018FF] focus:outline-none"
				/>
			</div>

			<ul class="max-h-64 overflow-y-auto">
				{#each filteredTokens as token (token)}
					<button
						type="button"
						class="flex w-full cursor-pointer items-center gap-4 rounded-[15px] px-4 py-2 text-left hover:bg-[#6F00FF] hover:text-white"
						onclick={() => selectToken(token as TokenTickers)}
						onkeydown={(e) => e.key === 'Enter' && selectToken(token as TokenTickers)}
					>
						<img
							src={availableTokens[token as TokenTickers].imgPath}
							alt="{availableTokens[token as TokenTickers]} icon"
							class="h-10 w-10 rounded-full"
						/>
						<span class="text-[25px] text-white"
							>{availableTokens[token as TokenTickers].ticker}</span
						>
					</button>
				{/each}
			</ul>
		</div>

		<button
			class="flex items-center justify-center rounded-full bg-[#6F00FF] px-4 py-2 font-roboto text-base font-bold text-white transition-all duration-300 hover:bg-[#9747FF]"
			onclick={toggleModal}
		>
			Close
		</button>
	</div>
</Modal>

<style>
	ul {
		overflow-y: auto;
		padding-right: 10px;
	}

	ul::-webkit-scrollbar {
		width: 8px;
	}

	ul::-webkit-scrollbar-thumb {
		background-color: #6f00ff;
		border-radius: 10px;
	}

	ul::-webkit-scrollbar-track {
		background: #2d2d2d;
		border-radius: 10px;
	}

	ul {
		scroll-behavior: smooth;
	}
</style>
