<script lang="ts">
	import LiquidityMonsterImage from '$lib/assets/img/liquidity_monster.png';
	import { SingleUserLiquidity } from '$lib/components';
	import ConnectWallet from '$lib/components/buttons/ConnectWallet.svelte';
	import type { UserLiquidity } from '$lib/constants/userLiquidity';
	import { walletConnected } from '$lib/stores/wallet';
	import { TokenTickers } from '$lib/types/tokens/AvailableTokens';

	// NOTE: temporary variable! Delete when this is dynamically loaded
	let userLiquidities: Array<UserLiquidity> = [
		{
			poolTokenAmount: '1.1',
			poolShare: '100',
			coin1: {
				ticker: TokenTickers.TOKENA,
				pooledAmount: '4.98233'
			},
			coin2: {
				ticker: TokenTickers.TOKENB,
				pooledAmount: '3'
			}
		},
		{
			poolTokenAmount: '1.1444',
			poolShare: '1.7',
			coin1: {
				ticker: TokenTickers.TOKENA,
				pooledAmount: '4.33'
			},
			coin2: {
				ticker: TokenTickers.TOKENB,
				pooledAmount: '390'
			}
		}
	];
</script>

<section class="relative flex flex-col gap-5 px-64 pt-64">
	<h1 class="z-10 font-roboto text-4xl font-bold capitalize text-white">your liquidity</h1>
	{#if $walletConnected}
		<img
			src={LiquidityMonsterImage}
			alt="Liquidity monster"
			class="absolute left-1/2 top-32 z-0 mx-auto h-auto w-full max-w-[350px] -translate-x-1/2 transform"
		/>
		<div class="z-10 flex flex-col gap-5">
			{#each userLiquidities as userLiq}
				<SingleUserLiquidity data={userLiq} />
			{/each}
		</div>
	{:else}
		<div class="z-10 flex w-full justify-center">
			<ConnectWallet />
		</div>
	{/if}
</section>
