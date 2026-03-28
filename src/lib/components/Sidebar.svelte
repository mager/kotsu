<script lang="ts">
	import { page } from '$app/stores';
	import { columns, getColumnItems } from '$lib/data';
	import { getAuthState, getColumnProgress, getTotalProgress } from '$lib/stores/auth.svelte';
	import { signInWithGoogle, signOut } from '$lib/firebase';

	interface Props {
		activeColumn?: string | null;
		onselect?: (columnId: string) => void;
		mobileOpen?: boolean;
		onclose?: () => void;
	}

	let { activeColumn = null, onselect, mobileOpen = false, onclose }: Props = $props();

	let auth = $derived(getAuthState());
	let total = $derived(getTotalProgress());
	let progressPct = $derived(total.total > 0 ? Math.round((total.learned / total.total) * 100) : 0);

	function selectColumn(id: string) {
		onselect?.(id);
		onclose?.();
	}

	async function handleSignIn() {
		try { await signInWithGoogle(); } catch (e) { console.error('Sign in failed:', e); }
	}

	// Column accent colors as a lookup
	const accentColors: Record<string, string> = {
		hiragana: 'var(--color-shu)',
		katakana: 'var(--color-ai)',
		radicals: 'var(--color-matcha)',
		kanji: 'var(--color-fuji)',
		vocabulary: 'var(--color-asagi)'
	};
</script>

<!-- Mobile overlay -->
{#if mobileOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden animate-fade-in"
		onclick={onclose}
		onkeydown={(e) => e.key === 'Escape' && onclose?.()}
	></div>
{/if}

<aside
	class="fixed top-0 left-0 z-50 flex h-dvh flex-col border-r border-[var(--color-divider)] bg-[var(--color-paper)] transition-transform duration-300 ease-[var(--ease-out-expo)]
		w-[var(--sidebar-width)]
		{mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0"
>
	<!-- Logo area -->
	<div class="px-6 pt-6 pb-2">
		<a href="/" class="group inline-block" onclick={() => onclose?.()}>
			<span
				class="text-4xl font-black leading-none transition-transform duration-200 group-hover:scale-105 inline-block"
				style="font-family: var(--font-jp-brush);"
			>コツ</span>
			<span class="ml-2 text-sm font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)] align-middle">
				Kotsu
			</span>
		</a>
		<p class="mt-1.5 text-xs italic text-[var(--color-ink-light)]" style="font-family: var(--font-display);">
			The knack of Japanese
		</p>
	</div>

	<!-- Total progress -->
	{#if auth.user && total.learned > 0}
		<div class="mx-6 mt-3 mb-4">
			<div class="flex items-center justify-between mb-1.5">
				<span class="text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--color-ink-ghost)]">Progress</span>
				<span class="text-xs font-bold text-[var(--color-ink-light)]">{total.learned}/{total.total}</span>
			</div>
			<div class="h-[3px] w-full overflow-hidden rounded-full bg-[var(--color-divider)]">
				<div
					class="h-full rounded-full transition-all duration-700 ease-[var(--ease-out-expo)]"
					style="width: {progressPct}%; background: linear-gradient(90deg, var(--color-shu), var(--color-kitsune));"
				></div>
			</div>
		</div>
	{/if}

	<!-- Navigation -->
	<nav class="flex-1 overflow-y-auto no-scrollbar px-3">
		<!-- Home -->
		<button
			class="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 press-scale
				{activeColumn === null ? 'bg-[var(--color-paper-warm)]' : 'hover:bg-[var(--color-paper-warm)]'}"
			onclick={() => { activeColumn = null; onselect?.('home'); onclose?.(); }}
		>
			<span class="text-xl">🏠</span>
			<div>
				<span class="text-sm font-bold tracking-[0.15em] uppercase text-[var(--color-ink)]">My Words</span>
				<span class="block text-xs text-[var(--color-ink-light)]">私の言葉</span>
			</div>
		</button>

		<div class="mx-3 my-3 h-px bg-[var(--color-divider)]"></div>

		<!-- Character sections -->
		<div class="space-y-0.5">
			{#each columns as col, i}
				{@const items = getColumnItems(col)}
				{@const progress = getColumnProgress(col.id, items.length)}
				{@const isActive = activeColumn === col.id}
				<button
					class="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 press-scale
						{isActive ? 'bg-[var(--color-paper-warm)]' : 'hover:bg-[var(--color-paper-warm)]'}"
					style="animation-delay: {i * 60}ms;"
					onclick={() => selectColumn(col.id)}
				>
					<!-- Accent bar -->
					<div
						class="h-8 w-[3px] rounded-full transition-all duration-300"
						style="background-color: {accentColors[col.id]}; opacity: {isActive ? 1 : 0.25};"
					></div>

					<div class="flex-1 min-w-0">
						<div class="flex items-baseline gap-2">
							<span
								class="text-xl font-black leading-none"
								style="font-family: var(--font-jp-brush); color: {isActive ? accentColors[col.id] : 'var(--color-ink)'};"
							>
								{col.titleJp}
							</span>
							<span class="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--color-ink-ghost)]">
								{col.title}
							</span>
						</div>
						<span class="mt-0.5 block text-[10px] text-[var(--color-ink-light)]">{col.hint}</span>
					</div>

					<!-- Mini progress -->
					{#if auth.user && progress > 0}
						<div class="flex items-center gap-1">
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
	</nav>

	<!-- User area -->
	<div class="border-t border-[var(--color-divider)] px-4 py-4">
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
				>
					Sign out
				</button>
			</div>
		{:else}
			<button
				class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--color-divider)] bg-white px-4 py-2.5 text-xs font-bold tracking-[0.1em] uppercase text-[var(--color-ink)] transition-all duration-200 hover:border-[var(--color-ink-ghost)] hover:shadow-sm press-scale"
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
</aside>
