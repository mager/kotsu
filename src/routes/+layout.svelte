<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';
	import { initAuth } from '$lib/stores/auth.svelte';
	import { browser } from '$app/environment';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let isDetailPage = $derived($page.params.index !== undefined);

	// Init Firebase auth on client only
	if (browser) {
		initAuth();
	}
</script>

<div class="flex min-h-screen flex-col bg-[var(--color-paper)]">
	{#if !isDetailPage}
		<Nav />
	{/if}

	<main class="flex-1">
		{@render children()}
	</main>

	{#if !isDetailPage}
		<Footer />
	{/if}
</div>
