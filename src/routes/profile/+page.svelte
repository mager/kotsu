<script lang="ts">
	import { goto } from '$app/navigation';
	import { signOut } from '$lib/firebase';
	import { getAuthState, getColumnProgress, isLearned } from '$lib/stores/auth.svelte';
	import { columns } from '$lib/data';

	let auth = $derived(getAuthState());

	let columnStats = $derived(
		columns.map((col) => ({
			...col,
			learned: getColumnProgress(col.id, col.items.length),
			total: col.items.length,
			learnedItems: col.items
				.map((item, i) => ({ ...item, index: i }))
				.filter((_, i) => isLearned(col.id, i))
		}))
	);

	let totalLearned = $derived(columnStats.reduce((sum, c) => sum + c.learned, 0));
	let totalItems = $derived(columnStats.reduce((sum, c) => sum + c.total, 0));
	let progressPct = $derived(totalItems > 0 ? Math.round((totalLearned / totalItems) * 100) : 0);

	async function handleSignOut() {
		await signOut();
		goto('/');
	}

	$effect(() => {
		if (!auth.loading && !auth.user) {
			goto('/');
		}
	});
</script>

{#if auth.user}
	<div class="mx-auto max-w-3xl px-6 py-8 md:py-16">
		<!-- User header -->
		<div class="flex items-center gap-5">
			{#if auth.user.photoURL}
				<img
					src={auth.user.photoURL}
					alt=""
					class="h-16 w-16 rounded-full ring-2 ring-[var(--color-divider)] md:h-20 md:w-20"
				/>
			{/if}
			<div>
				<h1
					class="text-3xl font-black md:text-4xl"
					style="font-family: var(--font-jp-brush);"
				>
					{auth.user.displayName}
				</h1>
				<p class="mt-0.5 text-xs tracking-wide text-[var(--color-ink-ghost)]">{auth.user.email}</p>
			</div>
		</div>

		<!-- Big progress number -->
		<div class="mt-10 text-center">
			<span
				class="font-black leading-none text-[var(--color-ink)]"
				style="font-size: clamp(5rem, 15vw, 10rem);"
			>
				{progressPct}<span class="text-[var(--color-ink-light)]" style="font-size: 0.4em;">%</span>
			</span>
			<p class="mt-1 text-sm tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">
				{totalLearned} of {totalItems} characters learned
			</p>
			<div class="mx-auto mt-4 h-2 max-w-md overflow-hidden rounded-full bg-[var(--color-divider)]">
				<div
					class="h-full rounded-full bg-[var(--color-sumi)] transition-all duration-700 ease-out"
					style="width: {progressPct}%;"
				></div>
			</div>
		</div>

		<div class="mx-auto mt-12 h-px w-full bg-[var(--color-divider)]"></div>

		<!-- Per-column sections -->
		<div class="mt-10 space-y-10">
			{#each columnStats as col}
				{@const pct = col.total > 0 ? Math.round((col.learned / col.total) * 100) : 0}
				<div>
					<div class="flex items-baseline justify-between">
						<div>
							<h2
								class="text-2xl font-black md:text-3xl"
								style="font-family: var(--font-jp-brush);"
							>
								{col.titleJp}
							</h2>
							<span class="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--color-ink-ghost)]">
								{col.hint}
							</span>
						</div>
						<span class="text-sm font-bold" style="color: var(--color-col-{col.id});">
							{col.learned}/{col.total}
						</span>
					</div>

					<div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-divider)]">
						<div
							class="h-full rounded-full transition-all duration-500"
							style="width: {pct}%; background-color: var(--color-col-{col.id});"
						></div>
					</div>

					<!-- Show learned characters in huge type -->
					{#if col.learnedItems.length > 0}
						<div class="mt-4 flex flex-wrap gap-3">
							{#each col.learnedItems as item}
								<a
									href="/{col.id}/{item.index}"
									class="font-black text-[var(--color-ink-light)] transition-all hover:scale-110 hover:text-[var(--color-ink)]"
									style="font-size: clamp(2rem, 4vw, 3rem);"
								>
									{item.character}
								</a>
							{/each}
						</div>
					{:else}
						<p class="mt-3 text-sm text-[var(--color-ink-ghost)]">
							No characters learned yet — <a href="/" class="underline decoration-[var(--color-divider)] underline-offset-4 hover:decoration-[var(--color-ink)]">start learning</a>
						</p>
					{/if}
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
