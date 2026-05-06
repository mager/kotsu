import kanjiKnacks from './generated/kanji-knacks.json';

export type PitchAccentPattern = 'Heiban' | 'Atamadaka' | 'Nakadaka' | 'Odaka';

export interface KanjiKnack {
	kanji: string;
	meaning: string;
	radicals: string[];
	mnemonic: string;
	the_kotsu: string;
	pitch_accent: {
		reading: string;
		pattern: PitchAccentPattern;
	};
}

export const knacksByKanji = kanjiKnacks as Record<string, KanjiKnack>;

export function getKanjiKnack(kanji: string): KanjiKnack | null {
	return knacksByKanji[kanji] ?? null;
}

