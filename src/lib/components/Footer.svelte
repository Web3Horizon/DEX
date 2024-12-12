<script lang="ts">
	import { Logo, Discord, Github, Google, Whatsaap } from '$lib/assets/icons';
</script>

<footer
	class="mt-32 grid animate-pulseLight grid-cols-4 bg-gradient-to-t from-black to-purple-900 px-16 py-5 text-white shadow-top-footer duration-1000"
>
	<!-- Logo Section -->
	<div>
		<Logo class="theme-color-cycle" width="59" height="77" />
		<div class="flex space-x-5 py-5">
			<a
				href="https://discord.com/invite/your-invite-code"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Discord class="group h-[20px] w-[20px]" />
			</a>

			<!-- GitHub -->
			<a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
				<Github class="h-[20px] w-[20px] " />
			</a>
			<!-- Google -->
			<a href="mailto:example@gmail.com" target="_blank" rel="noopener noreferrer">
				<Google class="h-[20px] w-[20px]" />
			</a>
			<!-- WhatsApp -->
			<a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
				<Whatsaap class="h-[20px] w-[20px]" />
			</a>
		</div>
	</div>
	<div class="font-roboto">
		<h1 class="text-2xl font-bold">App</h1>
		<ul class="flex flex-col gap-2">
			<li>
				<a href="/" class="transition-all duration-500 hover:text-[#E018FF]">Swap</a>
			</li>
			<li>
				<a href="/add-liquidity" class="transition-all duration-500 hover:text-[#E018FF]"
					>Liquidity</a
				>
			</li>
			<li>
				<a
					href="https://coinmarketcap.com/"
					class="transition-all duration-500 hover:text-[#E018FF]">Farms</a
				>
			</li>
		</ul>
	</div>
	<div class="font-roboto">
		<h1 class="text-2xl font-bold">Community</h1>
		<ul class="flex flex-col gap-2">
			<li>
				<a
					href="https://discord.com/invite/your-invite-code"
					class="transition-all duration-500 hover:text-[#E018FF]">Discord</a
				>
			</li>
			<li>
				<a
					href="https://github.com/Web3Horizon "
					class="transition-all duration-500 hover:text-[#E018FF]">GitHub</a
				>
			</li>
			<li>
				<a
					href="https://web.whatsapp.com/ "
					class="transition-all duration-500 hover:text-[#E018FF]">WhatsApp</a
				>
			</li>
			<li>
				<a href="mailto:example@gmail.com" class="transition-all duration-500 hover:text-[#E018FF]"
					>Gmail</a
				>
			</li>
		</ul>
	</div>
	<div class="font-roboto">
		<h1 class="text-2xl font-bold">Info</h1>
		<ul class="flex flex-col gap-2">
			<li>
				<a href="/" class="transition-all duration-500 hover:text-[#E018FF]">News</a>
			</li>
			<li>
				<a href="/" class="transition-all duration-500 hover:text-[#E018FF]">Help</a>
			</li>
			<li>
				<a href="/" class="transition-all duration-500 hover:text-[#E018FF]">About Us</a>
			</li>
		</ul>
	</div>
</footer>
