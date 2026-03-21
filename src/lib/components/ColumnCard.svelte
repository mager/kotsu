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
	class="animate-fade-up group relative block py-3 text-center md:py-4 {learned ? '' : 'char-glow'}"
	style="animation-delay: {delay}ms;"
>
	<span
		class="relative inline-block font-black leading-none transition-transform duration-200 group-hover:scale-110 {learned ? 'char-learned' : ''}"
		style="font-size: clamp(2.2rem, 4.5vw, 3.5rem);"
	>
		{item.character}
	</span>
</a>
