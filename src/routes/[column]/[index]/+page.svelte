<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { markLearned, unmarkLearned } from '$lib/firebase';
	import { getAuthState, isLearned, setLearned } from '$lib/stores/auth.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let showDetails = $state(false);
	let auth = $derived(getAuthState());
	let justLearned = $state(false);

	let learnedKey = $derived(`${data.column.id}_${data.index}`);
	let learned = $derived(isLearned(data.column.id, data.index));

	// Mouse parallax
	let mouseX = $state(0);
	let mouseY = $state(0);
	let charOffsetX = $derived((mouseX - 0.5) * 12);
	let charOffsetY = $derived((mouseY - 0.5) * 8);

	$effect(() => {
		const _idx = data.index;
		showDetails = false;
		justLearned = false;
		const t = setTimeout(() => (showDetails = true), 200);
		return () => clearTimeout(t);
	});

	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX / window.innerWidth;
		mouseY = e.clientY / window.innerHeight;
	}

	async function toggleLearned() {
		if (!auth.user) return;
		const newValue = !learned;
		setLearned(learnedKey, newValue);
		if (newValue) {
			justLearned = true;
			await markLearned(auth.user.uid, data.column.id, data.index);
			// Auto-advance after pulse animation completes
			setTimeout(() => {
				justLearned = false;
				if (data.nextIndex !== null) {
					showDetails = false;
					goto(`/${data.column.id}/${data.nextIndex}`);
				}
			}, 600);
		} else {
			await unmarkLearned(auth.user.uid, data.column.id, data.index);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		// Don't capture if typing in an input
		if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

		switch (e.key) {
			case 'Escape':
				goto('/');
				break;
			case 'ArrowRight':
			case 'l':
				if (data.nextIndex !== null) {
					showDetails = false;
					goto(`/${data.column.id}/${data.nextIndex}`);
				}
				break;
			case 'ArrowLeft':
			case 'h':
				if (data.prevIndex !== null) {
					showDetails = false;
					goto(`/${data.column.id}/${data.prevIndex}`);
				}
				break;
			case ' ':
				e.preventDefault();
				toggleLearned();
				break;
		}
	}

	let charCount = $derived(data.item.character.length);
	let charFontSize = $derived(
		charCount === 1
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

	let touchStartX = 0;

	function onTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
	}

	function onTouchEnd(e: TouchEvent) {
		const delta = e.changedTouches[0].clientX - touchStartX;
		if (Math.abs(delta) < 50) return;
		if (delta < 0 && data.nextIndex !== null) {
			showDetails = false;
			goto(`/${data.column.id}/${data.nextIndex}`);
		} else if (delta > 0 && data.prevIndex !== null) {
			showDetails = false;
			goto(`/${data.column.id}/${data.prevIndex}`);
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} ontouchstart={onTouchStart} ontouchend={onTouchEnd} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="detail-page relative flex flex-col items-center justify-between overflow-hidden bg-[var(--color-paper)]"
	onmousemove={handleMouseMove}
	style="height: calc(100dvh - var(--nav-height, 56px));"
>
	<!-- Paper texture overlay -->
	<div class="paper-grain pointer-events-none absolute inset-0"></div>

	<!-- Section label -->
	{#if data.sectionTitle}
		<div class="z-10 pt-3 text-center">
			<span class="text-[9px] font-bold tracking-[0.3em] uppercase" style="color: var(--color-col-{data.column.id});">
				{data.column.titleJp} · {data.sectionTitle}
			</span>
		</div>
	{:else}
		<div class="pt-3"></div>
	{/if}

	<!-- Center: character + details + learn button -->
	<div class="z-10 flex flex-1 flex-col items-center justify-center">
		{#key data.index + data.column.id}
			<div
				in:fly={{ y: 30, duration: 350, delay: 50 }}
				class="transition-transform duration-100 ease-out {justLearned ? 'char-pulse' : ''}"
				style="transform: translate({charOffsetX}px, {charOffsetY}px);"
			>
				<span
					class="block font-black leading-none text-center px-4"
					style="font-size: {charFontSize}; max-width: 90vw; word-break: keep-all;"
				>
					{data.item.character}
				</span>
			</div>
		{/key}

		{#if showDetails}
			<div class="mt-2 flex flex-col items-center gap-1.5 md:mt-4 md:gap-2" in:fade={{ duration: 250 }}>
				<span
					class="text-xl font-black tracking-[0.3em] uppercase text-[var(--color-ink)] md:text-3xl"
					style="font-family: var(--font-jp-brush);"
				>
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
						<span class="mt-0.5 block text-3xl font-black text-[var(--color-ink-light)] md:text-4xl">{data.item.pair}</span>
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

				{#if data.item.readings}
					<div class="mt-3 flex gap-12">
						{#if data.item.readings.on}
							<div class="text-center">
								<span class="block text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--color-ink-ghost)]">On</span>
								<span class="mt-0.5 block text-base font-black" style="font-family: var(--font-jp-brush);">{data.item.readings.on.join('・')}</span>
							</div>
						{/if}
						{#if data.item.readings.kun}
							<div class="text-center">
								<span class="block text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--color-ink-ghost)]">Kun</span>
								<span class="mt-0.5 block text-base font-black" style="font-family: var(--font-jp-brush);">{data.item.readings.kun.join('・')}</span>
							</div>
						{/if}
					</div>
				{/if}

				{#if noteTags.length > 0}
					<div class="mt-4 flex max-w-2xl flex-wrap justify-center gap-2 px-4">
						{#each noteTags as tag}
							<span class="rounded-full border border-[var(--color-divider)] px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink-ghost)]">
								{tag}
							</span>
						{/each}
					</div>
				{/if}

				{#if recipeCards.length > 0}
					<div class="mt-6 w-full max-w-5xl px-4 md:mt-8">
						<div class="mb-3 text-center">
							<span class="inline-flex items-center gap-2 rounded-full border border-[var(--color-divider)] bg-[var(--color-paper-warm)] px-3 py-1 text-[10px] font-bold tracking-[0.22em] uppercase text-[var(--color-ink-light)]">
								<span>Radical recipes</span>
								<span class="h-1 w-1 rounded-full" style="background: var(--color-col-radicals);"></span>
								<span>{recipeCards.length}</span>
							</span>
						</div>
						<div class="grid gap-3 md:grid-cols-2">
							{#each recipeCards as recipe}
								<div class="rounded-3xl border border-[var(--color-divider)] bg-[var(--color-paper-warm)] p-4 text-left shadow-[0_18px_60px_rgba(24,24,27,0.08)]">
									<div class="flex items-start justify-between gap-4">
										<div>
											<div class="flex items-end gap-3">
												<span class="text-4xl font-black leading-none md:text-5xl">{recipe.kanji}</span>
												<div>
													<span class="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">Recipe</span>
													{#if recipe.reading}
														<span class="block text-sm font-black text-[var(--color-ink)]" style="font-family: var(--font-jp-brush);">{recipe.reading}</span>
													{/if}
												</div>
											</div>
											<p class="mt-2 text-sm font-bold text-[var(--color-ink)]">{recipe.meaning}</p>
										</div>
									</div>
									<div class="mt-3 space-y-2 text-sm leading-relaxed text-[var(--color-ink-mid)]">
										<p><span class="font-black uppercase tracking-[0.14em] text-[var(--color-ink-ghost)] text-[10px]">Build</span><br />{recipe.breakdown}</p>
										<p><span class="font-black uppercase tracking-[0.14em] text-[var(--color-ink-ghost)] text-[10px]">Why it sticks</span><br />{recipe.clue}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				{#if auth.user}
					<button
						onclick={toggleLearned}
						class="mt-4 cursor-pointer rounded-full px-7 py-2.5 text-xs font-black tracking-[0.2em] uppercase transition-all duration-200 active:scale-95 md:mt-6 {learned
							? 'border-2 border-[var(--color-ink-light)] text-[var(--color-ink-mid)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]'
							: 'bg-[var(--color-ink)] text-[var(--color-paper)] hover:opacity-80'}"
					>
						{learned ? '✓ Learned' : 'Mark Learned'}
					</button>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Bottom nav: prev / counter / next -->
	<div class="z-10 flex items-center gap-12 pb-6">
		{#if data.prevIndex !== null}
			<a
				href="/{data.column.id}/{data.prevIndex}"
				class="text-xl text-[var(--color-ink-ghost)] transition-all hover:text-[var(--color-ink)] hover:-translate-x-1"
				onclick={() => (showDetails = false)}
			>
				←
			</a>
		{:else}
			<span class="w-5"></span>
		{/if}

		<span class="text-[10px] font-bold tracking-[0.2em] text-[var(--color-ink-ghost)]">
			{data.index + 1} / {data.totalItems}
		</span>

		{#if data.nextIndex !== null}
			<a
				href="/{data.column.id}/{data.nextIndex}"
				class="text-xl text-[var(--color-ink-ghost)] transition-all hover:text-[var(--color-ink)] hover:translate-x-1"
				onclick={() => (showDetails = false)}
			>
				→
			</a>
		{:else}
			<span class="w-5"></span>
		{/if}
	</div>

	<!-- Bottom-right: kanshudo link -->
	<a
		href="https://www.kanshudo.com/search?q={encodeURIComponent(data.item.character)}"
		target="_blank"
		rel="noopener noreferrer"
		class="absolute right-4 bottom-3 z-10 text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)] transition-colors hover:text-[var(--color-ink)] md:right-8"
	>
		kanshudo ↗
	</a>

	<!-- Bottom-left: keyboard hint -->
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

	@keyframes pulse-learn {
		0% { transform: scale(1); }
		30% { transform: scale(1.08); }
		100% { transform: scale(1); }
	}

	@media (prefers-reduced-motion: reduce) {
		.paper-grain { display: none; }
		.char-pulse { animation: none; }
	}
</style>
