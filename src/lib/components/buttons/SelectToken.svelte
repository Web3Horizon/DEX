<script lang="ts">
	import coin1 from '$lib/assets/img/icon-coins/coin1.png';
	import coin2 from '$lib/assets/img/icon-coins/coin2.png';
	import coin3 from '$lib/assets/img/icon-coins/coin3.png';
	import coin4 from '$lib/assets/img/icon-coins/coin4.png';
	import coin5 from '$lib/assets/img/icon-coins/coin5.png';
	import coin6 from '$lib/assets/img/icon-coins/coin6.png';
	import { Modal } from '$lib/components';
	import Search from '$lib/assets/icons/Search.svelte';

	type Token = {
		name: string;
		icon: string;
	};

	export let selectedToken: Token | null = null;
	export let excludeToken: Token | null = null;

	let isModalOpen = false; // Modal open/close state
	let tokens: Token[] = [
		{ name: 'DexerCoin', icon: coin1 },
		{ name: 'DexToken', icon: coin2 },
		{ name: 'ExchDex', icon: coin3 },
		{ name: 'DexCoin', icon: coin4 },
		{ name: 'Dextor', icon: coin5 },
		{ name: 'DarkDexer', icon: coin6 }
	];

	let searchQuery = '';
	let filteredTokens = tokens;

	// Toggle modal visibility
	const toggleModal = () => (isModalOpen = !isModalOpen);

	// Filter tokens based on the search query and exclude selected token
	const searchTokens = () => {
		filteredTokens = tokens.filter((token) =>
			token.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	};

	// Filter out the excluded token from the list
	$: filteredTokens = excludeToken
		? tokens.filter((token) => token.name !== excludeToken.name)
		: tokens;

	// Handle token selection and close modal
	const selectToken = (token: Token) => {
		selectedToken = token;
		isModalOpen = false;
	};
</script>

<div>
	<button
		class="flex items-center justify-center gap-2 rounded-[25px] bg-[#6F00FF] px-4 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-[#9747FF]"
		on:click={toggleModal}
	>
		{#if selectedToken}
			<div class="flex items-center gap-0.5">
				<img
					src={selectedToken.icon}
					alt="{selectedToken.name} icon"
					class="h-6 w-6 rounded-full"
				/>
				<span class="text-white">{selectedToken.name}</span>
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
						on:input={searchTokens}
						class="my-4 w-full rounded-[50px] border border-[3px] border-[#6F00FF] bg-transparent py-4 pl-12 pr-4 text-[24px] text-white focus:border-[#E018FF] focus:outline-none"
					/>
				</div>

				<ul class="max-h-64 overflow-y-auto">
					{#each filteredTokens as token (token.name)}
						<button
							type="button"
							class="flex w-full cursor-pointer items-center gap-4 rounded-[15px] px-4 py-2 text-left hover:bg-[#6F00FF] hover:text-white"
							on:click={() => selectToken(token)}
							on:keydown={(e) => e.key === 'Enter' && selectToken(token)}
						>
							<img src={token.icon} alt="{token.name} icon" class="h-10 w-10 rounded-full" />
							<span class="text-[25px] text-white">{token.name}</span>
						</button>
					{/each}
				</ul>
			</div>

			<button
				class="font-roboto flex items-center justify-center rounded-full bg-[#6F00FF] px-4 py-2 text-base font-bold text-white transition-all duration-300 hover:bg-[#9747FF]"
				on:click={toggleModal}
			>
				Close
			</button>
		</div>
	</Modal>
</div>

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
