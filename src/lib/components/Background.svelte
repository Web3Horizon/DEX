<script lang="ts">
	import { BgLiner } from '$lib/assets/icons';
	// This component handles the background design only.
</script>

<div
	class="animated-background fixed inset-0 z-[-1] h-screen w-screen overflow-hidden bg-gradient-to-r from-[#1E0447] via-[#13022f] to-[#1E0447]"
>
	<!-- Top-left circle -->
	<div
		class="absolute h-[674px] w-[674px] rounded-full bg-[#823FFF] opacity-[0.34] blur-[200px]"
		style="top: -150px; left: -150px;"
	></div>

	<!-- Bottom-right circle -->
	<div
		class="absolute h-[674px] w-[674px] rounded-full bg-[#823FFF] opacity-[0.34] blur-[200px]"
		style="bottom: -290px; right: -150px;"
	></div>
	<BgLiner class="absolute inset-0" />

	<!-- DEXER text -->

	<div
		class="font-bauhaus93 absolute inset-0 z-[-1] flex rotate-[-25.78deg] items-center justify-center text-5xl text-[600px] uppercase text-white opacity-[0.1]"
		style="top: 1060px;"
	>
		DEXER
	</div>
</div>
