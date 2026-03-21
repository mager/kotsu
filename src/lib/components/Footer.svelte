<script lang="ts">
	let year = new Date().getFullYear();
</script>

<footer class="mt-20 border-t border-[var(--color-divider)] px-5 py-8 md:px-10">
	<div class="mx-auto flex max-w-[1400px] flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
		<span class="text-xs text-[var(--color-ink-ghost)]" style="font-family: var(--font-jp-brush);">
			<a href="/about" class="transition-colors hover:text-[var(--color-ink-light)]">@magerさん が作りました</a>
			<span class="mx-2">·</span>
			<span>{year}</span>
		</span>

		<div class="flex items-center gap-5 text-xs text-[var(--color-ink-ghost)]">
			<a
				href="/about"
				class="tracking-[0.15em] uppercase transition-colors hover:text-[var(--color-ink-light)]"
			>
				About
			</a>
			<a
				href="https://github.com/mager/kotsu"
				target="_blank"
				rel="noopener noreferrer"
				class="tracking-[0.15em] uppercase transition-colors hover:text-[var(--color-ink-light)]"
			>
				GitHub
			</a>
			<a
				href="https://github.com/mager/kotsu/pulls"
				target="_blank"
				rel="noopener noreferrer"
				class="tracking-[0.15em] uppercase transition-colors hover:text-[var(--color-ink-light)]"
			>
				Contribute
			</a>
		</div>
	</div>
</footer>
