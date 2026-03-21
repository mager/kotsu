<script lang="ts">
	import type { CardItem } from '$lib/data';

	interface Props {
		item: CardItem;
		columnId: string;
		index: number;
		delay?: number;
		learned?: boolean;
	}

	let { item, columnId, index, delay = 0, learned = false }: Props = $props();

	let href = $derived(`/${columnId}/${index}`);
</script>

<a
	{href}
	class="char-glow animate-fade-up group relative block py-3 text-center md:py-4"
	style="animation-delay: {delay}ms;"
>
	<span
		class="block font-black leading-none transition-transform duration-200 group-hover:scale-110 {learned ? 'text-[var(--color-ink-ghost)]' : ''}"
		style="font-size: clamp(2.2rem, 4.5vw, 3.5rem);"
	>
		{item.character}
	</span>
	{#if learned}
		<span class="absolute -top-1 -right-1 text-xs text-green-500">✓</span>
	{/if}
</a>
