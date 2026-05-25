<script lang="ts">
	import CharacterBrowser from '$lib/components/CharacterBrowser.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="px-4 pt-6 pb-12 md:px-8 md:pt-8">
	<CharacterBrowser column={data.column} />
</div>
