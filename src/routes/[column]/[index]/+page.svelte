<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { markLearned, unmarkLearned } from '$lib/firebase';
	import { getAuthState, isLearned, setLearned } from '$lib/stores/auth.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let showDetails = $state(false);
	let auth = $derived(getAuthState());

	let learnedKey = $derived(`${data.column.id}_${data.index}`);
	let learned = $derived(isLearned(data.column.id, data.index));

	$effect(() => {
		// Track data.index so this re-fires on arrow key navigation
		const _idx = data.index;
		showDetails = false;
		const t = setTimeout(() => (showDetails = true), 200);
		return () => clearTimeout(t);
	});

	async function toggleLearned() {
		if (!auth.user) return;
		const newValue = !learned;
		setLearned(learnedKey, newValue);
		if (newValue) {
			await markLearned(auth.user.uid, data.column.id, data.index);
		} else {
			await unmarkLearned(auth.user.uid, data.column.id, data.index);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			goto('/');
		} else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			if (data.nextIndex !== null) {
				showDetails = false;
				goto(`/${data.column.id}/${data.nextIndex}`);
			}
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			if (data.prevIndex !== null) {
				showDetails = false;
				goto(`/${data.column.id}/${data.prevIndex}`);
			}
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="fixed inset-0 flex items-center justify-center bg-[var(--color-paper)]">
	<!-- Top bar -->
	<div class="absolute top-0 right-0 left-0 flex items-center justify-between px-5 py-5 md:px-10 md:py-8">
		<a
			href="/"
			class="text-xs font-bold tracking-[0.25em] uppercase text-[var(--color-ink-ghost)] transition-colors hover:text-[var(--color-ink)]"
		>
			← Back
		</a>

		<span
			class="text-sm text-[var(--color-ink-ghost)]"
			style="font-family: var(--font-jp-brush);"
		>
			{data.column.titleJp}
		</span>

		{#if auth.user}
			<button
				class="cursor-pointer text-xs font-bold tracking-[0.2em] uppercase transition-all {learned
					? 'text-[var(--color-ink-mid)]'
					: 'text-[var(--color-ink-ghost)] hover:text-[var(--color-ink-light)]'}"
				onclick={toggleLearned}
			>
				{learned ? '✓ Learned' : '○ Learn'}
			</button>
		{:else}
			<span></span>
		{/if}
	</div>

	<!-- Center -->
	<div class="flex flex-col items-center">
		<div in:fly={{ y: 20, duration: 400 }}>
			<span
				class="block font-black leading-none"
				style="font-size: clamp(12rem, 40vw, 32rem);"
			>
				{data.item.character}
			</span>
		</div>

		{#if showDetails}
			<div class="mt-4 flex flex-col items-center gap-2" in:fade={{ duration: 300 }}>
				<span
					class="text-xl font-bold tracking-[0.4em] uppercase text-[var(--color-ink-light)] md:text-3xl"
					style="font-family: var(--font-jp-brush);"
				>
					{data.item.romaji}
				</span>

				{#if data.item.meaning && data.item.meaning !== data.item.romaji}
					<span class="text-base text-[var(--color-ink-light)] md:text-lg">
						{data.item.meaning}
					</span>
				{/if}

				{#if data.item.pair}
					<div class="mt-6 text-center">
						<span class="block text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--color-ink-ghost)]">Hiragana</span>
						<span class="mt-1 block text-4xl font-black text-[var(--color-ink-light)] md:text-5xl">{data.item.pair}</span>
					</div>
				{/if}

				{#if data.item.readings}
					<div class="mt-6 flex gap-16">
						{#if data.item.readings.on}
							<div class="text-center">
								<span class="block text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--color-ink-ghost)]">On</span>
								<span class="mt-1 block text-lg font-black" style="font-family: var(--font-jp-brush);">{data.item.readings.on.join('・')}</span>
							</div>
						{/if}
						{#if data.item.readings.kun}
							<div class="text-center">
								<span class="block text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--color-ink-ghost)]">Kun</span>
								<span class="mt-1 block text-lg font-black" style="font-family: var(--font-jp-brush);">{data.item.readings.kun.join('・')}</span>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Bottom nav -->
	<div class="absolute bottom-6 flex items-center gap-12 md:bottom-10">
		{#if data.prevIndex !== null}
			<a
				href="/{data.column.id}/{data.prevIndex}"
				class="text-2xl text-[var(--color-ink-ghost)] transition-all hover:text-[var(--color-ink)] hover:-translate-x-1"
				onclick={() => (showDetails = false)}
			>
				←
			</a>
		{:else}
			<span class="w-6"></span>
		{/if}

		<span class="text-[10px] font-bold tracking-[0.2em] text-[var(--color-ink-ghost)]">
			{data.index + 1} / {data.column.items.length}
		</span>

		{#if data.nextIndex !== null}
			<a
				href="/{data.column.id}/{data.nextIndex}"
				class="text-2xl text-[var(--color-ink-ghost)] transition-all hover:text-[var(--color-ink)] hover:translate-x-1"
				onclick={() => (showDetails = false)}
			>
				→
			</a>
		{:else}
			<span class="w-6"></span>
		{/if}
	</div>
</div>
