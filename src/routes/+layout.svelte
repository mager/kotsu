<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	// Hide nav/footer on detail pages (immersive)
	let isDetailPage = $derived($page.params.index !== undefined);
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
