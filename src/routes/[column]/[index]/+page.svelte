<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { getAuthState, isLearned, setLearnedStatus } from '$lib/stores/auth.svelte';
	import { getColumnItems } from '$lib/data';
	import { getColumnAward, type Award } from '$lib/awards';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let showDetails = $state(false);
	let auth = $derived(getAuthState());
	let justLearned = $state(false);
	let unlockedAward = $state<Award | null>(null);

	let learnedKey = $derived(`${data.column.id}_${data.index}`);
	let learned = $derived(isLearned(data.column.id, data.index));
	let columnItems = $derived(getColumnItems(data.column));
	let mouseX = $state(0);
	let mouseY = $state(0);
	let charOffsetX = $derived((mouseX - 0.5) * 12);
	let charOffsetY = $derived((mouseY - 0.5) * 8);

	let visiblePrevIndex = $derived(data.prevIndex);
	let visibleNextIndex = $derived(data.nextIndex);

	function getNextUnlearnedIndex(): number | null {
		for (let i = data.index + 1; i < columnItems.length; i++) {
			if (!isLearned(data.column.id, i)) return i;
		}
		return data.nextIndex;
	}

	$effect(() => {
		const _idx = data.index;
		showDetails = false;
		justLearned = false;
		unlockedAward = null;
		const t = setTimeout(() => (showDetails = true), 200);
		return () => clearTimeout(t);
	});

	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX / window.innerWidth;
		mouseY = e.clientY / window.innerHeight;
	}

	async function toggleLearned() {
		const previousValue = learned;
		const newValue = !previousValue;
		const willCompleteColumn = newValue && columnItems.every((_, index) => index === data.index || isLearned(data.column.id, index));

		try {
			if (newValue) {
				justLearned = true;
				unlockedAward = willCompleteColumn ? getColumnAward(data.column.id) : null;
			}

			await setLearnedStatus(data.column.id, data.index, newValue);

			if (newValue) {
				setTimeout(() => {
					justLearned = false;
					const nextIdx = getNextUnlearnedIndex();
					if (nextIdx !== null) {
						showDetails = false;
						goto(`/${data.column.id}/${nextIdx}`);
					}
				}, unlockedAward ? 1100 : 600);
			}
		} catch (error) {
			justLearned = false;
			unlockedAward = null;
			await setLearnedStatus(data.column.id, data.index, previousValue);
			console.error('Failed to update learned state', error);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

		switch (e.key) {
			case 'Escape':
				goto('/');
				break;
			case 'ArrowRight':
			case 'l':
				if (visibleNextIndex !== null) {
					showDetails = false;
					goto(`/${data.column.id}/${visibleNextIndex}`);
				}
				break;
			case 'ArrowLeft':
			case 'h':
				if (visiblePrevIndex !== null) {
					showDetails = false;
					goto(`/${data.column.id}/${visiblePrevIndex}`);
				}
				break;
			case ' ':
				e.preventDefault();
				toggleLearned();
				break;
		}
	}

	let isKana = $derived(data.column.id === 'hiragana' || data.column.id === 'katakana');
	let isKanji = $derived(data.column.id === 'kanji');
	let charCount = $derived(data.item.character.length);
	let charFontSize = $derived(
		isKanji
			? 'clamp(7rem, 24vw, 15rem)'
			: charCount === 1
			? 'clamp(9rem, 34vw, 22rem)'
			: charCount === 2
				? 'clamp(5rem, 22vw, 14rem)'
				: charCount <= 4
					? 'clamp(3.2rem, 15vw, 9rem)'
					: 'clamp(2.2rem, 10vw, 6.5rem)'
	);
	let recipeCards = $derived(data.item.recipes ?? []);
	let noteTags = $derived(data.item.tags ?? []);
	let variants = $derived(data.item.variants ?? []);
	let practicePrompts = $derived(getPracticePrompts());
	let connectionNotes = $derived(getConnectionNotes());
	let progressPercent = $derived(((data.index + 1) / data.totalItems) * 100);

	let touchStartX = 0;

	function onTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
	}

	function onTouchEnd(e: TouchEvent) {
		const delta = e.changedTouches[0].clientX - touchStartX;
		if (Math.abs(delta) < 50) return;
		if (delta < 0 && visibleNextIndex !== null) {
			showDetails = false;
			goto(`/${data.column.id}/${visibleNextIndex}`);
		} else if (delta > 0 && visiblePrevIndex !== null) {
			showDetails = false;
			goto(`/${data.column.id}/${visiblePrevIndex}`);
		}
	}

	function getPracticePrompts(): string[] {
		if (data.column.id === 'hiragana' || data.column.id === 'katakana') {
			return [
				'Hide the romaji and say the sound before checking yourself.',
				data.item.pair
					? `Flip to ${data.item.pair} and confirm you can match the twin script instantly.`
					: 'Scan nearby rows and spot the siblings that share the same mouth shape.',
				'Use it inside a short borrowed word or kana chunk instead of naming letters one by one.'
			];
		}

		if (data.column.id === 'radicals') {
			return [
				'Name the meaning first, then the radical name.',
				'Spot where this shape compresses or shifts when it joins a full kanji.',
				'Recall one kanji recipe that becomes easier once this piece is familiar.'
			];
		}

		if (data.column.id === 'kanji') {
			return [
				'Say meaning → kun reading → on reading in that order.',
				'Look for the radical clue before you look at the English gloss.',
				'Put the kanji into a tiny word or compound you could meet again tomorrow.'
			];
		}

		return [
			'Read the whole word as one sound shape, not as separate kana.',
			'Say when you would actually use it out loud.',
			'Recall the key meaning without translating every piece back into English.'
		];
	}

	function getConnectionNotes(): string[] {
		const notes: string[] = [];

		if (data.sectionTitle) notes.push(`Part of the ${data.sectionTitle} block in ${data.column.title}.`);
		if (data.item.pair) notes.push(`Paired with ${data.item.pair} so learners can compare scripts instead of memorizing in isolation.`);
		if (variants.length > 0) notes.push(`Shows up in alternate shapes: ${variants.join(' · ')}.`);
		if (recipeCards.length > 0) notes.push(`Already connected to ${recipeCards.length} kanji build${recipeCards.length > 1 ? 's' : ''}, which keeps this lesson tied to future reading.`);
		if (noteTags.length > 0) notes.push(`Carries semantic cues through ${noteTags.slice(0, 3).join(', ')}.`);

		return notes.slice(0, 3);
	}
