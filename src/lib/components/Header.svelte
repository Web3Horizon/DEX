<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';

	import { Logo, Swap, Liquidity, AddLiquidity, YourLiquidity, Wallet } from '$lib/assets/icons';
	import { ConnectWallet } from '$lib/components';

	const logoLetters = ['d', 'e', 'x', 'e', 'r'];
	const navigationComponents = [
		{
			icon: {
				width: 28,
				height: 24,
				component: Swap
			},
			text: 'swap',
			onClick: navigateHome
		},
		{
			icon: {
				width: 24,
				height: 24,
				component: Liquidity
			},
			text: 'liquidity',
			onClick: toggleLiquidityDropDown
		}
	];
	const liquidityDropDownItems = [
		{
			text: 'add liquidity',
			href: '/',
			icon: {
				width: 24,
				height: 23,
				component: AddLiquidity
			},
			onClick: toggleLiquidityDropDown
		},
		{
			text: 'your liquidity',
			href: '/your-liquidity',
			icon: {
				width: 24,
				height: 23,
				component: YourLiquidity
			},
			onClick: toggleLiquidityDropDown
		}
	];
	let showLiquidityDropDown = $state(false);

	let dropdownElement: HTMLDivElement | null = $state(null);
	let buttonElement: HTMLButtonElement | null = $state(null);

	// Navigate user to "/" if he is not yet in "/"
	function navigateHome() {
		if ($page.url.pathname !== '/') goto('/');
	}

	function toggleLiquidityDropDown() {
		showLiquidityDropDown = !showLiquidityDropDown;
	}

	// Functions that require to be ran in browser
	if (browser) {
		function handleClickOutside(event: MouseEvent) {
			if (showLiquidityDropDown) {
				const target = event.target as Node;

				const clickedOutsideDropdown = !dropdownElement?.contains(target);
				const clickedOutsideButton = !buttonElement?.contains(target);

				if (clickedOutsideDropdown && clickedOutsideButton) {
					showLiquidityDropDown = false;
				}
			}
		}

		onMount(() => {
			document.addEventListener('click', handleClickOutside);
		});

		onDestroy(() => {
			document.removeEventListener('click', handleClickOutside);
		});
	}
</script>

<header
	class="fixed z-50 grid w-full grid-cols-3 items-center px-16 py-6 text-white backdrop-blur-sm"
>
	<a href="/">
		<div class="flex items-center gap-x-1.5 justify-self-start">
			<Logo class="theme-color-cycle" width="59" height="77" />
			<h1 class=" font-bauhaus93 text-5xl uppercase">
				{#each logoLetters as letter, index}
					<span class="fade-in inline-block" style="animation-delay: {index * 0.075}s">
						{letter}
					</span>
				{/each}
			</h1>
		</div>
	</a>

	<div class=" flex justify-around rounded-3xl bg-[#50259D73] py-4 font-roboto font-bold">
		{#each navigationComponents as navComponent}
			{#if navComponent.text === 'liquidity'}
				<div class="relative">
					<button
						bind:this={buttonElement}
						class="flex items-center gap-2.5 stroke-white text-xl transition duration-300 ease-out hover:stroke-app_pink hover:text-app_pink"
						onclick={navComponent.onClick}
					>
						<navComponent.icon.component
							width={navComponent.icon.width}
							height={navComponent.icon.height}
						/>
						<span class="capitalize">{navComponent.text}</span>
					</button>
					{#if showLiquidityDropDown}
						<div
							bind:this={dropdownElement}
							transition:fade={{ duration: 300 }}
							class="absolute top-full mt-6 flex flex-col gap-5 text-nowrap rounded-3xl bg-[#50259D73] bg-opacity-20 px-1.5 py-5 font-bold"
						>
							{#each liquidityDropDownItems as item}
								<button
									class="flex gap-2.5 rounded-full px-2 py-1.5 transition-all duration-300 hover:bg-[#AC8DE2]"
									onclick={item.onClick}
								>
									<item.icon.component width={item.icon.width} height={item.icon.height} />
									<a href={item.href} class="capitalize">{item.text}</a>
								</button>
							{/each}
						</div>
					{/if}
				</div>
			{:else}
				<button
					class="flex items-center gap-2.5 stroke-white text-xl transition duration-300 ease-out hover:stroke-app_pink hover:text-app_pink"
					onclick={navComponent.onClick}
				>
					<navComponent.icon.component
						width={navComponent.icon.width}
						height={navComponent.icon.height}
					/>
					<span class="capitalize">{navComponent.text}</span>
				</button>
			{/if}
		{/each}
	</div>

	<div class="justify-self-end">
		<ConnectWallet />
	</div>
</header>
