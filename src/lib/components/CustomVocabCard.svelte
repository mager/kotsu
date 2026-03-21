<script lang="ts">
	import { removeVocabItem } from '$lib/stores/auth.svelte';
	import type { CustomVocabItem } from '$lib/firebase';

	interface Props {
		item: CustomVocabItem;
		delay?: number;
	}

	let { item, delay = 0 }: Props = $props();
	let hovering = $state(false);
	let removing = $state(false);

	let charLen = $derived(item.character.length);
	let fontSize = $derived(
		charLen <= 1
			? 'clamp(1.8rem, 3.5vw, 2.8rem)'
			: charLen <= 3
				? 'clamp(1.4rem, 2.5vw, 2rem)'
				: charLen <= 5
					? 'clamp(1.1rem, 2vw, 1.6rem)'
					: 'clamp(0.9rem, 1.6vw, 1.3rem)'
	);

	async function handleRemove(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		removing = true;
		await removeVocabItem(item);
	}
</script>

<div
	class="animate-fade-up group relative border-b border-[var(--color-divider)] px-2 py-3 text-center transition-opacity {removing ? 'opacity-20' : ''}"
	style="animation-delay: {delay}ms;"
	onmouseenter={() => (hovering = true)}
	onmouseleave={() => (hovering = false)}
	role="listitem"
>
	<!-- Remove button -->
	{#if hovering && !removing}
		<button
			onclick={handleRemove}
			class="absolute top-2 right-1 text-[10px] text-[var(--color-ink-ghost)] transition-colors hover:text-[var(--color-ink)]"
			title="Remove"
			aria-label="Remove {item.character}"
		>
			✕
		</button>
	{/if}

	<!-- Character -->
	<div
		class="font-black leading-none transition-transform duration-200 group-hover:scale-105"
		style="font-size: {fontSize}; color: var(--color-ink);"
	>
		{item.character}
	</div>

	<!-- Reading -->
	{#if item.romaji}
		<div class="mt-1 text-[10px] text-[var(--color-ink-mid)]" style="font-family: var(--font-jp-brush);">
			{item.romaji}
		</div>
	{/if}

	<!-- Meaning -->
	<div class="mt-0.5 text-[10px] text-[var(--color-ink-ghost)]">
		{item.meaning}
	</div>
</div>
