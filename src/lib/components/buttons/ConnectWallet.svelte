<script lang="ts">
	import { Wallet } from '$lib/assets/icons';

	let walletConnected = false;
</script>

{#if walletConnected}
	<div
		class="text-app_green stroke-app_green flex items-center gap-2.5 rounded-full bg-[#34136E] px-2.5 py-2.5 font-roboto text-base font-bold"
	>
		<span>Connected</span>
		<Wallet width="24" height="25" />
	</div>
{:else}
	<button
		class="hover:shadow-wallet flex items-center gap-2.5 rounded-full bg-[#6F00FF] stroke-white px-2.5 py-2.5 font-roboto text-base font-bold transition-all duration-300 hover:bg-[#9747FF]"
	>
		<span>Connect Wallet</span>
		<Wallet width="24" height="25" />
	</button>
{/if}
