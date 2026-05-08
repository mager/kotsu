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

	const columnChips: Record<string, string[]> = {
		hiragana: ['sounds', 'rows', 'starter'],
		katakana: ['mirror set', 'loanwords', 'contrast'],
		radicals: ['meaning pieces', 'recipes', 'families'],
		kanji: ['N5', 'readings', 'core set'],
		vocabulary: ['daily words', 'chunks', 'recall']
	};

	const studySprints = [
		{
			title: '5-minute warm-up',
			jp: '準備',
			description: 'Run one sound unit, then one matching katakana branch while the contrast is still fresh.',
			accent: 'var(--color-ai)',
			href: '/hiragana/0'
		},
		{
			title: 'Radical recipe loop',
			jp: '組み立て',
			description: 'Spot a radical, recall the meaning, then jump into the kanji it unlocks.',
			accent: 'var(--color-matcha)',
			href: '/radicals/0'
		},
		{
			title: 'Read a real word',
			jp: 'ことば',
			description: 'Finish a short session by reading one usable word chunk without spelling it out.',
			accent: 'var(--color-asagi)',
			href: '/vocabulary/0'
		}
	];

	function getPhaseColor(phase: string): string {
		return phaseColors[phase] ?? 'var(--color-ink)';
	}

	function getColumnSummary(column: Column): string {
		switch (column.id) {
			case 'hiragana':
				return 'Structured kana rows with voiced sounds, contractions, and doubles grouped into one clear path.';
			case 'katakana':
				return 'A mirror course for borrowed sounds so learners can compare shape, sound, and usage side by side.';
			case 'radicals':
				return 'Semantic building blocks taught as reusable parts, not isolated trivia.';
			case 'kanji':
				return 'Starter kanji ordered to feel reachable, with readings and meaning attached early.';
			case 'vocabulary':
				return 'Short everyday words and greetings that make the symbols feel immediately useful.';
			default:
				return column.hint;
		}
	}

	function getColumnHref(column: Column): string {
		const items = getColumnItems(column);
		const firstUnlearnedIndex = items.findIndex((_, index) => !isLearned(column.id, index));
		const startIndex = auth.user && firstUnlearnedIndex !== -1 ? firstUnlearnedIndex : 0;
		return `/${column.id}/${startIndex}`;
	}

	function getStatusLabel(progress: CourseProgress): string {
		if (progress.status === 'complete') return 'Complete';
		if (progress.status === 'active') return `${progress.pct}% learned`;
		return 'Ready';
	}

	function isNextUnit(unit: CourseUnit): boolean {
		return unit.id === nextUnit.id;
	}
</script>

