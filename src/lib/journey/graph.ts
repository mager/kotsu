import { columns, getColumnItems, type CardItem } from '../data';

export interface LessonItem { key: string; column: string; index: number; item: CardItem }
export interface Stop {
  id: string; title: string; glyph: string; chapter: number; x: number; y: number;
  requires: string[]; story: string; items: LessonItem[]; checkpoint?: boolean;
}
export type StopState = 'locked' | 'available' | 'active' | 'complete';
export const chapters = [
  { title: 'The sound trail', subtitle: 'Make the unfamiliar sound familiar.', glyph: 'あ', start: 0 },
  { title: 'The radical forest', subtitle: 'Find the pieces hiding in plain sight.', glyph: '木', start: 770 },
  { title: 'The kanji crossing', subtitle: 'Watch small pieces become big ideas.', glyph: '明', start: 1260 },
  { title: 'The word village', subtitle: 'Put your Japanese out into the world.', glyph: '話', start: 1750 },
  { title: 'Beyond the horizon', subtitle: 'Keep building your reading world.', glyph: '読', start: 2440 }
];
function items(column: string, from = 0, to?: number): LessonItem[] {
  const data = columns.find((c) => c.id === column);
  if (!data) throw new Error(`Unknown column: ${column}`);
  return getColumnItems(data).map((item, index) => ({ key: `${column}_${index}`, column, index, item })).slice(from, to);
}
function chosen(column: string, characters: string[]): LessonItem[] {
  return items(column).filter(({ item }) => characters.includes(item.character));
}
function section(column: string, ids: string[]): LessonItem[] {
  const source = columns.find((c) => c.id === column)!;
  let offset = 0;
  return source.sections.flatMap((part) => {
    const start = offset; offset += part.items.length;
    return ids.includes(part.id) ? items(column, start, offset) : [];
  });
}
const numberKanji = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
const natureKanji = ['日', '月', '火', '水', '木', '金', '土'];
const placeKanji = ['人', '大', '小', '中', '上', '下', '年'];
const nature = ['水', '火', '木', '金', '土', '日', '月', '山', '川', '雨'];
const people = ['人', '口', '目', '手', '心', '力', '女', '子'];
export const stops: Stop[] = [
  { id: 'first-sounds', title: 'First light', glyph: 'あ', chapter: 0, x: 50, y: 110, requires: [], story: 'Every journey starts with a sound. Meet あ・い・う・え・お, the five vowels that open the door to Japanese.', items: items('hiragana', 0, 5) },
  { id: 'hiragana', title: 'The familiar path', glyph: 'か', chapter: 0, x: 25, y: 290, requires: ['first-sounds'], story: 'Follow the sounds into hiragana. These characters will be your companions in everyday Japanese.', items: items('hiragana', 5, 46) },
  { id: 'katakana', title: 'The other side', glyph: 'カ', chapter: 0, x: 75, y: 290, requires: ['first-sounds'], story: 'Same sounds, new shapes. Cross into katakana, the script you will meet in borrowed words and names.', items: items('katakana', 0, 46) },
  { id: 'hiragana-marks', title: 'A change in the air', glyph: 'が', chapter: 0, x: 25, y: 480, requires: ['hiragana'], story: 'A small mark can change a whole sound. Discover voiced sounds, blends, and doubled consonants.', items: items('hiragana', 46) },
  { id: 'katakana-marks', title: 'New frequencies', glyph: 'ガ', chapter: 0, x: 75, y: 480, requires: ['katakana'], story: 'Complete the katakana sound map with marks, small kana, and combinations.', items: items('katakana', 46) },
  { id: 'sound-gate', title: 'Sounds connected', glyph: '音', chapter: 0, x: 50, y: 670, requires: ['hiragana-marks', 'katakana-marks'], story: 'Both sound trails meet here. Complete both routes to enter the radical forest.', items: [], checkpoint: true },
  { id: 'nature', title: 'Water, fire, wood', glyph: '木', chapter: 1, x: 18, y: 910, requires: ['sound-gate'], story: 'Look closely. Some characters still hold a picture of the natural world inside them.', items: chosen('radicals', nature) },
  { id: 'people', title: 'The human story', glyph: '人', chapter: 1, x: 50, y: 910, requires: ['sound-gate'], story: 'People, hands, hearts. Meet the building blocks that put human life into a character.', items: chosen('radicals', people) },
  { id: 'world', title: 'Objects & ideas', glyph: '門', chapter: 1, x: 82, y: 910, requires: ['sound-gate'], story: 'A gate, a thread, a word. Collect the remaining radicals and learn what each piece can suggest.', items: items('radicals').filter(({ item }) => ![...nature, ...people].includes(item.character)) },
  { id: 'radical-gate', title: 'Pieces collected', glyph: '部', chapter: 1, x: 50, y: 1160, requires: ['nature', 'people', 'world'], story: 'All three paths matter. With every radical collected, you can start joining the pieces.', items: [], checkpoint: true },
  { id: 'numbers', title: 'Count the steps', glyph: '三', chapter: 2, x: 18, y: 1400, requires: ['radical-gate'], story: 'Start with a single stroke. Learn the kanji for one through ten.', items: section('kanji', ['n5']).filter(({ item }) => numberKanji.includes(item.character)) },
  { id: 'elements', title: 'A world in symbols', glyph: '日', chapter: 2, x: 50, y: 1400, requires: ['radical-gate'], story: 'You know the shapes. Now connect the elements to their meanings and readings.', items: section('kanji', ['n5']).filter(({ item }) => natureKanji.includes(item.character)) },
  { id: 'places', title: 'Find your bearings', glyph: '中', chapter: 2, x: 82, y: 1400, requires: ['radical-gate'], story: 'People, size, direction, time. Build a small vocabulary for describing where you are.', items: section('kanji', ['n5']).filter(({ item }) => placeKanji.includes(item.character)) },
  { id: 'combinations', title: 'The knack', glyph: '明', chapter: 2, x: 50, y: 1640, requires: ['numbers', 'elements', 'places'], story: 'Connect the pieces with the remaining N5 kanji. Build a foundation for reading everyday Japanese.', items: section('kanji', ['n5']).filter(({ item }) => ![...numberKanji, ...natureKanji, ...placeKanji].includes(item.character)) },
  { id: 'everyday', title: 'Small talk, big world', glyph: '好', chapter: 3, x: 25, y: 1890, requires: ['combinations'], story: 'Read your first everyday words as whole ideas, not just a string of symbols.', items: items('vocabulary', 0, 10) },
  { id: 'greetings', title: 'Say hello', glyph: '礼', chapter: 3, x: 75, y: 1890, requires: ['combinations'], story: 'A greeting opens a door. Learn the phrases that help you meet someone on the other side.', items: items('vocabulary', 10, 15) },
  { id: 'travel-words', title: 'Find your way', glyph: '道', chapter: 3, x: 18, y: 2120, requires: ['everyday', 'greetings'], story: 'Ask for directions, use numbers in context, and find the words when you need help.', items: section('vocabulary', ['navigation', 'numbers', 'emergency']) },
  { id: 'daily-words', title: 'A taste of Japan', glyph: '食', chapter: 3, x: 50, y: 2120, requires: ['everyday', 'greetings'], story: 'Order something delicious and find your way around a shop. Put familiar sounds to work.', items: section('vocabulary', ['eating', 'shopping']) },
  { id: 'connection-words', title: 'Open a conversation', glyph: '話', chapter: 3, x: 82, y: 2120, requires: ['everyday', 'greetings'], story: 'Add polite phrases, greetings, social expressions, and essential verbs to your conversations.', items: section('vocabulary', ['greetings', 'politeness', 'social', 'verbs']) },
  { id: 'word-gate', title: 'Words connected', glyph: '言', chapter: 3, x: 50, y: 2350, requires: ['travel-words', 'daily-words', 'connection-words'], story: 'Every word route is complete. Carry these connections into deeper reading.', items: [], checkpoint: true },
  { id: 'n4-kanji', title: 'Widen your world', glyph: '広', chapter: 4, x: 50, y: 2600, requires: ['word-gate'], story: 'Build on your foundation with the N4 kanji collection. Take it five pieces at a time.', items: section('kanji', ['n4']) },
  { id: 'n3-kanji', title: 'Read new horizons', glyph: '読', chapter: 4, x: 50, y: 2800, requires: ['n4-kanji'], story: 'Explore the N3 kanji collection and connect more of the written world. There is no deadline.', items: section('kanji', ['n3']) },
  { id: 'home', title: 'A world unlocked', glyph: '旅', chapter: 4, x: 50, y: 3000, requires: ['n3-kanji'], story: 'Every route explored. Every piece connected. This first journey is complete; revisit any stop to keep the knack alive.', items: [], checkpoint: true }
];
export const mapHeight = Math.max(...stops.map((stop) => stop.y)) + 170;
export const stopById = new Map(stops.map((stop) => [stop.id, stop]));
export const allItems = stops.flatMap((stop) => stop.items);
export function getStates(learned: (key: string) => boolean): Record<string, StopState> {
  const states: Record<string, StopState> = {};
  for (const stop of stops) {
    const unlocked = stop.requires.every((id) => states[id] === 'complete');
    const count = stop.items.filter(({ key }) => learned(key)).length;
    states[stop.id] = !unlocked ? 'locked' : stop.checkpoint || count === stop.items.length ? 'complete' : count > 0 ? 'active' : 'available';
  }
  return states;
}
export function nextStop(states: Record<string, StopState>): Stop | undefined {
  return stops.find((stop) => states[stop.id] === 'active') ?? stops.find((stop) => states[stop.id] === 'available');
}
export function answerFor(entry: LessonItem): string {
  return entry.column === 'hiragana' || entry.column === 'katakana' ? entry.item.romaji : entry.item.meaning;
}
export function optionsFor(entry: LessonItem): string[] {
  const correct = answerFor(entry);
  const options = [correct];
  for (const candidate of items(entry.column).slice().sort((a, b) => ((a.index * 17 + entry.index * 7) % 53) - ((b.index * 17 + entry.index * 7) % 53))) {
    const answer = answerFor(candidate);
    if (!options.includes(answer)) options.push(answer);
    if (options.length === 4) break;
  }
  // A stable rotation avoids always placing the correct answer first.
  const offset = entry.index % options.length;
  return [...options.slice(offset), ...options.slice(0, offset)];
}
