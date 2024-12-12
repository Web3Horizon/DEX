<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import { PUBLIC_DEXER_V2_FACTORY_ADDR, PUBLIC_DEXER_V2_ROUTER_ADDR } from '$env/static/public';

	import {
		Modal,
		TokenInput,
		Mascot,
		GetStart,
		SuccessModalContent,
		FailModalContent
	} from '$lib/components';
	import { Swapicon } from '$lib/assets/icons';
	import { walletConnected } from '$lib/stores/wallet';
	import { availableTokens } from '$lib/constants/availableTokens';
	import getUserBalance from '$lib/scripts/tokens/getUserBalance';
	import loadTokenRatio from '$lib/scripts/tokens/loadTokenRatio';
	import formatNumber from '$lib/scripts/helpers/formatNumber';
	import type { TokenInfo } from '$lib/types/tokens/Token';
	import type { TokenTickers } from '$lib/types/tokens/AvailableTokens';
	import { approveTokens } from '$lib/scripts/liquidity/approveToken';
	import { swapTokens } from '$lib/scripts/tokens/swap';

	//**************************************************//
	//** Local constants **//
	//**************************************************//
	const disabledBtnClasses: string = 'cursor-not-allowed border-gray-500' as const;
	const enabledBtnClasses: string =
		'cursor-pointer border-app_pink hover:bg-app_pink hover:shadow-app-button hover:shadow-app_pink' as const;

	const taglines: string[] = [
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
	] as const;

	const secondText: string[] = [
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
	] as const;

	//**************************************************//
	//** Local state variables **//
	//**************************************************//
	// Approve button variables
	let isApproving: boolean = $state(false);
	let approveBtnDynamicClasses: string = $state(disabledBtnClasses);
	let approveButtonDisabled: boolean = $state(true);
	let isApproved: boolean = $state(false);

	// Confirm button variables
	let isSwapping: boolean = $state(false);
	let swapBtnDynamicClasses: string = $state(disabledBtnClasses);

	let showSecondText: boolean = $state(false);
	let intervalId: NodeJS.Timeout;

	// Modal controller variables
	let isModalOpen = $state(false);
	let ModalComponent: typeof SuccessModalContent | typeof FailModalContent | null = $state(null);
	let modalMsg: string | null = $state(null);
	let modalTitle: string | null = $state(null);

	// User input amounts for each token
	let token1Amount: number | null = $state(null);
	let token2Amount: number | null = $state(null);

	// Selected tokens ratio
	let tokensRatio: number | null = $state(null);

	// User selected token tickers
	let selectedTicker1: TokenTickers | null = $state(null);
	let selectedTicker2: TokenTickers | null = $state(null);

	// User selected token information
	let token1Info: TokenInfo | null = $state(null);
	let token2Info: TokenInfo | null = $state(null);

	// User selected token balances
	let token1Balance: number = $state(0);
	let token2Balance: number = $state(0);

	// Abort controllers
	let tokenRatioAbortController: AbortController | null = $state(null);

	//**************************************************//
	//** Page functions **//
	//**************************************************//
	const swithcTokens = () => {
		[selectedTicker1, selectedTicker2] = [selectedTicker2, selectedTicker1]; // Switch token tickers
		[token1Balance, token2Balance] = [token2Balance, token1Balance]; // Switch token balances
		[token1Info, token2Info] = [token2Info, token1Info]; // Switch token infos
		[token1Amount, token2Amount] = [token2Amount, token1Amount]; // Switch token amounts

		if (tokensRatio && tokensRatio !== 0) {
			tokensRatio = 1 / tokensRatio;
		}
	};

	const approveSelectedToken = async () => {
		if (!token1Amount || !token1Info) return;

		isApproving = true;

		try {
			// Will throw an AppError if any occured
			await approveTokens(token1Info, PUBLIC_DEXER_V2_ROUTER_ADDR, token1Amount.toString());

			isApproved = true;
		} catch (e) {
			console.error(e);
		} finally {
			isApproving = false;
		}
	};

	const executeSwap = async () => {
		if (!token1Info || !token2Info || !token1Amount || !token2Amount) return;

		isSwapping = true;

		try {
			let path: string[] = [token1Info.address, token2Info.address];

			const hash: string = await swapTokens(
				PUBLIC_DEXER_V2_ROUTER_ADDR,
				token1Amount,
				token1Info,
				path
			);

			showSuccessModal(hash);

			resetOnSwapped();
		} catch (error) {
			showFailModal();

			console.error('Swap failed:', error);
		} finally {
			isSwapping = false;
		}
	};

	// Toggle the flag every 5 seconds
	function startTextLoop() {
		intervalId = setInterval(() => {
			showSecondText = !showSecondText;
		}, 5000);
	}

	//**************************************************//
	//** Prop functions to components **//
	//**************************************************//
	const onTokenInput = (inputToken: 'token1' | 'token2') => {
		if (inputToken === 'token1') {
			if (token1Amount && token1Amount <= 0) token1Amount = 0;

			if (!tokensRatio) return;

			if (!token1Amount) {
				token2Amount = null;
				return;
			}

			token2Amount = (token1Amount / tokensRatio) * 0.97;
		} else if (inputToken === 'token2') {
			if (token2Amount && token2Amount <= 0) token2Amount = 0;

			if (!tokensRatio) return;

			if (!token2Amount) {
				token1Amount = null;
				return;
			}

			token1Amount = token2Amount * tokensRatio * 0.97;
		}
	};

	const onSelectTicker1 = async () => {
		if (!selectedTicker1 || !$walletConnected) return;

		token1Info = availableTokens[selectedTicker1];

		resetOnNewTickerSelected();

		let balanceRaw: string | null = await getUserBalance(token1Info);

		if (balanceRaw) {
			token1Balance = Number(formatNumber(Number(balanceRaw), 5));
		}

		await loadRatio();
	};

	const onSelectTicker2 = async () => {
		if (!selectedTicker2 || !$walletConnected) return;

		token2Info = availableTokens[selectedTicker2];

		resetOnNewTickerSelected();

		let balanceRaw = await getUserBalance(token2Info);

		if (balanceRaw) {
			token2Balance = Number(formatNumber(Number(balanceRaw), 5));
		}

		await loadRatio();
	};

	const onClickMaxToken1 = () => {
		token1Amount = token1Balance;

		onTokenInput('token1');
	};

	const onClickMaxToken2 = () => {
		token2Amount = token2Balance;

		onTokenInput('token2');
	};

	//**************************************************//
	//** Local helper functions **//
	//**************************************************//
	const resetOnNewTickerSelected = () => {
		// Reset the amount of tokens
		token2Amount = null;
		token1Amount = null;

		// Reset ratio as old one is no longer valid
		tokensRatio = null;
	};

	const resetOnSwapped = () => {
		token1Amount = null;
		token2Amount = null;

		tokensRatio = null;

		selectedTicker1 = null;
		selectedTicker2 = null;

		token1Info = null;
		token2Info = null;

		token1Balance = 0;
		token2Balance = 0;
	};

	const loadRatio = async () => {
		if (!token1Info || !token2Info) return;

		if (tokenRatioAbortController) tokenRatioAbortController.abort();

		tokenRatioAbortController = new AbortController();
		const { signal } = tokenRatioAbortController;

		const loadedTokenRatio = await loadTokenRatio(
			token1Info,
			token2Info,
			PUBLIC_DEXER_V2_FACTORY_ADDR
		);

		if (signal.aborted) return;

		tokensRatio = loadedTokenRatio;
	};

	const showSuccessModal = (hash: string) => {
		ModalComponent = SuccessModalContent;

		modalTitle = 'Success';
		modalMsg = `Transaction hash: ${hash}`;

		isModalOpen = true;
	};

	const showFailModal = () => {
		ModalComponent = FailModalContent;

		modalTitle = 'Fail';
		modalMsg = 'Failed to swap tokens';

		isModalOpen = true;
	};

	//**************************************************//
	//** Page effects **//
	//**************************************************//
	// Effects on approve button when user changes his inputs
	$effect(() => {
		approveButtonDisabled =
			isApproving || !token1Amount || !token2Amount || !token1Info || !token2Info;

		approveBtnDynamicClasses = approveButtonDisabled ? disabledBtnClasses : enabledBtnClasses;
	});

	// Effects when "Confirm" button is clicked
	$effect(() => {
		// Dynamically set classes to 'Confirm' button dependently on whether if it is
		// in process of confirming or not
		swapBtnDynamicClasses = isSwapping ? disabledBtnClasses : enabledBtnClasses;
	});

	//**************************************************//
	//** Svelte methods **//
	//**************************************************//
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
	<div class="flex w-[500px] flex-col gap-5 font-roboto text-white">
		{#if !$walletConnected}
			<!-- Show taglines while wallet is not connected -->
			<h1 class="text-nowrap font-roboto text-6xl font-bold uppercase">
				{#if !showSecondText}
					{#each taglines as letter, index}
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
			<p class="pt-5 font-roboto text-lg text-gray-300">Connect your wallet to start swapping.</p>
			<div>
				<GetStart />
			</div>
		{:else}
			<!-- Once wallet is connected, remove taglines and show input fields -->
			<div
				class="flex flex-col items-center justify-center space-y-5 rounded-4xl border border-app_pink bg-[#5800CA] bg-opacity-20 px-4 py-4 backdrop-blur-lg"
			>
				<button class="absolute pb-12" onclick={swithcTokens}>
					<Swapicon class="theme-color-cycle"></Swapicon>
				</button>
				<!-- Token Inputs -->
				<TokenInput
					bind:selectedTicker={selectedTicker1}
					bind:tickerToExclude={selectedTicker2}
					bind:amount={token1Amount}
					onSelectTicker={onSelectTicker1}
					onInput={() => {
						onTokenInput('token1');
					}}
					balance={token1Balance}
					onClickMax={onClickMaxToken1}
				/>

				<TokenInput
					bind:selectedTicker={selectedTicker2}
					bind:tickerToExclude={selectedTicker1}
					bind:amount={token2Amount}
					onSelectTicker={onSelectTicker2}
					onInput={() => {
						onTokenInput('token2');
					}}
					balance={token2Balance}
					onClickMax={onClickMaxToken2}
				/>

				<!-- GetStart Button-->

				{#if isApproved}
					<button
						class="{swapBtnDynamicClasses} rounded-full border-3 bg-transparent px-10 py-2.5 text-base font-bold capitalize transition-all duration-300"
						onclick={executeSwap}
						disabled={isSwapping}
					>
						{#if isSwapping}
							loading...
						{:else}
							swap
						{/if}
					</button>
				{:else}
					<button
						class="{approveBtnDynamicClasses} w-1/3 rounded-full border-3 bg-transparent py-2.5 text-base font-bold capitalize transition-all duration-300"
						disabled={approveButtonDisabled}
						onclick={approveSelectedToken}
					>
						{#if isApproving}
							loading...
						{:else}
							approve
						{/if}
					</button>
				{/if}

				<!-- <GetStart /> -->
			</div>
		{/if}
	</div>
	<div class="flex justify-end">
		<Mascot />
	</div>
</section>

<Modal bind:isOpen={isModalOpen}>
	{#if ModalComponent && modalMsg && modalTitle}
		<ModalComponent msg={modalMsg} title={modalTitle} />
	{/if}
</Modal>
