<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	import { PUBLIC_DEXER_V2_FACTORY_ADDR, PUBLIC_DEXER_V2_ROUTER_ADDR } from '$env/static/public';
	//**************************************************//
	//** Imports from library **//
	//**************************************************//
	import type { UserLiquidity } from '$lib/constants/userLiquidity';
	import { availableTokens } from '$lib/constants/availableTokens';
	import formatNumber from '$lib/scripts/helpers/formatNumber';
	import type { TokenTickers } from '$lib/types/tokens/AvailableTokens';
	import { removeLiquidity } from '$lib/scripts/liquidity/removeLiquidity';
	import { getPairAddress, getPairContractDecimals } from '$lib/scripts/tokens/pairContract';
	import getBrowserProvider from '$lib/scripts/helpers/getBrowserProvider';
	import { approveTokens } from '$lib/scripts/tokens/approveToken';
	import { FailModalContent, Modal, SuccessModalContent } from '$lib/components';

	type UserCoin = {
		ticker: TokenTickers | null;
		amount: number;
		image: string | null;
		balance: number | null;
	};

	const disabledBtnClasses: string = 'cursor-not-allowed border-gray-500' as const;
	const enabledBtnClasses: string =
		'cursor-pointer border-app_pink hover:bg-app_pink hover:shadow-app-button hover:shadow-app_pink' as const;

	// Data that will be loaded when passed to the
	// page in state
	let data: UserLiquidity | null = null;
	if (browser) {
		data = history?.state?.['sveltekit:states'] || null;

		// If data is still missing the page becomes useless and user
		// get redirected to "Your Liquidity" page
		if (!data || Object.keys(data).length === 0) {
			goto('/your-liquidity');
		}
	}

	// Modal controller variables
	let isModalOpen = $state(false);
	let ModalComponent: typeof SuccessModalContent | typeof FailModalContent | null = $state(null);
	let modalMsg: string | null = $state(null);
	let modalTitle: string | null = $state(null);

	let removeAmount: number | null = $state(null);
	let LPtokenBalance: number = Number(data?.poolTokenAmount);

	let isApproving: boolean = $state(false);
	let isApproved: boolean = $state(false);
	let approveDisabled: boolean = $state(true);
	let approveBtnDynamicClasses: string = $state(disabledBtnClasses);

	let isRemoving: boolean = $state(false);
	let removeBtnDynamicClasses: string = $state(disabledBtnClasses);

	//**************************************************//
	//** Local constants **//
	//**************************************************//
	const removeAmountQuickButtons = [
		{
			title: '25%',
			action: () => {
				shortcutAction(25);
			}
		},
		{
			title: '50%',
			action: () => {
				shortcutAction(50);
			}
		},
		{
			title: '75%',
			action: () => {
				shortcutAction(75);
			}
		},
		{
			title: 'Max',
			action: () => {
				shortcutAction(100);
			}
		}
	];

	let userCoinsToBeReturned: UserCoin[] = $state([]);

	const userLiquidityDetails = data
		? [
				{
					title: 'Your pool share:',
					value: `${formatNumber(Number(data.poolShare), 2)}%`
				},
				{
					title: data.token1.ticker.toUpperCase(),
					value: formatNumber(Number(data.token1.pooledAmount), 3)
				},
				{
					title: data.token2.ticker.toUpperCase(),
					value: formatNumber(Number(data.token2.pooledAmount), 3)
				}
			]
		: [];

	//**************************************************//
	//** Page functions **//
	//**************************************************//
	function onInput() {
		if (!removeAmount) {
			for (let i = 0; i < userCoinsToBeReturned.length; i++) {
				userCoinsToBeReturned[i].amount = 0;
			}
			return;
		}

		for (let i = 0; i < userCoinsToBeReturned.length; i++) {
			userCoinsToBeReturned[i].amount =
				(removeAmount / LPtokenBalance) * userCoinsToBeReturned[i].balance!;
		}
	}

	function shortcutAction(percentage: number) {
		removeAmount = LPtokenBalance * (percentage / 100);

		onInput();
	}

	async function approveToken() {
		if (!data || !removeAmount) return;

		isApproving = true;

		try {
			const provider = getBrowserProvider();

			const address1: string = availableTokens[data?.token1.ticker].address;
			const address2: string = availableTokens[data?.token2.ticker].address;

			const pairAddr = await getPairAddress(
				PUBLIC_DEXER_V2_FACTORY_ADDR,
				address1,
				address2,
				provider
			);

			const pairDecimals = await getPairContractDecimals(pairAddr);

			await approveTokens(
				pairAddr,
				pairDecimals,
				PUBLIC_DEXER_V2_ROUTER_ADDR,
				removeAmount.toString()
			);

			isApproved = true;
		} catch (e: any) {
			console.error('Failed to approve tokens: ', e);
		} finally {
			isApproving = false;
		}
	}

	async function executeRemoveLiquidity() {
		if (!data || !removeAmount) return;

		isRemoving = true;

		const address1: string = availableTokens[data?.token1.ticker].address;
		const address2: string = availableTokens[data?.token2.ticker].address;

		const decimals1: number = availableTokens[data?.token1.ticker].decimals;
		const decimals2: number = availableTokens[data?.token2.ticker].decimals;
		try {
			await removeLiquidity(
				address1,
				address2,
				decimals1,
				decimals2,
				removeAmount,
				userCoinsToBeReturned[0].amount,
				userCoinsToBeReturned[1].amount,
				PUBLIC_DEXER_V2_ROUTER_ADDR
			);

			showSuccessModal();
		} catch (e: any) {
			console.error(e);
			showFailModal();
		} finally {
			isRemoving = false;
		}
	}

	//**************************************************//
	//** Svelte methods **//
	//**************************************************//
	onMount(() => {
		userCoinsToBeReturned = [
			{
				ticker: data?.token1?.ticker || null,
				amount: 0,
				image: data?.token1?.ticker ? availableTokens[data.token1.ticker].imgPath : null,
				balance: Number(data?.token1?.pooledAmount) || null
			},
			{
				ticker: data?.token2?.ticker || null,
				amount: 0,
				image: data?.token2?.ticker ? availableTokens[data.token2.ticker].imgPath : null,
				balance: Number(data?.token2?.pooledAmount) || null
			}
		];
	});

	//**************************************************//
	//** Page effects **//
	//**************************************************//
	$effect(() => {
		if (removeAmount && removeAmount <= 0) removeAmount = 0;
	});

	$effect(() => {
		if (!removeAmount) return;
		if (removeAmount > LPtokenBalance) removeAmount = LPtokenBalance;
	});

	$effect(() => {
		approveDisabled =
			!removeAmount || removeAmount > LPtokenBalance || !removeAmount || isApproving;

		approveBtnDynamicClasses = approveDisabled ? disabledBtnClasses : enabledBtnClasses;
	});

	$effect(() => {
		removeBtnDynamicClasses = isRemoving ? disabledBtnClasses : enabledBtnClasses;
	});

	//**************************************************//
	//** Helper functions **//
	//**************************************************//
	const onCloseModal = () => {
		goto('/your-liquidity');
	};

	const showSuccessModal = () => {
		ModalComponent = SuccessModalContent;

		modalTitle = 'Success';
		modalMsg = `Liquidity removed`;

		isModalOpen = true;
	};

	const showFailModal = () => {
		ModalComponent = FailModalContent;

		modalTitle = 'Fail';
		modalMsg = 'Failed to remove liquidity';

		isModalOpen = true;
	};
