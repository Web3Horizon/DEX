<script lang="ts">
	import { onMount } from 'svelte';
	import liquidityimage from '$lib/assets/img/liquiditypic.png';
</script>

<div class="flex flex-col items-center">
	<img src={liquidityimage} alt="wallet connected" class="h-auto w-full max-w-[200px]" />
	<!-- Main Card Container -->
	<div
		class=" mb-[68px] h-[615px] w-[1114px] space-y-4 rounded-[50px] bg-[#5800CA]/30 px-[68px] py-[32px] text-white backdrop-blur-[4px]"
	>
		<h1 class="font-roboto text-[36px] font-bold text-white">Add Liquidity</h1>

		<!-- First Index card container for the liquidity page -->
		<div
			class="h-[158px] w-[474px] space-y-2 rounded-[50px] border-[3px] border-[#E018FF] bg-[#3A176D] px-4 py-4"
		>
			<!-- Amount Label -->
			<label for="sell" class="font-roboto text-[16px] font-medium text-[gray]">Amount</label>

			<!-- Input for Amount -->
			<div class="flex items-center justify-between">
				<input
					id="amounttop"
					type="number"
					placeholder="0"
					class="font-roboto w-full bg-transparent text-2xl text-white placeholder-gray-400 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
				/>
			</div>

			<!-- Balance and Max Circle Section -->
			<div class="relative mt-4 flex items-center">
				<!-- Balance Text -->
				<div class="font-roboto absolute z-10 pl-[45px] text-[16px] text-lg text-white">
					Balance: 0
				</div>

				<!-- Max Circle Button -->
				<button
					class=" font-roboto flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#6F00FF] text-[12px] font-bold text-white"
				>
					Max
				</button>
			</div>
		</div>

		<!-- Get Started Button -->
		<button class=""> Get Started </button>

		<!-- Disclaimer Text -->
		<p class="">
			Cryptocurrencies are highly risky and volatile. The value of your holding could fall to zero.
			Consider your financial circumstances and risk appetite.
		</p>
	</div>
</div>
