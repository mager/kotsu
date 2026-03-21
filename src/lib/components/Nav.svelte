<script lang="ts">
	interface Props {
		user?: { name: string } | null;
	}

	let { user = null }: Props = $props();
</script>

<nav class="flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
	<a href="/" class="group flex items-baseline gap-2">
		<span class="text-2xl font-black transition-transform duration-200 group-hover:scale-105 md:text-3xl" style="font-family: var(--font-jp-brush);">コツ</span>
	</a>

	<div class="flex items-center gap-6">
		{#if user}
			<a
				href="/profile"
				class="text-sm font-bold tracking-wide text-[var(--color-ink-mid)] transition-colors hover:text-[var(--color-ink)]"
			>
				@{user.name}
			</a>
		{:else}
			<a
				href="/login"
				class="text-sm font-bold tracking-[0.15em] uppercase text-[var(--color-ink-light)] transition-colors hover:text-[var(--color-ink)]"
			>
				Log in
			</a>
			<a
				href="/signup"
				class="bg-[var(--color-ink)] px-4 py-2 text-sm font-bold tracking-[0.15em] uppercase text-[var(--color-paper)] transition-all hover:bg-[var(--color-ink-mid)]"
			>
				Sign up
			</a>
		{/if}
	</div>
</nav>
