import type { PageLoad } from './$types';

interface LookupEntry {
	word: string;
	reading: string;
	meanings: string[];
	partsOfSpeech: string[];
	isCommon: boolean;
	jlpt: string;
	otherForms: string[];
	senses: {
		meanings: string[];
		partsOfSpeech: string[];
		tags: string[];
		info: string[];
	}[];
}

function cleanJlpt(value: string): string {
	return value ? value.replace('jlpt-', 'JLPT ').toUpperCase() : '';
}

function mapHit(hit: any, fallback: string): LookupEntry {
	const primary = hit.japanese?.[0] ?? {};
	const word = primary.word || primary.reading || fallback;
	const reading = primary.reading || '';
	const senses = (hit.senses ?? []).map((sense: any) => ({
		meanings: sense.english_definitions ?? [],
		partsOfSpeech: sense.parts_of_speech ?? [],
		tags: sense.tags ?? [],
		info: sense.info ?? []
	}));

	return {
		word,
		reading,
		meanings: senses.flatMap((sense: LookupEntry['senses'][number]) => sense.meanings),
		partsOfSpeech: [...new Set(senses.flatMap((sense: LookupEntry['senses'][number]) => sense.partsOfSpeech))],
		isCommon: Boolean(hit.is_common),
		jlpt: cleanJlpt(hit.jlpt?.[0] ?? ''),
		otherForms: (hit.japanese ?? [])
			.map((item: any) => item.word || item.reading)
			.filter((item: string | undefined, index: number, all: (string | undefined)[]) => item && item !== word && all.indexOf(item) === index),
		senses
	};
}

export const load: PageLoad = async ({ fetch, params }) => {
	const term = params.term;
	const response = await fetch(`/api/jisho?keyword=${encodeURIComponent(term)}`);
	const json = response.ok ? await response.json() : { data: [] };
	const hits = json.data ?? [];
	const entries = hits.map((hit: any) => mapHit(hit, term));
	const result =
		entries.find((entry: LookupEntry) => entry.word === term || entry.reading === term) ??
		entries[0] ??
		null;

	return {
		term,
		result,
		alternatives: entries
			.filter((entry: LookupEntry) => entry.word !== result?.word || entry.reading !== result?.reading)
			.slice(0, 4)
	};
};
