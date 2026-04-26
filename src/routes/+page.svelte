<script lang="ts">
	import { columns } from '$lib/data';
	import WordSearch from '$lib/components/WordSearch.svelte';
	import WordCollection from '$lib/components/WordCollection.svelte';
	import CharacterBrowser from '$lib/components/CharacterBrowser.svelte';
	import {
		getAuthState,
		getColumnProgress,
		getTotalProgress,
		isLearned
	} from '$lib/stores/auth.svelte';
	import { getColumnItems } from '$lib/data';
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
	import { signInWithGoogle, signOut } from '$lib/firebase';

	let activeView = $state<string>('home');
	let auth = $derived(getAuthState());
	let total = $derived(getTotalProgress());
	let progressPct = $derived(total.total > 0 ? Math.round((total.learned / total.total) * 100) : 0);
	let courseTotal = $derived(getCourseTotalProgress(isLearned));
	let nextUnit = $derived(getNextCourseUnit(isLearned));
	let nextProgress = $derived(getCourseUnitProgress(nextUnit, isLearned));
	let completedUnits = $derived(
		courseUnits.filter((unit) => getCourseUnitProgress(unit, isLearned).status === 'complete').length
	);

	let activeColumn = $derived(
		activeView !== 'home' ? columns.find((c) => c.id === activeView) || null : null
	);

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

	async function handleSignIn() {
		try { await signInWithGoogle(); } catch (e) { console.error('Sign in failed:', e); }
	}
</script>

