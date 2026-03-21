<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			window.location.href = '/';
		} else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			if (data.nextIndex !== null) {
				window.location.href = `/${data.column.id}/${data.nextIndex}`;
			}
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			if (data.prevIndex !== null) {
				window.location.href = `/${data.column.id}/${data.prevIndex}`;
			}
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="fixed inset-0 flex flex-col items-center justify-center bg-[var(--color-paper)]"
	in:fly={{ y: 30, duration: 250 }}
>
	<!-- Back link -->
	<a
		href="/"
		class="absolute top-6 left-6 text-sm font-bold tracking-[0.2em] uppercase text-[var(--color-ink-light)] transition-colors hover:text-[var(--color-ink)] md:top-10 md:left-10"
	>
		← Back
	</a>

	<!-- Column indicator -->
	<span class="absolute top-6 right-6 text-sm font-bold tracking-[0.2em] uppercase text-[var(--color-ink-light)] md:top-10 md:right-10" style="font-family: var(--font-jp-serif);">
		{data.column.titleJp}
	</span>

	<!-- Character -->
	<span
		class="block font-black leading-none"
		style="font-size: clamp(10rem, 35vw, 28rem);"
	>
		{data.item.character}
	</span>

	<!-- Romaji -->
	<span class="mt-6 text-2xl font-bold tracking-[0.3em] uppercase text-[var(--color-ink-light)] md:text-4xl">
		{data.item.romaji}
	</span>

	<!-- Meaning (if different from romaji) -->
	{#if data.item.meaning && data.item.meaning !== data.item.romaji}
		<span class="mt-2 text-lg text-[var(--color-ink-light)] md:text-xl" style="font-family: var(--font-jp-serif);">
			{data.item.meaning}
		</span>
	{/if}

	<!-- Readings (kanji) -->
	{#if data.item.readings}
		<div class="mt-8 flex gap-12 text-base">
			{#if data.item.readings.on}
				<div class="text-center">
					<span class="block text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-ink-light)]">On'yomi</span>
					<span class="mt-2 block text-xl font-black">{data.item.readings.on.join('・')}</span>
				</div>
			{/if}
			{#if data.item.readings.kun}
				<div class="text-center">
					<span class="block text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-ink-light)]">Kun'yomi</span>
					<span class="mt-2 block text-xl font-black">{data.item.readings.kun.join('・')}</span>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Navigation arrows -->
	<div class="absolute bottom-8 flex gap-8 md:bottom-12">
		{#if data.prevIndex !== null}
			<a
				href="/{data.column.id}/{data.prevIndex}"
				class="text-3xl font-black text-[var(--color-ink-light)] transition-colors hover:text-[var(--color-ink)]"
			>
				←
			</a>
		{/if}
		{#if data.nextIndex !== null}
			<a
				href="/{data.column.id}/{data.nextIndex}"
				class="text-3xl font-black text-[var(--color-ink-light)] transition-colors hover:text-[var(--color-ink)]"
			>
				→
			</a>
		{/if}
	</div>

	<!-- Keyboard hint -->
	<span class="absolute bottom-3 text-[10px] font-bold tracking-[0.2em] text-[var(--color-ink-light)]/40 uppercase">
		← → navigate · esc back
	</span>
</div>