</script>

<svelte:window onkeydown={handleKeydown} ontouchstart={onTouchStart} ontouchend={onTouchEnd} />

<div
	class="detail-page relative flex flex-col items-center justify-between bg-[var(--color-paper)] {isKanji ? 'overflow-y-auto' : 'overflow-hidden'}"
	onmousemove={handleMouseMove}
	style="--detail-accent: var(--color-col-{data.column.id}); --detail-progress: {progressPercent}%; min-height: calc(100dvh - var(--nav-height, 56px)); {isKanji ? '' : 'height: calc(100dvh - var(--nav-height, 56px));'}"
>
	<div class="paper-grain pointer-events-none absolute inset-0"></div>

	<div class="lesson-rail pointer-events-none absolute inset-x-0 top-0 z-10 px-5 pt-4 md:px-8 md:pt-5">
		<div class="mx-auto flex max-w-5xl items-center gap-3">
			<div class="min-w-0 flex items-baseline gap-2">
				<span class="truncate text-[11px] font-bold tracking-[0.12em] text-[var(--color-ink-ghost)]">
					{data.column.title}
				</span>
				{#if data.sectionTitle}
					<span class="h-px w-5 shrink-0 bg-[var(--color-divider)]"></span>
					<span
						class="truncate text-sm font-black leading-none text-[var(--color-ink-mid)] {isKana ? 'kana-study-type' : ''}"
						style="font-family: {isKana ? 'var(--font-kana-study)' : 'var(--font-jp-brush)'};"
					>
						{data.sectionTitle}
					</span>
				{/if}
			</div>
			<span class="lesson-count ml-auto shrink-0 text-[10px] font-bold tracking-[0.12em] tabular-nums text-[var(--color-ink-ghost)]">
				{data.index + 1} of {data.totalItems}
			</span>
		</div>
		<div class="mx-auto mt-3 h-px max-w-5xl overflow-hidden bg-[var(--color-divider)]" aria-hidden="true">
			<div class="h-full w-[var(--detail-progress)] bg-[var(--detail-accent)] transition-all duration-500 ease-[var(--ease-out-expo)]"></div>
		</div>
	</div>

	<div class="z-10 flex flex-1 flex-col items-center px-4 pt-12 {isKanji ? 'w-full justify-start pb-20 md:pt-16' : 'justify-center'}">
		{#if unlockedAward}
			<div
				in:fade={{ duration: 180 }}
				class="mb-4 w-full max-w-md rounded-2xl border border-[var(--color-divider)] bg-[var(--color-paper-warm)] px-4 py-4 text-left shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
				style="box-shadow: inset 0 0 0 1px color-mix(in srgb, {unlockedAward.accent} 16%, transparent);"
			>
				<div class="flex items-start justify-between gap-3">
					<div>
						<p class="text-[10px] font-bold tracking-[0.22em] uppercase" style="color: {unlockedAward.accent};">Award unlocked · {unlockedAward.titleJp}</p>
						<h2 class="mt-1 text-lg font-black text-[var(--color-ink)]">{unlockedAward.title}</h2>
					</div>
					<span class="flex h-10 w-10 items-center justify-center rounded-full text-xl" style="background: color-mix(in srgb, {unlockedAward.accent} 12%, var(--color-paper)); color: {unlockedAward.accent};">{unlockedAward.icon}</span>
				</div>
				<p class="mt-2 text-sm leading-6 text-[var(--color-ink-light)]">{unlockedAward.description}</p>
			</div>
		{/if}
		{#key data.index + data.column.id}
			<div
				in:fly={{ y: 30, duration: 350, delay: 50 }}
				class="transition-transform duration-100 ease-out {justLearned ? 'char-pulse' : ''}"
				style="transform: translate({charOffsetX}px, {charOffsetY}px);"
			>
				<span
					class="block px-4 text-center font-black leading-none {isKana ? 'kana-study-type' : ''}"
					style="font-size: {charFontSize}; max-width: 90vw; word-break: keep-all;"
				>
					{data.item.character}
				</span>
			</div>
		{/key}

		{#if showDetails}
			<div class="mt-2 flex flex-col items-center gap-1.5 md:mt-4 md:gap-2" in:fade={{ duration: 250 }}>
				<div class="mb-2 flex flex-wrap items-center justify-center gap-2 px-4 text-center">
					<span class="rounded-full border border-[var(--color-divider)] px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink-light)]">
						{data.column.title}
					</span>
					{#if data.sectionTitle}
						<span class="rounded-full border border-[var(--color-divider)] px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink-light)]">
							{data.sectionTitle}
						</span>
					{/if}
					<span class="rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink)]" style="background: color-mix(in srgb, var(--color-col-{data.column.id}) 10%, var(--color-paper));">
						item {data.index + 1} of {data.totalItems}
					</span>
				</div>
				<span class="text-xl font-black tracking-[0.3em] uppercase text-[var(--color-ink)] md:text-3xl">
					{data.item.romaji}
				</span>

				{#if data.item.meaning && data.item.meaning !== data.item.romaji}
					<span class="text-sm font-bold tracking-wide text-[var(--color-ink-mid)] md:text-lg">
						{data.item.meaning}
					</span>
				{/if}

				{#if data.item.pair}
					<div class="mt-3 text-center">
						<span class="block text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--color-ink-ghost)]">Hiragana</span>
						{#if data.pairHref}
							<a
								href={data.pairHref}
								class="pair-link kana-study-type mt-0.5 inline-flex items-center justify-center text-3xl font-black text-[var(--color-ink-light)] md:text-4xl"
								aria-label="Open hiragana {data.item.pair}"
							>
								{data.item.pair}
							</a>
						{:else}
							<span class="kana-study-type mt-0.5 block text-3xl font-black text-[var(--color-ink-light)] md:text-4xl">{data.item.pair}</span>
						{/if}
					</div>
				{/if}

				{#if data.item.mnemonic}
					<p class="mt-3 max-w-xl px-5 text-center text-sm leading-relaxed text-[var(--color-ink-mid)] md:text-base">
						{data.item.mnemonic}
					</p>
				{/if}

				{#if variants.length > 0}
					<div class="mt-3 flex flex-wrap justify-center gap-2">
						{#each variants as variant}
							<span class="rounded-full border border-[var(--color-divider)] bg-[var(--color-paper-warm)] px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink-light)]">
								Variant {variant}
							</span>
						{/each}
					</div>
				{/if}

				{#if data.item.readings && !isKanji}
					<div class="mt-3 flex gap-12">
						{#if data.item.readings.on}
							<div class="text-center">
								<span class="block text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--color-ink-ghost)]">On</span>
								<span class="kana-study-type mt-0.5 block text-base font-black">{data.item.readings.on.join('・')}</span>
							</div>
						{/if}
						{#if data.item.readings.kun}
							<div class="text-center">
								<span class="block text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--color-ink-ghost)]">Kun</span>
								<span class="kana-study-type mt-0.5 block text-base font-black">{data.item.readings.kun.join('・')}</span>
							</div>
						{/if}
					</div>
				{/if}

				{#if isKanji}
					<div class="kanji-reference mt-7 grid w-full max-w-5xl gap-3 md:mt-9 md:grid-cols-[1fr_1.15fr_1fr]">
						<section class="kanji-panel">
							<span class="kanji-panel-label">Meaning</span>
							<p class="mt-3 text-2xl font-black leading-tight text-[var(--color-ink)] md:text-3xl">
								{data.item.meaning}
							</p>
							<p class="mt-3 text-sm leading-6 text-[var(--color-ink-light)]">
								{data.item.character} sits in the {data.sectionTitle ?? data.column.title} sheet. Treat the shape, reading, and compounds as one reference surface.
							</p>
						</section>

						<section class="kanji-panel">
							<span class="kanji-panel-label">Readings</span>
							<div class="mt-4 grid gap-3 sm:grid-cols-2">
								<div>
									<span class="block text-[9px] font-black tracking-[0.22em] uppercase text-[var(--color-ink-ghost)]">On</span>
									<p class="kana-study-type mt-1 text-xl font-black leading-tight text-[var(--color-ink)]">
										{data.item.readings?.on?.join('・') ?? '—'}
									</p>
								</div>
								<div>
									<span class="block text-[9px] font-black tracking-[0.22em] uppercase text-[var(--color-ink-ghost)]">Kun</span>
									<p class="kana-study-type mt-1 text-xl font-black leading-tight text-[var(--color-ink)]">
										{data.item.readings?.kun?.join('・') ?? '—'}
									</p>
								</div>
							</div>
						</section>

						<section class="kanji-panel">
							<span class="kanji-panel-label">Reference</span>
							<div class="mt-4 flex flex-col gap-2">
								<a
									href="https://www.kanshudo.com/search?q={encodeURIComponent(data.item.character)}"
									target="_blank"
									rel="noopener noreferrer"
									class="kanji-link"
								>
									Kanshudo
								</a>
								<a
									href="https://jisho.org/search/{encodeURIComponent(data.item.character)}%20%23kanji"
									target="_blank"
									rel="noopener noreferrer"
									class="kanji-link"
								>
									Jisho
								</a>
							</div>
						</section>

						{#if data.knack}
							<section class="kanji-panel knack-panel md:col-span-3">
								<div class="flex flex-wrap items-start justify-between gap-3">
									<div>
										<span class="kanji-panel-label">Kotsu</span>
										<p class="mt-3 text-2xl font-black leading-tight text-[var(--color-ink)] md:text-3xl">
											{data.knack.the_kotsu}
										</p>
									</div>
									<div class="pitch-chip">
										<span>{data.knack.pitch_accent.reading}</span>
										<strong>{data.knack.pitch_accent.pattern}</strong>
									</div>
								</div>

								<div class="mt-5 grid gap-3 md:grid-cols-[0.8fr_1.2fr]">
									<div>
										<span class="block text-[9px] font-black tracking-[0.22em] uppercase text-[var(--color-ink-ghost)]">Parts</span>
										<div class="mt-2 flex flex-wrap gap-2">
											{#each data.knack.radicals as radical}
												<span class="radical-chip">{radical}</span>
											{/each}
										</div>
									</div>
									<div>
										<span class="block text-[9px] font-black tracking-[0.22em] uppercase text-[var(--color-ink-ghost)]">Mnemonic</span>
										<p class="mt-2 text-sm leading-6 text-[var(--color-ink-mid)]">
											{data.knack.mnemonic}
										</p>
									</div>
								</div>
							</section>
						{/if}

						{#if data.relatedRecipes.length > 0}
							<section class="kanji-panel md:col-span-3">
								<span class="kanji-panel-label">Composition</span>
								<div class="mt-4 grid gap-2 md:grid-cols-2">
									{#each data.relatedRecipes as recipe}
										<a href="/recipes/{recipe.id}" class="recipe-strip">
											<span class="flex items-center gap-2">
												{#each recipe.parts as part, partIndex}
													<span class="formula-char">{part.character}</span>
													{#if partIndex < recipe.parts.length - 1}
														<span class="formula-mark">+</span>
													{/if}
												{/each}
												<span class="formula-mark">=</span>
												<span class="formula-char is-result">{recipe.result}</span>
											</span>
											<span class="text-sm font-bold text-[var(--color-ink-mid)]">{recipe.meaning}</span>
										</a>
									{/each}
								</div>
							</section>
						{/if}
					</div>
				{/if}

				{#if auth.user}
					<button
						onclick={toggleLearned}
						aria-pressed={learned}
						class="learned-action mt-5 cursor-pointer md:mt-6 {learned ? 'is-learned' : ''}"
					>
						<span class="learned-action-dot" aria-hidden="true"></span>
						<span>{learned ? 'Learned' : 'Mark learned'}</span>
					</button>
				{/if}
			</div>
		{/if}
	</div>

	<div class="lesson-nav z-10 flex items-center gap-3 pb-5" aria-label="Lesson navigation">
		{#if visiblePrevIndex !== null}
			<a
				href="/{data.column.id}/{visiblePrevIndex}"
				aria-label="Previous item"
				class="lesson-arrow"
				onclick={() => (showDetails = false)}
			>
				←
			</a>
		{:else}
			<span class="lesson-arrow is-disabled" aria-hidden="true"></span>
		{/if}

		<span class="text-[10px] font-bold tracking-[0.2em] text-[var(--color-ink-ghost)]">
			{data.index + 1} / {data.totalItems}
		</span>

		{#if visibleNextIndex !== null}
			<a
				href="/{data.column.id}/{visibleNextIndex}"
				aria-label="Next item"
				class="lesson-arrow"
				onclick={() => (showDetails = false)}
			>
				→
			</a>
		{:else}
			<span class="lesson-arrow is-disabled" aria-hidden="true"></span>
		{/if}
	</div>

	<a
		href="https://www.kanshudo.com/search?q={encodeURIComponent(data.item.character)}"
		target="_blank"
		rel="noopener noreferrer"
		class="absolute right-4 bottom-3 z-10 text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)] transition-colors hover:text-[var(--color-ink)] md:right-8"
	>
		kanshudo ↗
	</a>

	<span class="absolute bottom-3 left-4 z-10 hidden text-[10px] font-bold tracking-[0.15em] text-[var(--color-ink-ghost)] md:inline">
		← → space
	</span>
</div>

<style>
	.paper-grain {
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
		background-repeat: repeat;
		background-size: 256px 256px;
	}

	.char-pulse {
		animation: pulse-learn 0.5s ease-out;
	}

	.lesson-rail {
		text-shadow: 0 1px 18px var(--color-paper);
	}

	.pair-link {
		border-radius: 0.75rem;
		padding: 0.1rem 0.4rem 0.2rem;
		text-decoration: none;
		transition:
			transform 180ms var(--ease-out-expo),
			background 180ms ease,
			color 180ms ease;
	}

	.pair-link:hover,
	.pair-link:focus-visible {
		background: color-mix(in srgb, var(--detail-accent) 9%, var(--color-paper));
		color: var(--color-ink);
		outline: none;
		transform: translateY(-1px);
	}

	.kanji-reference {
		text-align: left;
	}

	.kanji-panel {
		border: 1px solid var(--color-divider);
		border-radius: 1rem;
		background:
			linear-gradient(
				180deg,
				color-mix(in srgb, var(--detail-accent) 4%, transparent),
				transparent 48%
			),
			color-mix(in srgb, var(--color-ink) 2.5%, var(--color-paper));
		padding: 1rem;
	}

	.kanji-panel-label {
		color: var(--color-ink-ghost);
		font-size: 0.58rem;
		font-weight: 900;
		letter-spacing: 0.22em;
		line-height: 1;
		text-transform: uppercase;
	}

	.knack-panel {
		background:
			linear-gradient(135deg, color-mix(in srgb, var(--detail-accent) 7%, transparent), transparent 42%),
			color-mix(in srgb, var(--color-ink) 2.5%, var(--color-paper));
	}

	.pitch-chip,
	.radical-chip {
		border: 1px solid var(--color-divider);
		background: color-mix(in srgb, var(--color-paper) 88%, var(--detail-accent));
		color: var(--color-ink);
		font-weight: 900;
	}

	.pitch-chip {
		display: grid;
		gap: 0.3rem;
		min-width: 8.5rem;
		border-radius: 0.9rem;
		padding: 0.75rem 0.85rem;
		text-align: right;
	}

	.pitch-chip span {
		font-family: var(--font-jp-brush);
		font-size: 1.05rem;
		line-height: 1;
	}

	.pitch-chip strong {
		color: var(--color-ink-ghost);
		font-size: 0.58rem;
		letter-spacing: 0.16em;
		line-height: 1;
		text-transform: uppercase;
	}

	.radical-chip {
		border-radius: 9999px;
		padding: 0.45rem 0.65rem;
		font-family: var(--font-jp-brush);
		font-size: 1rem;
		line-height: 1;
	}

	.kanji-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1px solid var(--color-divider);
		border-radius: 0.75rem;
		padding: 0.75rem 0.85rem;
		color: var(--color-ink);
		font-size: 0.7rem;
		font-weight: 900;
		letter-spacing: 0.14em;
		text-decoration: none;
		text-transform: uppercase;
		transition:
			transform 180ms var(--ease-out-expo),
			border-color 180ms ease,
			background 180ms ease;
	}

	.kanji-link::after {
		content: '↗';
		color: var(--color-ink-ghost);
		font-size: 0.75rem;
	}

	.kanji-link:hover,
	.kanji-link:focus-visible {
		border-color: color-mix(in srgb, var(--detail-accent) 55%, var(--color-divider));
		background: color-mix(in srgb, var(--detail-accent) 8%, var(--color-paper));
		outline: none;
		transform: translateY(-1px);
	}

	.recipe-strip {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		border: 1px solid var(--color-divider);
		border-radius: 0.85rem;
		padding: 0.8rem 0.9rem;
		text-decoration: none;
		transition:
			transform 180ms var(--ease-out-expo),
			border-color 180ms ease,
			background 180ms ease;
	}

	.recipe-strip:hover,
	.recipe-strip:focus-visible {
		border-color: color-mix(in srgb, var(--detail-accent) 55%, var(--color-divider));
		background: color-mix(in srgb, var(--detail-accent) 7%, var(--color-paper));
		outline: none;
		transform: translateY(-1px);
	}

	.formula-char {
		color: var(--color-ink);
		font-family: var(--font-jp-brush);
		font-size: 1.45rem;
		font-weight: 900;
		line-height: 1;
	}

	.formula-char.is-result {
		color: var(--detail-accent);
		font-size: 1.75rem;
	}

	.formula-mark {
		color: var(--color-ink-ghost);
		font-size: 0.7rem;
		font-weight: 900;
	}

	@media (max-width: 430px) {
		.lesson-count {
			display: none;
		}
	}

	.learned-action {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		min-height: 2.5rem;
		border: 1px solid color-mix(in srgb, var(--detail-accent) 24%, var(--color-divider));
		border-radius: 9999px;
		background: color-mix(in srgb, var(--detail-accent) 7%, var(--color-paper));
		padding: 0 1rem;
		color: var(--color-ink);
		font-size: 0.625rem;
		font-weight: 900;
		letter-spacing: 0.18em;
		line-height: 1;
		text-transform: uppercase;
		transition:
			transform 180ms var(--ease-out-expo),
			border-color 180ms ease,
			background 180ms ease,
			color 180ms ease;
	}

	.learned-action:hover {
		transform: translateY(-1px);
		border-color: color-mix(in srgb, var(--detail-accent) 55%, var(--color-divider));
		background: color-mix(in srgb, var(--detail-accent) 11%, var(--color-paper));
	}

	.learned-action:active {
		transform: translateY(0) scale(0.98);
	}

	.learned-action:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--detail-accent) 70%, transparent);
		outline-offset: 4px;
	}

	.learned-action.is-learned {
		border-color: var(--color-divider);
		background: color-mix(in srgb, var(--color-ink) 4%, var(--color-paper));
		color: var(--color-ink-mid);
	}

	.learned-action-dot {
		width: 0.42rem;
		height: 0.42rem;
		border-radius: 9999px;
		background: var(--detail-accent);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--detail-accent) 10%, transparent);
		opacity: 0.72;
		transition:
			opacity 180ms ease,
			box-shadow 180ms ease;
	}

	.learned-action.is-learned .learned-action-dot {
		box-shadow:
			0 0 0 3px color-mix(in srgb, var(--detail-accent) 14%, transparent),
			0 0 14px color-mix(in srgb, var(--detail-accent) 28%, transparent);
		opacity: 1;
	}

	.lesson-arrow {
		display: grid;
		width: 2.25rem;
		height: 2.25rem;
		place-items: center;
		border: 1px solid transparent;
		border-radius: 9999px;
		color: var(--color-ink-ghost);
		font-size: 1.1rem;
		line-height: 1;
		text-decoration: none;
		transition:
			transform 180ms var(--ease-out-expo),
			border-color 180ms ease,
			background 180ms ease,
			color 180ms ease;
	}

	.lesson-arrow:hover,
	.lesson-arrow:focus-visible {
		border-color: var(--color-divider);
		background: color-mix(in srgb, var(--color-ink) 3%, var(--color-paper));
		color: var(--color-ink);
		outline: none;
	}

	.lesson-arrow:first-child:hover {
		transform: translateX(-2px);
	}

	.lesson-arrow:last-child:hover {
		transform: translateX(2px);
	}

	.lesson-arrow.is-disabled {
		opacity: 0.18;
	}

	@keyframes pulse-learn {
		0% { transform: scale(1); }
		30% { transform: scale(1.08); }
		100% { transform: scale(1); }
	}

	@media (prefers-color-scheme: dark) {
		.lesson-rail {
			text-shadow: 0 1px 18px var(--color-paper);
		}

		.learned-action {
			background: color-mix(in srgb, var(--detail-accent) 12%, var(--color-paper));
		}

		.learned-action.is-learned {
			background: color-mix(in srgb, var(--color-ink) 6%, var(--color-paper));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.paper-grain { display: none; }
		.char-pulse { animation: none; }
		.learned-action,
		.lesson-arrow,
		.learned-action-dot,
		.pair-link,
		.kanji-link,
		.recipe-strip {
			transition: none;
		}
		.learned-action:hover,
		.learned-action:active,
		.lesson-arrow:first-child:hover,
		.lesson-arrow:last-child:hover,
		.pair-link:hover,
		.kanji-link:hover,
		.recipe-strip:hover {
			transform: none;
		}
	}
</style>
