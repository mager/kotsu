<script lang="ts">
	import type { CardItem } from '$lib/data';

	interface Props {
		item: CardItem;
		columnId: string;
		index: number;
	}

	let { item, columnId, index }: Props = $props();

	let href = $derived(`/${columnId}/${index}`);
</script>

<a
	{href}
	class="group block py-4 text-center transition-all duration-150 hover:scale-110"
>
	<span class="block font-black leading-none" style="font-size: clamp(2.5rem, 5vw, 4rem);">
		{item.character}
	</span>
</a>
