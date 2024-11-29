<script lang="ts">
	import { onMount } from 'svelte';

	import walletConnectedImagePath from '$lib/assets/img/wallet_connected.png';

	import { Wallet, Tick } from '$lib/assets/icons';
	import { connectWallet } from '$lib/scripts/wallet';
	import { walletConnected } from '$lib/stores/wallet';
	import { Modal } from '$lib/components';

	let isConnecting = $state(false);
	let isModalOpen = $state(false);
	const walletIconWidth = 24;
	const walletIconHeight = 25;

	const connect = async () => {
		isConnecting = true;
		let result = await connectWallet();
		isConnecting = false;

		if (result === null) {
			// Show the success message
			isModalOpen = true;
		}
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
	<div
		class="stroke-app_green font-roboto text-app_green flex items-center gap-2.5 rounded-full bg-[#34136E] px-2.5 py-2.5 text-base font-bold"
	>
		<span>Connected</span>
		<Wallet width={walletIconWidth} height={walletIconHeight} />
	</div>
{:else}
	<button
		class="font-roboto hover:shadow-wallet flex items-center gap-2.5 rounded-full bg-[#6F00FF] stroke-white px-2.5 py-2.5 text-base font-bold transition-all duration-300 hover:bg-[#9747FF]"
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
				width={walletIconWidth}
				height={walletIconHeight}
				style="color: white"
			></iconify-icon>
		{:else}
			<Wallet width={walletIconWidth} height={walletIconHeight} />
		{/if}
	</button>
{/if}

<Modal bind:isOpen={isModalOpen}>
	<div class="flex flex-col items-center gap-2 px-[20px]">
		<img
			src={walletConnectedImagePath}
			alt="wallet connected"
			class="h-auto w-full max-w-[140px]"
		/>
		<h2 class="font-roboto text-xl font-bold capitalize text-white">connected successfully</h2>
		<div class="border-app_green flex h-12 w-12 justify-center rounded-full border-4">
			<Tick class="stroke-app_green" width="26" />
		</div>
	</div>
</Modal>
