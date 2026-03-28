<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Column } from '$lib/data';
	import { getColumnItems } from '$lib/data';
	import { isLearned, getColumnProgress, getAuthState } from '$lib/stores/auth.svelte';

	interface Props {
		column: Column;
	}

	let { column }: Props = $props();

	let items = $derived(getColumnItems(column));
	let auth = $derived(getAuthState());
	let progress = $derived(getColumnProgress(column.id, items.length));
	let progressPct = $derived(items.length > 0 ? Math.round((progress / items.length) * 100) : 0);

	// Column accent
	const accents: Record<string, string> = {
		hiragana: 'var(--color-shu)',
		katakana: 'var(--color-ai)',
		radicals: 'var(--color-matcha)',
		kanji: 'var(--color-fuji)',
		vocabulary: 'var(--color-asagi)'
	};

	let accent = $derived(accents[column.id] || 'var(--color-ink)');
</script>

<div class="mx-auto max-w-3xl">
	<!-- Header -->
	<div class="mb-8 animate-fade-up">
		<div class="flex items-end gap-4">
			<h1
				class="text-6xl font-black leading-none md:text-7xl"
				style="font-family: var(--font-jp-brush); color: {accent};"
			>
				{column.titleJp}
			</h1>
			<div>
				<span class="text-base font-bold tracking-[0.1em] uppercase text-[var(--color-ink)]">{column.title}</span>
				<span class="block text-sm text-[var(--color-ink-light)]">{column.hint}</span>
			</div>
		</div>

		{#if auth.user && progress > 0}
			<div class="mt-4 flex items-center gap-3">
				<div class="h-[3px] flex-1 overflow-hidden rounded-full bg-[var(--color-divider)]">
					<div
						class="h-full rounded-full transition-all duration-700 ease-[var(--ease-out-expo)]"
						style="width: {progressPct}%; background-color: {accent};"
					></div>
				</div>
				<span class="text-xs font-bold text-[var(--color-ink-light)]">{progress}/{items.length}</span>
			</div>
		{/if}
	</div>

	<!-- Sections -->
	{#each column.sections as section, sIdx}
		{@const offset = column.sections.slice(0, sIdx).reduce((sum, s) => sum + s.items.length, 0)}

		{#if column.sections.length > 1}
			<div class="mb-4 mt-10 first:mt-0 animate-fade-up" style="animation-delay: {sIdx * 80}ms;">
				<div class="flex items-center gap-3">
					<div class="h-[2px] w-8 rounded-full" style="background-color: {accent}; opacity: 0.4;"></div>
					<span class="text-xs font-bold tracking-[0.25em] uppercase" style="color: {accent};">
						{section.titleJp} · {section.title}
					</span>
				</div>
			</div>
		{/if}

		<!-- Character grid — responsive, larger -->
		<div class="grid grid-cols-4 gap-1 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8">
			{#each section.items as item, i (item.character + item.romaji + section.id)}
				{@const flatIdx = offset + i}
				{@const isMarked = isLearned(column.id, flatIdx)}
				<a
					href="/{column.id}/{flatIdx}"
					class="scroll-reveal group relative flex flex-col items-center justify-center rounded-lg py-4 transition-all duration-200 hover:bg-[var(--color-paper-warm)] press-scale"
					style="animation-delay: {(sIdx * 100) + (i * 15)}ms;"
				>
					<!-- Character -->
					<span
						class="relative inline-block font-black leading-none transition-all duration-200 {isMarked ? 'char-learned' : 'char-unlearned'}"
						style="font-size: {item.character.length <= 1 ? 'clamp(2.4rem, 4.5vw, 3.2rem)' : item.character.length <= 3 ? 'clamp(1.6rem, 3vw, 2.2rem)' : 'clamp(1.3rem, 2.5vw, 1.8rem)'};"
					>
						{item.character}
						<!-- Learned indicator — subtle accent underline -->
						{#if isMarked}
							<span
								class="absolute -bottom-1 left-1/2 h-[2px] w-3/4 -translate-x-1/2 rounded-full"
								style="background-color: {accent}; opacity: 0.5;"
							></span>
						{/if}
					</span>

					<!-- Romaji on hover -->
					<span class="mt-1 text-[10px] font-bold text-[var(--color-ink-ghost)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
						{item.romaji}
					</span>
				</a>
			{/each}
		</div>
	{/each}

	<!-- Keyboard hint -->
	<div class="mt-8 pb-8 text-center">
		<span class="text-xs text-[var(--color-ink-ghost)]">
			Click a character to study it · <kbd class="rounded border border-[var(--color-divider)] px-1.5 py-0.5 text-[10px]">←</kbd> <kbd class="rounded border border-[var(--color-divider)] px-1.5 py-0.5 text-[10px]">→</kbd> to navigate · <kbd class="rounded border border-[var(--color-divider)] px-1.5 py-0.5 text-[10px]">Space</kbd> to mark learned
		</span>
	</div>
</div>
