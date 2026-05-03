<script lang="ts">
	import { page } from '$app/stores';
	import { signInWithGoogle } from '$lib/firebase';
	import { getAuthState, getColumnProgress } from '$lib/stores/auth.svelte';
	import { columns, getColumnItems, type Column } from '$lib/data';
	import WordSearch from '$lib/components/WordSearch.svelte';

	let auth = $derived(getAuthState());
	let activeColumn = $derived(typeof $page.params.column === 'string' ? $page.params.column : null);

	let totalLearned = $derived(
		columns.reduce((sum, col) => sum + getColumnProgress(col.id, getColumnItems(col).length), 0)
	);
	let totalItems = $derived(
		columns.reduce((sum, col) => sum + getColumnItems(col).length, 0)
	);
	let progressPct = $derived(totalItems > 0 ? Math.round((totalLearned / totalItems) * 100) : 0);

	const accentColors: Record<string, string> = {
		hiragana: 'var(--color-shu)',
		katakana: 'var(--color-ai)',
		radicals: 'var(--color-matcha)',
		kanji: 'var(--color-fuji)',
		vocabulary: 'var(--color-asagi)'
	};

	function getColumnHref(column: Column): string {
		return `/${column.id}/0`;
	}

	async function handleSignIn() {
		try {
			await signInWithGoogle();
		} catch (e) {
			console.error('Sign in failed:', e);
		}
	}
</script>

