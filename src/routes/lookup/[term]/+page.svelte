<script lang="ts">
	import { addVocabItem } from '$lib/stores/auth.svelte';
	import { getAuthState } from '$lib/stores/auth.svelte';
	import type { CustomVocabItem } from '$lib/firebase';
	import type { PageData } from './$types';
	import { toRomaji } from 'wanakana';

	let { data }: { data: PageData } = $props();
	let auth = $derived(getAuthState());
	let justSaved = $state(false);
	let primaryMeaning = $derived(data.result?.meanings.slice(0, 3).join(', ') ?? '');
	let jishoHref = $derived(
		`https://jisho.org/search/${encodeURIComponent(data.result?.word ?? data.term)}`
	);
	let kanshudoHref = $derived(
		`https://www.kanshudo.com/search?q=${encodeURIComponent(data.result?.word ?? data.term)}`
	);
	let forvoHref = $derived(
		`https://forvo.com/search/${encodeURIComponent(data.result?.word ?? data.term)}/ja/`
	);

	async function saveWord() {
		if (!auth.user || !data.result) return;
		const item: CustomVocabItem = {
			id: crypto.randomUUID(),
			character: data.result.word,
			romaji: data.result.reading,
			meaning: primaryMeaning,
			createdAt: new Date().toISOString()
		};
		await addVocabItem(item);
		justSaved = true;
		setTimeout(() => (justSaved = false), 1800);
	}
</script>

