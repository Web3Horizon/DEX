<script lang="ts">
	import { Logo, Swap, Liquidity } from '$lib/assets/icons';
	import { LiquidityDropDown } from '$lib/components';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let logoLetters = ['d', 'e', 'x', 'e', 'r'];
	let navigationComponents = [
		{
			icon: {
				width: 28,
				height: 24,
				component: Swap
			},
			text: 'swap',
			onClick: navigateHome,
			onMouseEnter: null,
			onMouseLeave: null
		},
		{
			icon: {
				width: 24,
				height: 24,
				component: Liquidity
			},
			text: 'liquidity',
			onClick: null,
			onMouseEnter: showMenu,
			onMouseLeave: hideMenu
		}
	];

	let showLiquidityMenu = false;

	// Navigate to root if user is not in the root path
	function navigateHome() {
		if ($page.url.pathname !== '/') goto('/');
	}

	// Show dropdown menu with a slight delay for smoother UX
	function showMenu() {
		showLiquidityMenu = true;
	}

	// Hide dropdown menu with a slight delay
	function hideMenu() {
		setTimeout(() => {
			showLiquidityMenu = false;
		}, 200); // Adjust delay as needed
	}
</script>

<header class="grid grid-cols-3 items-center px-16 py-6 text-white">
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

	<div class="font-roboto flex justify-around rounded-3xl bg-[#50259D73] py-4 font-bold">
		{#each navigationComponents as navComponent}
			<button
				class="hover:stroke-app_pink hover:text-app_pink flex items-center gap-x-2 stroke-white text-xl transition duration-300 ease-out"
				onclick={navComponent.onClick}
				onmouseenter={navComponent.onMouseEnter}
				onmouseleave={navComponent.onMouseLeave}
			>
				<svelte:component
					this={navComponent.icon.component}
					width={navComponent.icon.width}
					height={navComponent.icon.height}
				/>
				<span class="capitalize">{navComponent.text}</span>
			</button>
		{/each}
	</div>

	<div class="justify-self-end">RIGHT</div>
</header>
