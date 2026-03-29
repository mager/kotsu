<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';
	import { initAuth } from '$lib/stores/auth.svelte';
	import { browser } from '$app/environment';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let isDetailPage = $derived($page.params.index !== undefined);
	// Homepage uses its own Sidebar layout — no global nav/footer needed
	let isHomePage = $derived($page.url.pathname === '/');

	// Init Firebase auth on client only
	if (browser) {
		initAuth();
	}

	// Vercel Analytics
	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<div class="flex min-h-screen flex-col bg-[var(--color-paper)]">
	{#if !isHomePage}
		<Nav />
	{/if}
	<main class="relative z-10 flex-1">
		{@render children()}
	</main>

	{#if !isDetailPage && !isHomePage}
		<Footer />
	{/if}
</div>
