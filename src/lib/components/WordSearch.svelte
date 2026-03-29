<script lang="ts">
	import { getAuthState, addVocabItem } from '$lib/stores/auth.svelte';
	import type { CustomVocabItem } from '$lib/firebase';

	let auth = $derived(getAuthState());

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

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === '/' && document.activeElement !== searchInput) {
			e.preventDefault();
			searchInput?.focus();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="mx-auto w-full max-w-2xl">
	<!-- Search input -->
	<div class="search-glow relative rounded-2xl border border-[var(--color-divider)] px-5 py-4 transition-all duration-300" style="background: var(--card-bg);">
		<div class="flex items-center gap-3">
			<span class="text-2xl text-[var(--color-ink-ghost)]" style="font-family: var(--font-jp-brush);">探</span>
			<input
				bind:this={searchInput}
				type="text"
				bind:value={query}
				placeholder="Type English or Japanese to search..."
				class="flex-1 bg-transparent text-lg font-medium text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-ghost)]"
				autocomplete="off"
				spellcheck="false"
			/>
			{#if searching}
				<div class="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-ink-ghost)] border-t-[var(--color-ink)]"></div>
			{:else if query}
				<button
					onclick={() => { query = ''; results = []; searchInput?.focus(); }}
					class="text-sm text-[var(--color-ink-ghost)] transition-colors hover:text-[var(--color-ink)] press-scale"
				>✕</button>
			{:else}
				<kbd class="hidden rounded border border-[var(--color-divider)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--color-ink-ghost)] md:inline">/</kbd>
			{/if}
		</div>
	</div>

	<!-- Results -->
	{#if results.length > 0}
		<div class="mt-3 space-y-2">
			{#each results as result, i (result.word + result.meaning)}
				<div
					class="drift-card animate-spring-in group relative overflow-hidden rounded-xl px-5 py-4 transition-all duration-200 hover:border-[var(--color-ai)]"
					style="animation-delay: {i * 60}ms;"
				>
					<div class="flex items-start justify-between gap-4">
						<div class="flex-1 min-w-0">
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
						</div>

						<!-- Save button -->
						{#if auth.user}
							{#if justSaved === result.word}
								<span class="animate-spring-in mt-1 text-sm font-bold text-[var(--color-matcha)]">✓ Saved</span>
							{:else}
								<button
									onclick={() => saveWord(result)}
									class="mt-1 rounded-lg border border-[var(--color-divider)] px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--color-ink)] transition-all duration-200 hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] press-scale"
								>
									+ Save
								</button>
							{/if}
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{:else if query.trim().length > 0 && !searching}
		<div class="mt-6 text-center animate-fade-in">
			<span class="text-5xl" style="font-family: var(--font-jp-brush);">🤷</span>
			<p class="mt-2 text-base text-[var(--color-ink-light)]">No results for "{query}"</p>
		</div>
	{/if}
</div>
