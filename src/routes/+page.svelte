<script lang="ts">
	import { columns } from '$lib/data';
	import WordSearch from '$lib/components/WordSearch.svelte';
	import WordCollection from '$lib/components/WordCollection.svelte';
	import CharacterBrowser from '$lib/components/CharacterBrowser.svelte';
	import { getAuthState, getColumnProgress, getTotalProgress } from '$lib/stores/auth.svelte';
	import { getColumnItems } from '$lib/data';
	import { signInWithGoogle, signOut } from '$lib/firebase';

	let activeView = $state<string>('home');
	let auth = $derived(getAuthState());
	let total = $derived(getTotalProgress());
	let progressPct = $derived(total.total > 0 ? Math.round((total.learned / total.total) * 100) : 0);

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
						class="text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--color-ink-ghost)] press-scale"
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
				class="shrink-0 rounded-lg px-3 py-2 text-left transition-all duration-200 press-scale
					{activeView === 'home' ? 'bg-[var(--color-paper-warm)]' : 'hover:bg-[var(--color-paper-warm)]'}
					md:flex md:w-full md:items-center md:gap-3"
				onclick={() => (activeView = 'home')}
			>
				<span class="text-sm font-bold tracking-[0.1em] uppercase text-[var(--color-ink)]">My Words</span>
				<span class="hidden text-xs text-[var(--color-ink-light)] md:block">私の言葉</span>
			</button>

			<div class="hidden md:mx-3 md:my-2 md:block md:h-px md:bg-[var(--color-divider)]"></div>

			<!-- Column nav items -->
			{#each columns as col}
				{@const items = getColumnItems(col)}
				{@const progress = getColumnProgress(col.id, items.length)}
				{@const isActive = activeView === col.id}
				<button
					class="shrink-0 rounded-lg px-3 py-2 text-left transition-all duration-200 press-scale
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
		<div class="mx-auto max-w-3xl">
			{#if activeView === 'home'}
				<!-- Hero -->
				<div class="mb-8 text-center md:text-left">
					<h1 class="text-4xl font-black leading-tight md:text-5xl" style="font-family: var(--font-display);">
						<span class="text-[var(--color-ink)]">Your</span>
						<span class="text-5xl md:text-6xl" style="font-family: var(--font-jp-brush); color: var(--color-shu);">
							日本語
						</span>
						<span class="text-[var(--color-ink)]">journey</span>
					</h1>
					<p class="mt-3 text-base text-[var(--color-ink-light)] md:text-lg" style="font-family: var(--font-display); font-style: italic;">
						Search, save, and master — one word at a time
					</p>
				</div>

				<!-- Word Search -->
				<WordSearch />

				<!-- Saved Words Collection -->
				<WordCollection />

				<!-- Explore Characters (logged out or loading) -->
				{#if !auth.user || auth.loading}
					<div class="mt-16">
						<h2 class="mb-6 text-center text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-ink-ghost)]">
							Explore Characters
						</h2>
						<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
							{#each columns as col, i}
								<button
									class="drift-card group rounded-xl px-4 py-5 text-center transition-all duration-200 hover:border-[var(--color-ai)] press-scale"
									onclick={() => (activeView = col.id)}
								>
									<span
										class="block text-3xl font-black leading-none transition-transform duration-200 group-hover:scale-110 md:text-4xl"
										style="font-family: var(--font-jp-brush); color: var(--color-col-{col.id});"
									>{col.titleJp}</span>
									<span class="mt-2 block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">{col.title}</span>
								</button>
							{/each}
						</div>
					</div>
				{/if}
			{:else if activeColumn}
				<!-- Character Browser -->
				<CharacterBrowser column={activeColumn} />
			{/if}
		</div>
	</div>
</div>