<nav class="global-nav sticky top-0 z-50 border-b border-[var(--color-divider)] bg-[var(--color-paper)]">
	<div class="global-nav-shell">
		<div class="nav-row">
			<a href="/" class="brand-lockup group" aria-label="Kotsu home">
				<span
					class="logo-jp text-2xl font-black leading-none transition-transform duration-200 group-hover:-translate-y-0.5 md:text-[1.7rem]"
					style="font-family: var(--font-jp-brush); color: var(--color-shu);"
				>
					コツ
				</span>
				<span class="text-[0.68rem] font-black tracking-[0.2em] uppercase text-[var(--color-ink-mid)]">
					Kotsu
				</span>
			</a>

			<div class="nav-search">
				<WordSearch variant="header" />
			</div>

			<div class="nav-account">
				{#if auth.loading}
					<span class="h-4 w-16 animate-pulse rounded bg-[var(--color-divider)]"></span>
				{:else if auth.user}
					{#if totalLearned > 0}
						<div class="progress-mini" aria-label="{totalLearned} of {totalItems} learned">
							<div class="h-1 w-16 overflow-hidden rounded-full bg-[var(--color-divider)] md:w-20">
								<div
									class="neon-progress h-full rounded-full transition-all duration-700 ease-out"
									style="width: {progressPct}%; background: linear-gradient(90deg, var(--color-shu), var(--color-asagi));"
								></div>
							</div>
							<span class="text-[10px] font-bold tracking-wide text-[var(--color-ink-light)]">
								{totalLearned}/{totalItems}
							</span>
						</div>
					{/if}

					<a
						href="/profile"
						class="profile-link"
					>
						{#if auth.user.photoURL}
							<img
								src={auth.user.photoURL}
								alt=""
								class="h-6 w-6 rounded-full ring-1 ring-[var(--color-divider)]"
							/>
						{/if}
						<span class="hidden md:inline">{auth.user.displayName?.split(' ')[0]}</span>
					</a>
				{:else}
					<button
						class="signin-button"
						style="background: var(--button-bg);"
						onclick={handleSignIn}
						title="Sign in with Google"
					>
						<svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
							<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
							<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
							<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
						</svg>
						<span class="hidden sm:inline">Sign in</span>
					</button>
				{/if}
			</div>
		</div>

		<div class="course-rail no-scrollbar" aria-label="Course navigation">
			{#each columns as col}
				{@const progress = getColumnProgress(col.id, getColumnItems(col).length)}
				{@const isActive = activeColumn === col.id}
				<a
					href={getColumnHref(col)}
					class="course-pill {isActive ? 'is-active' : ''}"
					style="--pill-accent: {accentColors[col.id]};"
					aria-current={isActive ? 'page' : undefined}
				>
					<span class="course-pill-jp {col.id === 'hiragana' || col.id === 'katakana' ? 'kana-study-type' : ''}">{col.titleJp}</span>
					<span>{col.title}</span>
					{#if auth.user && progress > 0}
						<span class="course-pill-count">{progress}</span>
					{/if}
				</a>
			{/each}
		</div>
	</div>
</nav>

<style>
	.global-nav {
		box-shadow: 0 1px 0 color-mix(in srgb, var(--color-ink) 4%, transparent);
	}

	.global-nav-shell {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		padding: 0.65rem 1rem 0.55rem;
	}

	.nav-row {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
		gap: 0.75rem;
	}

	.brand-lockup,
	.profile-link,
	.course-pill {
		text-decoration: none;
	}

	.brand-lockup {
		display: inline-flex;
		align-items: baseline;
		gap: 0.55rem;
		min-width: max-content;
	}

	.nav-search {
		grid-column: 1 / -1;
		min-width: 0;
		width: 100%;
	}

	.nav-account {
		display: flex;
		align-items: center;
		justify-self: end;
		gap: 0.9rem;
		min-width: max-content;
	}

	.progress-mini,
	.profile-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.profile-link {
		color: var(--color-ink-mid);
		font-size: 0.85rem;
		font-weight: 800;
		transition: color 160ms ease;
	}

	.profile-link:hover,
	.profile-link:focus-visible {
		color: var(--color-ink);
		outline: none;
	}

	.signin-button {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		border: 1px solid var(--color-divider);
		border-radius: 9999px;
		padding: 0.5rem 0.7rem;
		color: var(--color-ink);
		font-size: 0.68rem;
		font-weight: 900;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		transition:
			transform 160ms var(--ease-out-expo),
			border-color 160ms ease,
			box-shadow 160ms ease;
	}

	.signin-button:hover,
	.signin-button:focus-visible {
		border-color: var(--color-ai);
		box-shadow: 0 8px 22px color-mix(in srgb, var(--color-ai) 10%, transparent);
		outline: none;
		transform: translateY(-1px);
	}

	.course-rail {
		display: flex;
		gap: 0.35rem;
		margin-inline: -0.15rem;
		overflow-x: auto;
		padding: 0.05rem 0.15rem 0.15rem;
	}

	.course-pill {
		--pill-accent: var(--color-ink);
		display: inline-flex;
		flex: 0 0 auto;
		align-items: center;
		gap: 0.42rem;
		min-height: 2rem;
		border: 1px solid transparent;
		border-radius: 9999px;
		padding: 0.35rem 0.62rem;
		color: var(--color-ink-light);
		font-size: 0.62rem;
		font-weight: 900;
		letter-spacing: 0.14em;
		line-height: 1;
		text-transform: uppercase;
		transition:
			transform 160ms var(--ease-out-expo),
			border-color 160ms ease,
			background 160ms ease,
			color 160ms ease;
	}

	.course-pill-jp {
		color: var(--pill-accent);
		font-family: var(--font-jp-brush);
		font-size: 1rem;
		font-weight: 900;
		letter-spacing: 0;
		line-height: 1;
		opacity: 0.72;
		text-transform: none;
	}

	.course-pill-jp.kana-study-type {
		font-family: var(--font-kana-study);
		font-weight: 700;
	}

	.course-pill-count {
		display: grid;
		min-width: 1rem;
		height: 1rem;
		place-items: center;
		border-radius: 9999px;
		background: color-mix(in srgb, var(--pill-accent) 10%, var(--color-paper));
		color: var(--color-ink-mid);
		font-size: 0.56rem;
		letter-spacing: 0;
	}

	.course-pill:hover,
	.course-pill:focus-visible,
	.course-pill.is-active {
		border-color: color-mix(in srgb, var(--pill-accent) 28%, var(--color-divider));
		background: color-mix(in srgb, var(--pill-accent) 7%, var(--color-paper));
		color: var(--color-ink);
		outline: none;
		transform: translateY(-1px);
	}

	.course-pill.is-active .course-pill-jp {
		opacity: 1;
	}

	@media (min-width: 768px) {
		.global-nav-shell {
			gap: 0.45rem;
			padding: 0.7rem 2rem 0.6rem;
		}

		.nav-row {
			grid-template-columns: minmax(7rem, auto) minmax(18rem, 1fr) minmax(7rem, auto);
			gap: 1.25rem;
		}

		.nav-search {
			grid-column: auto;
			justify-self: center;
			max-width: 58rem;
		}

		.course-rail {
			justify-content: center;
			margin-inline: 0;
		}

		.course-pill {
			padding-inline: 0.72rem;
		}
	}

	@media (min-width: 1280px) {
		.global-nav-shell {
			padding-inline: 3rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.logo-jp,
		.signin-button,
		.course-pill {
			transition: none;
		}

		.signin-button:hover,
		.course-pill:hover,
		.course-pill:focus-visible,
		.course-pill.is-active {
			transform: none;
		}
	}
</style>
