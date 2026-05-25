<script lang="ts">
	import type { Column } from '$lib/data';
	import { getColumnItems } from '$lib/data';
	import { isLearned, getColumnProgress, getAuthState } from '$lib/stores/auth.svelte';
	import { getColumnAward } from '$lib/awards';

	interface Props {
		column: Column;
	}

	let { column }: Props = $props();

	let items = $derived(getColumnItems(column));
	let auth = $derived(getAuthState());
	let progress = $derived(getColumnProgress(column.id, items.length));
	let progressPct = $derived(items.length > 0 ? Math.round((progress / items.length) * 100) : 0);
	let recipeCount = $derived(items.reduce((sum, item) => sum + (item.recipes?.length ?? 0), 0));
	let isKanaColumn = $derived(column.id === 'hiragana' || column.id === 'katakana');
	let isVocabColumn = $derived(column.id === 'vocabulary');
	let showLearned = $state(false);
	let sectionEntries = $derived(
		column.sections.map((section, sIdx) => {
			const offset = column.sections.slice(0, sIdx).reduce((sum, s) => sum + s.items.length, 0);
			const allItems = section.items.map((item, i) => ({
				item,
				flatIdx: offset + i,
				isMarked: isLearned(column.id, offset + i)
			}));
			const learnedCount = allItems.filter((x) => x.isMarked).length;
			const items = allItems.filter(
				({ isMarked }) => showLearned || !auth.user || !isMarked
			);

			return {
				section,
				offset,
				items,
				learnedCount,
				totalCount: section.items.length,
				isCleared: auth.user ? learnedCount === section.items.length : false
			};
		})
	);
	let visibleCount = $derived(sectionEntries.reduce((sum, entry) => sum + entry.items.length, 0));

	const accents: Record<string, string> = {
		hiragana: 'var(--color-shu)',
		katakana: 'var(--color-ai)',
		radicals: 'var(--color-matcha)',
		kanji: 'var(--color-fuji)',
		vocabulary: 'var(--color-asagi)'
	};

	// JLPT level badge colors — warm amber for N5 (easy), indigo for N4, teal for N3
	const jlptColors: Record<string, string> = {
		n5: '#c7873a',
		n4: '#5b6fd6',
		n3: '#2a9d8f'
	};

	let accent = $derived(accents[column.id] || 'var(--color-ink)');
	let categoryAward = $derived(getColumnAward(column.id));

	// CTA: first unlearned index for "Start / Resume" button
	let firstUnlearnedIndex = $derived(items.findIndex((_, i) => !isLearned(column.id, i)));
	let studyHref = $derived(
		firstUnlearnedIndex !== -1
			? `/${column.id}/${firstUnlearnedIndex}`
			: `/${column.id}/0`
	);
	let studyLabel = $derived(progress > 0 ? 'Resume studying' : 'Start studying');
</script>

