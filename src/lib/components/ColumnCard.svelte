<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import type { CardItem } from '$lib/data';

	interface Props {
		item: CardItem;
	}

	let { item }: Props = $props();
	let isOpen = $state(false);

	function open() {
		isOpen = true;
	}

	function close() {
		isOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<button
	class="group w-full cursor-pointer border-[3px] border-[var(--color-border)] bg-white p-4 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--color-border)] active:translate-y-0 active:shadow-none"
	onclick={open}
>
	<div class="text-center">
		<span class="block text-4xl font-black leading-tight">{item.character}</span>
		<span class="mt-1 block text-sm font-bold tracking-wide text-[var(--color-ink-light)] uppercase">
			{item.romaji}
		</span>
		{#if item.meaning && item.meaning !== item.romaji}
			<span class="mt-0.5 block text-xs text-[var(--color-ink-light)]">{item.meaning}</span>
		{/if}
	</div>
</button>

{#if isOpen}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-paper)]"
		transition:fade={{ duration: 200 }}
		role="dialog"
		aria-modal="true"
	>
		<button
			class="absolute inset-0 z-0 cursor-pointer"
			onclick={close}
			aria-label="Close overlay"
		></button>

		<div
			class="relative z-10 flex flex-col items-center gap-6 px-8"
			transition:fly={{ y: 40, duration: 300 }}
		>
			<!-- Character -->
			<span
				class="block font-black leading-none"
				style="font-size: clamp(8rem, 25vw, 20rem);"
			>
				{item.character}
			</span>

			<!-- Romaji -->
			<span class="text-3xl font-bold tracking-widest uppercase md:text-5xl">
				{item.romaji}
			</span>

			<!-- Meaning -->
			{#if item.meaning && item.meaning !== item.romaji}
				<span class="text-xl font-bold text-[var(--color-ink-light)] md:text-2xl">
					{item.meaning}
				</span>
			{/if}

			<!-- Readings (kanji) -->
			{#if item.readings}
				<div class="mt-4 flex gap-8 text-base">
					{#if item.readings.on}
						<div class="text-center">
							<span class="block text-xs font-bold tracking-widest uppercase text-[var(--color-ink-light)]">On'yomi</span>
							<span class="mt-1 block font-black text-lg">{item.readings.on.join('・')}</span>
						</div>
					{/if}
					{#if item.readings.kun}
						<div class="text-center">
							<span class="block text-xs font-bold tracking-widest uppercase text-[var(--color-ink-light)]">Kun'yomi</span>
							<span class="mt-1 block font-black text-lg">{item.readings.kun.join('・')}</span>
						</div>
					{/if}
				</div>
			{/if}

			<!-- Close hint -->
			<span class="mt-8 text-sm font-bold tracking-widest text-[var(--color-ink-light)] uppercase">
				click anywhere or press esc
			</span>
		</div>
	</div>
{/if}
