<script lang="ts">
	import { columns } from '$lib/data';
	import ColumnCard from '$lib/components/ColumnCard.svelte';
	import CustomVocabCard from '$lib/components/CustomVocabCard.svelte';
	import AddVocabForm from '$lib/components/AddVocabForm.svelte';
	import { isLearned, getColumnProgress, getCustomVocabItems, getAuthState } from '$lib/stores/auth.svelte';

	let activeTab = $state(0);
	let customVocab = $derived(getCustomVocabItems());
	let authState = $derived(getAuthState());

	// All tabs including the custom "mine" column
	const MINE_TAB = columns.length;
</script>

<div class="px-4 pb-16 md:px-8">
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
		<!-- Mine tab -->
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
	<div class="md:hidden">
		{#if activeTab === MINE_TAB}
			<div class="flex flex-col gap-0">
				{#each customVocab as item, i (item.id)}
					<CustomVocabCard {item} delay={i * 30} />
				{/each}
				{#if customVocab.length === 0}
					<p class="py-8 text-center text-sm text-[var(--color-ink-ghost)]">no words yet</p>
				{/if}
			</div>
			<AddVocabForm />
		{:else}
			<div class="grid grid-cols-4 gap-0">
				{#each columns[activeTab].items as item, i (item.character + item.romaji)}
					<ColumnCard
						{item}
						columnId={columns[activeTab].id}
						index={i}
						delay={i * 30}
						learned={isLearned(columns[activeTab].id, i)}
					/>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Desktop: 6-Column Grid (5 standard + mine) -->
	<div class="mx-auto hidden max-w-[1600px] pt-2 md:block">
		<div class="grid" style="grid-template-columns: repeat({columns.length}, 1fr){authState.user ? ' 1fr' : ''};">
			{#each columns as col, colIndex}
				<div class="relative border-r border-[var(--color-divider)] px-4 lg:px-6">
					<!-- Column Header -->
					<div class="mb-6 text-center">
						<h2
							class="animate-fade-up font-black leading-none"
							style="font-family: var(--font-jp-brush); font-size: clamp(1.6rem, 2.2vw, 2.4rem); animation-delay: {colIndex * 100}ms;"
						>
							{col.titleJp}
						</h2>
						<span class="mt-1 block text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--color-ink-ghost)]">
							{col.hint}
						</span>
						{#if getColumnProgress(col.id, col.items.length) > 0}
							<span class="mt-1 block text-[9px] font-bold tracking-wide" style="color: var(--color-col-{col.id});">
								{getColumnProgress(col.id, col.items.length)}/{col.items.length}
							</span>
						{/if}
						<div class="mx-auto mt-2 h-[2px] w-8 rounded-full" style="background-color: var(--color-col-{col.id}); opacity: 0.3;"></div>
					</div>

					<!-- Cards -->
					<div class="no-scrollbar flex max-h-[calc(100vh-10rem)] flex-col gap-0 overflow-y-auto pb-20">
						{#each col.items as item, i (item.character + item.romaji)}
							<ColumnCard
								{item}
								columnId={col.id}
								index={i}
								delay={colIndex * 100 + i * 20}
								learned={isLearned(col.id, i)}
							/>
						{/each}
					</div>

					<!-- Fade out at bottom -->
					<div class="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-[var(--color-paper)] to-transparent"></div>
				</div>
			{/each}

			<!-- Mine column — only when signed in -->
			{#if authState.user}
				<div class="relative px-4 lg:px-6">
					<!-- Column Header -->
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

					<!-- Custom words + add form -->
					<div class="no-scrollbar flex max-h-[calc(100vh-10rem)] flex-col gap-0 overflow-y-auto pb-20">
						{#each customVocab as item, i (item.id)}
							<CustomVocabCard {item} delay={500 + i * 20} />
						{/each}
						{#if customVocab.length === 0}
							<p class="py-6 text-center text-[11px] text-[var(--color-ink-ghost)]">no words yet</p>
						{/if}
						<AddVocabForm />
					</div>

					<!-- Fade out at bottom -->
					<div class="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-[var(--color-paper)] to-transparent"></div>
				</div>
			{/if}
		</div>
	</div>
</div>
