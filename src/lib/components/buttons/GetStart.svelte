<script lang="ts">
	import { onMount } from 'svelte';

	import { connectWallet } from '$lib/scripts/wallet';

	import { walletConnected } from '$lib/stores/wallet';

	import Icon from '@iconify/svelte';

	let isConnecting = $state(false);
	// let isModalOpen = $state(false);
	const walletIconWidth = 24;
	const walletIconHeight = 25;

	const connect = async () => {
		isConnecting = true;
		await connectWallet();
		isConnecting = false;
	};

	onMount(async () => {
		// Check if a wallet connection exists in localStorage
		const previouslyConnectedAddress = localStorage.getItem('connectedWalletAddress');
		if (previouslyConnectedAddress) {
			// Reconnect the wallet silently
			isConnecting = true;
			await connectWallet();
			isConnecting = false;
		}
	});
</script>

{#if $walletConnected}
	<button
		class="flex items-center gap-2.5 rounded-full border-3 border-app_pink px-10 py-2.5 font-roboto text-base font-bold text-white transition-all duration-300 hover:bg-app_pink hover:shadow-app-button hover:shadow-app_pink"
	>
		<span>Approve</span>
	</button>
{:else}
	<button
		class="moving-light-button flex items-center gap-2.5 rounded-full border-3 border-app_pink stroke-white px-5 py-2.5 font-roboto text-base font-bold text-white transition-all duration-300 hover:bg-app_pink hover:shadow-app-button hover:shadow-app_pink"
		disabled={isConnecting}
		class:cursor-not-allowed={isConnecting}
		onclick={connect}
	>
		<span class="capitalize">
			{#if isConnecting}
				connecting
			{:else}
				get started
			{/if}
		</span>
		{#if isConnecting}
			<Icon
				icon="line-md:loading-twotone-loop"
				width={walletIconWidth}
				height={walletIconHeight}
				class="text-white"
			/>
		{/if}
	</button>
{/if}
