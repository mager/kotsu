<script lang="ts">
	import { goto } from '$app/navigation';
	import { signOut } from '$lib/firebase';
	import { getAuthState, getColumnProgress } from '$lib/stores/auth.svelte';
	import { columns } from '$lib/data';

	let auth = $derived(getAuthState());

	let columnStats = $derived(
		columns.map((col) => ({
			...col,
			learned: getColumnProgress(col.id, col.items.length),
			total: col.items.length
		}))
	);

	let totalLearned = $derived(columnStats.reduce((sum, c) => sum + c.learned, 0));
	let totalItems = $derived(columnStats.reduce((sum, c) => sum + c.total, 0));
	let progressPct = $derived(totalItems > 0 ? Math.round((totalLearned / totalItems) * 100) : 0);

	async function handleSignOut() {
		await signOut();
		goto('/');
	}

	// Redirect if not logged in
	$effect(() => {
		if (!auth.loading && !auth.user) {
			goto('/');
		}
	});
</script>

{#if auth.user}
	<div class="mx-auto max-w-xl px-6 py-12 md:py-20">
		<!-- User info -->
		<div class="flex items-center gap-4">
			{#if auth.user.photoURL}
				<img
					src={auth.user.photoURL}
					alt=""
					class="h-14 w-14 rounded-full ring-2 ring-[var(--color-divider)]"
				/>
			{/if}
			<div>
				<h1 class="text-2xl font-black" style="font-family: var(--font-jp-brush);">
					{auth.user.displayName}
				</h1>
				<p class="text-xs text-[var(--color-ink-ghost)]">{auth.user.email}</p>
			</div>
		</div>

		<div class="mx-auto mt-8 h-px w-full bg-[var(--color-divider)]"></div>

		<!-- Overall progress -->
		<div class="mt-8">
			<div class="flex items-baseline justify-between">
				<span class="text-xs font-bold tracking-[0.25em] uppercase text-[var(--color-ink-ghost)]">Overall Progress</span>
				<span class="text-sm font-black" style="color: var(--color-shu);">
					{progressPct}%
				</span>
			</div>
			<div class="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--color-shu-ghost)]">
				<div
					class="h-full rounded-full transition-all duration-700 ease-out"
					style="width: {progressPct}%; background-color: var(--color-shu);"
				></div>
			</div>
			<p class="mt-1 text-right text-[10px] text-[var(--color-ink-ghost)]">
				{totalLearned} of {totalItems} characters
			</p>
		</div>

		<!-- Per-column breakdown -->
		<div class="mt-10 space-y-6">
			{#each columnStats as col}
				{@const pct = col.total > 0 ? Math.round((col.learned / col.total) * 100) : 0}
				<div>
					<div class="flex items-baseline justify-between">
						<span class="text-lg font-black" style="font-family: var(--font-jp-brush);">
							{col.titleJp}
						</span>
						<span class="text-xs font-bold text-[var(--color-ink-light)]">
							{col.learned}/{col.total}
						</span>
					</div>
					<div class="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-shu-ghost)]">
						<div
							class="h-full rounded-full transition-all duration-500"
							style="width: {pct}%; background-color: var(--color-shu);"
						></div>
					</div>
				</div>
			{/each}
		</div>

		<div class="mx-auto mt-12 h-px w-full bg-[var(--color-divider)]"></div>

		<!-- Sign out -->
		<div class="mt-8 text-center">
			<button
				class="cursor-pointer text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)] transition-colors hover:text-[var(--color-ink)]"
				onclick={handleSignOut}
			>
				Sign out
			</button>
		</div>
	</div>
{/if}
