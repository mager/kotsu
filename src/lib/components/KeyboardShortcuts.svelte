<script lang="ts">
	import { fade } from 'svelte/transition';

	interface Props {
		show: boolean;
		onclose: () => void;
	}

	let { show, onclose }: Props = $props();

	const shortcuts = [
		{ keys: ['←', '→'], desc: 'Previous / next character', context: 'Detail' },
		{ keys: ['H', 'L'], desc: 'Previous / next character (vim)', context: 'Detail' },
		{ keys: ['Space'], desc: 'Toggle learned', context: 'Detail' },
		{ keys: ['Esc'], desc: 'Back to home', context: 'Anywhere' },
		{ keys: ['1', '–', '5'], desc: 'Jump to column', context: 'Home' },
		{ keys: ['Enter'], desc: 'Open first unlearned', context: 'Home' },
		{ keys: ['?'], desc: 'Toggle this overlay', context: 'Anywhere' }
	];

	// Decorative floating characters
	const floaters = ['あ', 'カ', '火', '山', 'き', 'ン', '心', 'ゆ', '水', '道', 'す', 'コ'];
</script>

{#if show}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center"
		transition:fade={{ duration: 200 }}
		onkeydown={(e) => e.key === 'Escape' && onclose()}
	>
		<!-- Backdrop with blur -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="absolute inset-0 bg-[var(--color-paper)]/90 backdrop-blur-md"
			onclick={onclose}
		></div>

		<!-- Floating characters -->
		{#each floaters as char, i}
			<span
				class="pointer-events-none absolute select-none font-black text-[var(--color-ink)]"
				style="
					font-family: var(--font-jp-brush);
					font-size: {2 + Math.random() * 4}rem;
					opacity: {0.03 + Math.random() * 0.04};
					left: {5 + (i / floaters.length) * 85}%;
					top: {10 + Math.sin(i * 1.7) * 35 + 25}%;
					transform: rotate({-15 + Math.random() * 30}deg);
				"
			>
				{char}
			</span>
		{/each}

		<!-- Content -->
		<div class="relative z-10 w-full max-w-lg px-6">
			<h2
				class="mb-2 text-center text-5xl font-black"
				style="font-family: var(--font-jp-brush);"
			>
				近道
			</h2>
			<p class="mb-10 text-center text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--color-ink-ghost)]">
				Chikamichi — Shortcuts
			</p>

			<div class="space-y-4">
				{#each shortcuts as shortcut, i}
					<div
						class="flex items-center justify-between py-2"
						style="animation: fadeUp 0.3s ease {i * 50}ms both;"
					>
						<span class="text-sm text-[var(--color-ink-mid)]" style="font-family: var(--font-jp-brush);">
							{shortcut.desc}
						</span>
						<div class="flex items-center gap-1.5">
							{#each shortcut.keys as key}
								<kbd class="inline-flex min-w-[2rem] items-center justify-center rounded-md border border-[var(--color-divider)] bg-white px-2 py-1 text-xs font-black text-[var(--color-ink)] shadow-sm">
									{key}
								</kbd>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<p class="mt-10 text-center text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-ink-ghost)]">
				Press any key to close
			</p>
		</div>
	</div>
{/if}
