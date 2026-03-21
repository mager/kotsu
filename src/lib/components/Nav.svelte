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
					<div class="h-1.5 w-24 overflow-hidden rounded-full bg-[var(--color-shu-ghost)]">
						<div
							class="h-full rounded-full transition-all duration-700 ease-out"
							style="width: {progressPct}%; background-color: var(--color-shu);"
						></div>
					</div>
					<span class="text-[10px] font-bold tracking-wide" style="color: var(--color-shu);">
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
				class="cursor-pointer text-sm font-bold tracking-[0.15em] uppercase text-[var(--color-ink-light)] transition-colors hover:text-[var(--color-ink)]"
				onclick={handleSignIn}
			>
				Sign in
			</button>
		{/if}
	</div>
</nav>
