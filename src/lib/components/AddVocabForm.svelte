<script lang="ts">
	import { getAuthState, addVocabItem } from '$lib/stores/auth.svelte';
	import type { CustomVocabItem } from '$lib/firebase';
	import { bind, unbind, isKana } from 'wanakana';

	let authState = $derived(getAuthState());
	let open = $state(false);
	let saving = $state(false);
	let looking = $state(false);

	let word = $state('');
	let reading = $state('');
	let meaning = $state('');

	let wordInput: HTMLInputElement;
	let lookupTimer: ReturnType<typeof setTimeout>;

	// Bind wanakana to word input when form opens
	$effect(() => {
		if (open && wordInput) {
			bind(wordInput);
			wordInput.focus();
			return () => unbind(wordInput);
		}
	});

	// Debounced Jisho lookup whenever word changes
	$effect(() => {
		const q = word.trim();
		clearTimeout(lookupTimer);
		if (!q || q.length < 1) return;

		lookupTimer = setTimeout(() => lookupJisho(q), 500);
	});

	async function lookupJisho(query: string) {
		looking = true;
		try {
			const res = await fetch(`/api/jisho?keyword=${encodeURIComponent(query)}`);
			const json = await res.json();
			const hit = json.data?.[0];
			if (!hit) return;

			const jp = hit.japanese?.[0];
			const defs = hit.senses?.[0]?.english_definitions ?? [];

			// Auto-fill kanji form if we have it (e.g. 温泉 from おんせん)
			if (jp?.word && jp.word !== query) {
				word = jp.word;
			}
			if (jp?.reading) reading = jp.reading;
			if (defs.length) meaning = defs.slice(0, 2).join(', ');
		} catch {
			// silent fail — user can type meaning manually
		} finally {
			looking = false;
		}
	}

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
			style="color: var(--color-ink-ghost);"
		>
			<span class="text-lg leading-none">+</span>
			<span>add word</span>
		</button>
	{:else}
		<div class="mt-2 px-1">
			<!-- Word field — romaji converts to kana, Jisho upgrades to kanji -->
			<div class="relative mb-2">
				<input
					bind:this={wordInput}
					type="text"
					bind:value={word}
					placeholder="type romaji → かな"
					class="w-full border-b border-[var(--color-divider)] bg-transparent py-2 pr-5 text-sm outline-none placeholder:text-[var(--color-ink-ghost)] focus:border-[var(--color-ink)]"
				/>
				{#if looking}
					<span class="absolute top-2 right-0 text-[10px] text-[var(--color-ink-ghost)] animate-pulse">…</span>
				{/if}
			</div>

			<!-- Reading — auto-filled by Jisho, editable -->
			{#if reading}
				<input
					type="text"
					bind:value={reading}
					placeholder="reading"
					class="mb-2 w-full border-b border-[var(--color-divider)] bg-transparent py-2 text-xs text-[var(--color-ink-mid)] outline-none placeholder:text-[var(--color-ink-ghost)] focus:border-[var(--color-ink)]"
				/>
			{/if}

			<!-- Meaning — auto-filled by Jisho, editable -->
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
