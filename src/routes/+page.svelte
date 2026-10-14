<script lang="ts">
  import RouteIcon from '$lib/components/RouteIcon.svelte';
  import { onMount } from 'svelte';
  import { stops, stopById, chapters, allItems, getStates, nextStop, type Stop } from '$lib/journey/graph';
  import { getJourneyProgress, loadJourney } from '$lib/journey/progress.svelte';
  import { isLearned } from '$lib/stores/auth.svelte';
  let progress = $derived(getJourneyProgress());
  function learned(key: string) { const split = key.lastIndexOf('_'); return progress.learned[key] === true || isLearned(key.slice(0, split), Number(key.slice(split + 1))); }
  let states = $derived(getStates(learned));
  let next = $derived(nextStop(states));
  let selectedId = $state('first-sounds');
  let selected = $derived(stopById.get(selectedId)!);
  let selectedState = $derived(states[selectedId]);
  let children = $derived(stops.filter((stop) => stop.requires.includes(selected.id)));
  let count = $derived(allItems.filter(({ key }) => learned(key)).length);
  let completed = $derived(stops.filter((stop) => states[stop.id] === 'complete').length);
  let percent = $derived(Math.round(count / allItems.length * 100));
  let panel: HTMLElement;
  onMount(() => { loadJourney(); selectedId = nextStop(getStates(learned))?.id ?? 'home'; });
  function select(stop: Stop) { selectedId = stop.id; if (window.innerWidth < 1050) panel?.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }
  function locate() { if (next) { selectedId = next.id; document.getElementById(`stop-${next.id}`)?.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); } }
  function edgePath(from: Stop, to: Stop) { return `M ${from.x * 8} ${from.y} C ${from.x * 8} ${(from.y + to.y) / 2}, ${to.x * 8} ${(from.y + to.y) / 2}, ${to.x * 8} ${to.y}`; }
  const labels = { locked: 'Not yet', available: 'Ready to explore', active: 'In progress', complete: 'Complete' };
</script>

<svelte:head><title>Your Japanese adventure — Kotsu</title><meta name="description" content="Choose a path through Japanese. Connect sounds, radicals, kanji, and words in one complete learning adventure." /></svelte:head>

