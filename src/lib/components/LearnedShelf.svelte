<script lang="ts">
	import { columns, getColumnItems } from '$lib/data';
	import { isLearned } from '$lib/stores/auth.svelte';

	interface LearnedChar {
		character: string;
		columnId: string;
		index: number;
	}

	let learnedChars = $derived(() => {
		const chars: LearnedChar[] = [];
		for (const col of columns) {
			const items = getColumnItems(col);
			items.forEach((item, i) => {
				if (isLearned(col.id, i)) {
					chars.push({ character: item.character, columnId: col.id, index: i });
				}
			});
		}
		return chars;
	});

	let hasLearned = $derived(learnedChars().length > 0);
</script>

{#if hasLearned}
	<div class="border-b border-[var(--color-divider)] px-4 py-3 md:px-8">
		<div class="mx-auto max-w-[1600px]">
			<div class="mb-2 flex items-center gap-3">
				<span class="text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--color-ink-ghost)]">
					Learned
				</span>
				<span class="text-[9px] font-bold text-[var(--color-ink-light)]">
					{learnedChars().length}
				</span>
			</div>
			<div class="no-scrollbar flex flex-wrap gap-1 overflow-x-auto md:gap-1.5">
				{#each learnedChars() as char (char.columnId + char.index)}
					<a
						href="/{char.columnId}/{char.index}"
						class="group inline-flex h-8 w-8 items-center justify-center rounded-md transition-all duration-150 hover:scale-110 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] md:h-9 md:w-9"
						style="border-bottom: 2px solid var(--color-col-{char.columnId});"
					>
						<span
							class="text-sm font-black leading-none text-[var(--color-ink)] group-hover:text-[var(--color-paper)] md:text-base"
						>
							{char.character}
						</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
{/if}
