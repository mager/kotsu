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

	// Scale font for multi-char items
	let charLen = $derived(item.character.length);
	let fontSize = $derived(
		charLen <= 1
			? 'clamp(2.2rem, 4.5vw, 3.5rem)'
			: charLen <= 3
				? 'clamp(1.6rem, 3vw, 2.4rem)'
				: charLen <= 5
					? 'clamp(1.2rem, 2.2vw, 1.8rem)'
					: 'clamp(1rem, 1.8vw, 1.4rem)'
	);
</script>

<a
	{href}
	class="animate-fade-up group relative block py-3 text-center md:py-4 {learned ? '' : 'char-glow'}"
	style="animation-delay: {delay}ms; --color-accent: var(--color-col-{columnId});"
>
	<span
		class="relative inline-block font-black leading-none transition-transform duration-200 group-hover:scale-110 {learned ? 'char-learned' : 'char-unlearned'}"
		style="font-size: {fontSize};"
	>
		{item.character}
	</span>
</a>
