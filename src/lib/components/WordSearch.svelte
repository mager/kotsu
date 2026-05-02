<script lang="ts">
	import { getAuthState, addVocabItem } from '$lib/stores/auth.svelte';
	import type { CustomVocabItem } from '$lib/firebase';

	interface Props {
		variant?: 'default' | 'header';
	}

	let { variant = 'default' }: Props = $props();
	let auth = $derived(getAuthState());
	let isHeader = $derived(variant === 'header');

	let query = $state('');
	let results = $state<any[]>([]);
	let searching = $state(false);
	let justSaved = $state<string | null>(null);
	let searchInput: HTMLInputElement;
	let lookupTimer: ReturnType<typeof setTimeout>;

	// Debounced Jisho search
	$effect(() => {
		const q = query.trim();
		clearTimeout(lookupTimer);
		results = [];
		if (!q || q.length < 1) return;
		lookupTimer = setTimeout(() => searchJisho(q), 400);
	});

	async function searchJisho(q: string) {
		searching = true;
		try {
			const res = await fetch(`/api/jisho?keyword=${encodeURIComponent(q)}`);
			const json = await res.json();
			results = (json.data || []).slice(0, 5).map((hit: any) => {
				const jp = hit.japanese?.[0] || {};
				const defs = hit.senses?.[0]?.english_definitions || [];
				return {
					word: jp.word || jp.reading || '',
					reading: jp.reading || '',
					meaning: defs.slice(0, 3).join(', '),
					partsOfSpeech: hit.senses?.[0]?.parts_of_speech?.[0] || '',
					isCommon: hit.is_common || false,
					jlpt: hit.jlpt?.[0] || ''
				};
			});
		} catch {
			results = [];
		} finally {
			searching = false;
		}
	}

	async function saveWord(result: any) {
		if (!auth.user) return;
		const item: CustomVocabItem = {
			id: crypto.randomUUID(),
			character: result.word,
			romaji: result.reading,
			meaning: result.meaning,
			createdAt: new Date().toISOString()
		};
		await addVocabItem(item);
		justSaved = result.word;
		setTimeout(() => {
			if (justSaved === result.word) justSaved = null;
		}, 2000);
	}

	function getLookupHref(result: any): string {
		return `/lookup/${encodeURIComponent(result.word || result.reading)}`;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === '/' && document.activeElement !== searchInput) {
			e.preventDefault();
			searchInput?.focus();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="lookup-search relative z-30 w-full min-w-0 {isHeader ? 'lookup-search-header' : 'mx-auto max-w-2xl'}">
	<!-- Search input -->
	<div class="search-glow relative border border-[var(--color-divider)] transition-all duration-300 {isHeader ? 'rounded-xl px-4 py-2.5 shadow-sm' : 'rounded-2xl px-5 py-4'}" style="background: {isHeader ? 'var(--color-paper)' : 'var(--card-bg)'};">
		<div class="flex items-center gap-3">
			<span class="shrink-0 {isHeader ? 'text-xl' : 'text-2xl'} text-[var(--color-ink-ghost)]" style="font-family: var(--font-jp-brush);">探</span>
			<input
				bind:this={searchInput}
				type="text"
				bind:value={query}
				placeholder={isHeader ? 'Search Japanese, romaji, English...' : 'Type English or Japanese to search...'}
				class="min-w-0 flex-1 bg-transparent font-medium text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-ghost)] {isHeader ? 'text-base md:text-lg' : 'text-lg'}"
				autocomplete="off"
				spellcheck="false"
			/>
			{#if searching}
				<div class="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-ink-ghost)] border-t-[var(--color-ink)]"></div>
			{:else if query}
				<button
					onclick={() => { query = ''; results = []; searchInput?.focus(); }}
					class="cursor-pointer text-sm text-[var(--color-ink-ghost)] transition-colors hover:text-[var(--color-ink)] press-scale"
				>✕</button>
			{:else}
				<kbd class="hidden rounded border border-[var(--color-divider)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--color-ink-ghost)] md:inline">/</kbd>
			{/if}
		</div>
	</div>

	<!-- Results -->
	{#if results.length > 0}
		<div class="{isHeader ? 'absolute top-[calc(100%+0.5rem)] right-0 left-0 max-h-[min(70dvh,32rem)] overflow-y-auto rounded-2xl border border-[var(--color-divider)] bg-[var(--color-paper)] p-2 shadow-2xl shadow-black/10' : 'mt-3 space-y-2'}">
			{#each results as result, i (result.word + result.meaning)}
				<article
					class="drift-card animate-spring-in group relative overflow-hidden rounded-xl transition-all duration-200 hover:border-[var(--color-ai)] {isHeader ? 'mb-2 last:mb-0' : ''}"
					style="animation-delay: {i * 60}ms;"
				>
					<div class="flex items-start justify-between gap-4">
						<a
							href={getLookupHref(result)}
							class="block min-w-0 flex-1 text-inherit no-underline {isHeader ? 'px-4 py-3' : 'px-5 py-4'}"
						>
							<!-- Word -->
							<div class="flex items-baseline gap-3">
								<span
									class="text-4xl font-black leading-none md:text-5xl"
									style="font-family: var(--font-jp-brush);"
								>{result.word}</span>
								{#if result.reading && result.reading !== result.word}
									<span class="text-lg text-[var(--color-ink-light)]" style="font-family: var(--font-jp-brush);">
										{result.reading}
									</span>
								{/if}
							</div>

							<!-- Meaning -->
							<p class="mt-2 text-base text-[var(--color-ink-mid)]">{result.meaning}</p>

							<!-- Tags -->
							<div class="mt-2.5 flex flex-wrap gap-1.5">
								{#if result.isCommon}
									<span class="rounded-full bg-[var(--color-matcha)] px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-white">
										common
									</span>
								{/if}
								{#if result.jlpt}
									<span class="rounded-full border border-[var(--color-divider)] px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-[var(--color-ink-light)]">
										{result.jlpt.replace('jlpt-', 'JLPT ')}
									</span>
								{/if}
								{#if result.partsOfSpeech}
									<span class="rounded-full border border-[var(--color-divider)] px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-[var(--color-ink-light)]">
										{result.partsOfSpeech}
									</span>
								{/if}
							</div>
						</a>

						<!-- Save button -->
						{#if auth.user}
							{#if justSaved === result.word}
								<span class="animate-spring-in mt-4 mr-4 shrink-0 text-sm font-bold text-[var(--color-matcha)]">✓ Saved</span>
							{:else}
								<button
									onclick={() => saveWord(result)}
									class="mt-4 mr-4 shrink-0 cursor-pointer rounded-lg border border-[var(--color-divider)] px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--color-ink)] transition-all duration-200 hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] press-scale"
								>
									+ Save
								</button>
							{/if}
						{/if}
					</div>
				</article>
			{/each}
		</div>
	{:else if query.trim().length > 0 && !searching}
		<div class="{isHeader ? 'absolute top-[calc(100%+0.5rem)] right-0 left-0 rounded-xl border border-[var(--color-divider)] bg-[var(--color-paper)] px-4 py-3 text-left shadow-xl shadow-black/10' : 'mt-6 text-center'} animate-fade-in">
			{#if !isHeader}
				<span class="text-5xl" style="font-family: var(--font-jp-brush);">?</span>
			{/if}
			<p class="{isHeader ? 'text-sm' : 'mt-2 text-base'} text-[var(--color-ink-light)]">No results for "{query}"</p>
		</div>
	{/if}
</div>
