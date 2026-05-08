<script lang="ts">
	import { goto } from '$app/navigation';
	import { signOut, updateUsername, getUsername } from '$lib/firebase';
	import { getAuthState, getColumnProgress, isLearned } from '$lib/stores/auth.svelte';
	import { columns, getColumnItems } from '$lib/data';
	import { getFeaturedLockedAwards, getUnlockedAwards } from '$lib/awards';
	import { fade } from 'svelte/transition';

	let auth = $derived(getAuthState());

	let username = $state('');
	let editingUsername = $state(false);
	let usernameInput = $state('');
	let loaded = $state(false);

	$effect(() => {
		if (auth.user && !loaded) {
			loaded = true;
			getUsername(auth.user.uid).then((u) => {
				username = u;
			});
		}
	});

	let columnStats = $derived(
		columns.map((col) => {
			const items = getColumnItems(col);
			return {
				...col,
				learned: getColumnProgress(col.id, items.length),
				total: items.length,
				learnedItems: items
					.map((item, i) => ({ ...item, index: i }))
					.filter((_, i) => isLearned(col.id, i))
			};
		})
	);

	let totalLearned = $derived(columnStats.reduce((sum, c) => sum + c.learned, 0));
	let totalItems = $derived(columnStats.reduce((sum, c) => sum + c.total, 0));
	let progressPct = $derived(totalItems > 0 ? Math.round((totalLearned / totalItems) * 100) : 0);
	let unlockedAwards = $derived(getUnlockedAwards(isLearned));
	let nextAwards = $derived(getFeaturedLockedAwards(isLearned, 4));

	// Streak-like motivational text
	let levelLabel = $derived(
		progressPct === 0 ? '初心者 · Beginner'
		: progressPct < 15 ? '入門 · Getting Started'
		: progressPct < 30 ? '基礎 · Foundations'
		: progressPct < 50 ? '中級 · Intermediate'
		: progressPct < 75 ? '上級 · Advanced'
		: progressPct < 100 ? '達人 · Near Mastery'
		: '完璧 · Perfect'
	);

	async function saveUsername() {
		if (!auth.user || !usernameInput.trim()) return;
		username = usernameInput.trim();
		await updateUsername(auth.user.uid, username);
		editingUsername = false;
	}

	function startEditUsername() {
		usernameInput = username || '';
		editingUsername = true;
	}

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
	<div class="min-h-dvh">
		<!-- Hero section — full width, dramatic -->
		<div class="relative overflow-hidden px-6 pb-16 pt-8 md:px-12 md:pb-24 md:pt-12">
			<!-- Decorative background character -->
			<div class="pointer-events-none absolute -right-8 -top-16 select-none opacity-[0.03] md:-right-4 md:-top-12">
				<span class="block font-black" style="font-size: clamp(20rem, 50vw, 50rem); font-family: var(--font-jp-brush);">
					道
				</span>
			</div>

			<div class="relative">
				<!-- User identity -->
				<div class="flex items-start gap-5 md:gap-8">
					{#if auth.user.photoURL}
						<img
							src={auth.user.photoURL}
							alt=""
							class="h-20 w-20 rounded-full ring-2 ring-[var(--color-divider)] md:h-28 md:w-28"
						/>
					{/if}
					<div class="flex-1">
						{#if editingUsername}
							<div class="flex items-center gap-3" in:fade={{ duration: 150 }}>
								<input
									type="text"
									bind:value={usernameInput}
									placeholder="Choose a username"
									class="border-b-2 border-[var(--color-ink)] bg-transparent text-3xl font-black outline-none placeholder:text-[var(--color-ink-ghost)] md:text-5xl"
									style="font-family: var(--font-jp-brush);"
									onkeydown={(e) => e.key === 'Enter' && saveUsername()}
								/>
								<button
									class="cursor-pointer text-sm font-bold tracking-[0.15em] uppercase text-[var(--color-ink-ghost)] transition-colors hover:text-[var(--color-ink)]"
									onclick={saveUsername}
								>
									Save
								</button>
							</div>
						{:else}
							<button
								class="cursor-pointer text-left"
								onclick={startEditUsername}
							>
								<h1
									class="text-4xl font-black leading-tight md:text-6xl"
									style="font-family: var(--font-jp-brush);"
								>
									{username || auth.user.displayName}
								</h1>
								{#if !username}
									<span class="mt-1 block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">
										tap to set username
									</span>
								{/if}
							</button>
						{/if}

						<p class="mt-2 text-sm font-bold tracking-[0.15em] uppercase text-[var(--color-ink-light)]"
							style="font-family: var(--font-jp-brush);">
							{levelLabel}
						</p>
					</div>
				</div>

				<!-- Massive progress display -->
				<div class="mt-12 md:mt-16">
					<div class="flex items-end gap-4">
						<span
							class="font-black leading-none tracking-tight text-[var(--color-ink)]"
							style="font-size: clamp(8rem, 25vw, 18rem);"
						>
							{progressPct}
						</span>
						<div class="mb-4 md:mb-8">
							<span class="block text-4xl font-black text-[var(--color-ink-light)] md:text-6xl">%</span>
							<span class="mt-1 block text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-ink-ghost)]">
								complete
							</span>
						</div>
					</div>

					<!-- Full-width progress bar -->
					<div class="mt-4 h-3 w-full overflow-hidden rounded-full bg-[var(--color-divider)]">
						<div
							class="h-full rounded-full bg-[var(--color-sumi)] transition-all duration-1000 ease-out"
							style="width: {progressPct}%;"
						></div>
					</div>
					<p class="mt-3 text-sm tracking-wide text-[var(--color-ink-ghost)]">
						<span class="font-bold text-[var(--color-ink)]">{totalLearned}</span> of {totalItems} characters learned
					</p>
				</div>
			</div>
		</div>

		<section class="border-t border-[var(--color-divider)] px-6 py-10 md:px-12 md:py-12">
			<div class="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
				<div>
					<div class="mb-4 flex items-end justify-between gap-3">
						<div>
							<span class="text-[10px] font-bold tracking-[0.24em] uppercase text-[var(--color-ink-ghost)]">Award Shelf</span>
							<h2 class="mt-1 text-2xl font-black text-[var(--color-ink)]" style="font-family: var(--font-display);">Trophies for finishing real chunks.</h2>
						</div>
						<span class="rounded-full border border-[var(--color-divider)] px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink-light)]">{unlockedAwards.length} earned</span>
					</div>

					<div class="grid gap-3 md:grid-cols-2">
						{#if unlockedAwards.length > 0}
							{#each unlockedAwards as award}
								<div class="rounded-2xl border border-[var(--color-divider)] bg-[var(--color-paper-warm)] px-4 py-4" style="box-shadow: inset 0 0 0 1px color-mix(in srgb, {award.accent} 14%, transparent);">
									<div class="flex items-start justify-between gap-3">
										<div>
											<p class="text-[10px] font-bold tracking-[0.22em] uppercase" style="color: {award.accent};">{award.titleJp}</p>
											<h3 class="mt-1 text-lg font-black text-[var(--color-ink)]">{award.title}</h3>
										</div>
										<span class="flex h-11 w-11 items-center justify-center rounded-full text-xl" style="background: color-mix(in srgb, {award.accent} 12%, var(--color-paper)); color: {award.accent};">{award.icon}</span>
									</div>
									<p class="mt-2 text-sm leading-6 text-[var(--color-ink-light)]">{award.description}</p>
									<div class="mt-3 flex items-center justify-between gap-3">
										<span class="text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink-ghost)]">{award.progressLabel}</span>
										<span class="rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.16em] uppercase text-[var(--color-ink)]" style="background: color-mix(in srgb, {award.accent} 10%, var(--color-paper));">{award.rarity}</span>
									</div>
								</div>
							{/each}
						{:else}
							<div class="rounded-2xl border border-dashed border-[var(--color-divider)] px-4 py-5 md:col-span-2">
								<p class="text-sm font-bold text-[var(--color-ink)]">Your shelf is empty for now.</p>
								<p class="mt-1 text-sm leading-6 text-[var(--color-ink-light)]">Clear a full category and Kotsu will promote it into an actual reward.</p>
							</div>
						{/if}
					</div>
				</div>

				<aside class="rounded-2xl border border-[var(--color-divider)] bg-[var(--color-paper-warm)] px-5 py-5">
					<span class="text-[10px] font-bold tracking-[0.22em] uppercase text-[var(--color-ink-ghost)]">Up next</span>
					<div class="mt-4 space-y-3">
						{#each nextAwards as award}
							<div class="rounded-xl border border-dashed border-[var(--color-divider)] px-3 py-3">
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
				</aside>
			</div>
		</section>

		<!-- Column breakdown — full bleed sections -->
		<div>
			{#each columnStats as col, colIndex}
				{@const pct = col.total > 0 ? Math.round((col.learned / col.total) * 100) : 0}
				<div
					class="border-t border-[var(--color-divider)] px-6 py-10 md:px-12 md:py-14"
					style="border-left: 4px solid var(--color-col-{col.id});"
				>
					<div class="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12">
						<!-- Column identity -->
						<div class="shrink-0 md:w-64">
							<h2
								class="text-4xl font-black md:text-5xl"
								style="font-family: var(--font-jp-brush);"
							>
								{col.titleJp}
							</h2>
							<span class="mt-1 block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">
								{col.hint}
							</span>

							<div class="mt-4 flex items-end gap-2">
								<span class="text-5xl font-black md:text-6xl" style="color: var(--color-col-{col.id});">
									{col.learned}
								</span>
								<span class="mb-1 text-lg text-[var(--color-ink-ghost)]">/ {col.total}</span>
							</div>

							<!-- Mini progress -->
							<div class="mt-3 h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-[var(--color-divider)]">
								<div
									class="h-full rounded-full transition-all duration-700"
									style="width: {pct}%; background-color: var(--color-col-{col.id});"
								></div>
							</div>
						</div>

						<!-- Learned characters — big, beautiful, browseable -->
						<div class="flex-1">
							{#if col.learnedItems.length > 0}
								<div class="flex flex-wrap gap-3 md:gap-4">
									{#each col.learnedItems as item}
										<a
											href="/{col.id}/{item.index}"
											class="group relative block rounded-lg px-2 py-1 transition-all hover:bg-[var(--color-ink)] hover:bg-opacity-5"
										>
											<span
												class="block font-black leading-none text-[var(--color-ink)] transition-transform duration-200 group-hover:scale-110"
												style="font-size: clamp(2.5rem, 5vw, 4rem);"
											>
												{item.character}
											</span>
											<span class="mt-1 block text-center text-[9px] font-bold tracking-wide text-[var(--color-ink-ghost)] opacity-0 transition-opacity group-hover:opacity-100">
												{item.romaji}
											</span>
										</a>
									{/each}
								</div>
							{:else}
								<div class="flex h-full min-h-[8rem] items-center">
									<p class="text-lg text-[var(--color-ink-ghost)]" style="font-family: var(--font-jp-brush);">
										まだ何も学んでいない ·
										<a href="/" class="text-[var(--color-ink-light)] underline decoration-[var(--color-divider)] underline-offset-4 transition-colors hover:text-[var(--color-ink)]">
											begin
										</a>
									</p>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Footer zone -->
		<div class="border-t border-[var(--color-divider)] px-6 py-12 text-center md:px-12">
			<button
				class="cursor-pointer text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-ink-ghost)] transition-colors hover:text-[var(--color-ink)]"
				onclick={handleSignOut}
			>
				Sign Out
			</button>
		</div>
	</div>
{/if}
