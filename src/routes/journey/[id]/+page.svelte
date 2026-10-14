<script lang="ts">
  import RouteIcon from '$lib/components/RouteIcon.svelte';
  import { onMount } from 'svelte';
  import { getStates, stopById, answerFor, optionsFor, chapters, type LessonItem, type Stop } from '$lib/journey/graph';
  import { getJourneyProgress, loadJourney, recordAnswer } from '$lib/journey/progress.svelte';
  import { isLearned } from '$lib/stores/auth.svelte';
  let { data }: { data: { stop: Stop } } = $props();
  let progress = $derived(getJourneyProgress());
  function learned(key: string) { const split = key.lastIndexOf('_'); return progress.learned[key] === true || isLearned(key.slice(0, split), Number(key.slice(split + 1))); }
  let states = $derived(getStates(learned));
  let queue = $state<LessonItem[]>([]);
  let index = $state(0);
  let mode = $state<'study' | 'quiz' | 'result'>('study');
  let picked = $state('');
  let feedback = $state('');
  let correct = $state(false);
  let started = $state(false);
  let entry = $derived(queue[index]);
  let choices = $derived(entry ? optionsFor(entry) : []);
  let remaining = $derived(data.stop.items.filter(({ key }) => !learned(key)).length);
  onMount(() => { loadJourney(); start(); });
  function start() {
    const unlearned = data.stop.items.filter(({ key }) => !learned(key));
    queue = (unlearned.length ? unlearned : data.stop.items).slice(0, 5);
    index = 0; mode = 'study'; picked = ''; feedback = ''; correct = false; started = true;
  }
  function choose(answer: string) {
    if (correct) return;
    picked = answer;
    correct = answer === answerFor(entry);
    feedback = correct ? 'That’s it. One more piece connected.' : 'Not quite. Take another look and try again.';
    if (correct && states[data.stop.id] !== 'locked') recordAnswer(entry.key);
  }
  function advance() {
    if (index === queue.length - 1) { mode = 'result'; return; }
    index += 1; mode = 'study'; picked = ''; feedback = ''; correct = false;
  }
</script>
<svelte:head><title>{data.stop.title} — Kotsu</title></svelte:head>
<div class="play-page">
  <a class="back-to-map" href="/"><RouteIcon name="left" /> Back to the journey</a>
  {#if !started}<p role="status">Opening your journey…</p>
  {:else if states[data.stop.id] === 'locked'}
    <section class="lesson-locked"><span lang="ja">{data.stop.glyph}</span><h1>This path is still ahead.</h1><p>Complete these stops to unlock {data.stop.title}.</p>{#each data.stop.requires as id}<a href="/">{stopById.get(id)!.title} <RouteIcon /></a>{/each}</section>
  {:else if mode === 'result'}
    <section class="session-result"><div class="result-stamp" lang="ja">{data.stop.glyph}</div><h1>{remaining === 0 ? 'A path completed.' : 'Five steps further.'}</h1><p>{remaining === 0 ? 'You connected every piece at this stop. Return to the map and choose what comes next.' : `${queue.length} pieces practised. ${remaining} left at this stop. You can keep going or come back later.`}</p>{#if remaining > 0}<button class="adventure-button" onclick={start}>Explore the next five <RouteIcon name="right" /></button>{/if}<a class:adventure-button={remaining === 0} class="result-map-link" href="/">Choose my next path <RouteIcon /></a><small>{progress.saveError ? 'Progress is only saved in this tab. Device storage is unavailable.' : 'Progress saved on this device. No streaks to protect.'}</small></section>
  {:else if entry}
    <header class="play-heading"><div><h1>{data.stop.title}</h1><p>{chapters[data.stop.chapter].title}</p></div><span>{index + 1} / {queue.length}</span></header>
    <div class="session-progress" aria-label={`Piece ${index + 1} of ${queue.length}`}>{#each queue as _, i}<span class:done={i < index} class:current={i === index}></span>{/each}</div>
    <section class="learning-table" aria-label="Practice card">
      <div class="study-character"><span class="study-task">{mode === 'study' ? 'Meet this piece' : (entry.column === 'hiragana' || entry.column === 'katakana') ? 'What sound does this make?' : 'What does this mean?'}</span><div lang="ja" class:word={entry.item.character.length > 2}>{entry.item.character}</div><a href={`/${entry.column}/${entry.index}`}>Open in field guide <RouteIcon name="external" /></a></div>
      <div class="study-interaction">
        {#if mode === 'study'}<p class="study-reading">{entry.item.romaji}</p><h2>{entry.item.meaning}</h2><p>{entry.item.mnemonic ?? (entry.item.readings ? 'Look at the shape. Connect it to the meaning, then say the reading aloud.' : 'Look at the shape. Say it aloud. When you’re ready, see what you remember.')}</p>{#if entry.item.readings}<dl>{#if entry.item.readings.on?.length}<dt>On reading</dt><dd lang="ja">{entry.item.readings.on.join(' · ')}</dd>{/if}{#if entry.item.readings.kun?.length}<dt>Kun reading</dt><dd lang="ja">{entry.item.readings.kun.join(' · ')}</dd>{/if}</dl>{/if}<button class="adventure-button" onclick={() => { mode = 'quiz'; }}>Try to recall it <RouteIcon name="right" /></button>
        {:else}<h2>Make the connection.</h2><div class="answer-options">{#each choices as answer}<button class:correct={correct && picked === answer} class:incorrect={!correct && picked === answer} disabled={correct} onclick={() => choose(answer)}>{answer}{#if correct && picked === answer}<RouteIcon name="check" />{/if}</button>{/each}</div><p class="answer-feedback" role="status">{feedback || 'Choose the matching answer. There’s no timer.'}</p>{#if correct}<button class="adventure-button" onclick={advance}>{index === queue.length - 1 ? 'Finish this session' : 'Next piece'} <RouteIcon name="right" /></button>{:else}<button class="restudy" onclick={() => { mode = 'study'; picked = ''; feedback = ''; }}>Look at the piece again</button>{/if}{/if}
      </div>
    </section>
    <p class="play-footnote">Your pace. Your path. Every piece counts.</p>
  {/if}
</div>
