<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.recipe.result} | Kotsu Radical Recipe</title>
</svelte:head>

<main class="overflow-x-hidden bg-[var(--color-paper)] px-4 py-8 md:px-8 md:py-12" style="min-height: calc(100dvh - var(--nav-height, 72px));">
	<section class="recipe-shell mx-auto w-full">
		<a
			href="/"
			class="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.18em] uppercase text-[var(--color-ink-ghost)] transition-colors hover:text-[var(--color-ink)]"
		>
			← Course
		</a>

		<div class="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
			<div>
				<span class="text-[10px] font-black tracking-[0.28em] uppercase text-[var(--color-matcha)]">
					Radical Recipe
				</span>
				<h1 class="mt-4 max-w-3xl text-5xl font-black leading-[0.95] text-[var(--color-ink)] md:text-7xl" style="font-family: var(--font-display);">
					{data.recipe.pattern}
				</h1>

				<div class="recipe-equation mt-10 flex flex-wrap items-center gap-3 md:gap-5" aria-label="{data.recipe.pattern} equals {data.recipe.meaning}">
					{#each data.parts as part, index}
						{#if part.link}
							<a href={part.link.href} class="recipe-glyph" aria-label="Open {part.character}">
								{part.character}
							</a>
						{:else}
							<span class="recipe-glyph">{part.character}</span>
						{/if}

						{#if index < data.parts.length - 1}
							<span class="recipe-operator">+</span>
						{/if}
					{/each}

					<span class="recipe-operator">=</span>

					{#if data.result.link}
						<a href={data.result.link.href} class="recipe-glyph is-result" aria-label="Open {data.result.character}">
							{data.result.character}
						</a>
					{:else}
						<span class="recipe-glyph is-result">{data.result.character}</span>
					{/if}
				</div>

				<div class="mt-8 max-w-2xl border-t border-[var(--color-divider)] pt-6">
					<p class="text-3xl font-black leading-tight text-[var(--color-ink)] md:text-4xl">
						{data.recipe.result} means {data.recipe.meaning}.
					</p>
					<p class="mt-4 text-base leading-7 text-[var(--color-ink-light)]">
						Each character in the formula is clickable. Open the parts, study the result, then come back to the recipe and the shape should feel less like memorization and more like construction.
					</p>
				</div>
			</div>

			<aside class="recipe-sheet">
				<span class="text-[10px] font-black tracking-[0.24em] uppercase text-[var(--color-ink-ghost)]">Sheet</span>
				<div class="mt-5 space-y-3">
					{#each data.parts as part, index}
						<div class="sheet-row">
							<span class="sheet-index">{index + 1}</span>
							<span class="sheet-glyph">{part.character}</span>
							{#if part.link}
								<a href={part.link.href} class="sheet-link">Open</a>
							{/if}
						</div>
					{/each}
					<div class="sheet-row is-result">
						<span class="sheet-index">=</span>
						<span class="sheet-glyph">{data.result.character}</span>
						<span class="sheet-meaning">{data.recipe.meaning}</span>
					</div>
				</div>
			</aside>
		</div>
	</section>
</main>

<style>
	.recipe-glyph {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: clamp(4.6rem, 22vw, 9rem);
		border: 1px solid var(--color-divider);
		border-radius: 1rem;
		background:
			linear-gradient(
				180deg,
				color-mix(in srgb, var(--color-matcha) 7%, transparent),
				transparent 70%
			),
			var(--color-paper);
		padding: 0.18em 0.28em 0.28em;
		color: var(--color-ink);
		font-family: var(--font-jp-brush);
		font-size: clamp(3.6rem, 11vw, 8rem);
		font-weight: 900;
		line-height: 1;
		text-decoration: none;
		transition:
			transform 180ms var(--ease-out-expo),
			border-color 180ms ease,
			background 180ms ease;
	}

	.recipe-shell {
		max-width: calc(100vw - 2rem);
	}

	.recipe-glyph:hover,
	.recipe-glyph:focus-visible {
		border-color: color-mix(in srgb, var(--color-matcha) 60%, var(--color-divider));
		background: color-mix(in srgb, var(--color-matcha) 8%, var(--color-paper));
		outline: none;
		transform: translateY(-2px);
	}

	.recipe-glyph.is-result {
		border-color: color-mix(in srgb, var(--color-matcha) 50%, var(--color-divider));
		color: var(--color-matcha);
	}

	.recipe-operator {
		color: var(--color-ink-ghost);
		font-size: clamp(1.2rem, 4vw, 2rem);
		font-weight: 900;
	}

	@media (max-width: 640px) {
		.recipe-equation {
			gap: 0.55rem;
			max-width: 100%;
		}

		.recipe-glyph {
			min-width: 4rem;
			border-radius: 0.8rem;
			font-size: 3.1rem;
		}

		.recipe-operator {
			font-size: 1rem;
		}
	}

	@media (min-width: 768px) {
		.recipe-shell {
			max-width: 72rem;
		}
	}

	.recipe-sheet {
		border: 1px solid var(--color-divider);
		border-radius: 1rem;
		background: color-mix(in srgb, var(--color-ink) 2.5%, var(--color-paper));
		padding: 1rem;
	}

	.sheet-row {
		display: grid;
		grid-template-columns: 2rem minmax(0, 1fr) auto;
		align-items: center;
		gap: 0.75rem;
		border: 1px solid var(--color-divider);
		border-radius: 0.8rem;
		background: var(--color-paper);
		padding: 0.75rem;
	}

	.sheet-row.is-result {
		border-color: color-mix(in srgb, var(--color-matcha) 40%, var(--color-divider));
	}

	.sheet-index {
		color: var(--color-ink-ghost);
		font-size: 0.7rem;
		font-weight: 900;
	}

	.sheet-glyph {
		color: var(--color-ink);
		font-family: var(--font-jp-brush);
		font-size: 2rem;
		font-weight: 900;
		line-height: 1;
	}

	.sheet-link,
	.sheet-meaning {
		color: var(--color-ink-light);
		font-size: 0.65rem;
		font-weight: 900;
		letter-spacing: 0.16em;
		text-decoration: none;
		text-transform: uppercase;
	}

	.sheet-link:hover,
	.sheet-link:focus-visible {
		color: var(--color-matcha);
		outline: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.recipe-glyph {
			transition: none;
		}

		.recipe-glyph:hover,
		.recipe-glyph:focus-visible {
			transform: none;
		}
	}
</style>
