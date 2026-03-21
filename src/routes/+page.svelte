<script lang="ts">
	import { columns } from '$lib/data';
	import ColumnCard from '$lib/components/ColumnCard.svelte';
	import { isLearned, getColumnProgress } from '$lib/stores/auth.svelte';

	let activeTab = $state(0);
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
	</nav>

	<!-- Mobile: Single Column View -->
	<div class="md:hidden">
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
	</div>

	<!-- Desktop: 5-Column Grid with Vertical Dividers -->
	<div class="mx-auto hidden max-w-[1400px] pt-2 md:block">
		<div class="grid grid-cols-5">
			{#each columns as col, colIndex}
				<div class="relative {colIndex < columns.length - 1 ? 'border-r border-[var(--color-divider)]' : ''} px-4 lg:px-6">
					<!-- Column Header -->
					<div class="mb-6 text-center">
						<h2
							class="animate-fade-up font-black leading-none"
							style="font-family: var(--font-jp-brush); font-size: clamp(1.6rem, 2.2vw, 2.4rem); animation-delay: {colIndex * 100}ms;"
						>
							{col.titleJp}
						</h2>

						<!-- Column progress indicator -->
						{#if getColumnProgress(col.id, col.items.length) > 0}
							<span class="mt-1 block text-[9px] font-bold tracking-wide" style="color: var(--color-shu);">
								{getColumnProgress(col.id, col.items.length)}/{col.items.length}
							</span>
						{/if}

						<div class="mx-auto mt-2 h-px w-10 bg-[var(--color-divider)]"></div>
					</div>

					<!-- Cards -->
					<div class="no-scrollbar flex max-h-[calc(100vh-10rem)] flex-col gap-0 overflow-y-auto">
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
					<div class="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t from-[var(--color-paper)] to-transparent"></div>
				</div>
			{/each}
		</div>
	</div>
</div>
