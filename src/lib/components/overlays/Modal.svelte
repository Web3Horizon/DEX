<script lang="ts">
	import { onMount } from 'svelte';

	let { isOpen = $bindable(false), children } = $props();
	let dialog: HTMLDialogElement | null = $state(null);

	function close() {
		isOpen = false;
	}

	$effect(() => {
		isOpen ? dialog?.showModal() : dialog?.close();
	});

	onMount(() => {
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

<dialog class="custom-dialog bg-transparent" bind:this={dialog}>
	<div class="rounded-3xl bg-deep_dark_purple px-12 py-20">
		{@render children()}
	</div>
</dialog>

<style>
	.custom-dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(2px);
	}
</style>
