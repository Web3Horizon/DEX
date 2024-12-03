<script lang="ts">
	import { onMount } from 'svelte';
	import mascotImage from '$lib/assets/img/mascotImage.png'; 
	import leftEyeImage from '$lib/assets/img/left-eye.png'; 
	import rightEyeImage from '$lib/assets/img/right-eye.png'; 

	let monsterImage: HTMLDivElement;
	let eyeLeft: HTMLImageElement;
	let eyeRight: HTMLImageElement;
	let monsterRect: DOMRect | undefined;

	const eyeLeftPosition = { x: 222, y: 122 };
	const eyeRightPosition = { x: 128, y: 122 }; 
	const eyeRadius = 14; 

	function handleMouseMove(event: MouseEvent) {
		if (!monsterRect) return;

		const { left, top } = monsterRect;
		const mouseX = event.clientX - left;
		const mouseY = event.clientY - top;

		//  function to calculate movement for one eye
		const calculateEyeMovement = (baseX: number, baseY: number) => {
			const dx = mouseX - baseX;
			const dy = mouseY - baseY;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const angle = Math.atan2(dy, dx);

			const limitedDistance = Math.min(distance, eyeRadius); 
			return {
				x: Math.cos(angle) * limitedDistance,
				y: Math.sin(angle) * limitedDistance
			};
		};

		// Calculate new positions for the eyes
		const leftMovement = calculateEyeMovement(eyeLeftPosition.x, eyeLeftPosition.y);
		const rightMovement = calculateEyeMovement(eyeRightPosition.x, eyeRightPosition.y);

		//  movements
		eyeLeft.style.transform = `translate(-50%, -50%) translate(${eyeLeftPosition.x + leftMovement.x}px, ${eyeLeftPosition.y + leftMovement.y}px)`;
		eyeRight.style.transform = `translate(-50%, -50%) translate(${eyeRightPosition.x + rightMovement.x}px, ${eyeRightPosition.y + rightMovement.y}px)`;
	}

	onMount(() => {
		const updateMonsterRect = () => {
			if (monsterImage) {
				monsterRect = monsterImage.getBoundingClientRect();
			}
		};

		updateMonsterRect(); // Initial calculation
		window.addEventListener('resize', updateMonsterRect); // Update on resize
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('resize', updateMonsterRect);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<div class="absolute right-[250px] top-[350px]">
	<div class="relative h-[350px] w-[350px]" bind:this={monsterImage}>
		<img src={mascotImage} alt="Monster" class="h-full w-full" />

		<!-- Left Eye -->
		<img
			src={leftEyeImage}
			alt="Left Eye"
			class="absolute"
			bind:this={eyeLeft}
			style="height: 2rem; width: 2rem; transform: translate(-50%, -50%) translate(222px, 122px);"
		/>

		<!-- Right Eye -->
		<img
			src={rightEyeImage}
			alt="Right Eye"
			class="absolute"
			bind:this={eyeRight}
			style="height: 2rem; width: 2rem; transform: translate(-50%, -50%) translate(128px, 122px);"
		/>
	</div>
</div>

<style>
	img {
		position: absolute;
		top: 0;
		left: 0;
		transform-origin: center;
		transition: transform 0.1s ease-out;
	}
</style>