<!-- Mobile: 1 column, Desktop: sidebar + content -->
<div class="grid min-h-screen grid-cols-1 md:grid-cols-[260px_1fr]">

	<!-- Sidebar / Nav -->
	<nav class="flex flex-col border-b border-[var(--color-divider)] bg-[var(--color-paper)] px-4 py-4 md:sticky md:top-0 md:h-screen md:overflow-y-auto md:border-b-0 md:border-r md:px-5 md:py-6">
		<!-- Logo -->
		<div class="flex items-center justify-between md:mb-6">
			<a href="/" class="group inline-flex items-baseline gap-2">
				<span
					class="logo-jp text-3xl font-black leading-none md:text-4xl"
					style="font-family: var(--font-jp-brush); color: var(--color-shu);"
				>コツ</span>
				<span class="text-sm font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">
					Kotsu
				</span>
			</a>

			<!-- Mobile user area -->
			<div class="flex items-center gap-3 md:hidden">
				{#if auth.user}
					{#if auth.user.photoURL}
						<img src={auth.user.photoURL} alt="" class="h-6 w-6 rounded-full ring-1 ring-[var(--color-divider)]" />
					{/if}
					<button
						onclick={() => signOut()}
						class="cursor-pointer text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--color-ink-ghost)] press-scale"
					>Sign out</button>
				{:else if !auth.loading}
					<button onclick={handleSignIn} class="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--color-ink)] press-scale">Sign in</button>
				{/if}
			</div>
		</div>

		<!-- Mobile: horizontal scroll nav -->
		<div class="mt-3 flex gap-2 overflow-x-auto no-scrollbar md:mt-0 md:flex-col md:gap-1">
			<!-- Home -->
			<button
				class="shrink-0 cursor-pointer rounded-lg px-3 py-2 text-left transition-all duration-200 press-scale
					{activeView === 'home' ? 'bg-[var(--color-paper-warm)]' : 'hover:bg-[var(--color-paper-warm)]'}
					md:flex md:w-full md:items-center md:gap-3"
					onclick={() => (activeView = 'home')}
				>
					<span class="text-sm font-bold tracking-[0.1em] uppercase text-[var(--color-ink)]">Course</span>
					<span class="hidden text-xs text-[var(--color-ink-light)] md:block">部首の道</span>
				</button>

			<div class="hidden md:mx-3 md:my-2 md:block md:h-px md:bg-[var(--color-divider)]"></div>

			<!-- Column nav items -->
			{#each columns as col}
				{@const items = getColumnItems(col)}
				{@const progress = getColumnProgress(col.id, items.length)}
				{@const isActive = activeView === col.id}
				<button
					class="shrink-0 cursor-pointer rounded-lg px-3 py-2 text-left transition-all duration-200 press-scale
						{isActive ? 'bg-[var(--color-paper-warm)]' : 'hover:bg-[var(--color-paper-warm)]'}
						md:flex md:w-full md:items-center md:gap-3"
					onclick={() => (activeView = col.id)}
				>
					<!-- Accent bar (desktop only) -->
					<div
						class="hidden h-8 w-[3px] rounded-full md:block"
						style="background-color: {accentColors[col.id]}; opacity: {isActive ? 1 : 0.25};"
					></div>

					<div class="md:flex-1 md:min-w-0">
						<div class="flex items-baseline gap-2">
							<span
								class="text-lg font-black leading-none md:text-xl"
								style="font-family: var(--font-jp-brush); color: {isActive ? accentColors[col.id] : 'var(--color-ink)'};"
							>{col.titleJp}</span>
							<span class="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--color-ink-ghost)]">
								{col.title}
							</span>
						</div>
						<span class="mt-0.5 hidden text-[10px] text-[var(--color-ink-light)] md:block">{col.hint}</span>
					</div>

					<!-- Progress ring (desktop) -->
					{#if auth.user && progress > 0}
						<div class="hidden items-center gap-1 md:flex">
							<svg class="progress-ring" width="20" height="20" viewBox="0 0 20 20">
								<circle cx="10" cy="10" r="8" fill="none" stroke="var(--color-divider)" stroke-width="2" />
								<circle
									cx="10" cy="10" r="8" fill="none"
									stroke={accentColors[col.id]}
									stroke-width="2"
									stroke-linecap="round"
									stroke-dasharray={2 * Math.PI * 8}
									stroke-dashoffset={2 * Math.PI * 8 * (1 - progress / items.length)}
								/>
							</svg>
						</div>
					{/if}
				</button>
			{/each}
		</div>

		<!-- Desktop: total progress -->
		{#if auth.user && total.learned > 0}
			<div class="hidden md:mt-6 md:block">
				<div class="flex items-center justify-between mb-1.5">
					<span class="text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--color-ink-ghost)]">Progress</span>
					<span class="text-xs font-bold text-[var(--color-ink-light)]">{total.learned}/{total.total}</span>
				</div>
				<div class="h-[3px] w-full overflow-hidden rounded-full bg-[var(--color-divider)]">
					<div
						class="neon-progress h-full rounded-full transition-all duration-700 ease-[var(--ease-out-expo)]"
						style="width: {progressPct}%; background: linear-gradient(90deg, var(--color-shu), var(--color-kitsune), var(--color-asagi));"
					></div>
				</div>
			</div>
		{/if}

		<!-- Desktop: user area -->
		<div class="mt-auto hidden border-t border-[var(--color-divider)] pt-4 md:block" style="margin-top: auto;">
			{#if auth.loading}
				<div class="h-8 animate-pulse rounded bg-[var(--color-divider)]"></div>
			{:else if auth.user}
				<div class="flex items-center gap-3">
					{#if auth.user.photoURL}
						<img src={auth.user.photoURL} alt="" class="h-7 w-7 rounded-full ring-1 ring-[var(--color-divider)]" />
					{/if}
					<div class="flex-1 min-w-0">
						<span class="block text-xs font-bold text-[var(--color-ink)] truncate">{auth.user.displayName?.split(' ')[0]}</span>
					</div>
					<button
						onclick={() => signOut()}
						class="text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--color-ink-ghost)] transition-colors hover:text-[var(--color-ink)] press-scale"
					>Sign out</button>
				</div>
			{:else}
				<button
					class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--color-divider)] px-4 py-2.5 text-xs font-bold tracking-[0.1em] uppercase text-[var(--color-ink)] transition-all duration-200 hover:border-[var(--color-ai)] hover:shadow-sm press-scale"
					style="background: var(--button-bg);"
					onclick={handleSignIn}
				>
					<svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
						<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
						<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
						<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
						<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
					</svg>
					Sign in with Google
				</button>
			{/if}
		</div>
	</nav>

	<!-- Main content -->
	<div class="px-4 py-8 md:px-8 md:py-10">
		<div class="mx-auto {activeView === 'home' ? 'max-w-6xl' : 'max-w-3xl'}">
			{#if activeView === 'home'}
				<section class="animate-fade-up">
					<div class="mb-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
						<div class="max-w-3xl">
							<div class="mb-3 flex flex-wrap items-center gap-2">
								<span class="rounded-full border border-[var(--color-divider)] px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-light)]">
									部首の道
								</span>
								<span class="rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink)]" style="background: color-mix(in srgb, var(--color-matcha) 14%, var(--color-paper));">
									radicals first
								</span>
							</div>
							<h1 class="max-w-2xl text-4xl font-black leading-[1.02] md:text-6xl" style="font-family: var(--font-display);">
								Learn kanji through radicals.
							</h1>
							<p class="mt-4 max-w-2xl text-base leading-7 text-[var(--color-ink-light)] md:text-lg">
								Kotsu starts with beginner sounds, then turns radicals into kanji families, readings, and real words. The path branches, but every branch counts toward the full course.
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
						<div class="no-scrollbar flex h-8 gap-1 overflow-x-auto rounded-full border border-[var(--color-divider)] bg-[var(--color-paper-warm)] p-1" aria-label="Kotsu course timeline">
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
							<span class="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">Focus</span>
							<span class="mt-1 block text-2xl font-black text-[var(--color-matcha)]">部首</span>
						</div>
					</div>
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
											<span class="text-xl font-black leading-none" style="font-family: var(--font-jp-brush); color: var(--unit-accent);">{unit.titleJp}</span>
											<span class="rounded-full px-2 py-0.5 text-[9px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink-light)]" style="background: color-mix(in srgb, var(--unit-accent) 10%, var(--color-paper));">
												{unit.phase}
											</span>
										</span>
										<span class="mt-1 block text-sm leading-6 text-[var(--color-ink-light)]">{unit.summary}</span>
										<span class="mt-3 flex flex-wrap gap-1.5">
											{#each getCoursePreview(unit) as preview}
												<span class="flex h-8 min-w-8 items-center justify-center rounded-md border border-[var(--color-divider)] px-2 text-lg font-black leading-none text-[var(--color-ink)]" style="font-family: var(--font-jp-brush);">
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
									<div class="rounded-lg border border-[var(--color-divider)] px-4 py-3">
										<div class="flex flex-wrap items-center gap-2">
											{#each recipe.parts as part, partIndex}
												<span class="text-2xl font-black leading-none text-[var(--color-ink)]" style="font-family: var(--font-jp-brush);">{part}</span>
												{#if partIndex < recipe.parts.length - 1}
													<span class="text-xs font-black text-[var(--color-ink-ghost)]">+</span>
												{/if}
											{/each}
											<span class="text-xs font-black text-[var(--color-ink-ghost)]">=</span>
											<span class="text-3xl font-black leading-none text-[var(--color-matcha)]" style="font-family: var(--font-jp-brush);">{recipe.result}</span>
											<span class="text-sm font-bold text-[var(--color-ink)]">{recipe.meaning}</span>
										</div>
										<p class="mt-2 text-xs leading-5 text-[var(--color-ink-light)]">{recipe.pattern}</p>
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

				<section class="mt-12 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.75fr)]">
					<div>
						<div class="mb-4 flex items-baseline gap-3">
							<h2 class="text-2xl font-black text-[var(--color-ink)]" style="font-family: var(--font-display);">Lookup Bench</h2>
							<span class="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">語彙</span>
						</div>
						<WordSearch />
					</div>

					<div>
						<WordCollection />
					</div>
				</section>

				<footer class="mt-12 border-t border-[var(--color-divider)] py-5 text-center">
					<a
						href="https://github.com/magerbot"
						target="_blank"
						rel="noopener noreferrer"
						class="text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink-ghost)] transition-colors hover:text-[var(--color-shu)]"
					>
						built by @magerbot
					</a>
				</footer>
			{:else if activeColumn}
				<!-- Character Browser -->
				<CharacterBrowser column={activeColumn} />
			{/if}
		</div>
	</div>
</div>
