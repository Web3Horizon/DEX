<script lang="ts">
	//**************************************************//
	//** Package imports **//
	//**************************************************//
	import Icon from '@iconify/svelte';

	//**************************************************//
	//** Environment imports **//
	//**************************************************//
	import { PUBLIC_DEXER_V2_FACTORY_ADDR, PUBLIC_DEXER_V2_ROUTER_ADDR } from '$env/static/public';

	//**************************************************//
	//** Image imports **//
	//**************************************************//
	import LiquidityMonsterImage from '$lib/assets/img/liquidity_monster.png';

	//**************************************************//
	//** Components imports **//
	//**************************************************//
	import {
		TokenInput,
		ConnectWallet,
		FailModalContent,
		SuccessModalContent
	} from '$lib/components';

	//**************************************************//
	//** Other imports from library **//
	//**************************************************//
	import { availableTokens } from '$lib/constants/availableTokens';
	import type { UserLiquidity } from '$lib/constants/userLiquidity';
	import fetchUserLiquidity from '$lib/scripts/liquidity/fetchUserLiquidity';
	import { approveTokens } from '$lib/scripts/liquidity/approveToken';
	import { addLiquidity } from '$lib/scripts/liquidity/addLiquidity';
	import { walletConnected } from '$lib/stores/wallet';
	import { TokenTickers } from '$lib/types/tokens/AvailableTokens';
	import type { TokenInfo } from '$lib/types/tokens/Token';
	import getPairReserves from '$lib/scripts/tokens/getPairReserves';
	import { Modal } from '$lib/components';
	import type { Component } from 'svelte';

	//**************************************************//
	//** Local types **//
	//**************************************************//
	type PoolField = {
		title: string;
		value: string;
		img: string | null;
	};

	//**************************************************//
	//** Local constants **//
	//**************************************************//
	const disabledBtnClasses: string = 'cursor-not-allowed border-gray-500' as const;
	const enabledBtnClasses: string =
		'cursor-pointer border-app_pink hover:bg-app_pink hover:shadow-app-button hover:shadow-app_pink' as const;

	//**************************************************//
	//** Local state variables **//
	//**************************************************//
	// User has pool token address in MetaMask
	let hasPoolToken: boolean = $state(false);

	// Modal controller variables
	let isModalOpen = $state(false);
	let ModalComponent: Component | null = $state(null);

	// State of loading user liquidity
	let isLoadingLiquidity: boolean = $state(false);

	// Approve button variables
	let isApproving: boolean = $state(false);
	let approveBtnDynamicClasses: string = $state(disabledBtnClasses);
	let approveButtonDisabled: boolean = $state(true);
	let isApproved: boolean = $state(false);

	// Confirm button variables
	let isConfirming: boolean = $state(false);
	let confirmBtnDynamicClasses: string = $state(disabledBtnClasses);

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

	let liquidityLoadingAbortController: AbortController | null = $state(null);
	let tokenRatioAbortController: AbortController | null = $state(null);

	// User liquidity data for the pair of tokens that he selected
	let userLiquidityData: PoolField[] = $state([
		{
			title: 'Your total pool tokens:',
			value: '0',
			img: null
		},
		{
			title: '',
			value: '0',
			img: null
		},
		{
			title: '',
			value: '0',
			img: null
		},
		{
			title: 'Your pool share:',
			value: '0%',
			img: null
		}
	]);

	//**************************************************//
	//** Page functions **//
	//**************************************************//
	const loadTokenRatio = async () => {
		if (!token1Info || !token2Info) return;

		if (tokenRatioAbortController) tokenRatioAbortController.abort();

		tokenRatioAbortController = new AbortController();
		const { signal } = new AbortController();

		const reserves = await getPairReserves(token1Info, token2Info, PUBLIC_DEXER_V2_FACTORY_ADDR);

		if (signal.aborted) return;

		if (!reserves) {
			tokensRatio = null;
			return null;
		}

		tokensRatio = Number(reserves.reserve1) / Number(reserves.reserve2);
		return tokensRatio;
	};

	const loadUserLiquidity = async () => {
		if (!$walletConnected || !token1Info || !token2Info) return;

		// Abort any ongoing operation before starting a new one
		if (liquidityLoadingAbortController) liquidityLoadingAbortController.abort();

		// Create a new AbortController instance for this operation
		liquidityLoadingAbortController = new AbortController();

		const { signal } = liquidityLoadingAbortController;

		// Explicitly update user liquidity data (title and image of both tokens) when both tokens are selected
		userLiquidityData[1].title = `Pooled ${token1Info.ticker}:`;
		userLiquidityData[2].title = `Pooled ${token2Info.ticker}:`;
		userLiquidityData[1].img = token1Info.imgPath;
		userLiquidityData[2].img = token2Info.imgPath;

		isLoadingLiquidity = true;

		try {
			let result: UserLiquidity | null = await fetchUserLiquidity(
				PUBLIC_DEXER_V2_FACTORY_ADDR,
				token1Info,
				token2Info
			);

			// Check if the signal was aborted after the operation
			if (signal.aborted) return;

			// Case when there is no error but no selected token pair contract yet exists
			if (result === null) {
				userLiquidityData = userLiquidityData.map((field, index) =>
					index === 3 ? { ...field, value: '0%' } : { ...field, value: '0' }
				);
				return;
			}

			// Update user liquidity data (values of the fields) if pair exists
			userLiquidityData[0].value = formatNumber(Number(result.poolTokenAmount), 3);
			userLiquidityData[1].value = formatNumber(Number(result.token1.pooledAmount), 3);
			userLiquidityData[2].value = formatNumber(Number(result.token2.pooledAmount), 3);
			userLiquidityData[3].value = `${formatNumber(Number(result.poolShare), 2)}%`;
		} catch (e) {
			console.error('Error occurred while loading user liquidity:', e);
		} finally {
			// Check if signal was aborted before updating the loading state
			if (!signal.aborted) isLoadingLiquidity = false;
		}
	};

	const approveSelectedTokens = async () => {
		if (!token1Info || !token2Info || !token1Amount || !token2Amount) return;

		isApproving = true;

		try {
			// Approve token1
			// Will throw an AppError if any occured
			await approveTokens(token1Info, PUBLIC_DEXER_V2_ROUTER_ADDR, token1Amount.toString());

			// Approve token2
			// Will throw an AppError if any occured
			await approveTokens(token2Info, PUBLIC_DEXER_V2_ROUTER_ADDR, token2Amount.toString());

			isApproved = true;
		} catch (e) {
			console.error(e);
		} finally {
			isApproving = false;
		}
	};

	const confirmAddLiquidity = async () => {
		if (!token1Info || !token2Info || !token1Amount || !token2Amount) return;

		isConfirming = true;

		try {
			await addLiquidity(token1Amount, token1Info, token2Amount, token2Info);

			showSuccessModal();

			// Reset everything in case of success
			resetOnConfirmed();
		} catch (error) {
			showFailModal();
			console.error('An error occurred:', error);
		} finally {
			isConfirming = false;
		}
	};

	//**************************************************//
	//** Page functions **//
	//**************************************************//
	const onToken1Input = () => {
		if (token1Amount && token1Amount <= 0) token1Amount = 0;

		if (!tokensRatio) return;

		if (!token1Amount) {
			token2Amount = null;
			return;
		}

		token2Amount = token1Amount * tokensRatio;
	};

	const onToken2Input = () => {
		if (token2Amount && token2Amount <= 0) token2Amount = 0;

		if (!tokensRatio) return;

		if (!token2Amount) {
			token1Amount = null;
			return;
		}

		token1Amount = token2Amount / tokensRatio;
	};

	const onSelectTicker = async () => {
		if (!selectedTicker1 || !selectedTicker2 || !$walletConnected) return;

		token1Info = availableTokens[selectedTicker1];
		token2Info = availableTokens[selectedTicker2];

		resetOnNewTickerSelected();

		await Promise.all([loadTokenRatio(), loadUserLiquidity()]);
	};

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
		confirmBtnDynamicClasses = isConfirming ? disabledBtnClasses : enabledBtnClasses;
	});

	//**************************************************//
	//** Helper functions **//
	//**************************************************//
	function formatNumber(value: number, maxDecimals: number) {
		const valueString = value.toString();
		if (valueString.includes('.')) {
			const [integerPart, decimalPart] = valueString.split('.');
			if (decimalPart.length > maxDecimals) {
				return `${integerPart}.${decimalPart.slice(0, maxDecimals)}`;
			}
		}
		return valueString;
	}

	const resetOnConfirmed = () => {
		// Reset ratio
		tokensRatio = null;

		// Reset amounts
		token1Amount = null;
		token2Amount = null;

		// Reset tickers
		selectedTicker1 = null;
		selectedTicker2 = null;

		// Reset token info
		token1Info = null;
		token2Info = null;

		// Reset 'Approved'
		isApproved = false;

		// Effects on user liquidity
		// Reset pooled tokens
		userLiquidityData[0].value = '0';

		// Reset data of tokens
		for (let i = 1; i <= 2; i++) {
			userLiquidityData[i].img = null;
			userLiquidityData[i].title = '';
			userLiquidityData[i].value = '0';
		}

		// Reset pool share
		userLiquidityData[3].value = '0%';
	};

	const resetOnNewTickerSelected = () => {
		// Reset the amount of tokens
		token2Amount = null;
		token1Amount = null;

		// Reset ratio as old one is no longer valid
		tokensRatio = null;
	};

	const showSuccessModal = () => {
		ModalComponent = SuccessModalContent;
		isModalOpen = true;
	};

	const showFailModal = () => {
		ModalComponent = FailModalContent;
		isModalOpen = true;
	};
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
		class="flex flex-col items-center gap-16 rounded-4xl border border-app_pink bg-gradient-to-t from-[#2C0768] to-[#1A053B] px-16 pb-12 pt-8 font-roboto text-white"
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
				<!-- Inputs for 2 tokens -->
				<!-------------------------------------------------->
				{#if $walletConnected}
					<TokenInput
						bind:selectedTicker={selectedTicker1}
						bind:tickerToExclude={selectedTicker2}
						bind:amount={token1Amount}
						{onSelectTicker}
						onInput={onToken1Input}
					/>
					<TokenInput
						bind:selectedTicker={selectedTicker2}
						bind:tickerToExclude={selectedTicker1}
						bind:amount={token2Amount}
						{onSelectTicker}
						onInput={onToken2Input}
					/>
				{/if}
			</div>

			<!-------------------------------------------------->
			<!-- Right side of the box, tokens and user liquidity info -->
			<!-------------------------------------------------->
			{#if token1Info && token2Info}
				<div class="flex flex-col gap-12">
					<!-------------------------------------------------->
					<!-- Tokens -->
					<!-------------------------------------------------->
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

					<!-------------------------------------------------->
					<!-- User liquidity info -->
					<!-------------------------------------------------->
					<div class="flex flex-col gap-2.5 rounded-3xl border border-app_pink px-3 py-8 text-base">
						{#each userLiquidityData as poolField}
							<div class="flex justify-between">
								<p class="text-nowrap">{poolField.title}</p>
								{#if isLoadingLiquidity}
									<Icon
										icon="line-md:loading-twotone-loop"
										width={16}
										height={16}
										class="text-white"
									/>
								{:else if poolField.img}
									<div class="flex gap-1">
										<span>{poolField.value}</span>
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
				<!-------------------------------------------------->
				<!-- Represent message if no token is selected -->
				<!-------------------------------------------------->
				<div class="flex items-center justify-center">
					<span class=" text-2xl">Select tokens to add liquidity</span>
				</div>
			{/if}
		</div>

		<!-------------------------------------------------->
		<!-- Box action button -->
		<!-------------------------------------------------->
		{#if $walletConnected}
			{#if isApproved}
				<button
					class="{confirmBtnDynamicClasses} rounded-full border-3 bg-transparent px-10 py-2.5 text-base font-bold capitalize transition-all duration-300"
					onclick={confirmAddLiquidity}
					disabled={isConfirming}
				>
					{#if isConfirming}
						loading...
					{:else}
						confirm
					{/if}
				</button>
			{:else}
				<button
					class="{approveBtnDynamicClasses} w-1/3 rounded-full border-3 bg-transparent py-2.5 text-base font-bold capitalize transition-all duration-300"
					disabled={approveButtonDisabled}
					onclick={approveSelectedTokens}
				>
					{#if !isApproving}
						approve
					{:else}
						loading...
					{/if}
				</button>
			{/if}
		{:else}
			<ConnectWallet />
		{/if}
	</div>
</section>

<Modal bind:isOpen={isModalOpen}>
	{#if ModalComponent}
		<ModalComponent />
	{/if}
</Modal>
