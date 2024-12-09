<script lang="ts">
	import { SelectToken } from '$lib/components';
	import type { TokenTickers } from '$lib/types/tokens/AvailableTokens';

	type ComponentProps = {
		selectedTicker: TokenTickers | null;
		tickerToExclude: TokenTickers | null;
		amount: number | null;
		onSelectTicker: (() => Promise<void>) | null;
		onInput: (() => void) | null;
		balance: number;
		onClickMax: (() => void) | null;
	};

	const disabledInputClasses: string = 'cursor-not-allowed';
	const enabledInputClasses: string = 'cursor-text';

	let {
		selectedTicker = $bindable(null),
		tickerToExclude = $bindable(null),
		amount = $bindable(null),
		balance = $bindable(0),
		onInput = null,
		onSelectTicker = null,
		onClickMax = null
	}: ComponentProps = $props();

	let inputDisabled: boolean = $state(true);
	let inputDynamicClasses: string = $state(disabledInputClasses);
	let amountExseedsBalance: boolean = $state(false);

	const clickMax = () => {
		if (inputDisabled || !onClickMax) return;

		onClickMax();
	};

	$effect(() => {
		inputDisabled = selectedTicker === null ? true : false;
		inputDynamicClasses = inputDisabled ? disabledInputClasses : enabledInputClasses;
	});

	$effect(() => {
		if (!amount) return;

		amountExseedsBalance = amount > balance;
	});
</script>

<div class="flex justify-between gap-6 rounded-4xl border-3 border-app_pink px-6 py-4">
	<div class="flex flex-1 flex-col gap-3">
		<span class="text-xl font-normal capitalize opacity-50">amount</span>
		<input
			disabled={inputDisabled}
			type="number"
			placeholder="0"
			class="w-full max-w-64 bg-transparent text-4xl outline-none {inputDynamicClasses}"
			class:text-red-500={amountExseedsBalance}
			bind:value={amount}
			oninput={onInput}
		/>
		<div class="flex items-center justify-start gap-2">
			<button
				class="rounded-full bg-[#6F00FF] px-1 py-2 text-[10px] font-bold uppercase"
				onclick={clickMax}
			>
				max
			</button>
			<span class="text-[10px] font-bold capitalize">balance: {balance}</span>
		</div>
	</div>
	<div class="flex items-center">
		<SelectToken bind:selectedTicker bind:tickerToExclude {onSelectTicker} />
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
