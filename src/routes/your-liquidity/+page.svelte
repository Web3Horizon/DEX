<script lang="ts">
	import LiquidityMonsterImage from '$lib/assets/img/liquidity_monster.png';
	import { SingleUserLiquidity } from '$lib/components';
	import type { UserLiquidity } from '$lib/constants/userLiquidity';

	// WARN: temporary variable! Delete when this is dynamically loaded
	let userLiquidities: Array<UserLiquidity> = [
		{
			poolTokenAmount: '1.1',
			poolShare: '100',
			coin1: {
				ticker: 'UNI',
				pooledAmount: '4.98233'
			},
			coin2: {
				ticker: 'UNI',
				pooledAmount: '3'
			}
		},
		{
			poolTokenAmount: '1.1444',
			poolShare: '1.7',
			coin1: {
				ticker: 'UNI',
				pooledAmount: '4.33'
			},
			coin2: {
				ticker: 'UNI',
				pooledAmount: '390'
			}
		}
	];
</script>

<section class="relative flex flex-col gap-5 px-64 pt-64">
	<img
		src={LiquidityMonsterImage}
		alt="Liquidity monster"
		class="absolute left-1/2 top-32 z-0 mx-auto h-auto w-full max-w-[350px] -translate-x-1/2 transform"
	/>
	<h1 class="z-10 font-roboto text-4xl font-bold capitalize text-white">your liquidity</h1>
	<div class="z-10 flex flex-col gap-5">
		{#each userLiquidities as userLiq}
			<SingleUserLiquidity data={userLiq} />
		{/each}
	</div>
</section>
