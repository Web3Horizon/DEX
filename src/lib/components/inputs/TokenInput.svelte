<script lang="ts">
	import { SelectToken } from '$lib/components';
	import type { TokenTickers } from '$lib/types/tokens/AvailableTokens';

	type ComponentProps = {
		selectedTicker: TokenTickers | null;
		tickerToExclude: TokenTickers | null;
		amount: number | null;
	};

	let {
		selectedTicker = $bindable(null),
		tickerToExclude = $bindable(null),
		amount = $bindable(null)
	}: ComponentProps = $props();
</script>

<div class="rounded-4xl border-3 border-app_pink flex w-full justify-between gap-6 px-6 py-4">
	<div class="flex flex-1 flex-col gap-3">
		<span class="text-xl font-normal capitalize opacity-50">amount</span>
		<input
			type="number"
			placeholder="0"
			class="w-full max-w-64 bg-transparent text-4xl outline-none"
			bind:value={amount}
		/>
		<div class="flex items-center justify-start gap-2">
			<button class="rounded-full bg-[#6F00FF] px-1 py-2 text-[10px] font-bold uppercase">
				max
			</button>
			<span class="text-[10px] font-bold capitalize">balance: 0</span>
		</div>
	</div>
	<div class="flex items-center">
		<SelectToken bind:selectedTicker bind:tickerToExclude />
	</div>
</div>

<style>
	/* Remove the spinners for Chrome, Edge, and Safari */
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