<div class="lookup-page px-4 py-8 md:px-8 md:py-12">
	<div class="mx-auto max-w-5xl">
		<a href="/" class="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.22em] uppercase text-[var(--color-ink-ghost)] transition-colors hover:text-[var(--color-ink)]">
			<span aria-hidden="true">←</span>
			<span>Lookup</span>
		</a>

		{#if data.result}
			<section class="mt-6 grid gap-8 border-b border-[var(--color-divider)] pb-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
				<div>
					<div class="mb-4 flex flex-wrap items-center gap-2">
						<span class="rounded-full border border-[var(--color-divider)] px-3 py-1 text-[10px] font-black tracking-[0.18em] uppercase text-[var(--color-ink-light)]">辞書</span>
						{#if data.result.isCommon}
							<span class="rounded-full bg-[var(--color-matcha)] px-3 py-1 text-[10px] font-black tracking-[0.18em] uppercase text-white">common</span>
						{/if}
						{#if data.result.jlpt}
							<span class="rounded-full border border-[var(--color-divider)] px-3 py-1 text-[10px] font-black tracking-[0.18em] uppercase text-[var(--color-ink-light)]">{data.result.jlpt}</span>
						{/if}
					</div>

					<h1 class="text-[clamp(5rem,18vw,13rem)] font-black leading-none text-[var(--color-ink)]" style="font-family: var(--font-jp-brush);">
						{data.result.word}
					</h1>
					{#if data.result.reading && data.result.reading !== data.result.word}
						<p class="mt-2 text-3xl font-black text-[var(--color-ink-mid)] md:text-5xl" style="font-family: var(--font-jp-brush);">
							{data.result.reading}
						</p>
						<p class="mt-1 text-xs font-bold tracking-[0.14em] text-[var(--color-ink-ghost)]">
							{toRomaji(data.result.reading)}
						</p>
					{/if}
					<p class="mt-5 max-w-3xl text-2xl font-black leading-tight text-[var(--color-ink)] md:text-4xl">
						{primaryMeaning}
					</p>
				</div>

				<div class="lookup-actions">
					<a href={jishoHref} target="_blank" rel="noopener noreferrer" class="lookup-action">
						<span>Jisho</span>
						<span aria-hidden="true">↗</span>
					</a>
					<a href={kanshudoHref} target="_blank" rel="noopener noreferrer" class="lookup-action">
						<span>Kanshudo</span>
						<span aria-hidden="true">↗</span>
					</a>
					<a href={forvoHref} target="_blank" rel="noopener noreferrer" class="lookup-action">
						<span>Forvo</span>
						<span aria-hidden="true">↗</span>
					</a>
					{#if auth.user}
						<button onclick={saveWord} class="lookup-action">
							<span>{justSaved ? 'Saved' : 'Save word'}</span>
							<span aria-hidden="true">{justSaved ? '✓' : '+'}</span>
						</button>
					{/if}
				</div>
			</section>

			<section class="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
				<div class="lookup-panel">
					<span class="panel-label">Meanings</span>
					<div class="mt-4 space-y-4">
						{#each data.result.senses as sense, senseIndex}
							<div class="border-b border-[var(--color-divider)] pb-4 last:border-b-0 last:pb-0">
								<div class="flex items-baseline gap-3">
									<span class="text-[10px] font-black tracking-[0.18em] uppercase text-[var(--color-ink-ghost)]">{senseIndex + 1}</span>
									<p class="text-lg font-black leading-snug text-[var(--color-ink)]">
										{sense.meanings.join(', ')}
									</p>
								</div>
								{#if sense.partsOfSpeech.length > 0}
									<div class="mt-2 flex flex-wrap gap-1.5 pl-6">
										{#each sense.partsOfSpeech as part}
											<span class="rounded-full border border-[var(--color-divider)] px-2.5 py-0.5 text-[9px] font-black tracking-[0.16em] uppercase text-[var(--color-ink-light)]">{part}</span>
										{/each}
									</div>
								{/if}
								{#if sense.info.length > 0}
									<p class="mt-2 pl-6 text-sm leading-6 text-[var(--color-ink-light)]">{sense.info.join(' ')}</p>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<div class="space-y-4">
					<div class="lookup-panel">
						<span class="panel-label">Grammar</span>
						<div class="mt-4 flex flex-wrap gap-2">
							{#each data.result.partsOfSpeech as part}
								<span class="rounded-full bg-[var(--color-paper-warm)] px-3 py-1 text-[10px] font-black tracking-[0.16em] uppercase text-[var(--color-ink-mid)]">{part}</span>
							{/each}
						</div>
					</div>

					{#if data.result.otherForms.length > 0}
						<div class="lookup-panel">
							<span class="panel-label">Also written</span>
							<div class="mt-4 flex flex-wrap gap-2">
								{#each data.result.otherForms as form}
									<a href="/lookup/{encodeURIComponent(form)}" class="form-link">{form}</a>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</section>

			{#if data.alternatives.length > 0}
				<section class="mt-8">
					<span class="panel-label">Nearby results</span>
					<div class="mt-3 grid gap-2 md:grid-cols-2">
						{#each data.alternatives as alternative}
							<a href="/lookup/{encodeURIComponent(alternative.word)}" class="nearby-link">
								<span class="text-2xl font-black" style="font-family: var(--font-jp-brush);">{alternative.word}</span>
								<span class="min-w-0 truncate text-sm font-bold text-[var(--color-ink-light)]">{alternative.meanings.slice(0, 2).join(', ')}</span>
							</a>
						{/each}
					</div>
				</section>
			{/if}
		{:else}
			<section class="mt-10 rounded-2xl border border-[var(--color-divider)] px-6 py-8 text-center">
				<span class="text-6xl" style="font-family: var(--font-jp-brush);">?</span>
				<h1 class="mt-4 text-2xl font-black text-[var(--color-ink)]">No lookup result</h1>
				<p class="mt-2 text-sm leading-6 text-[var(--color-ink-light)]">Try a different spelling, kana, kanji, or English gloss.</p>
			</section>
		{/if}
	</div>
</div>

<style>
	.lookup-actions {
		display: grid;
		gap: 0.65rem;
	}

	.lookup-action,
	.nearby-link,
	.form-link {
		text-decoration: none;
	}

	.lookup-action {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1px solid var(--color-divider);
		border-radius: 0.9rem;
		background: var(--color-paper-warm);
		padding: 0.9rem 1rem;
		color: var(--color-ink);
		font-size: 0.72rem;
		font-weight: 900;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		transition:
			transform 180ms var(--ease-out-expo),
			border-color 180ms ease,
			background 180ms ease;
	}

	.lookup-action:hover,
	.lookup-action:focus-visible {
		border-color: color-mix(in srgb, var(--color-asagi) 42%, var(--color-divider));
		background: color-mix(in srgb, var(--color-asagi) 7%, var(--color-paper));
		outline: none;
		transform: translateY(-1px);
	}

	.lookup-panel {
		border: 1px solid var(--color-divider);
		border-radius: 1rem;
		background: color-mix(in srgb, var(--color-ink) 2.5%, var(--color-paper));
		padding: 1rem;
	}

	.panel-label {
		color: var(--color-ink-ghost);
		font-size: 0.62rem;
		font-weight: 900;
		letter-spacing: 0.24em;
		line-height: 1;
		text-transform: uppercase;
	}

	.form-link {
		border: 1px solid var(--color-divider);
		border-radius: 9999px;
		padding: 0.45rem 0.7rem;
		color: var(--color-ink);
		font-family: var(--font-jp-brush);
		font-size: 1.15rem;
		font-weight: 900;
		line-height: 1;
		transition:
			transform 180ms var(--ease-out-expo),
			background 180ms ease;
	}

	.nearby-link {
		display: flex;
		align-items: center;
		gap: 1rem;
		border: 1px solid var(--color-divider);
		border-radius: 0.9rem;
		padding: 0.85rem 1rem;
		color: var(--color-ink);
		transition:
			transform 180ms var(--ease-out-expo),
			background 180ms ease,
			border-color 180ms ease;
	}

	.form-link:hover,
	.form-link:focus-visible,
	.nearby-link:hover,
	.nearby-link:focus-visible {
		border-color: color-mix(in srgb, var(--color-asagi) 36%, var(--color-divider));
		background: color-mix(in srgb, var(--color-asagi) 6%, var(--color-paper));
		outline: none;
		transform: translateY(-1px);
	}

	@media (prefers-reduced-motion: reduce) {
		.lookup-action,
		.form-link,
		.nearby-link {
			transition: none;
		}

		.lookup-action:hover,
		.form-link:hover,
		.nearby-link:hover {
			transform: none;
		}
	}
</style>
