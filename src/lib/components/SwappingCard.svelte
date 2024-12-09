<script lang="ts">
	import { TokenInput } from '$lib/components';
	import { walletConnected } from '$lib/stores/wallet';
	import GetStart from './buttons/GetStart.svelte';
	import { onMount, onDestroy } from 'svelte';
	import Mascot from './mascot/Mascot.svelte';
	import type { TokenTickers } from '$lib/types/tokens/AvailableTokens'; // Import TokenTickers type
	import { Swapicon } from '$lib/assets/icons';

	let showSecondText: boolean = $state(false);
	let Taglines: string[] = [
		'S',
		'w',
		'a',
		'p',
		'\u00A0',
		'<br>',
		'a',
		'n',
		'y',
		'w',
		'h',
		'e',
		'r',
		'e',
		',',
		'\u00A0',
		'<br>',
		'a',
		'n',
		'y',
		't',
		'i',
		'm',
		'e',
		'.'
	];

	let secondText: string[] = [
		'E',
		'a',
		's',
		'i',
		'l',
		'y',
		'\u00A0',
		't',
		'o',
		'g',
		'g',
		'l',
		'e',
		'\u00A0',
		't',
		'o',
		'\u00A0',
		'<br>',
		'e',
		'x',
		'c',
		'h',
		'a',
		'n',
		'g',
		'e',
		'\u00A0',
		'c',
		'r',
		'y',
		'p',
		't',
		'o',
		'\u00A0',
		'<br>',
		'i',
		'n',
		'\u00A0',
		'r',
		'e',
		'a',
		'l',
		'\u00A0',
		't',
		'i',
		'm',
		'e',
		'.'
	];

	let intervalId: NodeJS.Timeout;
	let token1Amount: number | null = $state(null);
	let token2Amount: number | null = $state(null);

	// Props for TokenInput component
	let selectedTicker: TokenTickers | null = null;
	let tickerToExclude: TokenTickers | null = null;
	let amount: number | null = null;

	// Toggle the flag every 5 seconds
	function startTextLoop() {
		intervalId = setInterval(() => {
			showSecondText = !showSecondText;
		}, 5000);
	}

	// Start the loop when the component is mounted
	onMount(() => {
		startTextLoop();
	});

	// Clean up the interval when the component is destroyed
	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<section class="flex h-screen flex-row space-x-80 pl-16 pt-48">
	<div class="font-roboto flex w-[500px] flex-col gap-5 text-white">
		{#if !$walletConnected}
			<!-- Show taglines while wallet is not connected -->
			<h1 class="font-roboto text-nowrap text-6xl font-bold uppercase">
				{#if !showSecondText}
					{#each Taglines as letter, index}
						{#if letter === '<br>'}
							<br />
						{:else}
							<span class="fade-in inline-block" style="animation-delay: {index * 0.075}s">
								{letter}
							</span>
						{/if}
					{/each}
				{:else}
					{#each secondText as letter, index}
						{#if letter === '<br>'}
							<br />
						{:else}
							<span class="fade-in inline-block" style="animation-delay: {index * 0.075}s">
								{letter}
							</span>
						{/if}
					{/each}
				{/if}
			</h1>
			<p class=" font-roboto pt-5 text-lg text-gray-300">Connect your wallet to start swapping.</p>
			<div>
				<GetStart />
			</div>
		{:else}
			<!-- Once wallet is connected, remove taglines and show input fields -->
			<div
				class="rounded-4xl border-app_pink flex flex-col items-center justify-center space-y-5 border bg-[#5800CA] bg-opacity-20 px-4 py-4 backdrop-blur-lg"
			>
				<div class=" absolute pb-12">
					<Swapicon class=" theme-color-cycle"></Swapicon>
				</div>
				<!-- Token Inputs -->
				<TokenInput {selectedTicker} {tickerToExclude} {amount} />

				<TokenInput {selectedTicker} {tickerToExclude} {amount} />

				<!-- GetStart Button, add fixed width or max width -->

				<GetStart />
			</div>
		{/if}
	</div>
	<div class="flex justify-end">
		<Mascot />
	</div>
</section>
