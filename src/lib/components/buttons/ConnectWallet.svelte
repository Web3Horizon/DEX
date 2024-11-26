<script lang="ts">
	import { Wallet } from '$lib/assets/icons';
	import { connectWallet } from '$lib/scripts/wallet';
	import { walletConnected } from '$lib/stores/wallet';
	import { onMount } from 'svelte';
	import Modal from '../overlays/Modal.svelte';

	let isConnecting = $state(false);
	let isModalOpen = $state(true);
	const iconWidth = 24;
	const iconHeight = 25;

	const connect = async () => {
		isConnecting = true;
		await connectWallet();
		isConnecting = false;

		// Show the success message
		isModalOpen = true;
	};

	function toggle() {
		isModalOpen = !isModalOpen;
	}

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
		onclick={toggle}
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

<Modal bind:isOpen={isModalOpen}>
	<div class="flex flex-col">
		<h2 class="font-roboto font-bold capitalize text-white">connected succesfully</h2>
	</div>
</Modal>
