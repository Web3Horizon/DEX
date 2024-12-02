<script lang="ts">
	import { goto } from '$app/navigation';
	import { Logo, Discord, Github, Google, Whatsaap } from '$lib/assets/icons';
	// Any TypeScript logic can be added here if required.
</script>

<footer class="grid grid-cols-4 bg-gradient-to-t from-black to-purple-900 p-4 text-white">
	<!-- Logo Section -->
	<div class="col-span-1">
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
			<a
				href="https://github.com/your-repo"
				target="_blank"
				rel="noopener noreferrer"
				class="social-icon"
			>
				<Github class="h-[20px] w-[20px] " />
			</a>
			<!-- Google -->
			<a href="mailto:example@gmail.com" class="hover:text-pink-500">
				<Google class="h-[20px] w-[20px]" />
			</a>
			<!-- WhatsApp -->
			<a
				href="https://wa.me/your-number"
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-pink-500"
			>
				<Whatsaap class="h-[20px] w-[20px]" />
			</a>
		</div>
	</div>
</footer>
