<script lang="ts">
	import { onMount } from 'svelte';
	import { getAuthState, addVocabItem } from '$lib/stores/auth.svelte';
	import type { CustomVocabItem } from '$lib/firebase';
	import { bind, unbind } from 'wanakana';

	let authState = $derived(getAuthState());
	let open = $state(false);
	let saving = $state(false);

	let word = $state('');
	let meaning = $state('');

	let wordInput: HTMLInputElement;

	// Bind wanakana to word input when form opens — romaji → kana live conversion
	$effect(() => {
		if (open && wordInput) {
			bind(wordInput);
			wordInput.focus();
			return () => unbind(wordInput);
		}
	});

	async function submit() {
		if (!word.trim() || !meaning.trim()) return;
		saving = true;

		const item: CustomVocabItem = {
			id: crypto.randomUUID(),
			character: word.trim(),
			romaji: '', // derived display — wanakana handles conversion
			meaning: meaning.trim(),
			createdAt: new Date().toISOString()
		};

		await addVocabItem(item);

		word = '';
		meaning = '';
		saving = false;
		open = false;
	}

	function cancel() {
		word = '';
		meaning = '';
		open = false;
	}
</script>

{#if authState.user}
	{#if !open}
		<button
			onclick={() => (open = true)}
			class="mt-2 flex w-full items-center justify-center gap-1 py-3 text-[11px] font-bold tracking-[0.15em] uppercase transition-opacity duration-200 hover:opacity-70"
			style="color: var(--color-ink-ghost);"
		>
			<span class="text-lg leading-none">+</span>
			<span>add word</span>
		</button>
	{:else}
		<div class="mt-2 px-1">
			<input
				bind:this={wordInput}
				type="text"
				bind:value={word}
				placeholder="type romaji → かな"
				class="mb-2 w-full border-b border-[var(--color-divider)] bg-transparent py-2 text-sm outline-none placeholder:text-[var(--color-ink-ghost)] focus:border-[var(--color-ink)]"
			/>
			<input
				type="text"
				bind:value={meaning}
				placeholder="meaning"
				class="mb-3 w-full border-b border-[var(--color-divider)] bg-transparent py-2 text-sm outline-none placeholder:text-[var(--color-ink-ghost)] focus:border-[var(--color-ink)]"
				onkeydown={(e) => e.key === 'Enter' && submit()}
			/>
			<div class="flex gap-2">
				<button
					onclick={submit}
					disabled={saving || !word.trim() || !meaning.trim()}
					class="flex-1 py-2 text-[11px] font-bold tracking-widest uppercase transition-opacity disabled:opacity-40"
					style="color: var(--color-ink);"
				>
					{saving ? 'saving…' : 'save'}
				</button>
				<button
					onclick={cancel}
					class="flex-1 py-2 text-[11px] font-bold tracking-widest uppercase text-[var(--color-ink-ghost)] transition-opacity hover:opacity-70"
				>
					cancel
				</button>
			</div>
		</div>
	{/if}
{/if}
