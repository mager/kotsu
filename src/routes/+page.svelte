<script lang="ts">
	import { columns } from '$lib/data';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import WordSearch from '$lib/components/WordSearch.svelte';
	import WordCollection from '$lib/components/WordCollection.svelte';
	import CharacterBrowser from '$lib/components/CharacterBrowser.svelte';
	import { getAuthState } from '$lib/stores/auth.svelte';

	let activeView = $state<string>('home');
	let mobileMenuOpen = $state(false);
	let auth = $derived(getAuthState());

	function handleSelect(id: string) {
		activeView = id === 'home' ? 'home' : id;
		mobileMenuOpen = false;
	}

	let activeColumn = $derived(
		activeView !== 'home' ? columns.find((c) => c.id === activeView) || null : null
	);
</script>

<!-- Sidebar -->
<Sidebar
	activeColumn={activeView === 'home' ? null : activeView}
	onselect={handleSelect}
	mobileOpen={mobileMenuOpen}
	onclose={() => (mobileMenuOpen = false)}
/>

<!-- Mobile top bar -->
<div class="fixed top-0 left-0 right-0 z-30 flex items-center justify-between border-b border-[var(--color-divider)] bg-[var(--color-paper)]/90 px-4 py-3 backdrop-blur-md md:hidden">
	<button
		onclick={() => (mobileMenuOpen = true)}
		class="flex items-center gap-2 press-scale"
	>
		<span class="text-2xl font-black" style="font-family: var(--font-jp-brush);">コツ</span>
	</button>

	{#if activeColumn}
		<span class="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-ink-light)]">
			{activeColumn.title}
		</span>
	{:else}
		<span class="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-ink-light)]">
			My Words
		</span>
	{/if}

	<!-- Mobile nav tabs -->
	<div class="flex items-center gap-1">
		<button
			class="rounded-md px-2 py-1 text-base font-bold transition-colors press-scale {activeView === 'home' ? 'text-[var(--color-ink)] bg-[var(--color-paper-warm)]' : 'text-[var(--color-ink-ghost)]'}"
			onclick={() => (activeView = 'home')}
		>私</button>
	</div>
</div>

<!-- Main content area -->
<div class="md:ml-[var(--sidebar-width)]">
	<div class="mx-auto max-w-4xl px-4 pt-16 pb-12 md:px-8 md:pt-10">
		{#if activeView === 'home'}
			<!-- Home: Search + Collection -->
			<div class="animate-fade-up">
				<!-- Hero text -->
				<div class="mb-8 text-center md:mb-10 md:text-left">
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
			</div>

			<!-- Quick access to character systems -->
			{#if !auth.user || auth.loading}
				<div class="mt-16 animate-fade-up" style="animation-delay: 200ms;">
					<h2 class="mb-6 text-center text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-ink-ghost)]">
						Explore Characters
					</h2>
					<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
						{#each columns as col, i}
							<button
								class="drift-card animate-spring-in group rounded-xl px-4 py-5 text-center transition-all duration-200 hover:border-[var(--color-ai)] press-scale"
								style="animation-delay: {i * 60 + 300}ms;"
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
