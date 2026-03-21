<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="min-h-screen bg-[var(--color-paper)]">
	<Nav />
	{@render children()}
</div>
