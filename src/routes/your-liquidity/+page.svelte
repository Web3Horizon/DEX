<script lang="ts">
	import Icon from '@iconify/svelte';

	import { SingleUserLiquidity } from '$lib/components';
	import type { UserLiquidity } from '$lib/constants/userLiquidity';

	// NOTE: temporary variable! Delete when this is dynamically loaded
	let userLiquidities: Array<UserLiquidity> = [
		{
			ticker1: 'UNI',
			ticker2: 'UNI'
		},
		{
			ticker1: 'UNI',
			ticker2: 'UNI'
		}
	];
</script>

<section class="flex flex-col gap-5 px-64 pt-32">
	<h1 class="font-roboto text-4xl font-bold capitalize text-white">your liquidity</h1>
	<div class="flex flex-col gap-5">
		{#each userLiquidities as userLiq}
			<SingleUserLiquidity ticker1={userLiq.ticker1} ticker2={userLiq.ticker2} />
		{/each}
	</div>
</section>
