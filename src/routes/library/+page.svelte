<script lang="ts">
  import RouteIcon from '$lib/components/RouteIcon.svelte';
  import { columns, getColumnItems } from '$lib/data';
  import { radicalRecipes } from '$lib/course';
  import WordSearch from '$lib/components/WordSearch.svelte';
  import WordCollection from '$lib/components/WordCollection.svelte';
  import { getAuthState } from '$lib/stores/auth.svelte';
  let auth = $derived(getAuthState());
</script>
<svelte:head><title>Field guide — Kotsu</title></svelte:head>
<div class="field-guide">
  <header><h1>Look a little closer.</h1><p>Your field guide to the pieces of Japanese. Explore freely here; your journey is always waiting.</p><WordSearch variant="header" /></header>
  <section aria-label="Character collections" class="guide-collections">
    {#each columns as column}<a href={`/${column.id}`}><span lang="ja">{getColumnItems(column)[0].character}</span><div><h2>{column.title}</h2><p>{column.hint}</p></div><small>{getColumnItems(column).length} pieces <RouteIcon name="external" /></small></a>{/each}
  </section>
  <section class="recipe-guide"><h2>Pieces become meaning.</h2><p>Discover how familiar parts connect. These visual memory hooks help you recognise the whole.</p><div>{#each radicalRecipes as recipe}<a href={`/recipes/${recipe.id}`}><span class="recipe-formula" lang="ja">{recipe.parts.join(' + ')} <RouteIcon name="right" /> <b>{recipe.result}</b></span><span>{recipe.meaning} <RouteIcon name="external" /></span></a>{/each}</div></section>
  {#if auth.user}<WordCollection />{/if}
  <a class="guide-return" href="/"><RouteIcon name="left" /> Return to your journey</a>
</div>
