<script lang="ts">
	import { getAuthState, addVocabItem } from '$lib/stores/auth.svelte';
	import type { CustomVocabItem } from '$lib/firebase';

	let authState = $derived(getAuthState());
	let open = $state(false);
	let saving = $state(false);

	let word = $state('');
	let reading = $state('');
	let meaning = $state('');

	async function submit() {
		if (!word.trim() || !meaning.trim()) return;
		saving = true;

		const item: CustomVocabItem = {
			id: crypto.randomUUID(),
			character: word.trim(),
			romaji: reading.trim(),
			meaning: meaning.trim(),
			createdAt: new Date().toISOString()
		};

		await addVocabItem(item);

		word = '';
		reading = '';
		meaning = '';
		saving = false;
		open = false;
	}

	function cancel() {
		word = '';
		reading = '';
		meaning = '';
		open = false;
	}
</script>

{#if authState.user}
	{#if !open}
		<button
			onclick={() => (open = true)}
			class="mt-2 flex w-full items-center justify-center gap-1 py-3 text-[11px] font-bold tracking-[0.15em] uppercase transition-opacity duration-200 hover:opacity-70"
			style="color: var(--color-col-vocabulary);"
		>
			<span class="text-lg leading-none">+</span>
			<span>add word</span>
		</button>
	{:else}
		<div class="mt-2 px-1">
			<input
				type="text"
				bind:value={word}
				placeholder="word (e.g. 温泉 or onsen)"
				class="mb-2 w-full border-b border-[var(--color-divider)] bg-transparent py-2 text-sm outline-none placeholder:text-[var(--color-ink-ghost)] focus:border-[var(--color-col-vocabulary)]"
				autofocus
			/>
			<input
				type="text"
				bind:value={reading}
				placeholder="reading (e.g. onsen) — optional"
				class="mb-2 w-full border-b border-[var(--color-divider)] bg-transparent py-2 text-sm outline-none placeholder:text-[var(--color-ink-ghost)] focus:border-[var(--color-col-vocabulary)]"
			/>
			<input
				type="text"
				bind:value={meaning}
				placeholder="meaning (e.g. hot spring)"
				class="mb-3 w-full border-b border-[var(--color-divider)] bg-transparent py-2 text-sm outline-none placeholder:text-[var(--color-ink-ghost)] focus:border-[var(--color-col-vocabulary)]"
				onkeydown={(e) => e.key === 'Enter' && submit()}
			/>
			<div class="flex gap-2">
				<button
					onclick={submit}
					disabled={saving || !word.trim() || !meaning.trim()}
					class="flex-1 py-2 text-[11px] font-bold tracking-widest uppercase transition-opacity disabled:opacity-40"
					style="color: var(--color-col-vocabulary);"
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
