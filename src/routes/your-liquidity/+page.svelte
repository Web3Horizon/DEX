<script lang="ts">
	import LiquidityMonsterImage from '$lib/assets/img/liquidity_monster.png';
	import { SingleUserLiquidity } from '$lib/components';
	import type { UserLiquidity } from '$lib/constants/userLiquidity';

	// WARN: temporary variable! Delete when this is dynamically loaded
	let userLiquidities: Array<UserLiquidity> = [
		{
			ticker1: 'UNI',
			ticker2: 'UNI',
			details: {
				poolTokens: '1.1',
				ticker1Pooled: '4.98233',
				ticker2Pooled: '3',
				poolShare: '100'
			}
		},
		{
			ticker1: 'UNI',
			ticker2: 'UNI',
			details: {
				poolTokens: '1.1444',
				ticker1Pooled: '4.33',
				ticker2Pooled: '390',
				poolShare: '1.7'
			}
		}
	];
</script>

<section class="relative flex flex-col gap-5 px-64 py-64">
	<img
		src={LiquidityMonsterImage}
		alt="Liquidity monster"
		class="absolute left-1/2 top-32 z-0 mx-auto h-auto w-full max-w-[350px] -translate-x-1/2 transform"
	/>
	<h1 class="font-roboto z-10 text-4xl font-bold capitalize text-white">your liquidity</h1>
	<div class="z-10 flex flex-col gap-5">
		{#each userLiquidities as userLiq}
			<SingleUserLiquidity
				ticker1={userLiq.ticker1}
				ticker2={userLiq.ticker2}
				details={userLiq.details}
			/>
		{/each}
	</div>
</section>
