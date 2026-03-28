<script lang="ts">
	import { getAuthState, getCustomVocabItems, removeVocabItem } from '$lib/stores/auth.svelte';
	import type { CustomVocabItem } from '$lib/firebase';

	let auth = $derived(getAuthState());
	let words = $derived(getCustomVocabItems());
	let removing = $state<string | null>(null);

	async function handleRemove(item: CustomVocabItem) {
		removing = item.id;
		await removeVocabItem(item);
		removing = null;
	}
</script>

{#if words.length > 0}
	<div class="mt-8">
		<div class="mb-4 flex items-baseline justify-between">
			<div class="flex items-baseline gap-3">
				<h2 class="text-lg font-black" style="font-family: var(--font-jp-brush);">私の言葉</h2>
				<span class="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">
					{words.length} {words.length === 1 ? 'word' : 'words'}
				</span>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
			{#each words as item, i (item.id)}
				<div
					class="animate-spring-in group relative overflow-hidden rounded-xl border border-[var(--color-divider)] bg-white/30 px-4 py-4 transition-all duration-200 hover:border-[var(--color-ink-ghost)] hover:bg-white/50 {removing === item.id ? 'opacity-20 scale-95' : ''}"
					style="animation-delay: {i * 40}ms;"
				>
					<!-- Remove button -->
					<button
						onclick={() => handleRemove(item)}
						class="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-[var(--color-ink-ghost)] opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-[var(--color-paper-deep)] hover:text-[var(--color-ink)] press-scale"
						aria-label="Remove {item.character}"
					>✕</button>

					<!-- Character -->
					<div
						class="text-center font-black leading-none"
						style="font-family: var(--font-jp-brush); font-size: {item.character.length <= 2 ? 'clamp(1.8rem, 4vw, 2.4rem)' : item.character.length <= 4 ? 'clamp(1.3rem, 3vw, 1.8rem)' : 'clamp(1rem, 2.5vw, 1.4rem)'};"
					>
						{item.character}
					</div>

					<!-- Reading -->
					{#if item.romaji}
						<div class="mt-1.5 text-center text-[11px] text-[var(--color-ink-light)]" style="font-family: var(--font-jp-brush);">
							{item.romaji}
						</div>
					{/if}

					<!-- Meaning -->
					<div class="mt-0.5 text-center text-[10px] text-[var(--color-ink-ghost)] truncate">
						{item.meaning}
					</div>
				</div>
			{/each}
		</div>
	</div>
{:else if auth.user}
	<div class="mt-12 text-center animate-fade-in">
		<div class="inline-block text-5xl mb-3" style="font-family: var(--font-jp-brush);">
			言
		</div>
		<p class="text-sm text-[var(--color-ink-light)] max-w-xs mx-auto leading-relaxed">
			Search for words above and save them here.<br/>
			Build your vocabulary, one word at a time.
		</p>
	</div>
{/if}
