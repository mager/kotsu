<script lang="ts">
	import { columns } from '$lib/data';
	import ColumnCard from '$lib/components/ColumnCard.svelte';

	let activeTab = $state(0);
</script>

<div class="mx-auto max-w-[1600px] px-4 py-10 md:px-8 md:py-16">
	<!-- Header -->
	<header class="mb-16 text-center">
		<h1 class="text-8xl font-black leading-none tracking-tight md:text-[10rem]">コツ</h1>
		<p class="mt-4 text-sm font-bold tracking-[0.3em] uppercase text-[var(--color-ink-light)] md:text-base">
			The Knack of Japanese
		</p>
	</header>

	<!-- Mobile Tab Navigation -->
	<nav class="no-scrollbar mb-8 flex gap-0 overflow-x-auto md:hidden">
		{#each columns as col, i}
			<button
				class="shrink-0 cursor-pointer px-5 py-3 text-center transition-all {activeTab === i
					? 'text-[var(--color-ink)]'
					: 'text-[var(--color-ink-light)]'}"
				onclick={() => (activeTab = i)}
			>
				<span class="block text-2xl font-black">{col.titleJp}</span>
			</button>
		{/each}
	</nav>

	<!-- Mobile: Single Column View -->
	<div class="md:hidden">
		<div class="grid grid-cols-3 gap-1 sm:grid-cols-4">
			{#each columns[activeTab].items as item, i (item.character + item.romaji)}
				<ColumnCard {item} columnId={columns[activeTab].id} index={i} />
			{/each}
		</div>
	</div>

	<!-- Desktop: 5-Column Grid -->
	<div class="hidden md:grid md:grid-cols-5 md:gap-8 lg:gap-12">
		{#each columns as col}
			<div>
				<!-- Column Header -->
				<div class="mb-6 text-center">
					<h2 class="font-black leading-none" style="font-family: var(--font-jp-serif); font-size: clamp(2rem, 3vw, 3rem);">{col.titleJp}</h2>
					<span class="mt-1 block text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-ink-light)]">
						{col.title}
					</span>
					<div class="mx-auto mt-3 h-[2px] w-8 bg-[var(--color-ink)]"></div>
				</div>

				<!-- Cards -->
				<div class="no-scrollbar flex max-h-[calc(100vh-14rem)] flex-col gap-0 overflow-y-auto">
					{#each col.items as item, i (item.character + item.romaji)}
						<ColumnCard {item} columnId={col.id} index={i} />
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
