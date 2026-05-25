<script lang="ts">
	import { columns } from '$lib/data';
	import WordCollection from '$lib/components/WordCollection.svelte';
	import { getAuthState, isLearned } from '$lib/stores/auth.svelte';
	import { getColumnItems, type Column } from '$lib/data';
	import {
		courseUnits,
		getCoursePreview,
		getCourseTotalProgress,
		getCourseUnitHref,
		getCourseUnitProgress,
		getNextCourseUnit,
		radicalRecipes,
		type CourseProgress,
		type CourseUnit
	} from '$lib/course';
	import { getCharacterHref } from '$lib/links';
	import { getUnlockedAwards, getFeaturedLockedAwards } from '$lib/awards';
	import { onMount } from 'svelte';

	let auth = $derived(getAuthState());
	let courseTotal = $derived(getCourseTotalProgress(isLearned));
	let nextUnit = $derived(getNextCourseUnit(isLearned));
	let nextProgress = $derived(getCourseUnitProgress(nextUnit, isLearned));
	let completedUnits = $derived(
		courseUnits.filter((unit) => getCourseUnitProgress(unit, isLearned).status === 'complete').length
	);
	let unlockedAwards = $derived(getUnlockedAwards(isLearned));
	let featuredLockedAwards = $derived(getFeaturedLockedAwards(isLearned, 3));

	const accentColors: Record<string, string> = {
		hiragana: 'var(--color-shu)',
		katakana: 'var(--color-ai)',
		radicals: 'var(--color-matcha)',
		kanji: 'var(--color-fuji)',
		vocabulary: 'var(--color-asagi)'
	};

	const phaseColors: Record<string, string> = {
		Beginner: 'var(--color-shu)',
		Radicals: 'var(--color-matcha)',
		Kanji: 'var(--color-fuji)',
		Words: 'var(--color-asagi)'
	};

	// Curated hero kanji — iconic, visually striking, emotionally resonant
	const heroKanji = [
		{ char: '山', meaning: 'mountain', color: 'var(--color-matcha)' },
		{ char: '火', meaning: 'fire', color: 'var(--color-shu)' },
		{ char: '日', meaning: 'sun', color: 'var(--color-kitsune)' },
		{ char: '月', meaning: 'moon', color: 'var(--color-ai)' },
		{ char: '水', meaning: 'water', color: 'var(--color-asagi)' },
		{ char: '木', meaning: 'tree', color: 'var(--color-matcha)' },
		{ char: '心', meaning: 'heart', color: 'var(--color-sakura)' },
		{ char: '道', meaning: 'way', color: 'var(--color-fuji)' }
	];

	// Etymology spotlights — curated "did you know" moments
	const etymologySpotlights = [
		{
			char: '明',
			reading: 'あかるい',
			meaning: 'bright',
			color: 'var(--color-kitsune)',
			parts: ['日 (sun)', '月 (moon)'],
			story: 'Sun and moon together — two sources of light combining to make brightness. One of the clearest pictographic recipes in the language.'
		},
		{
			char: '休',
			reading: 'やすむ',
			meaning: 'rest',
			color: 'var(--color-matcha)',
			parts: ['人 (person)', '木 (tree)'],
			story: 'A person leaning against a tree — the ancient image of taking shade. Written in 214 BC and still perfectly legible today.'
		},
		{
			char: '森',
			reading: 'もり',
			meaning: 'forest',
			color: 'var(--color-matcha)',
			parts: ['木 + 木 + 木 (three trees)'],
			story: 'One tree is a tree. Two trees make a grove. Three trees become a forest. The logic is so direct it feels like it couldn\'t be any other way.'
		},
		{
			char: '間',
			reading: 'あいだ',
			meaning: 'interval',
			color: 'var(--color-ai)',
			parts: ['門 (gate)', '日 (sun)'],
			story: 'The sun seen shining through the gap between two gate doors — the physical space between things captured as a single brushstroke idea.'
		},
		{
			char: '東',
			reading: 'ひがし',
			meaning: 'east',
			color: 'var(--color-shu)',
			parts: ['木 (tree)', '日 (sun)'],
			story: 'The sun rising through a tree — the eastern sky at dawn. Orient yourself: east is where the sun climbs through the branches.'
		}
	];

	// Section card config
	const sectionCards = [
		{
			id: 'hiragana',
			title: 'Hiragana',
			titleJp: 'ひらがな',
			desc: 'The 46 fundamental sounds of Japanese. Every word can be written here.',
			preview: ['あ', 'い', 'う', 'え', 'お', 'か', 'き'],
			color: 'var(--color-shu)',
			href: '/hiragana/0',
			tag: '46 characters'
		},
		{
			id: 'katakana',
			title: 'Katakana',
			titleJp: 'カタカナ',
			desc: 'The angular twin — used for loanwords, emphasis, and foreign names.',
			preview: ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ'],
			color: 'var(--color-ai)',
			href: '/katakana/0',
			tag: '46 characters'
		},
		{
			id: 'radicals',
			title: 'Radicals',
			titleJp: '部首',
			desc: 'The building blocks of kanji. Learn these and kanji stop looking like noise.',
			preview: ['人', '水', '火', '木', '日', '月', '山'],
			color: 'var(--color-matcha)',
			href: '/radicals/0',
			tag: 'visual logic'
		},
		{
			id: 'kanji',
			title: 'Kanji N5–N3',
			titleJp: '漢字',
			desc: 'Essential kanji with etymology, readings, and example compounds.',
			preview: ['一', '二', '三', '山', '川', '日', '本'],
			color: 'var(--color-fuji)',
			href: '/kanji/0',
			tag: 'with etymology'
		},
		{
			id: 'vocabulary',
			title: 'Vocabulary',
			titleJp: '語彙',
			desc: 'Everyday words and phrases — the symbols made immediately useful.',
			preview: ['私', '日本', '食べ', 'る', '見', 'る', '友'],
			color: 'var(--color-asagi)',
			href: '/vocabulary/0',
			tag: 'daily words'
		}
	];

	function getPhaseColor(phase: string): string {
		return phaseColors[phase] ?? 'var(--color-ink)';
	}

	function getStatusLabel(progress: CourseProgress): string {
		if (progress.status === 'complete') return 'Complete';
		if (progress.status === 'active') return `${progress.pct}% learned`;
		return 'Ready';
	}

	function isNextUnit(unit: CourseUnit): boolean {
		return unit.id === nextUnit.id;
	}

	// Hero kanji cycling
	let heroIndex = $state(0);
	let heroVisible = $state(true);

	onMount(() => {
		const interval = setInterval(() => {
			heroVisible = false;
			setTimeout(() => {
				heroIndex = (heroIndex + 1) % heroKanji.length;
				heroVisible = true;
			}, 300);
		}, 2800);
		return () => clearInterval(interval);
	});

	// Etymology spotlight cycling
	let spotlightIndex = $state(0);
	let spotlightVisible = $state(true);

	function cycleSpotlight(dir: 1 | -1) {
		spotlightVisible = false;
		setTimeout(() => {
			spotlightIndex = (spotlightIndex + dir + etymologySpotlights.length) % etymologySpotlights.length;
			spotlightVisible = true;
		}, 200);
	}

	$effect(() => {
		const interval = setInterval(() => {
			cycleSpotlight(1);
		}, 6000);
		return () => clearInterval(interval);
	});

	let currentSpot = $derived(etymologySpotlights[spotlightIndex]);
