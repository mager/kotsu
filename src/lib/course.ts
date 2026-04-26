import { columns, getColumnItems, type CardItem, type Column } from './data';

export type CourseLane = 'trunk' | 'branch';

export interface CourseRef {
	columnId: string;
	sectionId?: string;
	characters?: string[];
}

export interface CourseItemRef {
	columnId: string;
	index: number;
	item: CardItem;
}

export interface CourseProgress {
	learned: number;
	total: number;
	pct: number;
	status: 'fresh' | 'active' | 'complete';
}

export interface CourseUnit {
	id: string;
	title: string;
	titleJp: string;
	phase: string;
	lane: CourseLane;
	summary: string;
	practice: string;
	focus: string[];
	refs: CourseRef[];
}

export interface RadicalRecipe {
	parts: string[];
	result: string;
	meaning: string;
	pattern: string;
}

export const courseUnits: CourseUnit[] = [
	{
		id: 'hiragana-shapes',
		title: 'Sound Seeds',
		titleJp: 'あいうえお',
		phase: 'Beginner',
		lane: 'trunk',
		summary: 'Build the first sound map with simple, repeatable kana shapes.',
		practice: 'Hear it, say it, spot it in a row.',
		focus: ['vowels', 'kana rows', 'recognition'],
		refs: [{ columnId: 'hiragana', sectionId: 'basic' }]
	},
	{
		id: 'hiragana-changes',
		title: 'Sound Branches',
		titleJp: '濁音',
		phase: 'Beginner',
		lane: 'branch',
		summary: 'Add marks and small kana so one shape can open into nearby sounds.',
		practice: 'Compare the base sound with its marked version.',
		focus: ['dakuten', 'handakuten', 'small kana'],
		refs: [
			{ columnId: 'hiragana', sectionId: 'dakuon' },
			{ columnId: 'hiragana', sectionId: 'handakuon' },
			{ columnId: 'hiragana', sectionId: 'yoon' },
			{ columnId: 'hiragana', sectionId: 'sokuon' }
		]
	},
	{
		id: 'katakana-mirror',
		title: 'Borrowed Sound Map',
		titleJp: 'カタカナ',
		phase: 'Beginner',
		lane: 'branch',
		summary: 'Map familiar sounds onto sharper katakana forms.',
		practice: 'Pair each katakana with the hiragana sound you already know.',
		focus: ['mirror pairs', 'loanwords', 'shape contrast'],
		refs: [{ columnId: 'katakana', sectionId: 'basic' }]
	},
	{
		id: 'katakana-changes',
		title: 'Borrowed Sound Branches',
		titleJp: 'ダクオン',
		phase: 'Beginner',
		lane: 'branch',
		summary: 'Finish the sound system with marked katakana and compact blends.',
		practice: 'Read the changed sound before looking at the romaji.',
		focus: ['marked katakana', 'contracted sounds', 'double consonants'],
		refs: [
			{ columnId: 'katakana', sectionId: 'dakuon' },
			{ columnId: 'katakana', sectionId: 'handakuon' },
			{ columnId: 'katakana', sectionId: 'yoon' },
			{ columnId: 'katakana', sectionId: 'sokuon' }
		]
	},
	{
		id: 'nature-radicals',
		title: 'Nature Radicals',
		titleJp: '自然',
		phase: 'Radicals',
		lane: 'trunk',
		summary: 'Learn the picture-words children meet early: water, fire, tree, sun, moon, mountain, river, rain.',
		practice: 'Name the image before naming the reading.',
		focus: ['picture meaning', 'semantic families', 'kanji atoms'],
		refs: [{ columnId: 'radicals', characters: ['水', '火', '木', '金', '土', '日', '月', '山', '川', '雨'] }]
	},
	{
		id: 'people-radicals',
		title: 'People And Body',
		titleJp: 'からだ',
		phase: 'Radicals',
		lane: 'branch',
		summary: 'Study the radicals that show bodies, hands, mouths, eyes, hearts, strength, and family.',
		practice: 'Notice how many radicals become slimmer when they join another kanji.',
		focus: ['body parts', 'human action', 'radical variants'],
		refs: [{ columnId: 'radicals', characters: ['人', '口', '目', '手', '心', '力', '女', '子'] }]
	},
	{
		id: 'world-radicals',
		title: 'Things That Act',
		titleJp: '道具',
		phase: 'Radicals',
		lane: 'branch',
		summary: 'Add radicals for field, thread, speech, food, vehicle, and gate.',
		practice: 'Sort each radical by what kind of meaning it tends to carry.',
		focus: ['objects', 'movement', 'meaning clues'],
		refs: [{ columnId: 'radicals', characters: ['田', '糸', '言', '食', '車', '門'] }]
	},
	{
		id: 'number-kanji',
		title: 'Counting Kanji',
		titleJp: '一二三',
		phase: 'Kanji',
		lane: 'trunk',
		summary: 'Move from simple strokes into the first number kanji.',
		practice: 'Read the shape, then say the number without translating.',
		focus: ['stroke count', 'sequence', 'first readings'],
		refs: [{ columnId: 'kanji', characters: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'] }]
	},
	{
		id: 'nature-kanji',
		title: 'Nature Becomes Kanji',
		titleJp: '日月火',
		phase: 'Kanji',
		lane: 'trunk',
		summary: 'Turn familiar radicals into full kanji with readings attached.',
		practice: 'Say the meaning first, then the kun reading, then the on reading.',
		focus: ['radical to kanji', 'on readings', 'kun readings'],
		refs: [{ columnId: 'kanji', characters: ['日', '月', '火', '水', '木', '金', '土'] }]
	},
	{
		id: 'place-kanji',
		title: 'Body, Size, Place',
		titleJp: '人大小',
		phase: 'Kanji',
		lane: 'branch',
		summary: 'Learn kanji that describe people, scale, direction, and time.',
		practice: 'Group each character by the idea it points to.',
		focus: ['people', 'position', 'time'],
		refs: [{ columnId: 'kanji', characters: ['人', '大', '小', '中', '上', '下', '年'] }]
	},
	{
		id: 'baby-words',
		title: 'First Words',
		titleJp: 'はじめて',
		phase: 'Words',
		lane: 'trunk',
		summary: 'Read the kinds of words a child hears early, using kana you already know.',
		practice: 'Read the whole word as one sound shape.',
		focus: ['short words', 'daily meaning', 'fast recognition'],
		refs: [{ columnId: 'vocabulary', characters: ['ママ', 'パパ', 'はい', 'ワンワン', 'ニャーニャー', 'おいしい', 'いたい', 'すき', 'だめ', 'あぶない'] }]
	},
	{
		id: 'greeting-words',
		title: 'Social Words',
		titleJp: 'あいさつ',
		phase: 'Words',
		lane: 'branch',
		summary: 'Finish the first course loop with greetings and polite everyday phrases.',
		practice: 'Recognize the phrase as a chunk before spelling it out.',
		focus: ['greetings', 'chunks', 'polite language'],
		refs: [{ columnId: 'vocabulary', characters: ['こんにちは', 'ありがとう', 'ごめんなさい', 'さようなら', 'おはよう'] }]
	}
];

export const radicalRecipes: RadicalRecipe[] = [
	{ parts: ['日', '月'], result: '明', meaning: 'bright', pattern: 'sun plus moon' },
	{ parts: ['木', '木'], result: '林', meaning: 'woods', pattern: 'tree beside tree' },
	{ parts: ['人', '木'], result: '休', meaning: 'rest', pattern: 'person by a tree' },
	{ parts: ['火', '火'], result: '炎', meaning: 'flame', pattern: 'fire stacked on fire' },
	{ parts: ['門', '日'], result: '間', meaning: 'interval', pattern: 'sun through a gate' },
	{ parts: ['言', '五', '口'], result: '語', meaning: 'language', pattern: 'speech joined to a sound part' }
];

function getColumn(columnId: string): Column | undefined {
	return columns.find((column) => column.id === columnId);
}

function uniqueItems(items: CourseItemRef[]): CourseItemRef[] {
	const seen = new Set<string>();
	return items.filter((item) => {
		const key = `${item.columnId}_${item.index}`;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}

export function getCourseUnitItems(unit: CourseUnit): CourseItemRef[] {
	return uniqueItems(unit.refs.flatMap(resolveCourseRef));
}

export function getCourseUnitHref(unit: CourseUnit): string {
	const firstItem = getCourseUnitItems(unit)[0];
	return firstItem ? `/${firstItem.columnId}/${firstItem.index}` : '/';
}

export function getCoursePreview(unit: CourseUnit, max = 8): string[] {
	const seen = new Set<string>();
	const preview: string[] = [];

	for (const ref of getCourseUnitItems(unit)) {
		if (seen.has(ref.item.character)) continue;
		seen.add(ref.item.character);
		preview.push(ref.item.character);
		if (preview.length >= max) break;
	}

	return preview;
}

export function getCourseUnitProgress(
	unit: CourseUnit,
	isLearned: (columnId: string, index: number) => boolean
): CourseProgress {
	const items = getCourseUnitItems(unit);
	const learned = items.filter((item) => isLearned(item.columnId, item.index)).length;
	const pct = items.length > 0 ? Math.round((learned / items.length) * 100) : 0;

	return {
		learned,
		total: items.length,
		pct,
		status: pct === 100 ? 'complete' : learned > 0 ? 'active' : 'fresh'
	};
}

export function getCourseTotalProgress(
	isLearned: (columnId: string, index: number) => boolean
): CourseProgress {
	const items = uniqueItems(courseUnits.flatMap(getCourseUnitItems));
	const learned = items.filter((item) => isLearned(item.columnId, item.index)).length;
	const pct = items.length > 0 ? Math.round((learned / items.length) * 100) : 0;

	return {
		learned,
		total: items.length,
		pct,
		status: pct === 100 ? 'complete' : learned > 0 ? 'active' : 'fresh'
	};
}

export function getNextCourseUnit(
	isLearned: (columnId: string, index: number) => boolean
): CourseUnit {
	return courseUnits.find((unit) => getCourseUnitProgress(unit, isLearned).status !== 'complete') ?? courseUnits[0];
}

function resolveCourseRef(ref: CourseRef): CourseItemRef[] {
	const column = getColumn(ref.columnId);
	if (!column) return [];

	if (ref.sectionId) {
		let offset = 0;
		for (const section of column.sections) {
			if (section.id === ref.sectionId) {
				return section.items.map((item, index) => ({
					columnId: column.id,
					index: offset + index,
					item
				}));
			}
			offset += section.items.length;
		}
		return [];
	}

	const items = getColumnItems(column).map((item, index) => ({ columnId: column.id, index, item }));

	if (ref.characters) {
		const order = new Map(ref.characters.map((character, index) => [character, index]));
		return items
			.filter(({ item }) => order.has(item.character))
			.sort((a, b) => (order.get(a.item.character) ?? 0) - (order.get(b.item.character) ?? 0));
	}

	return items;
}
