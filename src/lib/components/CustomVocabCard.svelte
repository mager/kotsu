<script lang="ts">
	import { getAuthState, removeVocabItem } from '$lib/stores/auth.svelte';
	import type { CustomVocabItem } from '$lib/firebase';

	interface Props {
		item: CustomVocabItem;
		delay?: number;
	}

	let { item, delay = 0 }: Props = $props();
	let authState = $derived(getAuthState());
	let hovering = $state(false);
	let removing = $state(false);

	// Dynamic font size based on character length
	let charLen = $derived(item.character.length);
	let fontSize = $derived(
		charLen <= 1
			? 'clamp(2.2rem, 4.5vw, 3.5rem)'
			: charLen <= 3
				? 'clamp(1.6rem, 3vw, 2.4rem)'
				: charLen <= 5
					? 'clamp(1.2rem, 2.2vw, 1.8rem)'
					: 'clamp(1rem, 1.8vw, 1.4rem)'
	);

	async function handleRemove(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		removing = true;
		await removeVocabItem(item);
	}
</script>

<div
	class="animate-fade-up group relative block py-3 text-center md:py-4"
	style="animation-delay: {delay}ms; --color-accent: var(--color-col-vocabulary);"
	onmouseenter={() => (hovering = true)}
	onmouseleave={() => (hovering = false)}
	role="listitem"
>
	<!-- Custom badge -->
	<span
		class="absolute top-1 right-1 text-[8px] font-bold tracking-widest uppercase opacity-30"
		style="color: var(--color-col-vocabulary);"
	>
		mine
	</span>

	<!-- Remove button — appears on hover -->
	{#if hovering && !removing}
		<button
			onclick={handleRemove}
			class="absolute top-1 left-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold opacity-40 transition-opacity hover:opacity-90"
			style="color: var(--color-col-vocabulary);"
			title="Remove"
			aria-label="Remove {item.character}"
		>
			✕
		</button>
	{/if}

	<span
		class="relative inline-block font-black leading-none transition-transform duration-200 group-hover:scale-110 {removing ? 'opacity-30' : ''}"
		style="font-size: {fontSize}; color: var(--color-ink);"
	>
		{item.character}
	</span>
</div>