</script>

<section class="flex justify-center pt-36 font-roboto text-white">
	<div
		class="flex flex-col items-center gap-14 rounded-4xl border border-app_pink bg-gradient-to-t from-[#5100BA] to-[#1A053B] px-9 py-8"
	>
		<div class="flex flex-col items-center gap-8">
			<!-------------------------------------------------->
			<!-- Page Heading -->
			<!-------------------------------------------------->
			<h2 class=" text-3xl font-bold capitalize">remove liquidity</h2>

			<!-------------------------------------------------->
			<!-- Remove amount controller box -->
			<!-------------------------------------------------->
			<div
				class="flex flex-col gap-8 rounded-3xl border border-app_pink bg-gradient-to-t from-[#5100BA] to-[#1A053B] px-4 pb-8 pt-4"
			>
				<h3 class="text-xl font-bold capitalize leading-6">remove amount</h3>
				<div class="flex flex-col gap-5">
					<!-------------------------------------------------->
					<!-- Remove amount input -->
					<!-------------------------------------------------->
					<div class="flex flex-col gap-2">
						<input
							bind:value={removeAmount}
							oninput={onInput}
							type="number"
							class="rounded-full border-3 border-app_pink bg-transparent p-3 text-xl font-bold placeholder:opacity-10 focus:outline-none"
							placeholder="Enter amount"
						/>
						<p class="text-xs">LP token balance: {formatNumber(LPtokenBalance, 3)}</p>
					</div>
					<!-------------------------------------------------->
					<!-- Quick input buttons -->
					<!-------------------------------------------------->
					<div class="grid grid-cols-4 gap-5">
						{#each removeAmountQuickButtons as button}
							<button
								class="rounded-lg border border-app_pink p-2.5 transition-all duration-200 hover:bg-app_pink hover:bg-opacity-10"
								onclick={button.action}
							>
								<span class="text-2xl font-light">{button.title}</span>
							</button>
						{/each}
					</div>
				</div>
				<!-------------------------------------------------->
				<!-- Expected amount af tokens to be returned -->
				<!-------------------------------------------------->
				<div class="flex flex-col gap-6 font-light">
					{#each userCoinsToBeReturned as coin}
						<div class="flex justify-between">
							<div class="flex items-center gap-1">
								<img src={coin.image} alt="" class="h-6" />
								<span class="text-xl">{coin.ticker}</span>
							</div>
							<span class="text-2xl">{formatNumber(coin.amount, 3)}</span>
						</div>
					{/each}
				</div>
			</div>
			<!-------------------------------------------------->
			<!-- Approve remove liquidity button -->
			<!-------------------------------------------------->
			{#if isApproved}
				<button
					class="{removeBtnDynamicClasses} rounded-full border-3 bg-transparent px-10 py-2.5 text-base font-bold capitalize transition-all duration-300"
					onclick={executeRemoveLiquidity}
					disabled={isRemoving}
				>
					<span class="text-xl font-bold capitalize">
						{#if isRemoving}
							loading...
						{:else}
							remove
						{/if}
					</span>
				</button>{:else}
				<button
					class="{approveBtnDynamicClasses} w-56 rounded-full border-3 border-app_pink py-3 text-center shadow transition-all duration-200"
					disabled={approveDisabled}
					onclick={approveToken}
				>
					<span class="text-xl font-bold capitalize">
						{#if isApproving}
							...loading
						{:else}
							approve
						{/if}
					</span>
				</button>
			{/if}
		</div>

		<!-------------------------------------------------->
		<!-- User liquidity details -->
		<!-------------------------------------------------->
		<div
			class="flex w-3/4 flex-col gap-8 rounded-3xl border border-app_pink bg-gradient-to-t from-[#13002B] to-[#26065A] px-2.5 py-8 text-xl font-normal"
		>
			{#each userLiquidityDetails as detail}
				<div class="flex justify-between">
					<span>{detail.title}</span>
					<span>{detail.value}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<Modal bind:isOpen={isModalOpen} onClose={onCloseModal}>
	{#if ModalComponent && modalMsg && modalTitle}
		<ModalComponent msg={modalMsg} title={modalTitle} />
	{/if}
</Modal>

<style>
	/* Remove the spinners for Chrome, Edge, and Safari */
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
