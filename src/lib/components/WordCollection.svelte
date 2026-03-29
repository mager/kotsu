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
		<div class="mb-5 flex items-baseline justify-between">
			<div class="flex items-baseline gap-3">
				<h2 class="text-2xl font-black" style="font-family: var(--font-jp-brush);">私の言葉</h2>
				<span class="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">
					{words.length} {words.length === 1 ? 'word' : 'words'}
				</span>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
			{#each words as item, i (item.id)}
				<div
					class="drift-card animate-spring-in group relative overflow-hidden rounded-xl px-4 py-5 transition-all duration-200 hover:border-[var(--color-ai)] {removing === item.id ? 'opacity-20 scale-95' : ''}"
					style="animation-delay: {i * 40}ms;"
				>
					<!-- Remove button -->
					<button
						onclick={() => handleRemove(item)}
						class="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs text-[var(--color-ink-ghost)] opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-[var(--color-paper-deep)] hover:text-[var(--color-ink)] press-scale"
						aria-label="Remove {item.character}"
					>✕</button>

					<!-- Character -->
					<div
						class="text-center font-black leading-none"
						style="font-family: var(--font-jp-brush); font-size: {item.character.length <= 2 ? 'clamp(2.4rem, 5vw, 3.2rem)' : item.character.length <= 4 ? 'clamp(1.6rem, 3.5vw, 2.4rem)' : 'clamp(1.3rem, 3vw, 1.8rem)'};"
					>
						{item.character}
					</div>

					<!-- Reading -->
					{#if item.romaji}
						<div class="mt-2 text-center text-sm text-[var(--color-ink-light)]" style="font-family: var(--font-jp-brush);">
							{item.romaji}
						</div>
					{/if}

					<!-- Meaning -->
					<div class="mt-0.5 text-center text-xs text-[var(--color-ink-ghost)] truncate">
						{item.meaning}
					</div>
				</div>
			{/each}
		</div>
	</div>
{:else if auth.user}
	<div class="mt-12 animate-fade-in">
		<div class="rounded-2xl border border-dashed border-[var(--color-divider)] px-8 py-12 text-center">
			<div
				class="mb-4 inline-block font-black leading-none"
				style="font-family: var(--font-jp-brush); font-size: 4rem; color: var(--color-ink-ghost);"
			>
				言
			</div>
			<p class="text-sm font-bold tracking-[0.15em] uppercase text-[var(--color-ink-ghost)]">
				No words saved yet
			</p>
			<p class="mt-2 text-sm text-[var(--color-ink-light)] max-w-xs mx-auto leading-relaxed">
				Search above and tap <span class="font-bold text-[var(--color-ink-mid)]">Save</span> to build your personal vocabulary list.
			</p>
		</div>
	</div>
{:else if !auth.loading && !auth.user}
	<div class="mt-12 animate-fade-in">
		<div class="rounded-2xl border border-dashed border-[var(--color-divider)] px-8 py-12 text-center">
			<p class="text-sm font-bold tracking-[0.15em] uppercase text-[var(--color-ink-ghost)]">
				Sign in to save words
			</p>
			<p class="mt-2 text-sm text-[var(--color-ink-light)] max-w-xs mx-auto leading-relaxed">
				Your vocabulary list syncs across devices when you're signed in.
			</p>
		</div>
	</div>
{/if}
