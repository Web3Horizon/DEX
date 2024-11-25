<script lang="ts">
	import { Wallet } from '$lib/assets/icons';
	import { connectWallet } from '$lib/scripts/wallet';
	import { walletConnected } from '$lib/stores/wallet';
	import { onMount } from 'svelte';

	let isConnecting = false;

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

	let iconWidth = 24;
	let iconHeight = 25;
</script>

{#if $walletConnected}
	<div
		class="flex items-center gap-2.5 rounded-full bg-[#34136E] stroke-app_green px-2.5 py-2.5 font-roboto text-base font-bold text-app_green"
	>
		<span>Connected</span>
		<Wallet width={iconWidth} height={iconHeight} />
	</div>
{:else}
	<button
		class="flex items-center gap-2.5 rounded-full bg-[#6F00FF] stroke-white px-2.5 py-2.5 font-roboto text-base font-bold transition-all duration-300 hover:bg-[#9747FF] hover:shadow-wallet"
		disabled={isConnecting}
		class:cursor-not-allowed={isConnecting}
		onclick={connect}
	>
		<span class="capitalize">
			{#if isConnecting}
				connecting
			{:else}
				connect wallet
			{/if}
		</span>
		{#if isConnecting}
			<iconify-icon
				icon="line-md:loading-twotone-loop"
				width={iconWidth}
				height={iconHeight}
				style="color: white"
			></iconify-icon>
		{:else}
			<Wallet width={iconWidth} height={iconHeight} />
		{/if}
	</button>
{/if}
