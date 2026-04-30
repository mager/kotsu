<script lang="ts">
	import { getAuthState, getCustomVocabItems, removeVocabItem } from '$lib/stores/auth.svelte';
	import type { CustomVocabItem } from '$lib/firebase';

	let auth = $derived(getAuthState());
	let words = $derived(getCustomVocabItems());
	let removing = $state<string | null>(null);
	let selectedWord = $state<CustomVocabItem | null>(null);

	function openWord(item: CustomVocabItem) {
		selectedWord = item;
	}

	function closeWord() {
		selectedWord = null;
	}

	async function handleRemove(item: CustomVocabItem) {
		removing = item.id;
		await removeVocabItem(item);
		if (selectedWord?.id === item.id) selectedWord = null;
		removing = null;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && selectedWord) {
			closeWord();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

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
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					onclick={() => openWord(item)}
					class="drift-card animate-spring-in group relative overflow-hidden rounded-xl px-4 py-5 text-left transition-all duration-200 hover:border-[var(--color-ai)] press-scale cursor-pointer {removing === item.id ? 'opacity-20 scale-95' : ''}"
					style="animation-delay: {i * 40}ms;"
					role="button"
					tabindex="0"
					aria-label="Open {item.character}"
				>
					<button
						onclick={(event) => {
							event.stopPropagation();
							handleRemove(item);
						}}
						class="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs text-[var(--color-ink-ghost)] opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-[var(--color-paper-deep)] hover:text-[var(--color-ink)] press-scale"
						aria-label="Remove {item.character}"
					>✕</button>

					<div
						class="text-center font-black leading-none"
						style="font-family: var(--font-jp-brush); font-size: {item.character.length <= 2 ? 'clamp(2.4rem, 5vw, 3.2rem)' : item.character.length <= 4 ? 'clamp(1.6rem, 3.5vw, 2.4rem)' : 'clamp(1.3rem, 3vw, 1.8rem)'};"
					>
						{item.character}
					</div>

					{#if item.romaji}
						<div class="mt-2 text-center text-sm text-[var(--color-ink-light)]" style="font-family: var(--font-jp-brush);">
							{item.romaji}
						</div>
					{/if}

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

{#if selectedWord}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,18,16,0.55)] px-4 backdrop-blur-sm" onclick={closeWord} role="button" tabindex="-1" aria-label="Close word modal backdrop">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-[var(--color-divider)] bg-[var(--color-paper)] shadow-[0_32px_120px_rgba(18,18,18,0.24)]"
			onclick={(event) => event.stopPropagation()}
		>
			<div class="paper-grain pointer-events-none absolute inset-0 opacity-70"></div>
			<div class="relative flex min-h-[28rem] flex-col items-center justify-between px-6 py-6 md:px-10 md:py-8">
				<div class="flex w-full items-center justify-between">
					<span class="rounded-full border border-[var(--color-divider)] bg-[var(--color-paper-warm)] px-3 py-1 text-[10px] font-bold tracking-[0.22em] uppercase text-[var(--color-ink-light)]">
						Custom word
					</span>
					<button
						onclick={closeWord}
						class="flex h-9 w-9 items-center justify-center rounded-full text-sm text-[var(--color-ink-ghost)] transition-all hover:bg-[var(--color-paper-warm)] hover:text-[var(--color-ink)] press-scale"
						aria-label="Close word modal"
					>
						✕
					</button>
				</div>

				<div class="flex flex-1 flex-col items-center justify-center py-6 text-center md:py-10">
					<div
						class="font-black leading-none text-[var(--color-ink)]"
						style="font-family: var(--font-jp-brush); font-size: {selectedWord.character.length <= 2 ? 'clamp(5rem, 18vw, 10rem)' : selectedWord.character.length <= 4 ? 'clamp(3.5rem, 12vw, 7rem)' : 'clamp(2.6rem, 8vw, 4.8rem)'};"
					>
						{selectedWord.character}
					</div>

					{#if selectedWord.romaji}
						<div class="mt-4 text-xl font-black tracking-[0.18em] uppercase text-[var(--color-ink-light)] md:text-2xl" style="font-family: var(--font-jp-brush);">
							{selectedWord.romaji}
						</div>
					{/if}

					<div class="mt-4 max-w-xl text-balance text-base leading-relaxed text-[var(--color-ink-mid)] md:text-lg">
						{selectedWord.meaning}
					</div>
				</div>

				<div class="flex w-full items-center justify-between gap-3 border-t border-[var(--color-divider)] pt-4">
					<span class="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">tap outside or esc to close</span>
					<button
						onclick={() => handleRemove(selectedWord)}
						class="rounded-full border border-[var(--color-divider)] px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink)] transition-all hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] press-scale"
					>
						Remove word
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.paper-grain {
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
		background-repeat: repeat;
		background-size: 256px 256px;
	}

	@media (prefers-reduced-motion: reduce) {
		.paper-grain {
			display: none;
		}
	}
</style>
