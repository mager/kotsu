<script lang="ts">
	import { columns } from '$lib/data';
	import ColumnCard from '$lib/components/ColumnCard.svelte';

	let activeTab = $state(0);
</script>

<div class="mx-auto max-w-[1600px] px-4 py-8 md:px-8 md:py-12">
	<!-- Header -->
	<header class="mb-12 text-center">
		<h1 class="text-7xl font-black leading-none tracking-tight md:text-9xl">コツ</h1>
		<p class="mt-3 text-lg font-bold tracking-widest uppercase text-[var(--color-ink-light)] md:text-xl">
			Kotsu — The Knack of Japanese
		</p>
		<div class="mx-auto mt-6 h-[3px] w-24 bg-[var(--color-ink)]"></div>
	</header>

	<!-- Mobile Tab Navigation -->
	<nav class="mb-6 flex gap-1 overflow-x-auto border-b-[3px] border-[var(--color-border)] md:hidden">
		{#each columns as col, i}
			<button
				class="shrink-0 cursor-pointer border-b-[3px] px-4 py-3 text-sm font-black tracking-wide transition-colors {activeTab === i
					? 'border-[var(--color-ink)] text-[var(--color-ink)]'
					: 'border-transparent text-[var(--color-ink-light)]'}"
				style="margin-bottom: -3px;"
				onclick={() => (activeTab = i)}
			>
				<span class="block text-lg">{col.titleJp}</span>
				<span class="block text-[10px] uppercase tracking-widest">{col.title}</span>
			</button>
		{/each}
	</nav>

	<!-- Mobile: Single Column View -->
	<div class="md:hidden">
		<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
			{#each columns[activeTab].items as item (item.character + item.romaji)}
				<ColumnCard {item} />
			{/each}
		</div>
	</div>

	<!-- Desktop: 5-Column Grid -->
	<div class="hidden md:grid md:grid-cols-5 md:gap-6">
		{#each columns as col}
			<div>
				<!-- Column Header -->
				<div class="sticky top-0 z-10 mb-4 border-b-[3px] border-[var(--color-border)] bg-[var(--color-paper)] pb-3">
					<h2 class="text-3xl font-black leading-none">{col.titleJp}</h2>
					<span class="mt-1 block text-xs font-bold tracking-widest uppercase text-[var(--color-ink-light)]">
						{col.title}
					</span>
				</div>

				<!-- Cards -->
				<div class="column-scroll flex max-h-[calc(100vh-16rem)] flex-col gap-3 overflow-y-auto pr-1">
					{#each col.items as item (item.character + item.romaji)}
						<ColumnCard {item} />
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