</script>

<div class="home-page max-w-full overflow-x-clip px-4 pt-8 pb-[calc(env(safe-area-inset-bottom)+2rem)] md:px-8 md:py-10">
	<div class="home-content-shell mx-auto w-full">

		<!-- ─── HERO ─── -->
		<section class="hero-section animate-fade-up mb-12 md:mb-16">
			<div class="hero-inner flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">

				<!-- Left: tagline + CTA -->
				<div class="flex-1 min-w-0">
					<div class="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-divider)] bg-[var(--color-paper-warm)] px-3 py-1.5">
						<span class="text-[10px] font-black tracking-[0.22em] uppercase text-[var(--color-ink-ghost)]">Kotsu</span>
						<span class="h-1 w-1 rounded-full bg-[var(--color-divider)]"></span>
						<span class="text-[10px] font-bold text-[var(--color-ink-ghost)]">コツ</span>
					</div>

					<h1 class="hero-headline max-w-xl text-5xl font-black leading-[1.0] md:text-7xl" style="font-family: var(--font-display);">
						Japanese that actually clicks.
					</h1>
					<p class="mt-5 max-w-lg text-base leading-7 text-[var(--color-ink-light)] md:text-lg">
						Kana, radicals, kanji with etymology, vocabulary — one connected study system built for the long game.
					</p>

					<div class="mt-7 flex flex-wrap gap-3">
						<a
							href={getCourseUnitHref(nextUnit)}
							class="group inline-flex items-center gap-3 rounded-xl px-6 py-3.5 font-black text-[var(--color-paper)] transition-all duration-200 press-scale"
							style="background: {getPhaseColor(nextUnit.phase)};"
						>
							<span>{auth.user ? 'Continue' : 'Start learning'}</span>
							<span class="transition-transform duration-200 group-hover:translate-x-1">→</span>
						</a>
						<a
							href="/kanji/0"
							class="inline-flex items-center gap-2 rounded-xl border border-[var(--color-divider)] px-6 py-3.5 font-black text-[var(--color-ink)] transition-all duration-200 hover:border-[var(--color-fuji)] hover:bg-[var(--color-paper-warm)] press-scale"
						>
							<span style="font-family: var(--font-jp-brush); color: var(--color-fuji);">漢</span>
							<span>Browse kanji</span>
						</a>
					</div>

					{#if auth.user}
						<div class="mt-6 flex flex-wrap gap-4">
							<div class="rounded-lg border border-[var(--color-divider)] px-4 py-2.5">
								<span class="block text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">Learned</span>
								<span class="mt-0.5 block text-xl font-black text-[var(--color-ink)]">{courseTotal.learned}<span class="text-sm font-bold text-[var(--color-ink-ghost)]">/{courseTotal.total}</span></span>
							</div>
							<div class="rounded-lg border border-[var(--color-divider)] px-4 py-2.5">
								<span class="block text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">Units</span>
								<span class="mt-0.5 block text-xl font-black text-[var(--color-ink)]">{completedUnits}<span class="text-sm font-bold text-[var(--color-ink-ghost)]">/{courseUnits.length}</span></span>
							</div>
							<div class="rounded-lg border border-[var(--color-divider)] px-4 py-2.5">
								<span class="block text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">Awards</span>
								<span class="mt-0.5 block text-xl font-black text-[var(--color-matcha)]">{unlockedAwards.length}</span>
							</div>
						</div>
					{/if}
				</div>

				<!-- Right: cycling kanji display -->
				<div class="hero-kanji-display flex-shrink-0 select-none" aria-hidden="true">
					<div class="kanji-stage relative flex h-48 w-48 items-center justify-center rounded-3xl border border-[var(--color-divider)] bg-[var(--color-paper-warm)] md:h-64 md:w-64">
						<!-- Subtle grid lines -->
						<div class="kanji-grid-lines absolute inset-0 rounded-3xl overflow-hidden opacity-30">
							<div class="absolute inset-0" style="background-image: linear-gradient(var(--color-divider) 1px, transparent 1px), linear-gradient(90deg, var(--color-divider) 1px, transparent 1px); background-size: 32px 32px;"></div>
						</div>
						<!-- Center cross -->
						<div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
							<div class="h-full w-px bg-[var(--color-divider)]"></div>
						</div>
						<div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
							<div class="w-full h-px bg-[var(--color-divider)]"></div>
						</div>

						<!-- Cycling kanji -->
						<div class="relative z-10 text-center">
							<span
								class="hero-kanji-char block text-[7rem] font-black leading-none md:text-[9rem]"
								class:hero-char-visible={heroVisible}
								class:hero-char-hidden={!heroVisible}
								style="font-family: var(--font-jp-brush); color: {heroKanji[heroIndex].color};"
							>{heroKanji[heroIndex].char}</span>
							<span
								class="mt-2 block text-[10px] font-bold tracking-[0.22em] uppercase text-[var(--color-ink-ghost)]"
								class:hero-char-visible={heroVisible}
								class:hero-char-hidden={!heroVisible}
							>{heroKanji[heroIndex].meaning}</span>
						</div>

						<!-- Phase dots indicator -->
						<div class="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
							{#each heroKanji as _, i}
								<div
									class="dot transition-all duration-300"
									class:dot-active={i === heroIndex}
									style="background: {i === heroIndex ? heroKanji[heroIndex].color : 'var(--color-divider)'};"
								></div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── ETYMOLOGY SPOTLIGHT ─── -->
		<section class="mb-12 animate-fade-up" style="animation-delay: 0.05s;">
			<div class="etymology-spotlight rounded-2xl border border-[var(--color-divider)] bg-[var(--color-paper-warm)] px-5 py-5 md:px-7 md:py-6"
				style="border-color: color-mix(in srgb, {currentSpot.color} 25%, var(--color-divider));">
				<div class="mb-4 flex items-center justify-between gap-4">
					<div class="flex items-center gap-3">
						<span class="text-[10px] font-black tracking-[0.24em] uppercase text-[var(--color-ink-ghost)]">Etymology Spotlight</span>
						<span class="rounded-full border border-[var(--color-divider)] px-2 py-0.5 text-[9px] font-bold tracking-[0.16em] uppercase text-[var(--color-ink-ghost)]">
							{spotlightIndex + 1}/{etymologySpotlights.length}
						</span>
					</div>
					<div class="flex items-center gap-2">
						<button
							onclick={() => cycleSpotlight(-1)}
							class="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-divider)] text-xs text-[var(--color-ink-ghost)] transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
							aria-label="Previous"
						>←</button>
						<button
							onclick={() => cycleSpotlight(1)}
							class="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-divider)] text-xs text-[var(--color-ink-ghost)] transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
							aria-label="Next"
						>→</button>
					</div>
				</div>

				<div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
					<!-- Big kanji -->
					<div
						class="spot-kanji-wrap flex-shrink-0 text-center"
						class:spot-visible={spotlightVisible}
						class:spot-hidden={!spotlightVisible}
					>
						<a href="/kanji/0" class="group block">
							<span
								class="block text-[5rem] font-black leading-none transition-colors md:text-[6rem]"
								style="font-family: var(--font-jp-brush); color: {currentSpot.color};"
							>{currentSpot.char}</span>
							<span class="mt-1 block text-lg font-black leading-none" style="font-family: var(--font-kana-study); color: color-mix(in srgb, {currentSpot.color} 70%, var(--color-ink-ghost));">{currentSpot.reading}</span>
							<span class="mt-1 block text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink-ghost)]">{currentSpot.meaning}</span>
						</a>
					</div>

					<!-- Story + parts -->
					<div
						class="min-w-0 flex-1"
						class:spot-visible={spotlightVisible}
						class:spot-hidden={!spotlightVisible}
					>
						<div class="flex flex-wrap gap-2 mb-3">
							{#each currentSpot.parts as part}
								<span
									class="rounded-lg border border-[var(--color-divider)] px-3 py-1.5 font-black text-lg leading-none"
									style="font-family: var(--font-jp-brush); color: {currentSpot.color}; background: color-mix(in srgb, {currentSpot.color} 8%, var(--color-paper));"
								>{part.split(' ')[0]}</span>
								<span class="flex items-center text-xs text-[var(--color-ink-light)]">{part.split(' ').slice(1).join(' ')}</span>
							{/each}
						</div>
						<p class="text-base leading-7 text-[var(--color-ink)]">{currentSpot.story}</p>
						<a href="/kanji/0" class="mt-4 inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase transition-colors hover:text-[var(--color-ink)]" style="color: {currentSpot.color};">
							Explore kanji →
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── SECTION CARDS ─── -->
		<section class="mb-12 animate-fade-up" style="animation-delay: 0.1s;">
			<div class="mb-5">
				<h2 class="text-2xl font-black text-[var(--color-ink)]" style="font-family: var(--font-display);">What's in Kotsu</h2>
				<p class="mt-1 text-sm text-[var(--color-ink-light)]">Five interconnected modules, each building on the last.</p>
			</div>
			<div class="section-cards-grid grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
				{#each sectionCards as card}
					<a
						href={card.href}
						class="group section-card relative overflow-hidden rounded-2xl border border-[var(--color-divider)] px-4 py-5 transition-all duration-250 hover:border-transparent hover:shadow-card press-scale"
						style="--card-accent: {card.color}; background: color-mix(in srgb, {card.color} 5%, var(--color-paper));"
					>
						<!-- Accent bar top -->
						<div class="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl transition-all duration-250 group-hover:h-1" style="background: {card.color};"></div>

						<div class="mb-4">
							<span class="text-[10px] font-black tracking-[0.22em] uppercase" style="color: {card.color};">{card.tag}</span>
							<h3 class="mt-1.5 text-lg font-black text-[var(--color-ink)]">{card.title}</h3>
							<span class="block text-xl font-black leading-tight {card.id === 'hiragana' || card.id === 'katakana' ? 'kana-study-type' : ''}" style="font-family: {card.id === 'hiragana' || card.id === 'katakana' ? 'var(--font-kana-study)' : 'var(--font-jp-brush)'}; color: {card.color};">{card.titleJp}</span>
						</div>

						<!-- Character preview -->
						<div class="mb-4 flex flex-wrap gap-1.5">
							{#each card.preview.slice(0, 5) as ch}
								<span
									class="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-divider)] text-xl font-black leading-none text-[var(--color-ink)] transition-colors duration-200 group-hover:border-[color-mix(in_srgb,var(--card-accent)_35%,var(--color-divider))]"
									style="font-family: {card.id === 'hiragana' || card.id === 'katakana' ? 'var(--font-kana-study)' : 'var(--font-jp-brush)'}; background: color-mix(in srgb, var(--card-accent) 8%, var(--color-paper));"
								>{ch}</span>
							{/each}
							<span class="flex h-9 items-center px-2 text-[10px] font-bold text-[var(--color-ink-ghost)]">+more</span>
						</div>

						<p class="text-xs leading-5 text-[var(--color-ink-light)]">{card.desc}</p>

						<div class="mt-4 flex items-center gap-1.5 text-[10px] font-black tracking-[0.18em] uppercase transition-colors" style="color: {card.color};">
							<span>Study</span>
							<span class="transition-transform duration-200 group-hover:translate-x-1">→</span>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- ─── RADICAL RECIPES (visual hook) ─── -->
		<section class="mb-12 animate-fade-up" style="animation-delay: 0.15s;">
			<div class="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
				<div>
					<div class="mb-5">
						<span class="text-[10px] font-black tracking-[0.25em] uppercase text-[var(--color-ink-ghost)]">Radical Recipes</span>
						<h2 class="mt-1.5 text-2xl font-black text-[var(--color-ink)]" style="font-family: var(--font-display);">Parts become meaning.</h2>
						<p class="mt-2 text-sm leading-6 text-[var(--color-ink-light)]">
							Every kanji is assembled from smaller pieces. Once you see the logic, you can read thousands of characters by feeling rather than memorizing.
						</p>
					</div>
					<div class="space-y-2.5">
						{#each radicalRecipes.slice(0, 6) as recipe}
							{@const resultHref = getCharacterHref(recipe.result, ['kanji', 'radicals'])}
							<div class="recipe-card group rounded-xl border border-[var(--color-divider)] px-4 py-3.5 transition-colors hover:bg-[var(--color-paper-warm)]">
								<div class="flex flex-wrap items-center gap-2 mb-1.5">
									{#each recipe.parts as part, partIndex}
										{@const partHref = getCharacterHref(part, ['radicals', 'kanji'])}
										{#if partHref}
											<a href={partHref} class="text-2xl font-black leading-none text-[var(--color-ink)] transition-colors hover:text-[var(--color-matcha)]" style="font-family: var(--font-jp-brush);">{part}</a>
										{:else}
											<span class="text-2xl font-black leading-none text-[var(--color-ink)]" style="font-family: var(--font-jp-brush);">{part}</span>
										{/if}
										{#if partIndex < recipe.parts.length - 1}
											<span class="text-xs font-black text-[var(--color-ink-ghost)]">+</span>
										{/if}
									{/each}
									<span class="text-xs font-black text-[var(--color-ink-ghost)]">=</span>
									{#if resultHref}
										<a href={resultHref} class="text-3xl font-black leading-none text-[var(--color-matcha)] transition-colors hover:opacity-80" style="font-family: var(--font-jp-brush);">{recipe.result}</a>
									{:else}
										<span class="text-3xl font-black leading-none text-[var(--color-matcha)]" style="font-family: var(--font-jp-brush);">{recipe.result}</span>
									{/if}
									<span class="text-sm font-black text-[var(--color-ink)]">{recipe.meaning}</span>
								</div>
								<p class="text-xs leading-5 text-[var(--color-ink-light)]">{recipe.pattern}</p>
							</div>
						{/each}
					</div>
					<a href="/radicals/0" class="mt-4 inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-[var(--color-matcha)] transition-opacity hover:opacity-70">
						See all radicals →
					</a>
				</div>

				<!-- Study loop sidebar -->
				<div class="space-y-4">
					<div class="rounded-xl border border-[var(--color-divider)] bg-[var(--color-paper-warm)] px-5 py-5">
						<span class="text-[10px] font-black tracking-[0.25em] uppercase text-[var(--color-ink-ghost)]">The Study Loop</span>
						<h3 class="mt-2 text-xl font-black text-[var(--color-ink)]" style="font-family: var(--font-display);">How Kotsu works.</h3>
						<div class="mt-4 space-y-3">
							{#each [
								{ step: '01', label: 'Shape', desc: 'See the character and its visual form', color: 'var(--color-shu)' },
								{ step: '02', label: 'Sound', desc: 'Connect the sound or reading', color: 'var(--color-ai)' },
								{ step: '03', label: 'Combine', desc: 'Spot it inside compounds and recipes', color: 'var(--color-matcha)' },
								{ step: '04', label: 'Read', desc: 'Recognize it in a real word', color: 'var(--color-fuji)' }
							] as item}
								<div class="flex items-start gap-3">
									<span class="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-black" style="background: color-mix(in srgb, {item.color} 12%, var(--color-paper)); color: {item.color};">{item.step}</span>
									<div>
										<span class="text-sm font-black text-[var(--color-ink)]">{item.label}</span>
										<span class="block text-xs leading-5 text-[var(--color-ink-light)]">{item.desc}</span>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Next unit card -->
					<a
						href={getCourseUnitHref(nextUnit)}
						class="group block rounded-xl border border-[var(--color-divider)] px-5 py-5 transition-all duration-200 hover:border-[color-mix(in_srgb,var(--color-ink)_30%,var(--color-divider))] hover:bg-[var(--color-paper-warm)] press-scale"
					>
						<span class="text-[10px] font-black tracking-[0.22em] uppercase text-[var(--color-ink-ghost)]">{auth.user ? 'Next lesson' : 'Start here'}</span>
						<div class="mt-2 flex items-end justify-between gap-3">
							<div>
								<span class="block text-xl font-black text-[var(--color-ink)]">{nextUnit.title}</span>
								<span class="block text-base font-black leading-tight" style="font-family: var(--font-jp-brush); color: {getPhaseColor(nextUnit.phase)};">{nextUnit.titleJp}</span>
							</div>
							<span class="text-2xl leading-none transition-transform duration-200 group-hover:translate-x-1" style="color: {getPhaseColor(nextUnit.phase)};">→</span>
						</div>
						<div class="mt-3 flex items-center justify-between gap-3">
							<span class="text-xs text-[var(--color-ink-light)]">{nextProgress.learned}/{nextProgress.total} items</span>
							<span class="rounded-full px-2 py-0.5 text-[9px] font-bold tracking-[0.16em] uppercase" style="background: color-mix(in srgb, {getPhaseColor(nextUnit.phase)} 12%, var(--color-paper)); color: {getPhaseColor(nextUnit.phase)};">{nextUnit.phase}</span>
						</div>
					</a>
				</div>
			</div>
		</section>

		<!-- ─── COURSE TIMELINE (compact) ─── -->
		<section class="mb-12 animate-fade-up" style="animation-delay: 0.2s;">
			<div class="rounded-2xl border border-[var(--color-divider)] px-5 py-5 md:px-6">
				<div class="mb-4 flex items-end justify-between gap-4">
					<div>
						<span class="text-[10px] font-black tracking-[0.25em] uppercase text-[var(--color-ink-ghost)]">Course Map</span>
						<h2 class="mt-1 text-xl font-black text-[var(--color-ink)]" style="font-family: var(--font-display);">The full path.</h2>
					</div>
					<div class="text-right">
						<span class="block text-[10px] font-bold text-[var(--color-ink-ghost)]">{courseTotal.pct}% complete</span>
						<span class="block text-xs font-bold text-[var(--color-ink-light)]">{courseTotal.learned}/{courseTotal.total} items</span>
					</div>
				</div>

				<div class="flex flex-wrap gap-1 rounded-[1.25rem] border border-[var(--color-divider)] bg-[var(--color-paper-warm)] p-1 mb-4" aria-label="Kotsu course timeline">
					{#each courseUnits as unit, unitIndex}
						{@const unitProgress = getCourseUnitProgress(unit, isLearned)}
						<a
							href={getCourseUnitHref(unit)}
							title={`${unit.title}: ${unitProgress.learned}/${unitProgress.total}`}
							aria-current={isNextUnit(unit) ? 'step' : undefined}
							class="group relative flex h-full min-w-12 flex-1 items-center justify-center overflow-hidden rounded-full text-[9px] font-black transition-all duration-200 hover:bg-[var(--color-paper-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ink)]"
							style="--unit-accent: {getPhaseColor(unit.phase)}; background: color-mix(in srgb, var(--unit-accent) 12%, var(--color-paper));"
						>
							<span
								class="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-[var(--ease-out-expo)]"
								style="width: {unitProgress.pct}%; background-color: var(--unit-accent); opacity: {unitProgress.status === 'fresh' ? 0.25 : 0.9};"
							></span>
							<span class="relative z-10 text-[var(--color-ink)]">{unitIndex + 1}</span>
							{#if isNextUnit(unit)}
								<span class="absolute inset-0 rounded-full ring-2 ring-[var(--color-ink)]"></span>
							{/if}
						</a>
					{/each}
				</div>

				<!-- Phase legend -->
				<div class="flex flex-wrap gap-4">
					{#each Object.entries(phaseColors) as [phase, color]}
						<div class="flex items-center gap-1.5">
							<span class="h-2 w-2 rounded-full" style="background: {color};"></span>
							<span class="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--color-ink-ghost)]">{phase}</span>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ─── AWARDS (if any unlocked) ─── -->
		{#if unlockedAwards.length > 0}
		<section class="mb-12 animate-fade-up" style="animation-delay: 0.22s;">
			<div class="rounded-2xl border border-[var(--color-divider)] bg-[var(--color-paper-warm)] px-5 py-5">
				<div class="mb-4 flex items-end justify-between gap-3">
					<div>
						<span class="text-[10px] font-black tracking-[0.24em] uppercase text-[var(--color-ink-ghost)]">Awards</span>
						<h2 class="mt-1 text-xl font-black text-[var(--color-ink)]" style="font-family: var(--font-display);">Make category clears feel earned.</h2>
					</div>
					<span class="rounded-full border border-[var(--color-divider)] px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink-light)]">
						{unlockedAwards.length} unlocked
					</span>
				</div>
				<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
					{#each unlockedAwards.slice(0, 6) as award}
						<div class="rounded-xl border border-[var(--color-divider)] bg-[var(--color-paper)] px-4 py-4" style="box-shadow: inset 0 0 0 1px color-mix(in srgb, {award.accent} 14%, transparent);">
							<div class="flex items-start justify-between gap-3">
								<div>
									<span class="text-[10px] font-bold tracking-[0.22em] uppercase" style="color: {award.accent};">{award.titleJp}</span>
									<h3 class="mt-1 text-lg font-black text-[var(--color-ink)]">{award.title}</h3>
								</div>
								<span class="flex h-10 w-10 items-center justify-center rounded-full text-xl" style="background: color-mix(in srgb, {award.accent} 14%, var(--color-paper)); color: {award.accent};">{award.icon}</span>
							</div>
							<p class="mt-2 text-sm leading-6 text-[var(--color-ink-light)]">{award.description}</p>
							<div class="mt-3 flex items-center justify-between gap-3">
								<span class="text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink-ghost)]">{award.progressLabel}</span>
								<span class="rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink)]" style="background: color-mix(in srgb, {award.accent} 10%, var(--color-paper));">{award.rarity}</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>
		{/if}

		<!-- ─── COURSE TREE (full detail) ─── -->
		<section class="mb-12 animate-fade-up" style="animation-delay: 0.25s;">
			<div class="mb-5">
				<h2 class="text-2xl font-black text-[var(--color-ink)]" style="font-family: var(--font-display);">Course Tree</h2>
				<p class="mt-1 text-sm leading-6 text-[var(--color-ink-light)]">
					A trunk for required order, branches for nearby ideas. Follow the numbers.
				</p>
			</div>
			<div class="space-y-2.5">
				{#each courseUnits as unit, unitIndex}
					{@const unitProgress = getCourseUnitProgress(unit, isLearned)}
					<a
						href={getCourseUnitHref(unit)}
						class="group grid gap-4 rounded-xl border border-[var(--color-divider)] px-4 py-4 transition-all duration-200 hover:bg-[var(--color-paper-warm)] press-scale sm:grid-cols-[44px_minmax(0,1fr)_auto] {unit.lane === 'branch' ? 'sm:ml-8' : ''}"
						style="--unit-accent: {getPhaseColor(unit.phase)};"
					>
						<span class="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-divider)] text-xs font-black text-[var(--color-ink)] transition-colors duration-200 group-hover:border-[var(--unit-accent)]" style="background: color-mix(in srgb, var(--unit-accent) 10%, var(--color-paper));">
							{unitIndex + 1}
						</span>

						<span class="min-w-0">
							<span class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
								<span class="text-lg font-black text-[var(--color-ink)]">{unit.title}</span>
								<span class="text-xl font-black leading-none {unit.phase === 'Beginner' || unit.phase === 'Words' ? 'kana-study-type' : ''}" style="font-family: {unit.phase === 'Beginner' || unit.phase === 'Words' ? 'var(--font-kana-study)' : 'var(--font-jp-brush)'}; color: var(--unit-accent);">{unit.titleJp}</span>
								<span class="rounded-full px-2 py-0.5 text-[9px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink-light)]" style="background: color-mix(in srgb, var(--unit-accent) 10%, var(--color-paper));">
									{unit.phase}
								</span>
							</span>
							<span class="mt-1 block text-sm leading-6 text-[var(--color-ink-light)]">{unit.summary}</span>
							<span class="mt-3 flex flex-wrap gap-1.5">
								{#each getCoursePreview(unit) as preview}
									<span class="flex h-8 min-w-8 items-center justify-center rounded-md border border-[var(--color-divider)] px-2 text-lg font-black leading-none text-[var(--color-ink)] {unit.phase === 'Beginner' || unit.phase === 'Words' ? 'kana-study-type' : ''}" style="font-family: {unit.phase === 'Beginner' || unit.phase === 'Words' ? 'var(--font-kana-study)' : 'var(--font-jp-brush)'};">
										{preview}
									</span>
								{/each}
							</span>
						</span>

						<span class="flex items-start justify-between gap-3 sm:flex-col sm:items-end">
							<span class="text-[10px] font-bold tracking-[0.18em] uppercase" style="color: var(--unit-accent);">{getStatusLabel(unitProgress)}</span>
							<span class="h-1.5 w-24 overflow-hidden rounded-full bg-[var(--color-divider)]">
								<span class="block h-full rounded-full transition-all duration-500 ease-[var(--ease-out-expo)]" style="width: {unitProgress.pct}%; background-color: var(--unit-accent);"></span>
							</span>
						</span>
					</a>
				{/each}
			</div>
		</section>

		<!-- ─── WORD COLLECTION ─── -->
		<section class="mb-12">
			<WordCollection />
		</section>

		<footer class="mt-8 border-t border-[var(--color-divider)] py-5 text-center">
			<p class="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--color-ink-ghost)]">
				<a href="https://github.com/mager/kotsu" target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-[var(--color-shu)]">誇りを持ってオープンソース</a>
				<span> · </span>
				<a href="https://x.com/mager" target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-[var(--color-shu)]">@mager</a>
				<span> with help from </span>
				<a href="https://x.com/magerbot" target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-[var(--color-shu)]">@magerbot</a>
			</p>
		</footer>
	</div>
</div>

<style>
	.home-content-shell {
		max-width: calc(100vw - 2rem);
	}

	@media (min-width: 768px) {
		.home-content-shell {
			max-width: 72rem;
		}
	}

	/* Hero kanji animation */
	.hero-kanji-char {
		transition: opacity 0.3s ease, transform 0.3s ease;
	}
	.hero-char-visible {
		opacity: 1;
		transform: scale(1) translateY(0);
	}
	.hero-char-hidden {
		opacity: 0;
		transform: scale(0.88) translateY(6px);
	}

	/* Indicator dots */
	.dot {
		width: 5px;
		height: 5px;
		border-radius: 9999px;
	}
	.dot-active {
		width: 14px;
	}

	/* Etymology spotlight transitions */
	.spot-kanji-wrap,
	.spot-kanji-wrap ~ div {
		transition: opacity 0.2s ease, transform 0.2s ease;
	}
	.spot-visible {
		opacity: 1;
		transform: translateY(0);
	}
	.spot-hidden {
		opacity: 0;
		transform: translateY(4px);
	}

	/* Section card hover shadow */
	@media (prefers-color-scheme: dark) {
		.section-card:hover {
			box-shadow: 0 0 0 1px color-mix(in srgb, var(--card-accent) 40%, transparent), 0 8px 24px -8px color-mix(in srgb, var(--card-accent) 20%, transparent);
		}
	}
	@media (prefers-color-scheme: light) {
		.section-card:hover {
			box-shadow: 0 0 0 1px color-mix(in srgb, var(--card-accent) 40%, transparent), 0 8px 24px -8px rgba(0,0,0,0.1);
		}
	}

	/* Stagger animation delay for section cards */
	.section-cards-grid > :nth-child(1) { animation-delay: 0.10s; }
	.section-cards-grid > :nth-child(2) { animation-delay: 0.13s; }
	.section-cards-grid > :nth-child(3) { animation-delay: 0.16s; }
	.section-cards-grid > :nth-child(4) { animation-delay: 0.19s; }
	.section-cards-grid > :nth-child(5) { animation-delay: 0.22s; }
</style>
