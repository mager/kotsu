<script lang="ts">
  let { name = 'right' }: { name?: 'right' | 'left' | 'up' | 'down' | 'external' | 'check' } = $props();
  const paths = {
    right: 'M4 10h12M11 5l5 5-5 5',
    left: 'M16 10H4m5-5-5 5 5 5',
    up: 'M10 16V4m-5 5 5-5 5 5',
    down: 'M10 4v12m-5-5 5 5 5-5',
    external: 'M5 15 15 5M5 5h10v10',
    check: 'm4 10 4 4 8-8'
  };
</script>
<svg class="route-icon" viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true"><path d={paths[name]} stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
<style>.route-icon { display: inline-block; flex-shrink: 0; vertical-align: middle; }</style>
