<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	let { isOpen = $bindable(false), children, modalContentClass = '' } = $props();
	let dialog: HTMLDialogElement | null = $state(null);

	const close = () => {
		isOpen = false;
	};

	// Listen for the passed in isOpen prop to switch modal state to opeded or
	// closed
	$effect(() => {
		isOpen ? dialog?.showModal() : dialog?.close();
	});

	onMount(() => {
		// Setup listener on the dialog when it's rendered in order to listen for
		// clicks on backdrop of the modal
		dialog?.addEventListener('click', function (event) {
			if (!dialog) return;
			var rect = dialog.getBoundingClientRect();

			var isInDialog =
				rect.top <= event.clientY &&
				event.clientY <= rect.top + rect.height &&
				rect.left <= event.clientX &&
				event.clientX <= rect.left + rect.width;

			if (!isInDialog) {
				isOpen = false;
			}
		});
	});
</script>

<dialog class="custom-backdrop bg-transparent outline-none" bind:this={dialog}>
	<div class="bg-deep_dark_purple flex flex-col rounded-3xl p-4">
		<div class="flex justify-end">
			<button aria-label="close" class="flex" onclick={close}>
				<Icon
					icon="jam:close"
					width="24"
					height="24"
					class="text-white transition-transform duration-300 hover:scale-125"
				/>
			</button>
		</div>
		<div class={modalContentClass}>
			{@render children()}
		</div>
	</div>
</dialog>

<style>
	.custom-backdrop::backdrop {
		background-color: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(2px);
	}
</style>
