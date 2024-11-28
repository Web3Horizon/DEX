<script lang="ts">
	let sellToken = '';
	let buyToken = '';
	let isModalOpen = false;
	let isSwapping = false;

	let searchQuery = ''; // Variable to hold the search query
	let tokenList = ['DexerCoin', 'ExchDex', 'DexCoin', 'Dextor', 'DarkDexer', 'DexToken']; // List of tokens

	// Function to open the modal
	function openModal(tokenType: 'sell' | 'buy') {
		isModalOpen = true;
		selectedTokenType = tokenType;
	}

	function closeModal() {
		isModalOpen = false;
	}

	// Filter tokens based on search query
	$: filteredTokens = tokenList.filter((token) =>
		token.toLowerCase().includes(searchQuery.toLowerCase())
	);

	let selectedTokenType: 'sell' | 'buy' = 'sell'; // To track which button triggered the modal
</script>

<!-- Main Card Container -->
<div
	class=" felex h-[580px] w-[500px] flex-col justify-items-center rounded-[50px] bg-[#5800CA]/30 px-6 py-7 text-white backdrop-blur-[4px]"
>
	<!-- Sell Section -->
	<div
		class=" h-[158px] w-[474px] space-y-2 rounded-[50px] border-[3px] border-[#E018FF] bg-[#3A176D] px-4 py-4"
	>
		<label for="sell" class="  font-roboto text-[24px] font-medium text-[#ffffff]">Sell</label>
		<div class="flex items-center justify-between">
			<input
				id="sell"
				type="number"
				placeholder="0"
				class="w-full bg-transparent text-3xl placeholder-gray-400 focus:outline-none"
			/>
			<button
				class="ml-3 flex items-center space-x-2 rounded-lg bg-[#4F198F] px-4 py-2 text-sm uppercase hover:bg-[#7C3AED]"
				on:click={() => openModal('sell')}
			>
				<span>{sellToken || 'Select token'}</span>
			</button>
		</div>
		<p class="mt-1 text-sm text-gray-400">$0</p>
	</div>

	<!-- Swap Icon -->
	<div class="mb-4 flex justify-center">
		<button
			class="flex h-10 w-10 items-center justify-center rounded-full border border-[#E018FF] bg-[#4F198F] text-white transition-transform hover:rotate-180"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					d="M4 9l6-6m0 0l6 6m-6-6v14"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>

	<!-- Buy Section -->
	<div class="mb-4 space-y-2 rounded-[50px] border border-[#E018FF] bg-[#3A176D] px-4 py-4">
		<label for="buy" class=" font-roboto text-[24px] font-medium text-[#ffffff]">Buy</label>
		<div class="flex items-center justify-between">
			<input
				id="buy"
				type="number"
				placeholder="0"
				class="w-full bg-transparent text-2xl placeholder-gray-400 focus:outline-none"
			/>
			<button
				class="ml-3 flex items-center space-x-2 rounded-lg bg-[#4F198F] px-4 py-2 text-sm uppercase hover:bg-[#7C3AED]"
				on:click={() => openModal('buy')}
			>
				<span>{buyToken || 'Select token'}</span>
			</button>
		</div>
		<p class="mt-1 text-sm text-gray-400">$0</p>
	</div>

	<!-- Get Started Button -->
	<button
		class="mb-4 w-full rounded-lg border border-[#E018FF] bg-[#7C3AED] py-3 text-lg font-semibold hover:bg-[#9B59FF]"
	>
		Get Started
	</button>

	<!-- Disclaimer Text -->
	<p class="text-center text-sm text-gray-400">
		Cryptocurrencies are highly risky and volatile. The value of your holding could fall to zero.
		Consider your financial circumstances and risk appetite.
	</p>

	<!-- Modal for Selecting Tokens -->
	{#if isModalOpen}
		<div
			class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
		>
			<div class="w-[400px] rounded-lg bg-[#3A176D] p-6 text-white">
				<h3 class="text-xl font-semibold">Select Token</h3>

				<!-- Search Input -->
				<input
					type="text"
					placeholder="Search for a token..."
					class="mb-4 w-full rounded-lg bg-[#2A0551] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E018FF]"
					bind:value={searchQuery}
				/>
				<!-- Token List -->
				<ul>
					{#each filteredTokens as token}
						<li
							class="cursor-pointer rounded-lg p-2 text-gray-300 hover:bg-[#4F198F] hover:text-white"
							on:click={() => {
								if (selectedTokenType === 'sell') {
									sellToken = token;
								} else {
									buyToken = token;
								}
								closeModal();
							}}
						>
							{token}
						</li>
					{/each}
				</ul>
				<button
					class="mt-4 w-full rounded-lg bg-red-500 py-2 text-white hover:bg-red-600"
					on:click={closeModal}
				>
					Close
				</button>
			</div>
		</div>
	{/if}
</div>
