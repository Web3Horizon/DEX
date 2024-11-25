<script lang="ts">
	import { Wallet } from '$lib/assets/icons';

	let walletConnected = false;
</script>

{#if walletConnected}
	<div
		class="flex items-center gap-2.5 rounded-full bg-[#34136E] stroke-app_green px-2.5 py-2.5 font-roboto text-base font-bold text-app_green"
	>
		<span>Connected</span>
		<Wallet width="24" height="25" />
	</div>
{:else}
	<button
		class="flex items-center gap-2.5 rounded-full bg-[#6F00FF] stroke-white px-2.5 py-2.5 font-roboto text-base font-bold transition-all duration-300 hover:bg-[#9747FF] hover:shadow-wallet"
	>
		<span>Connect Wallet</span>
		<Wallet width="24" height="25" />
	</button>
{/if}
