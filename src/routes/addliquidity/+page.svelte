<script lang="ts">
	import LiquidityMonsterImage from '$lib/assets/img/liquidity_monster.png';
	import { TokenInput } from '$lib/components';
	import ConnectWallet from '$lib/components/buttons/ConnectWallet.svelte';
	import { availableTokens } from '$lib/constants/availableTokens';
	import { walletConnected } from '$lib/stores/wallet';
	import { TokenTickers } from '$lib/types/tokens/AvailableTokens';
	import type { TokenInfo } from '$lib/types/tokens/Token';

	type PoolField = {
		title: string;
		value: string;
		img: string | null;
	};

	let token1Amount: number | null = $state(null);
	let token2Amount: number | null = $state(null);

	let selectedTicker1: TokenTickers | null = $state(null);
	let selectedTicker2: TokenTickers | null = $state(null);

	let token1Info: TokenInfo | null = $state(null);
	let token2Info: TokenInfo | null = $state(null);

	let userPoolData: PoolField[] = $state([
		{
			title: 'Your total pool tokens:',
			value: '1.1',
			img: null
		},
		{
			title: '',
			value: '',
			img: null
		},
		{
			title: '',
			value: '',
			img: null
		},
		{
			title: 'Your pool share:',
			value: '0.05%',
			img: null
		}
	]);

	$effect(() => {
		if (token1Info) {
			userPoolData[1].title = `Pooled ${token1Info.ticker}:`;
			userPoolData[1].value = '12.3';
			userPoolData[1].img = token1Info.imgPath;
		}
	});

	$effect(() => {
		if (token2Info) {
			userPoolData[2].title = `Pooled ${token2Info.ticker}:`;
			userPoolData[2].value = '174.909';
			userPoolData[2].img = token2Info.imgPath;
		}
	});

	$effect(() => {
		if (selectedTicker1) token1Info = availableTokens[selectedTicker1];
	});

	$effect(() => {
		if (selectedTicker2) token2Info = availableTokens[selectedTicker2];
	});
</script>

<section class="flex flex-col justify-center px-36 pt-32">
	<!-- Liquidity Image -->
	<img
		src={LiquidityMonsterImage}
		alt="Liquidity monster"
		class="mx-auto h-auto w-full max-w-[225px]"
	/>
	<!-------------------------------------------------->
	<!-- Main box -->
	<!-------------------------------------------------->
	<div
		class="rounded-4xl border-app_pink font-roboto flex flex-col items-center gap-16 border bg-gradient-to-t from-[#2C0768] to-[#1A053B] px-16 pb-12 pt-8 text-white"
	>
		<div class="grid w-full grid-cols-2 gap-x-32">
			<!-------------------------------------------------->
			<!-- Left side: -->
			<!-- Heading and inputs -->
			<!-------------------------------------------------->
			<div class="flex flex-col gap-8">
				<!-------------------------------------------------->
				<!-- Heading -->
				<!-------------------------------------------------->
				<h1 class="text-4xl font-bold capitalize">add liquidity</h1>
				<!-------------------------------------------------->
				<!-- text -->
				<!-------------------------------------------------->
				{#if !$walletConnected}
					<p class="font-roboto whitespace-nowrap text-center text-lg text-gray-300">
						Please connect your wallet to start adding liquidity.
					</p>
				{/if}

				<!-------------------------------------------------->
				<!-- Inputs for 2 tokens -->
				<!-------------------------------------------------->
				{#if $walletConnected}
					<TokenInput
						bind:selectedTicker={selectedTicker1}
						bind:tickerToExclude={selectedTicker2}
						bind:amount={token1Amount}
					/>
					<TokenInput
						bind:selectedTicker={selectedTicker2}
						bind:tickerToExclude={selectedTicker1}
						bind:amount={token2Amount}
					/>
				{/if}
			</div>

			<!-------------------------------------------------->
			<!-- Right side of the box, tokens and pool info -->
			<!-------------------------------------------------->
			{#if token1Info && token2Info}
				<div class="flex flex-col gap-12">
					<div class="flex justify-between">
						<div class="flex flex-col items-center">
							<img src={token1Info.imgPath} class="h-full max-w-28" alt="" />
							<div class="text-3xl font-bold">{token1Info.ticker}</div>
						</div>
						<div class="flex flex-col items-center">
							<img src={token2Info.imgPath} class="h-full max-w-28" alt="" />
							<div class="text-3xl font-bold">{token2Info.ticker}</div>
						</div>
					</div>
					<div class="border-app_pink flex flex-col gap-2.5 rounded-3xl border px-3 py-8 text-base">
						{#each userPoolData as poolField}
							<div class="flex justify-between">
								<p>{poolField.title}</p>
								{#if poolField.img}
									<div class="flex gap-1">
										<span class="">{poolField.value}</span>
										<img src={poolField.img} alt={poolField.title} class="h-5 w-auto" />
									</div>
								{:else}
									<span>{poolField.value}</span>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{:else if (!token1Info || !token2Info) && $walletConnected}
				<div class="flex items-center justify-center">
					<span class=" text-2xl">Select tokens to add liquidity</span>
				</div>
			{/if}
		</div>

		<!-------------------------------------------------->
		<!-- Box action button -->
		<!-------------------------------------------------->
		{#if $walletConnected}
			<button
				class="border-3 border-app_pink hover:bg-app_pink hover:shadow-app-button hover:shadow-app_pink rounded-full bg-transparent px-10 py-2.5 text-base font-bold capitalize transition-all duration-300"
			>
				approve
			</button>
		{:else}
			<ConnectWallet />
		{/if}
	</div>
</section>