<div class="home-page max-w-full overflow-x-clip px-4 pt-8 pb-[calc(env(safe-area-inset-bottom)+2rem)] md:px-8 md:py-10">
	<div class="home-content-shell mx-auto w-full">
		<section class="animate-fade-up">
			<div class="mb-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
				<div class="max-w-3xl">
					<h1 class="max-w-2xl text-4xl font-black leading-[1.02] md:text-6xl" style="font-family: var(--font-display);">
						Japanese that actually clicks.
					</h1>
					<p class="mt-4 max-w-2xl text-base leading-7 text-[var(--color-ink-light)] md:text-lg">
						Kotsu turns kana, radicals, kanji, and useful words into one serious little study system, built for quick sessions before Japan and the long game after.
					</p>
				</div>

				<a
					href={getCourseUnitHref(nextUnit)}
					class="group inline-flex shrink-0 items-center justify-between gap-5 rounded-xl border border-[var(--color-divider)] px-5 py-4 text-left transition-all duration-200 hover:border-[var(--color-matcha)] hover:bg-[var(--color-paper-warm)] press-scale lg:min-w-[260px]"
				>
					<span>
						<span class="block text-[10px] font-bold tracking-[0.22em] uppercase text-[var(--color-ink-ghost)]">
							{auth.user ? 'Next lesson' : 'Start here'}
						</span>
						<span class="mt-1 block text-lg font-black text-[var(--color-ink)]">{nextUnit.title}</span>
						<span class="block text-sm text-[var(--color-ink-light)]">{nextProgress.learned}/{nextProgress.total} learned</span>
					</span>
					<span class="text-2xl leading-none transition-transform duration-200 group-hover:translate-x-1" style="color: {getPhaseColor(nextUnit.phase)};">→</span>
				</a>
			</div>

			<div class="mt-6">
				<div class="mb-2 flex items-center justify-between gap-4">
					<span class="text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--color-ink-light)]">Full course timeline</span>
					<span class="text-[10px] font-bold text-[var(--color-ink-light)]">{courseTotal.pct}%</span>
				</div>
				<div class="flex flex-wrap gap-1 rounded-[1.25rem] border border-[var(--color-divider)] bg-[var(--color-paper-warm)] p-1" aria-label="Kotsu course timeline">
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
			</div>

			<div class="mt-4 grid gap-2 sm:grid-cols-3">
				<div class="rounded-lg border border-[var(--color-divider)] px-4 py-3">
					<span class="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">Course</span>
					<span class="mt-1 block text-2xl font-black text-[var(--color-ink)]">{courseTotal.learned}/{courseTotal.total}</span>
				</div>
				<div class="rounded-lg border border-[var(--color-divider)] px-4 py-3">
					<span class="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">Map</span>
					<span class="mt-1 block text-2xl font-black text-[var(--color-ink)]">{completedUnits}/{courseUnits.length}</span>
				</div>
				<div class="rounded-lg border border-[var(--color-divider)] px-4 py-3">
					<span class="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">Awards</span>
					<span class="mt-1 block text-2xl font-black text-[var(--color-matcha)]">{unlockedAwards.length}</span>
				</div>
			</div>

			<section class="mt-5 rounded-[1.5rem] border border-[var(--color-divider)] bg-[var(--color-paper-warm)] px-4 py-4 md:px-5">
				<div class="flex flex-wrap items-end justify-between gap-3">
					<div>
						<span class="text-[10px] font-bold tracking-[0.24em] uppercase text-[var(--color-ink-ghost)]">Awards</span>
						<h2 class="mt-1 text-xl font-black text-[var(--color-ink)]" style="font-family: var(--font-display);">Make category clears feel earned.</h2>
					</div>
					<span class="rounded-full border border-[var(--color-divider)] px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink-light)]">
						{unlockedAwards.length} unlocked
					</span>
				</div>

				<div class="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
					<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
						{#if unlockedAwards.length > 0}
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
						{:else}
							<div class="rounded-xl border border-dashed border-[var(--color-divider)] px-4 py-5 sm:col-span-2 xl:col-span-3">
								<p class="text-sm font-bold text-[var(--color-ink)]">No awards yet — finish a category and Kotsu should hand you one.</p>
								<p class="mt-1 text-sm leading-6 text-[var(--color-ink-light)]">The first clear is the point: progress should feel ceremonial, not invisible.</p>
							</div>
						{/if}
					</div>

					<div class="rounded-xl border border-[var(--color-divider)] bg-[var(--color-paper)] px-4 py-4">
						<span class="text-[10px] font-bold tracking-[0.22em] uppercase text-[var(--color-ink-ghost)]">Chasing next</span>
						<div class="mt-3 space-y-3">
							{#each featuredLockedAwards as award}
								<div class="rounded-lg border border-dashed border-[var(--color-divider)] px-3 py-3 opacity-80">
									<div class="flex items-start justify-between gap-3">
										<div>
											<p class="text-sm font-black text-[var(--color-ink)]">{award.title}</p>
											<p class="text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink-ghost)]">{award.titleJp}</p>
										</div>
										<span class="rounded-full px-2 py-1 text-[9px] font-bold tracking-[0.16em] uppercase" style="background: color-mix(in srgb, {award.accent} 10%, var(--color-paper)); color: {award.accent};">{award.progressLabel}</span>
									</div>
									<p class="mt-2 text-xs leading-5 text-[var(--color-ink-light)]">{award.description}</p>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</section>
		</section>

		<section class="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
			<div>
				<div class="mb-4 flex items-end justify-between gap-4">
					<div>
						<h2 class="text-2xl font-black text-[var(--color-ink)]" style="font-family: var(--font-display);">Course Tree</h2>
						<p class="mt-1 text-sm leading-6 text-[var(--color-ink-light)]">
							A trunk for required order, branches for the nearby ideas that still belong to mastery.
						</p>
					</div>
				</div>

				<div class="space-y-3">
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
			</div>

			<div class="space-y-5">
				<section class="rounded-xl border border-[var(--color-divider)] px-5 py-5">
					<span class="text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--color-ink-ghost)]">Radical Recipes</span>
					<h2 class="mt-2 text-2xl font-black text-[var(--color-ink)]" style="font-family: var(--font-display);">Pieces become meaning.</h2>
					<div class="mt-4 space-y-3">
						{#each radicalRecipes as recipe}
							{@const resultHref = getCharacterHref(recipe.result, ['kanji', 'radicals'])}
							<div class="rounded-lg border border-[var(--color-divider)] px-4 py-3">
								<div class="flex flex-wrap items-center gap-2">
									{#each recipe.parts as part, partIndex}
										{@const partHref = getCharacterHref(part, ['radicals', 'kanji'])}
										{#if partHref}
											<a href={partHref} class="rounded-md px-1 text-2xl font-black leading-none text-[var(--color-ink)] transition-colors hover:bg-[var(--color-paper-warm)]" style="font-family: var(--font-jp-brush);">{part}</a>
										{:else}
											<span class="text-2xl font-black leading-none text-[var(--color-ink)]" style="font-family: var(--font-jp-brush);">{part}</span>
										{/if}
										{#if partIndex < recipe.parts.length - 1}
											<span class="text-xs font-black text-[var(--color-ink-ghost)]">+</span>
										{/if}
									{/each}
									<span class="text-xs font-black text-[var(--color-ink-ghost)]">=</span>
									{#if resultHref}
										<a href={resultHref} class="rounded-md px-1 text-3xl font-black leading-none text-[var(--color-matcha)] transition-colors hover:bg-[var(--color-paper-warm)]" style="font-family: var(--font-jp-brush);">{recipe.result}</a>
									{:else}
										<span class="text-3xl font-black leading-none text-[var(--color-matcha)]" style="font-family: var(--font-jp-brush);">{recipe.result}</span>
									{/if}
									<span class="text-sm font-bold text-[var(--color-ink)]">{recipe.meaning}</span>
								</div>
								<div class="mt-2 flex items-center justify-between gap-3">
									<p class="text-xs leading-5 text-[var(--color-ink-light)]">{recipe.pattern}</p>
									<a href="/recipes/{recipe.id}" class="shrink-0 text-[10px] font-black tracking-[0.16em] uppercase text-[var(--color-ink)] transition-colors hover:text-[var(--color-matcha)]">Open</a>
								</div>
							</div>
						{/each}
					</div>
				</section>

				<section class="rounded-xl border border-[var(--color-divider)] px-5 py-5">
					<span class="text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--color-ink-ghost)]">Study Loop</span>
					<div class="mt-4 grid gap-3">
						{#each ['shape', 'name', 'combine', 'read'] as step, stepIndex}
							<div class="flex items-center gap-3">
								<span class="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-paper-warm)] text-[10px] font-black text-[var(--color-ink)]">{stepIndex + 1}</span>
								<span class="text-sm font-bold capitalize text-[var(--color-ink)]">{step}</span>
							</div>
						{/each}
					</div>
				</section>
			</div>
		</section>

		<section class="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
			{#each columns as column}
				{@const items = getColumnItems(column)}
				<a
					href={getColumnHref(column)}
					class="group rounded-xl border border-[var(--color-divider)] px-5 py-5 transition-all duration-200 hover:bg-[var(--color-paper-warm)] press-scale"
				>
					<div class="flex items-start justify-between gap-4">
						<div>
							<div class="flex flex-wrap items-baseline gap-2">
								<span class="text-xl font-black text-[var(--color-ink)]">{column.title}</span>
								<span class="text-2xl font-black leading-none {column.id === 'hiragana' || column.id === 'katakana' ? 'kana-study-type' : ''}" style="font-family: {column.id === 'hiragana' || column.id === 'katakana' ? 'var(--font-kana-study)' : 'var(--font-jp-brush)'}; color: {accentColors[column.id]};">{column.titleJp}</span>
							</div>
							<p class="mt-2 text-sm leading-6 text-[var(--color-ink-light)]">{getColumnSummary(column)}</p>
						</div>
						<div class="text-right">
							<span class="block text-[10px] font-bold tracking-[0.22em] uppercase text-[var(--color-ink-ghost)]">Items</span>
							<span class="mt-1 block text-xl font-black text-[var(--color-ink)]">{items.length}</span>
						</div>
					</div>
					<div class="mt-4 flex flex-wrap gap-2">
						{#each column.sections as section}
							<span class="rounded-full border border-[var(--color-divider)] px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--color-ink-light)]">
								{section.title} · {section.items.length}
							</span>
						{/each}
					</div>
					<div class="mt-4 flex flex-wrap gap-2">
						{#each columnChips[column.id] ?? [] as chip}
							<span class="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink)]" style="background: color-mix(in srgb, {accentColors[column.id]} 10%, var(--color-paper));">
								{chip}
							</span>
						{/each}
					</div>
				</a>
			{/each}
		</section>

		<section class="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
			{#each studySprints as sprint}
				<a
					href={sprint.href}
					class="group rounded-xl border border-[var(--color-divider)] px-5 py-5 transition-all duration-200 hover:bg-[var(--color-paper-warm)] press-scale"
					style="background: color-mix(in srgb, {sprint.accent} 6%, var(--color-paper));"
				>
					<span class="text-[10px] font-bold tracking-[0.24em] uppercase" style="color: {sprint.accent};">{sprint.jp}</span>
					<h3 class="mt-2 text-xl font-black text-[var(--color-ink)]">{sprint.title}</h3>
					<p class="mt-2 text-sm leading-6 text-[var(--color-ink-light)]">{sprint.description}</p>
					<span class="mt-4 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] uppercase text-[var(--color-ink-ghost)] transition-colors group-hover:text-[var(--color-ink)]">
						start sprint <span aria-hidden="true">→</span>
					</span>
				</a>
			{/each}
		</section>

		<section class="mt-12">
			<WordCollection />
		</section>

		<footer class="mt-12 border-t border-[var(--color-divider)] py-5 text-center">
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
</style>
