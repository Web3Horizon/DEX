<script lang="ts">
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
	import { TokenInput } from '$lib/components';
	import ConnectWallet from '$lib/components/buttons/ConnectWallet.svelte';

	//**************************************************//
	//** Other imports from library **//
	//**************************************************//
	import { availableTokens } from '$lib/constants/availableTokens';
	import { fetchUserLiquidity } from '$lib/scripts/liquidity/fetchUserLiquidity';
	import { walletConnected } from '$lib/stores/wallet';
	import { TokenTickers } from '$lib/types/tokens/AvailableTokens';
	import type { TokenInfo } from '$lib/types/tokens/Token';
	import { approveTokens } from '$lib/scripts/liquidity/approveToken';
	import { addLiquidity } from '$lib/scripts/liquidity/addLiquidity';

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
	//** Local variables **//
	//**************************************************//
	let isLoadingLiquidity: boolean = $state(false);

	let isApproving: boolean = $state(false);
	let approveBtnDynamicClasses: string = $state(disabledBtnClasses);
	let approveButtonDisabled: boolean = $state(true);
	let isApproved: boolean = $state(false);

	// Confirm button variables
	let isConfirming: boolean = $state(false);
	let confirmBtnDynamicClasses: string = $state(disabledBtnClasses);

	let token1Amount: number | null = $state(null);
	let token2Amount: number | null = $state(null);

	let selectedTicker1: TokenTickers | null = $state(null);
	let selectedTicker2: TokenTickers | null = $state(null);

	let token1Info: TokenInfo | null = $state(null);
	let token2Info: TokenInfo | null = $state(null);

	let userLiquidityData: PoolField[] = $state([
		{
			title: 'Your total pool tokens:',
			value: '0.0',
			img: null
		},
		{
			title: '',
			value: '0.0',
			img: null
		},
		{
			title: '',
			value: '0.0',
			img: null
		},
		{
			title: 'Your pool share:',
			value: '0.0%',
			img: null
		}
	]);

	//**************************************************//
	//** Page functions **//
	//**************************************************//
	const loadhUserLiquidity = async () => {
		isLoadingLiquidity = true;
		if ($walletConnected && token1Info && token2Info) {
			let result = await fetchUserLiquidity(
				PUBLIC_DEXER_V2_FACTORY_ADDR,
				token1Info.address,
				token2Info.address
			);

			// Case when there is no error but no selected token pair contract yet exsists
			// default user liquidity info will be displayed
			if (result === null) return;

			if (result === false) {
				console.log('Error occured while fetching user liquidity');
				return;
			}

			// TODO: Update user liquidity data to represent it in the UI
			console.log(
				'No error occured while fetching user liquidity and the selected token pair contract already exsists'
			);
		}
		isLoadingLiquidity = false;
	};

	const approveSelectedTokens = async () => {
		if (!token1Info || !token2Info || !token1Amount || !token2Amount) return;

		isApproving = true;

		try {
			// Approve token1
			let token1Result = await approveTokens(
				token1Info,
				PUBLIC_DEXER_V2_ROUTER_ADDR,
				token1Amount.toString()
			);

			if (token1Result != null) return;

			// Approve token2
			let token2Result = await approveTokens(
				token2Info,
				PUBLIC_DEXER_V2_ROUTER_ADDR,
				token2Amount.toString()
			);

			// NOTE: should I do anything if approval fails?
			if (token2Result != null) return;

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
			let result = await addLiquidity(token1Amount, token1Info, token2Amount, token2Info);

			if (result != null) {
				console.log('Something failed...');
				return;
			}

			// Reset everything in case of success
			isApproved = false;
			token1Amount = null;
			token2Amount = null;
			selectedTicker1 = null;
			selectedTicker2 = null;
		} catch (error) {
			console.error('An error occurred:', error);
		} finally {
			isConfirming = false;
		}
	};

	//**************************************************//
	//** Page effects **//
	//**************************************************//
	$effect(() => {
		// Set token info for token 1 when selected
		token1Info = selectedTicker1 ? availableTokens[selectedTicker1] : null;
	});

	$effect(() => {
		// Set token info for token 2 when selected
		token2Info = selectedTicker2 ? availableTokens[selectedTicker2] : null;
	});

	$effect(() => {
		if (token1Info && token2Info) {
			// Update user liquidity data (data of the token 1) when both tokens selected
			userLiquidityData[1].img = token1Info.imgPath;
			userLiquidityData[1].title = `Pooled ${token1Info.ticker}:`;

			// Update user liquidity data (data of the token 2) when both tokens selected
			userLiquidityData[2].img = token2Info.imgPath;
			userLiquidityData[2].title = `Pooled ${token2Info.ticker}:`;

			// Load user liquidity data from blcokchain
			loadhUserLiquidity();
		}
	});

	$effect(() => {
		approveButtonDisabled =
			isApproving || !token1Amount || !token2Amount || !token1Info || !token2Info;

		approveBtnDynamicClasses = approveButtonDisabled ? disabledBtnClasses : enabledBtnClasses;
	});

	$effect(() => {
		// Dynamically set classes to 'Confirm' button dependently on whether if it is
		// disabled or not
		confirmBtnDynamicClasses = isConfirming ? disabledBtnClasses : enabledBtnClasses;
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
					<div class="flex flex-col gap-2.5 rounded-3xl border border-app_pink px-3 py-8 text-base">
						{#each userLiquidityData as poolField}
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
					class="{approveBtnDynamicClasses} rounded-full border-3 bg-transparent px-10 py-2.5 text-base font-bold capitalize transition-all duration-300"
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
