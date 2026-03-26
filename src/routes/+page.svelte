<script lang="ts">
	import { goto } from '$app/navigation';
	import { columns, getColumnItems } from '$lib/data';
	import ColumnCard from '$lib/components/ColumnCard.svelte';
	import CustomVocabCard from '$lib/components/CustomVocabCard.svelte';
	import AddVocabForm from '$lib/components/AddVocabForm.svelte';
	import LearnedShelf from '$lib/components/LearnedShelf.svelte';
	import KeyboardShortcuts from '$lib/components/KeyboardShortcuts.svelte';
	import { isLearned, getColumnProgress, getCustomVocabItems, getAuthState } from '$lib/stores/auth.svelte';

	let activeTab = $state(0);
	let addFormOpen = $state(false);
	let showShortcuts = $state(false);
	let customVocab = $derived(getCustomVocabItems());
	let authState = $derived(getAuthState());

	// All tabs including the custom "mine" column
	const MINE_TAB = columns.length;

	function openAddWord() {
		activeTab = MINE_TAB;
		setTimeout(() => (addFormOpen = true), 50);
	}

	// Find first unlearned character in active column
	function openFirstUnlearned() {
		if (activeTab >= columns.length) return;
		const col = columns[activeTab];
		const items = getColumnItems(col);
		for (let i = 0; i < items.length; i++) {
			if (!isLearned(col.id, i)) {
				goto(`/${col.id}/${i}`);
				return;
			}
		}
		// All learned — go to first
		if (items.length > 0) goto(`/${col.id}/0`);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

		// If shortcuts overlay is open, close on any key
		if (showShortcuts) {
			showShortcuts = false;
			e.preventDefault();
			return;
		}

		const totalTabs = authState.user ? columns.length + 1 : columns.length;

		switch (e.key) {
			case '?':
				e.preventDefault();
				showShortcuts = true;
				break;
			case '1': case '2': case '3': case '4': case '5':
				const colNum = parseInt(e.key) - 1;
				if (colNum < columns.length) activeTab = colNum;
				break;
			case 'ArrowRight':
			case 'l':
				if (activeTab < totalTabs - 1) activeTab++;
				break;
			case 'ArrowLeft':
			case 'h':
				if (activeTab > 0) activeTab--;
				break;
			case 'Enter':
				e.preventDefault();
				openFirstUnlearned();
				break;
		}
	}

	// Swipe handling
	let touchStartX = 0;

	function onTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
	}

	function onTouchEnd(e: TouchEvent) {
		const delta = e.changedTouches[0].clientX - touchStartX;
		const totalTabs = authState.user ? columns.length + 1 : columns.length;
		if (Math.abs(delta) < 50) return;
		if (delta < 0 && activeTab < totalTabs - 1) activeTab++;
		if (delta > 0 && activeTab > 0) activeTab--;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<KeyboardShortcuts show={showShortcuts} onclose={() => (showShortcuts = false)} />

<!-- Learned Shelf -->
{#if authState.user}
	<LearnedShelf />
{/if}

<div class="px-4 pb-16 md:px-8">
	<!-- Floating "Add Word" button -->
	{#if authState.user && !addFormOpen}
		<button
			onclick={openAddWord}
			class="fixed bottom-6 right-5 z-50 flex items-center gap-2 rounded-full px-5 py-3 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 md:bottom-10 md:right-10"
			style="background: var(--color-ink); color: var(--color-paper);"
			title="Add a word"
		>
			<span class="text-xl font-black leading-none">+</span>
			<span class="text-[11px] font-bold tracking-[0.2em] uppercase">Add Word</span>
		</button>
	{/if}

	<!-- Mobile Tab Navigation -->
	<nav class="no-scrollbar mb-4 flex justify-center gap-2 overflow-x-auto pt-2 md:hidden">
		{#each columns as col, i}
			<button
				class="shrink-0 cursor-pointer px-4 py-2 text-center transition-all duration-200 {activeTab === i
					? 'text-[var(--color-ink)] scale-110'
					: 'text-[var(--color-ink-ghost)]'}"
				onclick={() => (activeTab = i)}
			>
				<span class="block text-xl font-black" style="font-family: var(--font-jp-brush);">{col.titleJp}</span>
			</button>
		{/each}
		{#if authState.user}
			<button
				class="shrink-0 cursor-pointer px-4 py-2 text-center transition-all duration-200 {activeTab === MINE_TAB
					? 'text-[var(--color-ink)] scale-110'
					: 'text-[var(--color-ink-ghost)]'}"
				onclick={() => (activeTab = MINE_TAB)}
			>
				<span class="block text-xl font-black" style="font-family: var(--font-jp-brush);">私</span>
			</button>
		{/if}
	</nav>

	<!-- Mobile: Single Column View -->
	<div class="md:hidden" ontouchstart={onTouchStart} ontouchend={onTouchEnd}>
		{#if activeTab === MINE_TAB}
			<div class="flex flex-col gap-0">
				{#each customVocab as item, i (item.id)}
					<CustomVocabCard {item} delay={i * 30} />
				{/each}
				{#if customVocab.length === 0 && !addFormOpen}
					<p class="py-8 text-center text-sm text-[var(--color-ink-ghost)]">no words yet</p>
				{/if}
			</div>
			<AddVocabForm bind:open={addFormOpen} />
		{:else}
			{@const col = columns[activeTab]}
			{@const items = getColumnItems(col)}
			{#each col.sections as section, sIdx}
				{#if col.sections.length > 1}
					<div class="mb-2 mt-6 text-center first:mt-2">
						<span class="text-[10px] font-bold tracking-[0.25em] uppercase" style="color: var(--color-col-{col.id});">
							{section.titleJp} · {section.title}
						</span>
					</div>
				{/if}
				{@const offset = col.sections.slice(0, sIdx).reduce((sum, s) => sum + s.items.length, 0)}
				<div class="grid grid-cols-4 gap-0">
					{#each section.items as item, i (item.character + item.romaji)}
						<ColumnCard
							{item}
							columnId={col.id}
							index={offset + i}
							delay={(offset + i) * 20}
							learned={isLearned(col.id, offset + i)}
						/>
					{/each}
				</div>
			{/each}
		{/if}
	</div>

	<!-- Desktop: Multi-Column Grid -->
	<div class="mx-auto hidden max-w-[1600px] pt-2 md:block">
		<div class="grid" style="grid-template-columns: repeat({columns.length}, 1fr){authState.user ? ' 1fr' : ''};">
			{#each columns as col, colIndex}
				{@const items = getColumnItems(col)}
				<div class="relative border-r border-[var(--color-divider)] px-4 lg:px-6">
					<!-- Column Header -->
					<div class="mb-6 text-center">
						<h2
							class="animate-fade-up font-black leading-none"
							style="font-family: var(--font-jp-brush); font-size: clamp(1.6rem, 2.2vw, 2.4rem); animation-delay: {colIndex * 80}ms;"
						>
							{col.titleJp}
						</h2>
						<span class="mt-1 block text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--color-ink-ghost)]">
							{col.hint}
						</span>
						{#if getColumnProgress(col.id, items.length) > 0}
							<span class="mt-1 block text-[9px] font-bold tracking-wide" style="color: var(--color-col-{col.id});">
								{getColumnProgress(col.id, items.length)}/{items.length}
							</span>
						{/if}
						<div class="mx-auto mt-2 h-[2px] w-8 rounded-full" style="background-color: var(--color-col-{col.id}); opacity: 0.3;"></div>
					</div>

					<!-- Cards with Sections -->
					<div class="no-scrollbar flex max-h-[calc(100vh-10rem)] flex-col gap-0 overflow-y-auto pb-20">
						{#each col.sections as section, sIdx}
							{#if col.sections.length > 1}
								<div class="mb-1 mt-4 text-center first:mt-0">
									<span class="text-[9px] font-bold tracking-[0.2em] uppercase" style="color: var(--color-col-{col.id}); opacity: 0.6;">
										{section.titleJp}
									</span>
								</div>
							{/if}
							{@const offset = col.sections.slice(0, sIdx).reduce((sum, s) => sum + s.items.length, 0)}
							{#each section.items as item, i (item.character + item.romaji + section.id)}
								<ColumnCard
									{item}
									columnId={col.id}
									index={offset + i}
									delay={colIndex * 80 + (offset + i) * 15}
									learned={isLearned(col.id, offset + i)}
								/>
							{/each}
						{/each}
					</div>

					<!-- Fade out at bottom -->
					<div class="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-[var(--color-paper)] to-transparent"></div>
				</div>
			{/each}

			<!-- Mine column -->
			{#if authState.user}
				<div class="relative px-4 lg:px-6">
					<div class="mb-6 text-center">
						<h2
							class="animate-fade-up font-black leading-none"
							style="font-family: var(--font-jp-brush); font-size: clamp(1.6rem, 2.2vw, 2.4rem); animation-delay: 500ms;"
						>
							私
						</h2>
						<span class="mt-1 block text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--color-ink-ghost)]">
							your words
						</span>
						{#if customVocab.length > 0}
							<span class="mt-1 block text-[9px] font-bold tracking-wide text-[var(--color-ink-ghost)]">
								{customVocab.length}
							</span>
						{/if}
						<div class="mx-auto mt-2 h-[2px] w-8 rounded-full bg-[var(--color-divider)]"></div>
					</div>

					<div class="no-scrollbar flex max-h-[calc(100vh-10rem)] flex-col gap-0 overflow-y-auto pb-20">
						{#each customVocab as item, i (item.id)}
							<CustomVocabCard {item} delay={500 + i * 20} />
						{/each}
						{#if customVocab.length === 0 && !addFormOpen}
							<p class="py-6 text-center text-[11px] text-[var(--color-ink-ghost)]">no words yet</p>
						{/if}
						<AddVocabForm bind:open={addFormOpen} />
					</div>

					<div class="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-[var(--color-paper)] to-transparent"></div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Keyboard hint -->
	<div class="pointer-events-none fixed bottom-4 left-4 z-40 hidden md:block">
		<button
			class="pointer-events-auto cursor-pointer text-sm font-bold text-[var(--color-ink-ghost)] transition-colors hover:text-[var(--color-ink)]"
			onclick={() => (showShortcuts = true)}
			title="Keyboard shortcuts"
		>
			?
		</button>
	</div>
</div>