<div class="mx-auto max-w-3xl">
	<div class="mb-8 animate-fade-up">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div class="flex items-end gap-4">
				<h1
					class="text-6xl font-black leading-none md:text-7xl {isKanaColumn ? 'kana-study-type' : ''}"
					style="font-family: {isKanaColumn ? 'var(--font-kana-study)' : 'var(--font-jp-brush)'}; color: {accent};"
				>
					{column.titleJp}
				</h1>
				<div>
					<span class="text-base font-bold tracking-[0.1em] uppercase text-[var(--color-ink)]">{column.title}</span>
					<span class="block text-sm text-[var(--color-ink-light)]">{column.hint}</span>
					{#if column.id === 'radicals'}
						<span class="mt-1 block text-xs font-bold tracking-[0.16em] uppercase text-[var(--color-ink-ghost)]">
							{items.length} forms · {recipeCount} recipes
						</span>
					{/if}
				</div>
			</div>
			<a
				href={studyHref}
				class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-black tracking-[0.16em] uppercase transition-all duration-200 hover:-translate-y-0.5 press-scale"
				style="border-color: color-mix(in srgb, {accent} 36%, var(--color-divider)); background: color-mix(in srgb, {accent} 10%, var(--color-paper)); color: var(--color-ink);"
			>
				{studyLabel}
				<span style="color: {accent};">→</span>
			</a>
		</div>

		{#if auth.user && progress > 0}
			<div class="mt-4 flex items-center gap-3">
				<div class="h-[3px] flex-1 overflow-hidden rounded-full bg-[var(--color-divider)]">
					<div
						class="neon-progress h-full rounded-full transition-all duration-700 ease-[var(--ease-out-expo)]"
						style="width: {progressPct}%; background-color: {accent}; color: {accent};"
					></div>
				</div>
				<span class="text-xs font-bold text-[var(--color-ink-light)]">{progress}/{items.length}</span>
			</div>
		{/if}

		{#if auth.user && progress > 0}
			<div class="mt-4 flex flex-wrap items-center gap-2">
				<button
					type="button"
					class="cursor-pointer rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase transition-all duration-200 press-scale"
					style="border-color: {showLearned ? 'var(--color-divider)' : accent}; background: {showLearned ? 'var(--color-paper)' : 'color-mix(in srgb, ' + accent + ' 10%, var(--color-paper))'}; color: {showLearned ? 'var(--color-ink-light)' : 'var(--color-ink)'};"
					onclick={() => (showLearned = false)}
				>
					unfinished {visibleCount}/{items.length}
				</button>
				<button
					type="button"
					class="cursor-pointer rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase transition-all duration-200 press-scale"
					style="border-color: {showLearned ? accent : 'var(--color-divider)'}; background: {showLearned ? 'color-mix(in srgb, ' + accent + ' 10%, var(--color-paper))' : 'var(--color-paper)'}; color: {showLearned ? 'var(--color-ink)' : 'var(--color-ink-light)'};"
					onclick={() => (showLearned = true)}
				>
					show learned
				</button>
			</div>
		{/if}
	</div>

	{#each sectionEntries as entry, sIdx}
		{@const jlptColor = jlptColors[entry.section.id]}
		{@const sectionAccent = jlptColor ?? accent}

		{#if column.sections.length > 1}
			<div class="mb-4 mt-10 first:mt-0 animate-fade-up" style="animation-delay: {sIdx * 80}ms;">
				<div class="flex items-center gap-3">
					<div class="h-[2px] w-8 rounded-full" style="background-color: {sectionAccent}; opacity: 0.4;"></div>
					{#if jlptColor}
						<span
							class="rounded-full px-3 py-1 text-[10px] font-black tracking-[0.22em] uppercase"
							style="background: color-mix(in srgb, {jlptColor} 14%, var(--color-paper)); color: {jlptColor}; border: 1px solid color-mix(in srgb, {jlptColor} 28%, transparent);"
						>
							{entry.section.title}
						</span>
						<span class="text-[11px] font-bold text-[var(--color-ink-mid)]">
							{entry.totalCount} kanji
						</span>
						{#if entry.learnedCount > 0}
							<span class="text-[10px] font-bold text-[var(--color-ink-ghost)]">
								· {entry.learnedCount} learned
							</span>
						{/if}
					{:else}
						<span class="text-xs font-bold tracking-[0.25em] uppercase {isKanaColumn ? 'kana-study-type' : ''}" style="color: {sectionAccent};">
							{entry.section.titleJp} · {entry.section.title}
						</span>
					{/if}
				</div>
			</div>
		{/if}

		{#if entry.items.length > 0}
			{@const isPhraseSection = isVocabColumn && entry.items.some((x) => x.item.context)}
			{#if isPhraseSection}
				<div class="grid gap-2 sm:grid-cols-2">
					{#each entry.items as { item, flatIdx, isMarked }, i (item.character + item.romaji + entry.section.id)}
						<a
							href="/{column.id}/{flatIdx}"
							class="scroll-reveal phrase-card group relative flex flex-col gap-1.5 rounded-xl border border-[var(--color-divider)] px-4 py-3.5 transition-all duration-200 hover:bg-[var(--color-paper-warm)] press-scale {isMarked ? 'phrase-card-learned' : ''}"
							style="animation-delay: {(sIdx * 100) + (i * 18)}ms;"
						>
							<div class="flex items-start justify-between gap-2">
								<span
									class="font-black leading-tight {isMarked ? 'char-learned' : 'char-unlearned'}"
									style="font-size: clamp(1.05rem, 2.5vw, 1.3rem); font-family: var(--font-jp-brush);"
								>
									{item.character}
								</span>
								{#if isMarked}
									<span class="mt-0.5 shrink-0 h-[6px] w-[6px] rounded-full" style="background-color: {accent}; opacity: 0.7;"></span>
								{/if}
							</div>
							<span class="text-[11px] font-bold tracking-[0.1em] text-[var(--color-ink-ghost)]">{item.romaji}</span>
							<span class="text-xs font-semibold text-[var(--color-ink-light)]">{item.meaning}</span>
							{#if item.context}
								<span class="mt-0.5 text-[11px] leading-[1.5] text-[var(--color-ink-ghost)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">{item.context}</span>
							{/if}
						</a>
					{/each}
				</div>
			{:else}
				<div class="grid grid-cols-4 gap-1 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8">
					{#each entry.items as { item, flatIdx, isMarked }, i (item.character + item.romaji + entry.section.id)}
						<a
							href="/{column.id}/{flatIdx}"
							class="scroll-reveal group relative flex flex-col items-center justify-center rounded-lg py-4 transition-all duration-200 hover:bg-[var(--color-paper-warm)] press-scale"
							style="animation-delay: {(sIdx * 100) + (i * 15)}ms;"
						>
							<span
								class="relative inline-block font-black leading-none transition-all duration-200 {isKanaColumn ? 'kana-study-type' : ''} {isMarked ? 'char-learned' : 'char-unlearned'}"
								style="font-size: {item.character.length <= 1 ? 'clamp(2.4rem, 4.5vw, 3.2rem)' : item.character.length <= 3 ? 'clamp(1.6rem, 3vw, 2.2rem)' : 'clamp(1.3rem, 2.5vw, 1.8rem)'};"
							>
								{item.character}
								{#if isMarked}
									<span
										class="absolute -bottom-1 left-1/2 h-[2px] w-3/4 -translate-x-1/2 rounded-full"
										style="background-color: {accent}; opacity: 0.5;"
									></span>
								{/if}
							</span>

							<span class="mt-1 text-[10px] font-bold text-[var(--color-ink-ghost)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
								{item.romaji}
							</span>

							{#if item.recipes?.length}
								<span
									class="mt-1 rounded-full border px-2 py-0.5 text-[9px] font-black tracking-[0.16em] uppercase text-[var(--color-ink-light)] opacity-80 transition-opacity duration-200 group-hover:opacity-100"
									style="border-color: color-mix(in oklab, {accent} 28%, white);"
								>
									{item.recipes.length} recipe{item.recipes.length === 1 ? '' : 's'}
								</span>
							{/if}
						</a>
					{/each}
				</div>
			{/if}
		{:else if entry.isCleared}
			<div class="mb-2 mt-2 rounded-xl border border-dashed border-[var(--color-divider)] px-5 py-4 text-center">
				<span class="text-xs font-bold text-[var(--color-ink-ghost)]">Section cleared — toggle <strong>show learned</strong> to review.</span>
			</div>
		{/if}
	{/each}

	{#if auth.user && !showLearned && visibleCount === 0}
		<div class="mt-10 rounded-2xl border border-[var(--color-divider)] bg-[var(--color-paper-warm)] px-5 py-6 text-center">
			<p class="text-sm font-bold text-[var(--color-ink)]">Nice — you cleared this category.</p>
			{#if categoryAward}
				<div class="mx-auto mt-4 max-w-md rounded-2xl border border-[var(--color-divider)] bg-[var(--color-paper)] px-4 py-4 text-left" style="box-shadow: inset 0 0 0 1px color-mix(in srgb, {categoryAward.accent} 16%, transparent);">
					<div class="flex items-start justify-between gap-3">
						<div>
							<p class="text-[10px] font-bold tracking-[0.22em] uppercase" style="color: {categoryAward.accent};">Award unlocked · {categoryAward.titleJp}</p>
							<p class="mt-1 text-lg font-black text-[var(--color-ink)]">{categoryAward.title}</p>
						</div>
						<span class="flex h-10 w-10 items-center justify-center rounded-full text-xl" style="background: color-mix(in srgb, {categoryAward.accent} 12%, var(--color-paper)); color: {categoryAward.accent};">{categoryAward.icon}</span>
					</div>
					<p class="mt-2 text-sm leading-6 text-[var(--color-ink-light)]">{categoryAward.description}</p>
				</div>
			{/if}
			<p class="mt-3 text-xs text-[var(--color-ink-light)]">Turn on <span class="font-bold">show learned</span> if you want to review.</p>
		</div>
	{/if}

	<div class="mt-8 pb-8 text-center">
		<span class="text-xs text-[var(--color-ink-ghost)]">
			Click a character to study it · <kbd class="rounded border border-[var(--color-divider)] px-1.5 py-0.5 text-[10px]">←</kbd> <kbd class="rounded border border-[var(--color-divider)] px-1.5 py-0.5 text-[10px]">→</kbd> to navigate · <kbd class="rounded border border-[var(--color-divider)] px-1.5 py-0.5 text-[10px]">Space</kbd> to mark learned
		</span>
	</div>
</div>
