<script lang="ts">
	import { onMount } from 'svelte';

	import { connectWallet } from '$lib/scripts/wallet';

	import { walletConnected } from '$lib/stores/wallet';

	import Icon from '@iconify/svelte';

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
		class=" font-roboto border-3 flex items-center gap-2.5 rounded-full border-[#E018FF] px-10 py-2.5 text-base font-bold text-white"
	>
		<span> Approve </span>
	</div>
{:else}
	<button
		class="font-roboto hover:shadow-app-button border-3 moving-light-button flex items-center gap-2.5 rounded-full border-[#E018FF] stroke-white px-5 py-2.5 text-base font-bold text-white transition-all duration-300 hover:bg-[#E018FF] hover:shadow-[#E018FF]"
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