<div class="journey-page">
  <section class="journey-intro" aria-labelledby="journey-title">
    <div><h1 id="journey-title">Find your way.<br /><span>Find your Japanese.</span></h1><p>Choose your path. Connect the pieces.<br class="mobile-break" /> The whole world is yours to finish.</p></div>
    <div class="journey-passport"><span class="passport-title">Your first journey</span><div><strong>{percent}<small>%</small></strong><span>{completed} of {stops.length} stops complete<br />{count} of {allItems.length} pieces learned</span></div><progress value={count} max={allItems.length} aria-label="Course completion"></progress><span class="save-note">{!progress.ready ? 'Loading your adventure…' : progress.saveError ? 'Storage unavailable. Keep this tab open.' : 'Adventure progress saved on this device'}</span></div>
  </section>
  <div class="journey-workspace">
    <aside class="chapter-index" aria-label="Journey chapters">
      <p class="index-title">The route</p>
      {#each chapters as chapter, i}
        <a href={`#chapter-${i}`} class:current={selected.chapter === i}><span class="chapter-number">0{i + 1}</span><span>{chapter.title}<small>{stops.filter((s) => s.chapter === i && states[s.id] === 'complete').length}/{stops.filter((s) => s.chapter === i).length} stops</small></span></a>
      {/each}
      <div class="route-note"><svg viewBox="0 0 32 36" width="32" height="36" fill="none" aria-hidden="true"><path d="M16 1v9M16 10L5 20v12M16 10l11 10v12" stroke="currentColor" stroke-width="2"/><circle cx="5" cy="32" r="3" fill="currentColor"/><circle cx="27" cy="32" r="3" fill="currentColor"/></svg><p>Different paths.<br />One complete journey.</p><small>A fork is a choice of order. Come back for the other path. Both belong to your story.</small></div>
      <a href="/library" class="guide-link">Explore the field guide <RouteIcon name="external" /></a>
    </aside>
    <section class="map-section" aria-label="Interactive course map">
      <div class="map-toolbar"><span><span class="legend-dot ready"></span> Ready <span class="legend-dot done"></span> Complete <span class="legend-dot later"></span> Not yet</span><button onclick={locate} disabled={!next}>Find my next stop <RouteIcon name="down" /></button></div>
      <!-- The scroll region must be focusable so keyboard users can pan the map. -->
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <div class="map-scroll" tabindex="0" role="region" aria-label="Scrollable journey map"><div class="journey-map">
        <svg class="map-lines" viewBox="0 0 800 2300" preserveAspectRatio="none" aria-hidden="true">
          {#each stops as stop}{#each stop.requires as parentId}
            {@const parent = stopById.get(parentId)!}
            <path d={edgePath(parent, stop)} class:earned={states[parentId] === 'complete'} />
          {/each}{/each}
        </svg>
        {#each chapters as chapter, i}<div class="map-chapter" id={`chapter-${i}`} style={`top: ${chapter.start}px`}><span>0{i + 1}</span><h2>{chapter.title}</h2><span class="map-chapter-jp" lang="ja">{chapter.glyph}</span></div>{/each}
        {#each stops as stop}
          {@const state = states[stop.id]}
          <button id={`stop-${stop.id}`} class="map-stop {state}" class:selected={selectedId === stop.id} class:checkpoint={stop.checkpoint} style={`left: ${stop.x}%; top: ${stop.y}px`} onclick={() => select(stop)} aria-pressed={selectedId === stop.id} aria-label={`${stop.title}: ${labels[state]}`}>
            <span class="station"><span lang="ja">{stop.glyph}</span>{#if state === 'complete'}<svg class="station-badge" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10"/><path d="m5 10 3 3 7-7" fill="none" stroke="white" stroke-width="2"/></svg>{:else if state === 'locked'}<svg class="station-badge lock" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="5" y="9" width="10" height="8" rx="2"/><path d="M7 9V6a3 3 0 0 1 6 0v3"/></svg>{/if}</span>
            <strong>{stop.title}</strong><small>{stop.checkpoint ? 'Checkpoint' : state === 'active' ? `${stop.items.filter(({ key }) => learned(key)).length}/${stop.items.length} learned` : `${stop.items.length} pieces`}</small>
          </button>
        {/each}
        <div class="map-end">The end is another beginning.</div>
      </div></div>
    </section>
    <aside class="stop-panel" bind:this={panel} aria-label="Selected stop">
      <div class="stop-preview" class:is-complete={selectedState === 'complete'}><span class="preview-coordinate">{String(stops.indexOf(selected) + 1).padStart(2, '0')} / {stops.length}</span><span class="preview-glyph" lang="ja">{selected.glyph}</span><span class="preview-caption">{chapters[selected.chapter].title}</span><svg viewBox="0 0 200 60" class="preview-path" aria-hidden="true"><path d="M0 45H70Q100 45 100 20T130 0H200" fill="none" stroke="currentColor" stroke-width="1"/></svg></div>
      <div class="stop-detail" aria-live="polite">
        <a class="mobile-map-return" href={`#stop-${selectedId}`}><RouteIcon name="up" /> Back to this stop on the map</a>
        <div class="stop-status {selectedState}"><span class="legend-dot"></span>{labels[selectedState]}</div>
        <h2>{selected.title}</h2><p>{selected.story}</p>
        {#if selected.items.length}<div class="lesson-preview" lang="ja">{selected.items.slice(0, 5).map(({ item }) => item.character).join('　')}</div><div class="lesson-meta"><span>{selected.items.length} pieces to collect</span><span>5 per session</span></div>{/if}
        {#if selectedState === 'locked'}
          <p class="unlock-note">First, complete:</p><ul class="dependency-list">{#each selected.requires as id}<li><button onclick={() => select(stopById.get(id)!)}>{stopById.get(id)!.title}<span>{states[id] === 'complete' ? 'Complete' : 'View stop'}</span></button></li>{/each}</ul>
        {:else if !selected.checkpoint}<a class="adventure-button" href={`/journey/${selected.id}`}>{selectedState === 'complete' ? 'Revisit this stop' : selectedState === 'active' ? 'Continue exploring' : 'Let’s go'}<RouteIcon name="right" /></a>
        {:else}<div class="checkpoint-message">{selected.id === 'home' ? 'You explored every path. Keep your Japanese alive by revisiting any stop.' : 'All paths connected. Your next stops are open.'}</div>{/if}
        {#if selected.requires.length === 0}<p class="quiet-note">No account needed. Just a little curiosity.</p>{/if}
        {#if children.length}<div class="next-paths"><h3>Where this leads</h3>{#each children as child}<button onclick={() => select(child)}><span lang="ja">{child.glyph}</span>{child.title}<RouteIcon name="external" /></button>{/each}</div>{/if}
      </div>
    </aside>
  </div>
  <footer class="journey-footer"><span lang="ja">コツ</span><p>A little practice. A whole new way to see.</p><a href="/library">All characters & recipes <RouteIcon /></a></footer>
</div>
