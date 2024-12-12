<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_DEXER_V2_FACTORY_ADDR } from '$env/static/public';
	import LiquidityMonsterImage from '$lib/assets/img/liquidity_monster.png';
	import { SingleUserLiquidity } from '$lib/components';
	import ConnectWallet from '$lib/components/buttons/ConnectWallet.svelte';
	import type { UserLiquidity } from '$lib/constants/userLiquidity';
	import getBrowserProvider from '$lib/scripts/helpers/getBrowserProvider';
	import { fetchAllUserLiquidity } from '$lib/scripts/liquidity/fetchAllUserLiquidities';
	import { walletConnected } from '$lib/stores/wallet';

	let userLiquiditiesPromise = $state(loadUserLiquidities());

	async function loadUserLiquidities() {
		let result: UserLiquidity[] = [];
		if (browser) {
			const provider = getBrowserProvider();
			result = await fetchAllUserLiquidity(PUBLIC_DEXER_V2_FACTORY_ADDR, provider);
		}

		return result;
	}
</script>

<section class="relative flex flex-col gap-5 px-64 pt-64 text-white">
	<h1 class="z-10 font-roboto text-4xl font-bold capitalize text-white">your liquidity</h1>
	{#if !$walletConnected}
		<p class="flex whitespace-nowrap text-center font-roboto text-lg">
			Please connect your wallet to start adding liquidity.
		</p>
	{/if}
	{#if $walletConnected}
		{#await userLiquiditiesPromise}
			<p class="text-center">Loading...</p>
		{:then userLiquidities}
			<img
				src={LiquidityMonsterImage}
				alt="Liquidity monster"
				class="absolute left-1/2 top-32 z-0 mx-auto h-auto w-full max-w-[350px] -translate-x-1/2 transform"
			/>
			<div class="z-10 flex flex-col gap-5">
				{#each userLiquidities as userLiq}
					<SingleUserLiquidity data={userLiq} />
				{:else}
					<div
						class="rounded-4xl border border-app_pink bg-gradient-to-t from-[#2C0768] to-[#1A053B] py-6 font-roboto text-white"
					>
						<p class="text-xl text-center">You have not provided liquidity</p>
					</div>
				{/each}
			</div>
		{:catch error}
			<p class="text-center">Failed to load your liquidities</p>
		{/await}
	{:else}
		<div class="z-10 flex w-full justify-center">
			<ConnectWallet />
		</div>
	{/if}
</section>
