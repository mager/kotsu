<script lang="ts">
	import { signInWithGoogle, signOut } from '$lib/firebase';
	import { getAuthState, getColumnProgress } from '$lib/stores/auth.svelte';
	import { columns } from '$lib/data';

	let auth = $derived(getAuthState());

	let totalLearned = $derived(
		columns.reduce((sum, col) => sum + getColumnProgress(col.id, col.items.length), 0)
	);
	let totalItems = $derived(
		columns.reduce((sum, col) => sum + col.items.length, 0)
	);
	let progressPct = $derived(totalItems > 0 ? Math.round((totalLearned / totalItems) * 100) : 0);

	let showTooltip = $state(false);

	async function handleSignIn() {
		try {
			await signInWithGoogle();
		} catch (e) {
			console.error('Sign in failed:', e);
		}
	}
</script>

<nav class="flex items-center justify-between px-5 py-4 md:px-10 md:py-5">
	<!-- Logo -->
	<a
		href="/"
		class="group relative"
		onmouseenter={() => (showTooltip = true)}
		onmouseleave={() => (showTooltip = false)}
	>
		<span
			class="text-2xl font-black transition-transform duration-200 group-hover:scale-105 md:text-3xl"
			style="font-family: var(--font-jp-brush);"
		>
			コツ
		</span>

		{#if showTooltip}
			<span class="absolute top-full left-0 mt-1 whitespace-nowrap text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">
				The Knack of Japanese
			</span>
		{/if}
	</a>

	<!-- Right side -->
	<div class="flex items-center gap-5">
		{#if auth.loading}
			<span class="h-4 w-16 animate-pulse rounded bg-[var(--color-divider)]"></span>
		{:else if auth.user}
			<!-- Progress -->
			{#if totalLearned > 0}
				<div class="hidden items-center gap-2 md:flex">
					<div class="h-1 w-20 overflow-hidden rounded-full bg-[var(--color-divider)]">
						<div
							class="h-full rounded-full bg-[var(--color-hai)] transition-all duration-700 ease-out"
							style="width: {progressPct}%;"
						></div>
					</div>
					<span class="text-[10px] font-bold tracking-wide text-[var(--color-ink-light)]">
						{totalLearned}/{totalItems}
					</span>
				</div>
			{/if}

			<!-- User avatar → profile link -->
			<a
				href="/profile"
				class="flex items-center gap-2 text-sm font-bold text-[var(--color-ink-mid)] transition-colors hover:text-[var(--color-ink)]"
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
				class="flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-divider)] bg-white px-4 py-2 text-xs font-bold tracking-[0.1em] uppercase text-[var(--color-ink)] shadow-sm transition-all duration-150 hover:shadow-md hover:border-[var(--color-ink-ghost)] active:scale-95"
				onclick={handleSignIn}
				title="Sign in with Google"
			>
				<!-- Google 'G' logo -->
				<svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
					<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
					<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
					<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
				</svg>
				Sign in
			</button>
		{/if}
	</div>
</nav>
