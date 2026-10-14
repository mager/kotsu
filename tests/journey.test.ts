import { describe, expect, test } from 'bun:test';
import { columns, getColumnItems } from '../src/lib/data';
import { stops, allItems, getStates, nextStop, optionsFor, answerFor } from '../src/lib/journey/graph';

describe('complete branching journey', () => {
  test('every prerequisite exists earlier in the DAG; there are no cycles', () => {
    const seen = new Set<string>();
    for (const stop of stops) {
      expect(seen.has(stop.id)).toBe(false);
      for (const parent of stop.requires) expect(seen.has(parent)).toBe(true);
      seen.add(stop.id);
    }
  });
  test('covers every source item exactly once', () => {
    const expected = columns.flatMap((column) => getColumnItems(column).map((_, index) => `${column.id}_${index}`));
    expect(allItems.map(({ key }) => key).sort()).toEqual(expected.sort());
    expect(new Set(allItems.map(({ key }) => key)).size).toBe(allItems.length);
  });
  test('starts with only the first five vowels available', () => {
    const states = getStates(() => false);
    expect(stops.filter((stop) => states[stop.id] === 'available').map(({ id }) => id)).toEqual(['first-sounds']);
    expect(nextStop(states)?.items.length).toBe(5);
    expect(states.home).toBe('locked');
  });
  test('completing the first stop opens both choices', () => {
    const learned = new Set(stops[0].items.map(({ key }) => key));
    const states = getStates((key) => learned.has(key));
    expect(states.hiragana).toBe('available'); expect(states.katakana).toBe('available');
    expect(states['sound-gate']).toBe('locked');
  });
  test('one branch cannot bypass an all-parent checkpoint', () => {
    const learned = new Set(stops.filter((s) => ['first-sounds', 'hiragana', 'hiragana-marks'].includes(s.id)).flatMap((s) => s.items.map(({ key }) => key)));
    const states = getStates((key) => learned.has(key));
    expect(states['hiragana-marks']).toBe('complete');
    expect(states['sound-gate']).toBe('locked'); expect(states.nature).toBe('locked');
  });
  test('previously learned later content does not bypass prerequisites', () => {
    const states = getStates((key) => key.startsWith('vocabulary_'));
    expect(states.greetings).toBe('locked'); expect(states.home).toBe('locked');
  });
  test('all branches can be finished in either order and the journey terminates', () => {
    const learned = new Set<string>();
    let steps = 0;
    while (getStates((key) => learned.has(key)).home !== 'complete') {
      const states = getStates((key) => learned.has(key));
      const available = stops.filter((s) => states[s.id] === 'available');
      expect(available.length).toBeGreaterThan(0);
      const chosen = available.at(-1)!;
      chosen.items.forEach(({ key }) => learned.add(key));
      expect(++steps).toBeLessThan(stops.length);
    }
    expect(learned.size).toBe(allItems.length);
    expect(nextStop(getStates(() => true))).toBeUndefined();
  });
  test('every recall prompt includes its unique correct answer', () => {
    for (const entry of allItems) {
      const answers = optionsFor(entry);
      expect(answers.length).toBe(4);
      expect(new Set(answers).size).toBe(4);
      expect(answers.filter((a) => a === answerFor(entry))).toHaveLength(1);
    }
  });
});
