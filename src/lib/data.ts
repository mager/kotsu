export interface RadicalRecipe {
	kanji: string;
	reading?: string;
	meaning: string;
	breakdown: string;
	clue: string;
}

export interface KanjiExample {
	word: string;
	reading: string;
	meaning: string;
}

export interface CardItem {
	character: string;
	romaji: string;
	meaning: string;
	readings?: { on?: string[]; kun?: string[] };
	pair?: string; // matching character in another system (e.g. katakana ↔ hiragana)
	mnemonic?: string;
	variants?: string[];
	tags?: string[];
	recipes?: RadicalRecipe[];
	// Kanji enrichment fields
	etymology?: string; // 1-3 sentence origin story
	components?: string[]; // structural parts, e.g. ["日 (sun)", "月 (moon)"]
	examples?: KanjiExample[]; // common compound words
	strokeCount?: number;
	// Vocabulary/phrase enrichment
	context?: string; // when/why you'd use this phrase
}

export interface ColumnSection {
	id: string;
	title: string;
	titleJp: string;
	items: CardItem[];
}

export interface Column {
	id: string;
	title: string;
	titleJp: string;
	hint: string;
	sections: ColumnSection[];
}

// Helper to get flat items array from sections
export function getColumnItems(column: Column): CardItem[] {
	return column.sections.flatMap((s) => s.items);
}

// Helper to find which section an index belongs to
export function getSectionForIndex(column: Column, flatIndex: number): { section: ColumnSection; localIndex: number } | null {
	let offset = 0;
	for (const section of column.sections) {
		if (flatIndex < offset + section.items.length) {
			return { section, localIndex: flatIndex - offset };
		}
		offset += section.items.length;
	}
	return null;
}

// ─────────────────────────────────────────────
// HIRAGANA
// ─────────────────────────────────────────────

const hiraganaBasic: CardItem[] = [
	{ character: 'あ', romaji: 'a', meaning: 'sounds like "ah"' },
	{ character: 'い', romaji: 'i', meaning: 'sounds like "ee"' },
	{ character: 'う', romaji: 'u', meaning: 'sounds like "oo"' },
	{ character: 'え', romaji: 'e', meaning: 'sounds like "eh"' },
	{ character: 'お', romaji: 'o', meaning: 'sounds like "oh"' },
	{ character: 'か', romaji: 'ka', meaning: 'like "ka" in karma' },
	{ character: 'き', romaji: 'ki', meaning: 'like "key"' },
	{ character: 'く', romaji: 'ku', meaning: 'like "koo" in cool' },
	{ character: 'け', romaji: 'ke', meaning: 'like "ke" in kept' },
	{ character: 'こ', romaji: 'ko', meaning: 'like "co" in cold' },
	{ character: 'さ', romaji: 'sa', meaning: 'like "sa" in saw' },
	{ character: 'し', romaji: 'shi', meaning: 'like "she"' },
	{ character: 'す', romaji: 'su', meaning: 'like "sue"' },
	{ character: 'せ', romaji: 'se', meaning: 'like "se" in set' },
	{ character: 'そ', romaji: 'so', meaning: 'like "so" in sold' },
	{ character: 'た', romaji: 'ta', meaning: 'like "ta" in taco' },
	{ character: 'ち', romaji: 'chi', meaning: 'like "chee" in cheese' },
	{ character: 'つ', romaji: 'tsu', meaning: 'like "tsu" in tsunami' },
	{ character: 'て', romaji: 'te', meaning: 'like "te" in ten' },
	{ character: 'と', romaji: 'to', meaning: 'like "to" in tone' },
	{ character: 'な', romaji: 'na', meaning: 'like "na" in nah' },
	{ character: 'に', romaji: 'ni', meaning: 'like "nee" in knee' },
	{ character: 'ぬ', romaji: 'nu', meaning: 'like "noo" in noodle' },
	{ character: 'ね', romaji: 'ne', meaning: 'like "ne" in net' },
	{ character: 'の', romaji: 'no', meaning: 'like "no"' },
	{ character: 'は', romaji: 'ha', meaning: 'like "ha" in hot' },
	{ character: 'ひ', romaji: 'hi', meaning: 'like "hee" in heat' },
	{ character: 'ふ', romaji: 'fu', meaning: 'between "fu" and "hu"' },
	{ character: 'へ', romaji: 'he', meaning: 'like "he" in help' },
	{ character: 'ほ', romaji: 'ho', meaning: 'like "ho" in hope' },
	{ character: 'ま', romaji: 'ma', meaning: 'like "ma" in mama' },
	{ character: 'み', romaji: 'mi', meaning: 'like "me"' },
	{ character: 'む', romaji: 'mu', meaning: 'like "moo"' },
	{ character: 'め', romaji: 'me', meaning: 'like "me" in met' },
	{ character: 'も', romaji: 'mo', meaning: 'like "mo" in more' },
	{ character: 'や', romaji: 'ya', meaning: 'like "ya" in yard' },
	{ character: 'ゆ', romaji: 'yu', meaning: 'like "you"' },
	{ character: 'よ', romaji: 'yo', meaning: 'like "yo"' },
	{ character: 'ら', romaji: 'ra', meaning: 'between "ra" and "la"' },
	{ character: 'り', romaji: 'ri', meaning: 'between "ree" and "lee"' },
	{ character: 'る', romaji: 'ru', meaning: 'between "roo" and "loo"' },
	{ character: 'れ', romaji: 're', meaning: 'between "re" and "le"' },
	{ character: 'ろ', romaji: 'ro', meaning: 'between "ro" and "lo"' },
	{ character: 'わ', romaji: 'wa', meaning: 'like "wa" in water' },
	{ character: 'を', romaji: 'wo', meaning: 'particle, sounds like "o"' },
	{ character: 'ん', romaji: 'n', meaning: 'nasal "n" or "m"' }
];

const hiraganaDakuon: CardItem[] = [
	{ character: 'が', romaji: 'ga', meaning: 'voiced か (ka)' },
	{ character: 'ぎ', romaji: 'gi', meaning: 'voiced き (ki)' },
	{ character: 'ぐ', romaji: 'gu', meaning: 'voiced く (ku)' },
	{ character: 'げ', romaji: 'ge', meaning: 'voiced け (ke)' },
	{ character: 'ご', romaji: 'go', meaning: 'voiced こ (ko)' },
	{ character: 'ざ', romaji: 'za', meaning: 'voiced さ (sa)' },
	{ character: 'じ', romaji: 'ji', meaning: 'voiced し (shi)' },
	{ character: 'ず', romaji: 'zu', meaning: 'voiced す (su)' },
	{ character: 'ぜ', romaji: 'ze', meaning: 'voiced せ (se)' },
	{ character: 'ぞ', romaji: 'zo', meaning: 'voiced そ (so)' },
	{ character: 'だ', romaji: 'da', meaning: 'voiced た (ta)' },
	{ character: 'ぢ', romaji: 'di/ji', meaning: 'voiced ち (chi)' },
	{ character: 'づ', romaji: 'du/zu', meaning: 'voiced つ (tsu)' },
	{ character: 'で', romaji: 'de', meaning: 'voiced て (te)' },
	{ character: 'ど', romaji: 'do', meaning: 'voiced と (to)' },
	{ character: 'ば', romaji: 'ba', meaning: 'voiced は (ha)' },
	{ character: 'び', romaji: 'bi', meaning: 'voiced ひ (hi)' },
	{ character: 'ぶ', romaji: 'bu', meaning: 'voiced ふ (fu)' },
	{ character: 'べ', romaji: 'be', meaning: 'voiced へ (he)' },
	{ character: 'ぼ', romaji: 'bo', meaning: 'voiced ほ (ho)' }
];

const hiraganaHandakuon: CardItem[] = [
	{ character: 'ぱ', romaji: 'pa', meaning: 'h → p sound' },
	{ character: 'ぴ', romaji: 'pi', meaning: 'h → p sound' },
	{ character: 'ぷ', romaji: 'pu', meaning: 'h → p sound' },
	{ character: 'ぺ', romaji: 'pe', meaning: 'h → p sound' },
	{ character: 'ぽ', romaji: 'po', meaning: 'h → p sound' }
];

const hiraganaYoon: CardItem[] = [
	{ character: 'きゃ', romaji: 'kya', meaning: 'き + small や' },
	{ character: 'きゅ', romaji: 'kyu', meaning: 'き + small ゆ' },
	{ character: 'きょ', romaji: 'kyo', meaning: 'き + small よ' },
	{ character: 'しゃ', romaji: 'sha', meaning: 'し + small や' },
	{ character: 'しゅ', romaji: 'shu', meaning: 'し + small ゆ' },
	{ character: 'しょ', romaji: 'sho', meaning: 'し + small よ' },
	{ character: 'ちゃ', romaji: 'cha', meaning: 'ち + small や' },
	{ character: 'ちゅ', romaji: 'chu', meaning: 'ち + small ゆ' },
	{ character: 'ちょ', romaji: 'cho', meaning: 'ち + small よ' },
	{ character: 'にゃ', romaji: 'nya', meaning: 'に + small や' },
	{ character: 'にゅ', romaji: 'nyu', meaning: 'に + small ゆ' },
	{ character: 'にょ', romaji: 'nyo', meaning: 'に + small よ' },
	{ character: 'ひゃ', romaji: 'hya', meaning: 'ひ + small や' },
	{ character: 'ひゅ', romaji: 'hyu', meaning: 'ひ + small ゆ' },
	{ character: 'ひょ', romaji: 'hyo', meaning: 'ひ + small よ' },
	{ character: 'みゃ', romaji: 'mya', meaning: 'み + small や' },
	{ character: 'みゅ', romaji: 'myu', meaning: 'み + small ゆ' },
	{ character: 'みょ', romaji: 'myo', meaning: 'み + small よ' },
	{ character: 'りゃ', romaji: 'rya', meaning: 'り + small や' },
	{ character: 'りゅ', romaji: 'ryu', meaning: 'り + small ゆ' },
	{ character: 'りょ', romaji: 'ryo', meaning: 'り + small よ' },
	{ character: 'ぎゃ', romaji: 'gya', meaning: 'ぎ + small や' },
	{ character: 'ぎゅ', romaji: 'gyu', meaning: 'ぎ + small ゆ' },
	{ character: 'ぎょ', romaji: 'gyo', meaning: 'ぎ + small よ' },
	{ character: 'じゃ', romaji: 'ja', meaning: 'じ + small や' },
	{ character: 'じゅ', romaji: 'ju', meaning: 'じ + small ゆ' },
	{ character: 'じょ', romaji: 'jo', meaning: 'じ + small よ' },
	{ character: 'びゃ', romaji: 'bya', meaning: 'び + small や' },
	{ character: 'びゅ', romaji: 'byu', meaning: 'び + small ゆ' },
	{ character: 'びょ', romaji: 'byo', meaning: 'び + small よ' },
	{ character: 'ぴゃ', romaji: 'pya', meaning: 'ぴ + small や' },
	{ character: 'ぴゅ', romaji: 'pyu', meaning: 'ぴ + small ゆ' },
	{ character: 'ぴょ', romaji: 'pyo', meaning: 'ぴ + small よ' }
];

const hiraganaSokuon: CardItem[] = [
	{ character: 'っ', romaji: 'sokuon', meaning: 'doubles next consonant' }
];

// ─────────────────────────────────────────────
// KATAKANA
// ─────────────────────────────────────────────

const katakanaBasic: CardItem[] = [
	{ character: 'ア', romaji: 'a', meaning: 'sounds like "ah"', pair: 'あ' },
	{ character: 'イ', romaji: 'i', meaning: 'sounds like "ee"', pair: 'い' },
	{ character: 'ウ', romaji: 'u', meaning: 'sounds like "oo"', pair: 'う' },
	{ character: 'エ', romaji: 'e', meaning: 'sounds like "eh"', pair: 'え' },
	{ character: 'オ', romaji: 'o', meaning: 'sounds like "oh"', pair: 'お' },
	{ character: 'カ', romaji: 'ka', meaning: 'like "ka" in karma', pair: 'か' },
	{ character: 'キ', romaji: 'ki', meaning: 'like "key"', pair: 'き' },
	{ character: 'ク', romaji: 'ku', meaning: 'like "koo" in cool', pair: 'く' },
	{ character: 'ケ', romaji: 'ke', meaning: 'like "ke" in kept', pair: 'け' },
	{ character: 'コ', romaji: 'ko', meaning: 'like "co" in cold', pair: 'こ' },
	{ character: 'サ', romaji: 'sa', meaning: 'like "sa" in saw', pair: 'さ' },
	{ character: 'シ', romaji: 'shi', meaning: 'like "she"', pair: 'し' },
	{ character: 'ス', romaji: 'su', meaning: 'like "sue"', pair: 'す' },
	{ character: 'セ', romaji: 'se', meaning: 'like "se" in set', pair: 'せ' },
	{ character: 'ソ', romaji: 'so', meaning: 'like "so" in sold', pair: 'そ' },
	{ character: 'タ', romaji: 'ta', meaning: 'like "ta" in taco', pair: 'た' },
	{ character: 'チ', romaji: 'chi', meaning: 'like "chee" in cheese', pair: 'ち' },
	{ character: 'ツ', romaji: 'tsu', meaning: 'like "tsu" in tsunami', pair: 'つ' },
	{ character: 'テ', romaji: 'te', meaning: 'like "te" in ten', pair: 'て' },
	{ character: 'ト', romaji: 'to', meaning: 'like "to" in tone', pair: 'と' },
	{ character: 'ナ', romaji: 'na', meaning: 'like "na" in nah', pair: 'な' },
	{ character: 'ニ', romaji: 'ni', meaning: 'like "nee" in knee', pair: 'に' },
	{ character: 'ヌ', romaji: 'nu', meaning: 'like "noo" in noodle', pair: 'ぬ' },
	{ character: 'ネ', romaji: 'ne', meaning: 'like "ne" in net', pair: 'ね' },
	{ character: 'ノ', romaji: 'no', meaning: 'like "no"', pair: 'の' },
	{ character: 'ハ', romaji: 'ha', meaning: 'like "ha" in hot', pair: 'は' },
	{ character: 'ヒ', romaji: 'hi', meaning: 'like "hee" in heat', pair: 'ひ' },
	{ character: 'フ', romaji: 'fu', meaning: 'between "fu" and "hu"', pair: 'ふ' },
	{ character: 'ヘ', romaji: 'he', meaning: 'like "he" in help', pair: 'へ' },
	{ character: 'ホ', romaji: 'ho', meaning: 'like "ho" in hope', pair: 'ほ' },
	{ character: 'マ', romaji: 'ma', meaning: 'like "ma" in mama', pair: 'ま' },
	{ character: 'ミ', romaji: 'mi', meaning: 'like "me"', pair: 'み' },
	{ character: 'ム', romaji: 'mu', meaning: 'like "moo"', pair: 'む' },
	{ character: 'メ', romaji: 'me', meaning: 'like "me" in met', pair: 'め' },
	{ character: 'モ', romaji: 'mo', meaning: 'like "mo" in more', pair: 'も' },
	{ character: 'ヤ', romaji: 'ya', meaning: 'like "ya" in yard', pair: 'や' },
	{ character: 'ユ', romaji: 'yu', meaning: 'like "you"', pair: 'ゆ' },
	{ character: 'ヨ', romaji: 'yo', meaning: 'like "yo"', pair: 'よ' },
	{ character: 'ラ', romaji: 'ra', meaning: 'between "ra" and "la"', pair: 'ら' },
	{ character: 'リ', romaji: 'ri', meaning: 'between "ree" and "lee"', pair: 'り' },
	{ character: 'ル', romaji: 'ru', meaning: 'between "roo" and "loo"', pair: 'る' },
	{ character: 'レ', romaji: 're', meaning: 'between "re" and "le"', pair: 'れ' },
	{ character: 'ロ', romaji: 'ro', meaning: 'between "ro" and "lo"', pair: 'ろ' },
	{ character: 'ワ', romaji: 'wa', meaning: 'like "wa" in water', pair: 'わ' },
	{ character: 'ヲ', romaji: 'wo', meaning: 'particle, sounds like "o"', pair: 'を' },
	{ character: 'ン', romaji: 'n', meaning: 'nasal "n" or "m"', pair: 'ん' }
];

const katakanaDakuon: CardItem[] = [
	{ character: 'ガ', romaji: 'ga', meaning: 'voiced カ (ka)', pair: 'が' },
	{ character: 'ギ', romaji: 'gi', meaning: 'voiced キ (ki)', pair: 'ぎ' },
	{ character: 'グ', romaji: 'gu', meaning: 'voiced ク (ku)', pair: 'ぐ' },
	{ character: 'ゲ', romaji: 'ge', meaning: 'voiced ケ (ke)', pair: 'げ' },
	{ character: 'ゴ', romaji: 'go', meaning: 'voiced コ (ko)', pair: 'ご' },
	{ character: 'ザ', romaji: 'za', meaning: 'voiced サ (sa)', pair: 'ざ' },
	{ character: 'ジ', romaji: 'ji', meaning: 'voiced シ (shi)', pair: 'じ' },
	{ character: 'ズ', romaji: 'zu', meaning: 'voiced ス (su)', pair: 'ず' },
	{ character: 'ゼ', romaji: 'ze', meaning: 'voiced セ (se)', pair: 'ぜ' },
	{ character: 'ゾ', romaji: 'zo', meaning: 'voiced ソ (so)', pair: 'ぞ' },
	{ character: 'ダ', romaji: 'da', meaning: 'voiced タ (ta)', pair: 'だ' },
	{ character: 'ヂ', romaji: 'di/ji', meaning: 'voiced チ (chi)', pair: 'ぢ' },
	{ character: 'ヅ', romaji: 'du/zu', meaning: 'voiced ツ (tsu)', pair: 'づ' },
	{ character: 'デ', romaji: 'de', meaning: 'voiced テ (te)', pair: 'で' },
	{ character: 'ド', romaji: 'do', meaning: 'voiced ト (to)', pair: 'ど' },
	{ character: 'バ', romaji: 'ba', meaning: 'voiced ハ (ha)', pair: 'ば' },
	{ character: 'ビ', romaji: 'bi', meaning: 'voiced ヒ (hi)', pair: 'び' },
	{ character: 'ブ', romaji: 'bu', meaning: 'voiced フ (fu)', pair: 'ぶ' },
	{ character: 'ベ', romaji: 'be', meaning: 'voiced ヘ (he)', pair: 'べ' },
	{ character: 'ボ', romaji: 'bo', meaning: 'voiced ホ (ho)', pair: 'ぼ' }
];

const katakanaHandakuon: CardItem[] = [
	{ character: 'パ', romaji: 'pa', meaning: 'h → p sound', pair: 'ぱ' },
	{ character: 'ピ', romaji: 'pi', meaning: 'h → p sound', pair: 'ぴ' },
	{ character: 'プ', romaji: 'pu', meaning: 'h → p sound', pair: 'ぷ' },
	{ character: 'ペ', romaji: 'pe', meaning: 'h → p sound', pair: 'ぺ' },
	{ character: 'ポ', romaji: 'po', meaning: 'h → p sound', pair: 'ぽ' }
];

const katakanaYoon: CardItem[] = [
	{ character: 'キャ', romaji: 'kya', meaning: 'キ + small ヤ', pair: 'きゃ' },
	{ character: 'キュ', romaji: 'kyu', meaning: 'キ + small ユ', pair: 'きゅ' },
	{ character: 'キョ', romaji: 'kyo', meaning: 'キ + small ヨ', pair: 'きょ' },
	{ character: 'シャ', romaji: 'sha', meaning: 'シ + small ヤ', pair: 'しゃ' },
	{ character: 'シュ', romaji: 'shu', meaning: 'シ + small ユ', pair: 'しゅ' },
	{ character: 'ショ', romaji: 'sho', meaning: 'シ + small ヨ', pair: 'しょ' },
	{ character: 'チャ', romaji: 'cha', meaning: 'チ + small ヤ', pair: 'ちゃ' },
	{ character: 'チュ', romaji: 'chu', meaning: 'チ + small ユ', pair: 'ちゅ' },
	{ character: 'チョ', romaji: 'cho', meaning: 'チ + small ヨ', pair: 'ちょ' },
	{ character: 'ニャ', romaji: 'nya', meaning: 'ニ + small ヤ', pair: 'にゃ' },
	{ character: 'ニュ', romaji: 'nyu', meaning: 'ニ + small ユ', pair: 'にゅ' },
	{ character: 'ニョ', romaji: 'nyo', meaning: 'ニ + small ヨ', pair: 'にょ' },
	{ character: 'ヒャ', romaji: 'hya', meaning: 'ヒ + small ヤ', pair: 'ひゃ' },
	{ character: 'ヒュ', romaji: 'hyu', meaning: 'ヒ + small ユ', pair: 'ひゅ' },
	{ character: 'ヒョ', romaji: 'hyo', meaning: 'ヒ + small ヨ', pair: 'ひょ' },
	{ character: 'ミャ', romaji: 'mya', meaning: 'ミ + small ヤ', pair: 'みゃ' },
	{ character: 'ミュ', romaji: 'myu', meaning: 'ミ + small ユ', pair: 'みゅ' },
	{ character: 'ミョ', romaji: 'myo', meaning: 'ミ + small ヨ', pair: 'みょ' },
	{ character: 'リャ', romaji: 'rya', meaning: 'リ + small ヤ', pair: 'りゃ' },
	{ character: 'リュ', romaji: 'ryu', meaning: 'リ + small ユ', pair: 'りゅ' },
	{ character: 'リョ', romaji: 'ryo', meaning: 'リ + small ヨ', pair: 'りょ' },
	{ character: 'ギャ', romaji: 'gya', meaning: 'ギ + small ヤ', pair: 'ぎゃ' },
	{ character: 'ギュ', romaji: 'gyu', meaning: 'ギ + small ユ', pair: 'ぎゅ' },
	{ character: 'ギョ', romaji: 'gyo', meaning: 'ギ + small ヨ', pair: 'ぎょ' },
	{ character: 'ジャ', romaji: 'ja', meaning: 'ジ + small ヤ', pair: 'じゃ' },
	{ character: 'ジュ', romaji: 'ju', meaning: 'ジ + small ユ', pair: 'じゅ' },
	{ character: 'ジョ', romaji: 'jo', meaning: 'ジ + small ヨ', pair: 'じょ' },
	{ character: 'ビャ', romaji: 'bya', meaning: 'ビ + small ヤ', pair: 'びゃ' },
	{ character: 'ビュ', romaji: 'byu', meaning: 'ビ + small ユ', pair: 'びゅ' },
	{ character: 'ビョ', romaji: 'byo', meaning: 'ビ + small ヨ', pair: 'びょ' },
	{ character: 'ピャ', romaji: 'pya', meaning: 'ピ + small ヤ', pair: 'ぴゃ' },
	{ character: 'ピュ', romaji: 'pyu', meaning: 'ピ + small ユ', pair: 'ぴゅ' },
	{ character: 'ピョ', romaji: 'pyo', meaning: 'ピ + small ヨ', pair: 'ぴょ' }
];

const katakanaSokuon: CardItem[] = [
	{ character: 'ッ', romaji: 'sokuon', meaning: 'doubles next consonant', pair: 'っ' }
];

// ─────────────────────────────────────────────
// RADICALS / KANJI / VOCABULARY (unchanged)
// ─────────────────────────────────────────────

const radicals: CardItem[] = [
	{ character: '人', romaji: 'hito', meaning: 'person' },
	{ character: '亻', romaji: 'ninben', meaning: 'person side' },
	{ character: '水', romaji: 'mizu', meaning: 'water' },
	{ character: '氵', romaji: 'sanzui', meaning: 'water side' },
	{ character: '火', romaji: 'hi', meaning: 'fire' },
	{ character: '灬', romaji: 'rekkā', meaning: 'fire bottom' },
	{ character: '木', romaji: 'ki', meaning: 'tree' },
	{ character: '金', romaji: 'kane', meaning: 'metal / gold' },
	{ character: '釒', romaji: 'kanehen', meaning: 'metal side' },
	{ character: '土', romaji: 'tsuchi', meaning: 'earth' },
	{ character: '日', romaji: 'hi / nichi', meaning: 'sun / day' },
	{ character: '月', romaji: 'tsuki', meaning: 'moon / month' },
	{ character: '山', romaji: 'yama', meaning: 'mountain' },
	{ character: '川', romaji: 'kawa', meaning: 'river' },
	{ character: '口', romaji: 'kuchi', meaning: 'mouth' },
	{ character: '目', romaji: 'me', meaning: 'eye' },
	{ character: '手', romaji: 'te', meaning: 'hand' },
	{ character: '扌', romaji: 'tehen', meaning: 'hand side' },
	{ character: '心', romaji: 'kokoro', meaning: 'heart / mind' },
	{ character: '忄', romaji: 'risshinben', meaning: 'heart side' },
	{ character: '力', romaji: 'chikara', meaning: 'power' },
	{ character: '田', romaji: 'ta', meaning: 'rice field' },
	{ character: '女', romaji: 'onna', meaning: 'woman' },
	{ character: '子', romaji: 'ko', meaning: 'child' },
	{ character: '糸', romaji: 'ito', meaning: 'thread' },
	{ character: '言', romaji: 'koto', meaning: 'speech' },
	{ character: '訁', romaji: 'gonben', meaning: 'speech side' },
	{ character: '食', romaji: 'shoku', meaning: 'eat / food' },
	{ character: '飠', romaji: 'shokuhen', meaning: 'food side' },
	{ character: '車', romaji: 'kuruma', meaning: 'vehicle' },
	{ character: '門', romaji: 'mon', meaning: 'gate' },
	{ character: '雨', romaji: 'ame', meaning: 'rain' },
	{ character: '宀', romaji: 'ukanmuri', meaning: 'roof' },
	{ character: '艹', romaji: 'kusakanmuri', meaning: 'grass top' },
	{ character: '辶', romaji: 'shinnyou', meaning: 'movement / road' },
	{ character: '⻌', romaji: 'shinnyou', meaning: 'walk path variant' },
	{ character: '石', romaji: 'ishi', meaning: 'stone' },
	{ character: '禾', romaji: 'nogi', meaning: 'grain' },
	{ character: '竹', romaji: 'take', meaning: 'bamboo' },
	{ character: '耳', romaji: 'mimi', meaning: 'ear' },
	{ character: '足', romaji: 'ashi', meaning: 'foot' },
	{ character: '阝', romaji: 'kozato / oomori', meaning: 'hill or city side' }
];

const radicalsExtended: CardItem[] = [
	{ character: '刀', romaji: 'katana', meaning: 'sword / knife' },
	{ character: '刂', romaji: 'rittou', meaning: 'knife side' },
	{ character: '又', romaji: 'mata', meaning: 'again / right hand' },
	{ character: '大', romaji: 'dai', meaning: 'big / person spread wide' },
	{ character: '工', romaji: 'kou', meaning: 'craft / work' },
	{ character: '弓', romaji: 'yumi', meaning: 'bow (archery)' },
	{ character: '彡', romaji: 'sandzukuri', meaning: 'hair / stripes' },
	{ character: '彳', romaji: 'gyouninben', meaning: 'step / road' },
	{ character: '攵', romaji: 'bokunyuu', meaning: 'strike / action' },
	{ character: '白', romaji: 'shiro', meaning: 'white' },
	{ character: '皮', romaji: 'kawa', meaning: 'skin / hide' },
	{ character: '見', romaji: 'miru', meaning: 'see / look' },
	{ character: '貝', romaji: 'kai', meaning: 'shellfish / money' },
	{ character: '走', romaji: 'hashiru', meaning: 'run' },
	{ character: '身', romaji: 'mi', meaning: 'body / oneself' },
	{ character: '里', romaji: 'sato', meaning: 'village / measure' },
	{ character: '頁', romaji: 'oogai', meaning: 'page / head' },
	{ character: '風', romaji: 'kaze', meaning: 'wind' },
	{ character: '鳥', romaji: 'tori', meaning: 'bird' },
	{ character: '魚', romaji: 'sakana', meaning: 'fish' },
	{ character: '虫', romaji: 'mushi', meaning: 'insect / bug' },
	{ character: '肉', romaji: 'niku', meaning: 'meat / flesh (as 月)' },
	{ character: '衣', romaji: 'koromo', meaning: 'clothing' },
	{ character: '衤', romaji: 'koromohen', meaning: 'clothing side' },
	{ character: '示', romaji: 'shimesu', meaning: 'spirit / show' },
	{ character: '礻', romaji: 'shimesuhen', meaning: 'spirit / shrine side' },
	{ character: '米', romaji: 'kome', meaning: 'rice' },
	{ character: '麦', romaji: 'mugi', meaning: 'wheat / barley' },
	{ character: '牛', romaji: 'ushi', meaning: 'cow / ox' },
	{ character: '馬', romaji: 'uma', meaning: 'horse' },
	{ character: '羊', romaji: 'hitsuji', meaning: 'sheep' },
	{ character: '犬', romaji: 'inu', meaning: 'dog (as 犭)' },
	{ character: '犭', romaji: 'kemonomu', meaning: 'animal side' },
	{ character: '方', romaji: 'kata', meaning: 'direction / way' },
	{ character: '父', romaji: 'chichi', meaning: 'father' },
	{ character: '止', romaji: 'tomeru', meaning: 'stop / foot' },
	{ character: '夕', romaji: 'yuube', meaning: 'evening' },
	{ character: '广', romaji: 'madare', meaning: 'cliff / building' },
	{ character: '厂', romaji: 'gandare', meaning: 'cliff / factory' },
	{ character: '尸', romaji: 'shikabane', meaning: 'corpse / flat roof' },
	{ character: '冫', romaji: 'nisui', meaning: 'ice / cold' },
	{ character: '冖', romaji: 'waburi', meaning: 'cover' },
	{ character: '几', romaji: 'tsukue', meaning: 'table / stool' },
	{ character: '凵', romaji: 'kannyou', meaning: 'container / opening' },
	{ character: '八', romaji: 'hachi', meaning: 'eight / divide' },
	{ character: '儿', romaji: 'hitoashi', meaning: 'human legs' },
	{ character: '入', romaji: 'iru', meaning: 'enter' },
	{ character: '匸', romaji: 'kakushigamae', meaning: 'hiding / enclosure' },
	{ character: '囗', romaji: 'kunigamae', meaning: 'country / enclosure' },
	{ character: '讠', romaji: 'yanbun', meaning: 'speech (simplified side)' }
];

const radicalDetails: Record<string, Pick<CardItem, 'mnemonic' | 'variants' | 'tags' | 'recipes' | 'etymology' | 'examples'>> = {
	'人': {
		mnemonic: 'Two legs in profile — a person walking. When pressed to the left side it becomes the slimmer 亻 stroke.',
		etymology: 'A pictograph of a standing human being in profile, one of the most ancient oracle-bone graphs. The two-stroke form abstracts the torso and legs of someone upright. Almost every kanji involving people, roles, or human actions carries this shape or its side variant 亻.',
		variants: ['亻'],
		tags: ['person', 'human'],
		examples: [{ word: '人', reading: 'ひと', meaning: 'person' }, { word: '人気', reading: 'にんき', meaning: 'popularity' }, { word: '外国人', reading: 'がいこくじん', meaning: 'foreigner' }],
		recipes: [{ kanji: '休', reading: 'きゅう', meaning: 'rest', breakdown: '亻 + 木', clue: 'A person leaning on a tree is resting.' }, { kanji: '体', reading: 'たい', meaning: 'body', breakdown: '亻 + 本', clue: 'A person plus a central trunk gives the body.' }]
	},
	'亻': {
		mnemonic: 'The slim left-side person radical — a leaning stroke and a vertical. If you see it, something human is happening.',
		etymology: 'A compressed form of 人 designed to fit the left side of a character without crowding the right component. The two-stroke shape retains the original standing-person silhouette. It marks nearly all kanji about human actions, states, and social roles.',
		variants: ['人'],
		tags: ['person side', 'left-side'],
		examples: [{ word: '作る', reading: 'つくる', meaning: 'to make' }, { word: '住む', reading: 'すむ', meaning: 'to live / reside' }, { word: '働く', reading: 'はたらく', meaning: 'to work' }],
		recipes: [{ kanji: '作', reading: 'さく', meaning: 'make', breakdown: '亻 + 乍', clue: 'A making action starts with a person.' }, { kanji: '住', reading: 'じゅう', meaning: 'live / reside', breakdown: '亻 + 主', clue: 'A person plus master/base becomes dwelling.' }]
	},
	'水': {
		mnemonic: 'A central current with two branching streams — the full river cross-section. It almost always points to flow or liquid.',
		etymology: 'A pictograph of flowing water seen from above: a central channel with rippling side branches. One of the most productive radicals in Chinese and Japanese script. When placed on the left side of a character it compresses into the three-dot form 氵.',
		variants: ['氵'],
		tags: ['water', 'flow'],
		examples: [{ word: '水', reading: 'みず', meaning: 'water' }, { word: '水曜日', reading: 'すいようび', meaning: 'Wednesday' }, { word: '洪水', reading: 'こうずい', meaning: 'flood' }],
		recipes: [{ kanji: '泉', reading: 'せん', meaning: 'spring', breakdown: '白 + 水', clue: 'White water bursting up becomes a spring.' }, { kanji: '永', reading: 'えい', meaning: 'eternity', breakdown: '丶 + water-like flow', clue: 'The shape itself feels like water continuing forever.' }]
	},
	'氵': {
		mnemonic: 'Three drops of water stacked down the left side. If you see them, expect liquid, washing, sea, or river.',
		etymology: 'The compressed left-side form of 水. Three vertical dots represent splashing or dripping water and were standardized during the clerical script era to save horizontal space. It signals the same semantic category as the full 水 but almost always in that left-column position.',
		variants: ['水'],
		tags: ['water side', 'liquid'],
		examples: [{ word: '海', reading: 'うみ', meaning: 'sea' }, { word: '酒', reading: 'さけ', meaning: 'sake / alcohol' }, { word: '温泉', reading: 'おんせん', meaning: 'hot spring' }],
		recipes: [{ kanji: '海', reading: 'かい', meaning: 'sea', breakdown: '氵 + 每', clue: 'Water on the left gives the whole kanji an ocean feeling.' }, { kanji: '酒', reading: 'しゅ', meaning: 'sake / alcohol', breakdown: '氵 + 酉', clue: 'Liquid plus fermentation jar gives sake.' }]
	},
	'火': {
		mnemonic: 'An open flame: one central stroke rising with two sparks flying off each side. At the bottom it relaxes into four hot dots 灬.',
		etymology: 'A pictograph of a flame — the central vertical stroke is the main fire, and the two diagonal strokes are sparks or tongues of flame. One of the six primal element radicals in Classical Chinese. In compound kanji it sometimes shifts to the four-dot bottom form 灬 when stacked below another component.',
		variants: ['灬'],
		tags: ['fire', 'heat'],
		examples: [{ word: '火', reading: 'ひ', meaning: 'fire' }, { word: '火曜日', reading: 'かようび', meaning: 'Tuesday' }, { word: '花火', reading: 'はなび', meaning: 'fireworks' }],
		recipes: [{ kanji: '炎', reading: 'えん', meaning: 'flame', breakdown: '火 + 火', clue: 'Two fires intensify into blaze.' }, { kanji: '灯', reading: 'とう', meaning: 'lamp', breakdown: '火 + 丁', clue: 'Fire with a small support becomes a lamp.' }]
	},
	'灬': {
		mnemonic: 'Four hot dots at the base of a kanji — fire pushed underground like glowing coals under a pot.',
		etymology: 'The bottom-position variant of 火 (fire). When fire appears beneath another element, the upright flame shape cannot fit, so it flattens into four dots — historically representing the tips of four flames. Common under cooking and heating kanji.',
		variants: ['火'],
		tags: ['fire bottom', 'heat'],
		examples: [{ word: '熱い', reading: 'あつい', meaning: 'hot' }, { word: '照る', reading: 'てる', meaning: 'to shine' }, { word: '煮る', reading: 'にる', meaning: 'to boil / cook' }],
		recipes: [{ kanji: '熱', reading: 'ねつ', meaning: 'heat', breakdown: '埶 + 灬', clue: 'Those four dots at the base radiate heat.' }, { kanji: '黒', reading: 'くろ', meaning: 'black', breakdown: '里 + 灬', clue: 'Soot from fire creates the idea of black.' }]
	},
	'木': {
		mnemonic: 'A tree trunk with branches reaching up and roots spreading down. One of the cleanest pictographic radicals.',
		etymology: 'A direct pictograph of a tree: the vertical stroke is the trunk, the horizontal stroke is the canopy or a major branch, and the two diagonal strokes represent roots. The character has remained visually faithful to its origin for over three thousand years.',
		tags: ['tree', 'wood'],
		examples: [{ word: '木', reading: 'き', meaning: 'tree / wood' }, { word: '木曜日', reading: 'もくようび', meaning: 'Thursday' }, { word: '木材', reading: 'もくざい', meaning: 'lumber / timber' }],
		recipes: [{ kanji: '林', reading: 'りん', meaning: 'woods', breakdown: '木 + 木', clue: 'Two trees make a grove.' }, { kanji: '森', reading: 'もり', meaning: 'forest', breakdown: '木 + 木 + 木', clue: 'Three trees turn the grove into forest.' }]
	},
	'金': {
		mnemonic: 'Metal, gold, money, or hardness. Picture nuggets of gold buried under a mound with a roof overhead — stored treasure.',
		etymology: 'Originally depicted a mound of earth with gold nuggets buried beneath and a cover above — the image of precious metal hidden underground. Over time the form stabilized into the current shape. It covers all metals and hard materials, not just gold. The left-side compressed form is 釒.',
		variants: ['釒'],
		tags: ['metal', 'money'],
		examples: [{ word: '金', reading: 'かね', meaning: 'money / gold' }, { word: '金曜日', reading: 'きんようび', meaning: 'Friday' }, { word: '金属', reading: 'きんぞく', meaning: 'metal' }],
		recipes: [{ kanji: '銀', reading: 'ぎん', meaning: 'silver', breakdown: '釒 + 艮', clue: 'Precious metals advertise themselves with the metal radical.' }, { kanji: '鉄', reading: 'てつ', meaning: 'iron', breakdown: '釒 + 失', clue: 'The metal side makes the material obvious.' }]
	},
	'釒': {
		mnemonic: 'The left-side metal radical, squeezed to three strokes. Think coins, tools, blades, and minerals whenever you see it.',
		etymology: 'The compressed component form of 金. During the regular script era, the full 金 was too wide for the left column of a compound character, so scribes condensed it to a two-part vertical shape. It carries exactly the same semantic range — all metals and metallic objects.',
		variants: ['金'],
		tags: ['metal side', 'left-side'],
		examples: [{ word: '銅', reading: 'どう', meaning: 'copper' }, { word: '針', reading: 'はり', meaning: 'needle' }, { word: '鏡', reading: 'かがみ', meaning: 'mirror' }],
		recipes: [{ kanji: '銅', reading: 'どう', meaning: 'copper', breakdown: '釒 + 同', clue: 'Metal side makes this a material kanji.' }, { kanji: '針', reading: 'しん', meaning: 'needle', breakdown: '釒 + 十', clue: 'A needle is a metal object, right in the radical.' }]
	},
	'土': {
		mnemonic: 'A mound of earth with a flat surface on top and a solid base below. Ground you can stand on.',
		etymology: 'A pictograph of a clod of earth or a grave mound — the horizontal top stroke is the ground surface, and the vertical stroke with base represents the compacted earth below. Widely used to indicate soil, earthen construction, and land.',
		tags: ['earth', 'ground'],
		examples: [{ word: '土', reading: 'つち', meaning: 'earth / soil' }, { word: '土曜日', reading: 'どようび', meaning: 'Saturday' }, { word: '土地', reading: 'とち', meaning: 'land / plot' }],
		recipes: [{ kanji: '地', reading: 'ち', meaning: 'ground', breakdown: '土 + 也', clue: 'Earth on the left anchors the meaning.' }, { kanji: '場', reading: 'じょう', meaning: 'place', breakdown: '土 + 昜', clue: 'A place is literally grounded with 土.' }]
	},
	'日': {
		mnemonic: 'The sun drawn as a box with a central line — that horizontal stroke is the shimmer or the disc of the sun.',
		etymology: 'A pictograph of the sun: originally a circle with a central dot, the dot evolved into a horizontal bar and the circle squared off in clerical script. One of the most productive radicals, appearing in kanji about time, light, days, and visibility.',
		tags: ['sun', 'time'],
		examples: [{ word: '日', reading: 'ひ', meaning: 'sun / day' }, { word: '日曜日', reading: 'にちようび', meaning: 'Sunday' }, { word: '毎日', reading: 'まいにち', meaning: 'every day' }],
		recipes: [{ kanji: '明', reading: 'めい', meaning: 'bright', breakdown: '日 + 月', clue: 'Sun plus moon makes brightness.' }, { kanji: '時', reading: 'じ', meaning: 'time', breakdown: '日 + 寺', clue: 'Time is built on the sun.' }]
	},
	'月': {
		mnemonic: 'A crescent moon with two horizontal strokes inside — the curved shape of the waxing moon. On the left side of kanji it often means flesh or body instead.',
		etymology: 'A pictograph of the crescent moon. The two internal strokes were originally a single dot representing the moon\'s highlights. In compound kanji, 月 appears both in its astronomical meaning (moon, month) and in a body/flesh meaning — the latter is historically a different character 肉 (meat/flesh) that merged in form with 月 during script simplification.',
		tags: ['moon', 'body'],
		examples: [{ word: '月', reading: 'つき', meaning: 'moon / month' }, { word: '月曜日', reading: 'げつようび', meaning: 'Monday' }, { word: '毎月', reading: 'まいつき', meaning: 'every month' }],
		recipes: [{ kanji: '明', reading: 'めい', meaning: 'bright', breakdown: '日 + 月', clue: 'Sun and moon together light everything up.' }, { kanji: '朝', reading: 'ちょう', meaning: 'morning', breakdown: '倝 + 月', clue: 'Moon still visible as the day begins.' }]
	},
	'山': {
		mnemonic: 'Three peaks rising from a baseline — the silhouette of a mountain range. Impossible to forget once you see it.',
		etymology: 'A direct pictograph of three mountain peaks: the tall central peak flanked by two lower ones. Ancient oracle-bone versions show a rougher outline that was later formalized into the three vertical strokes. One of the most universally recognizable pictographic radicals.',
		tags: ['mountain', 'terrain'],
		examples: [{ word: '山', reading: 'やま', meaning: 'mountain' }, { word: '富士山', reading: 'ふじさん', meaning: 'Mt. Fuji' }, { word: '火山', reading: 'かざん', meaning: 'volcano' }],
		recipes: [{ kanji: '岩', reading: 'がん', meaning: 'boulder', breakdown: '山 + 石', clue: 'A mountain plus stone becomes rock.' }, { kanji: '島', reading: 'しま', meaning: 'island', breakdown: '山 + 鳥', clue: 'An island is a mountain rising from the water.' }]
	},
	'川': {
		mnemonic: 'Three lines flowing in parallel — the two banks and the current between them.',
		etymology: 'A pictograph of a river shown as three parallel current lines. Oracle-bone script shows wavy strokes representing water channels. The kanji 川 is used for rivers in names (Sumida-gawa, etc.) and serves as the radical for river-related characters.',
		tags: ['river', 'stream'],
		examples: [{ word: '川', reading: 'かわ', meaning: 'river' }, { word: '川岸', reading: 'かわぎし', meaning: 'riverbank' }, { word: '小川', reading: 'おがわ', meaning: 'stream / brook' }],
		recipes: [{ kanji: '州', reading: 'しゅう', meaning: 'state / sandbank', breakdown: '川 + dots', clue: 'Add sand-dots to the river and you get a sandbar or province.' }, { kanji: '巡', reading: 'じゅん', meaning: 'patrol / tour', breakdown: 'river + movement', clue: 'Patrolling follows a flowing course.' }]
	},
	'口': {
		mnemonic: 'A simple open square — a mouth, an opening, or any boxed container. The most versatile small-shape in kanji.',
		etymology: 'A pictograph of an open mouth or opening: the square represents lips parted and the empty interior is the oral cavity. One of the highest-frequency radicals, 口 appears not only in speech and eating kanji but also in any character built around a box shape.',
		tags: ['mouth', 'opening'],
		examples: [{ word: '口', reading: 'くち', meaning: 'mouth' }, { word: '入口', reading: 'いりぐち', meaning: 'entrance' }, { word: '出口', reading: 'でぐち', meaning: 'exit' }],
		recipes: [{ kanji: '古', reading: 'こ', meaning: 'old', breakdown: '十 + 口', clue: 'An old story piled above a mouth.' }, { kanji: '知', reading: 'ち', meaning: 'know', breakdown: '矢 + 口', clue: 'Knowledge lands when the arrow reaches the mouth.' }]
	},
	'目': {
		mnemonic: 'A vertical eye with two lash-strokes inside. Tilt the box 90° and you have a human eye in profile.',
		etymology: 'A pictograph of a human eye — originally drawn horizontally as an almond shape with the pupil inside, then rotated 90° during the standardization of Chinese script. The two horizontal strokes inside represent the iris and pupil. It signals sight, observation, and anything eye-related.',
		tags: ['eye', 'look'],
		examples: [{ word: '目', reading: 'め', meaning: 'eye' }, { word: '目的', reading: 'もくてき', meaning: 'purpose / goal' }, { word: '注目', reading: 'ちゅうもく', meaning: 'attention / notice' }],
		recipes: [{ kanji: '見', reading: 'けん', meaning: 'see', breakdown: '目 + 儿', clue: 'An eye on legs goes out to see.' }, { kanji: '相', reading: 'そう', meaning: 'mutual / appearance', breakdown: '木 + 目', clue: 'Gazing at a tree — looking closely at appearances.' }]
	},
	'手': {
		mnemonic: 'Open hand with five fingers spread, condensed into three strokes. On the left side it becomes the compact 扌.',
		etymology: 'A pictograph of an open hand: the three horizontal strokes represent the fingers, and the downward stroke is the thumb or wrist. In oracle-bone and bronze inscriptions it shows a more recognizable five-fingered hand. It marks kanji involving touch, making, throwing, and all manual actions.',
		variants: ['扌'],
		tags: ['hand', 'action'],
		examples: [{ word: '手', reading: 'て', meaning: 'hand' }, { word: '手紙', reading: 'てがみ', meaning: 'letter' }, { word: '上手', reading: 'じょうず', meaning: 'skilled / good at' }],
		recipes: [{ kanji: '看', reading: 'かん', meaning: 'watch over', breakdown: '手 + 目', clue: 'A hand shading the eye helps you look out.' }, { kanji: '拳', reading: 'けん', meaning: 'fist', breakdown: '手 components', clue: 'The hand concept underpins the whole kanji.' }]
	},
	'扌': {
		mnemonic: 'A hand on the left — one horizontal and one vertical stroke with a hooking curve. Touch, throw, push, hold, or make.',
		etymology: 'The compressed left-side form of 手 (hand). The three-stroke shape fits the left column without crowding. It identifies kanji about manual actions — gripping, throwing, striking, crafting — and is one of the most common left-side radicals in the entire script.',
		variants: ['手'],
		tags: ['hand side', 'left-side'],
		examples: [{ word: '持つ', reading: 'もつ', meaning: 'to hold' }, { word: '投げる', reading: 'なげる', meaning: 'to throw' }, { word: '押す', reading: 'おす', meaning: 'to push' }],
		recipes: [{ kanji: '持', reading: 'じ', meaning: 'hold', breakdown: '扌 + 寺', clue: 'The hand radical tells you the kanji is something you do with your hands.' }, { kanji: '投', reading: 'とう', meaning: 'throw', breakdown: '扌 + 殳', clue: 'Throwing starts with the hand radical.' }]
	},
	'心': {
		mnemonic: 'The heart at full width — three flowing strokes that suggest a beating pulse. On the left it compresses to the two-stroke 忄.',
		etymology: 'A pictograph of the human heart: originally more anatomical, showing the heart with two atria and a pointed bottom. Over time the shape smoothed into three curved strokes. In East Asian medicine, the heart was considered the seat of thought and emotion both — hence 心 covers both cardiac and psychological meanings.',
		variants: ['忄'],
		tags: ['heart', 'mind', 'emotion'],
		examples: [{ word: '心', reading: 'こころ', meaning: 'heart / mind' }, { word: '心配', reading: 'しんぱい', meaning: 'worry' }, { word: '安心', reading: 'あんしん', meaning: 'peace of mind' }],
		recipes: [{ kanji: '忍', reading: 'にん', meaning: 'endure', breakdown: '刃 + 心', clue: 'A blade over the heart is the picture of endurance.' }, { kanji: '思', reading: 'し', meaning: 'think', breakdown: '田 + 心', clue: 'A field of thought growing from the heart.' }]
	},
	'忄': {
		mnemonic: 'Heart pressed to the left side — almost always a feeling or mental-state clue sitting right at the edge of the character.',
		etymology: 'The compressed left-side form of 心 (heart/mind). The two-stroke shape loses some of the pulse-like quality but retains the semantic category completely. It marks virtually every kanji about emotional states, feelings, and mental conditions.',
		variants: ['心'],
		tags: ['heart side', 'emotion'],
		examples: [{ word: '情', reading: 'じょう', meaning: 'emotion / feeling' }, { word: '忙しい', reading: 'いそがしい', meaning: 'busy' }, { word: '悩む', reading: 'なやむ', meaning: 'to worry / be troubled' }],
		recipes: [{ kanji: '情', reading: 'じょう', meaning: 'emotion', breakdown: '忄 + 青', clue: 'The emotion radical makes the feeling explicit.' }, { kanji: '忙', reading: 'ぼう', meaning: 'busy', breakdown: '忄 + 亡', clue: 'Busy is the heart losing its center.' }]
	},
	'力': {
		mnemonic: 'A bent arm muscle — the curve of a flexed bicep carrying tension and force.',
		etymology: 'A pictograph of a muscular arm bent at the elbow, representing physical strength. Oracle-bone versions show a more recognizable flexed arm. In compound kanji it marks strength, effort, ability, and power — both literal (physical exertion) and abstract (influence, capability).',
		tags: ['power', 'strength'],
		examples: [{ word: '力', reading: 'ちから', meaning: 'power / strength' }, { word: '努力', reading: 'どりょく', meaning: 'effort' }, { word: '体力', reading: 'たいりょく', meaning: 'physical strength' }],
		recipes: [{ kanji: '男', reading: 'だん', meaning: 'man', breakdown: '田 + 力', clue: 'Field plus strength was the old agrarian picture of man.' }, { kanji: '助', reading: 'じょ', meaning: 'help', breakdown: '且 + 力', clue: 'Adding strength to someone helps them.' }]
	},
	'田': {
		mnemonic: 'A rice paddy divided by paths into four plots — the grid of traditional East Asian agriculture.',
		etymology: 'A top-down pictograph of a rice paddy field divided into four sections by earthen paths (the cross inside the square). Agriculture was the foundation of ancient Chinese civilization and this character appears in countless place names, surnames, and compound kanji relating to land, areas, and grids.',
		tags: ['field', 'grid'],
		examples: [{ word: '田', reading: 'た', meaning: 'rice field' }, { word: '田舎', reading: 'いなか', meaning: 'countryside' }, { word: '水田', reading: 'すいでん', meaning: 'paddy field' }],
		recipes: [{ kanji: '男', reading: 'だん', meaning: 'man', breakdown: '田 + 力', clue: 'A man works the field with strength.' }, { kanji: '町', reading: 'ちょう', meaning: 'town block', breakdown: '田 + 丁', clue: 'Measured plots of land become a town block.' }]
	},
	'女': {
		mnemonic: 'A figure kneeling with arms crossed — the original depicted a woman with hands folded in a seated posture.',
		etymology: 'A pictograph of a kneeling or seated woman with arms crossed in a posture of respect or calm, common in ancient bronze inscriptions. The abstract strokes preserve the crossed-arms quality. It marks kanji about women, family roles, and traditionally female associations.',
		tags: ['woman', 'relation'],
		examples: [{ word: '女', reading: 'おんな', meaning: 'woman' }, { word: '女性', reading: 'じょせい', meaning: 'female / woman' }, { word: '彼女', reading: 'かのじょ', meaning: 'she / girlfriend' }],
		recipes: [{ kanji: '好', reading: 'こう', meaning: 'like', breakdown: '女 + 子', clue: 'Woman plus child became the old picture for affection.' }, { kanji: '安', reading: 'あん', meaning: 'peaceful', breakdown: '宀 + 女', clue: 'A woman under a roof suggested calm and safety.' }]
	},
	'子': {
		mnemonic: 'A baby with a round head, outstretched arms, and legs bundled together — the universal newborn silhouette.',
		etymology: 'A pictograph of an infant: the round top is the head, the horizontal stroke represents arms reaching out, and the curved or vertical bottom represents legs wrapped tightly (as newborns are swaddled). It covers children, offspring, and seeds — both biological and metaphorical.',
		tags: ['child', 'seed'],
		examples: [{ word: '子', reading: 'こ', meaning: 'child' }, { word: '子供', reading: 'こども', meaning: 'children' }, { word: '様子', reading: 'ようす', meaning: 'situation / appearance' }],
		recipes: [{ kanji: '学', reading: 'がく', meaning: 'study', breakdown: '⺍ + 冖 + 子', clue: 'A child under a roof becomes learning.' }, { kanji: '字', reading: 'じ', meaning: 'written character', breakdown: '宀 + 子', clue: 'A child under a roof became the idea of literacy.' }]
	},
	'糸': {
		mnemonic: 'A skein of silk thread: two intertwined strands at the top tapering to a twist at the base. Anything woven or fibrous.',
		etymology: 'A pictograph of a skein of raw silk thread, showing the twisted bundle at the top and the loose tail below. Silk was a major commodity in ancient China, and this radical covers thread, fabric, textile processes, and by extension anything wound, connected, or continuous. The side form in Japanese is 糹.',
		variants: ['糹'],
		tags: ['thread', 'fabric'],
		examples: [{ word: '糸', reading: 'いと', meaning: 'thread' }, { word: '絵', reading: 'え', meaning: 'picture / painting' }, { word: '続く', reading: 'つづく', meaning: 'to continue' }],
		recipes: [{ kanji: '紙', reading: 'し', meaning: 'paper', breakdown: '糹 + 氏', clue: 'Paper starts with thread or fiber.' }, { kanji: '絵', reading: 'え', meaning: 'picture', breakdown: '糹 + 会', clue: 'A picture is woven from colors and lines.' }]
	},
	'言': {
		mnemonic: 'A tongue-like line above a mouth: speech rising from below. Every kanji about words, saying, and language starts here.',
		etymology: 'Composed of 口 (mouth) at the base with multiple stroke-lines above representing sound waves or the tongue in motion — the ancient way of picturing speech emerging from a mouth. One of the most productive semantic radicals for linguistic and communicative concepts. Left-side form is 訁.',
		variants: ['訁'],
		tags: ['speech', 'words'],
		examples: [{ word: '言葉', reading: 'ことば', meaning: 'words / language' }, { word: '言う', reading: 'いう', meaning: 'to say' }, { word: '方言', reading: 'ほうげん', meaning: 'dialect' }],
		recipes: [{ kanji: '語', reading: 'ご', meaning: 'language', breakdown: '言 + 吾', clue: 'Speech radical makes the whole kanji about words.' }, { kanji: '話', reading: 'わ', meaning: 'talk', breakdown: '言 + 舌', clue: 'Tongue plus speech radical equals talking.' }]
	},
	'訁': {
		mnemonic: 'Speech pressed to the left edge — a quick two-stroke shorthand. Wherever it appears, the kanji is about something spoken, written, or communicated.',
		etymology: 'The compressed left-side component form of 言 (speech/words). Designed to fit the left column of compound characters during the regular script standardization. It carries the same full semantic range as 言 — language, speaking, records, and communication.',
		variants: ['言'],
		tags: ['speech side', 'left-side'],
		examples: [{ word: '語る', reading: 'かたる', meaning: 'to tell / narrate' }, { word: '計画', reading: 'けいかく', meaning: 'plan' }, { word: '試験', reading: 'しけん', meaning: 'exam / test' }],
		recipes: [{ kanji: '計', reading: 'けい', meaning: 'measure / plan', breakdown: '訁 + 十', clue: 'Speech on the left often marks stating or planning.' }, { kanji: '試', reading: 'し', meaning: 'test / try', breakdown: '訁 + 式', clue: 'A test is something stated and then attempted.' }]
	},
	'食': {
		mnemonic: 'A covered food vessel with a person leaning in to eat — the ancient image of a meal.',
		etymology: 'Originally depicted a person (𠆢) bending over a covered vessel of food (the lower components). The image captures the act of eating. It covers all kanji about consuming, cooking, and food. When placed on the left side of a character it compresses to 飠.',
		variants: ['飠'],
		tags: ['food', 'eat'],
		examples: [{ word: '食べる', reading: 'たべる', meaning: 'to eat' }, { word: '食事', reading: 'しょくじ', meaning: 'meal' }, { word: '食欲', reading: 'しょくよく', meaning: 'appetite' }],
		recipes: [{ kanji: '飯', reading: 'はん', meaning: 'meal / cooked rice', breakdown: '食 + 反', clue: 'Food radical up front tells you it is edible.' }, { kanji: '館', reading: 'かん', meaning: 'hall / inn', breakdown: '食 + 官', clue: 'Historically tied to eating halls and lodgings.' }]
	},
	'飠': {
		mnemonic: 'Food radical compressed to the left side — a stylized vessel with a lid. It always points to eating, feeding, or nourishment.',
		etymology: 'The left-side component form of 食 (eat/food), compressed to allow a right-side phonetic or semantic element. The shape retains the lid-and-vessel structure of the original. It marks all kanji in the food-and-eating semantic family.',
		variants: ['食'],
		tags: ['food side', 'left-side'],
		examples: [{ word: '飲む', reading: 'のむ', meaning: 'to drink' }, { word: '飢える', reading: 'うえる', meaning: 'to starve' }, { word: '飼う', reading: 'かう', meaning: 'to raise (animals)' }],
		recipes: [{ kanji: '飲', reading: 'いん', meaning: 'drink', breakdown: '飠 + 欠', clue: 'Food-side marks ingestion — even drinking.' }, { kanji: '餓', reading: 'が', meaning: 'starve', breakdown: '飠 + 我', clue: 'No food plus "me" — the radical lands hard.' }]
	},
	'車': {
		mnemonic: 'A cart or chariot seen from above: the axle running top to bottom, the wheel rim forming the outer frame.',
		etymology: 'A top-down pictograph of a wheeled cart — the central vertical stroke is the axle, the horizontal strokes are the wheel hubs and spokes, and the enclosing rectangle is the wheel rim. Chariots and carts were among the most important technologies in ancient China, so this radical appears widely in transport, turning, and military kanji.',
		tags: ['vehicle', 'wheel'],
		examples: [{ word: '車', reading: 'くるま', meaning: 'car / vehicle' }, { word: '電車', reading: 'でんしゃ', meaning: 'train' }, { word: '自転車', reading: 'じてんしゃ', meaning: 'bicycle' }],
		recipes: [{ kanji: '転', reading: 'てん', meaning: 'turn / roll', breakdown: '車 + 云', clue: 'A vehicle turning — the motion is built in.' }, { kanji: '軽', reading: 'けい', meaning: 'lightweight', breakdown: '車 + 圣', clue: 'A light vehicle carries a small load.' }]
	},
	'門': {
		mnemonic: 'Two upright posts with a crossbar and double doors hanging from them — a gate you can walk through or bar shut.',
		etymology: 'A pictograph of a two-panelled gate: two vertical pillars, a horizontal lintel at the top, and two symmetrical door panels. It marks kanji about gates, thresholds, entrances, and institutions. Importantly, anything that passes through or is enclosed by a gate is in this semantic family — hearing through a door, a gap between panels.',
		tags: ['gate', 'door'],
		examples: [{ word: '門', reading: 'もん', meaning: 'gate' }, { word: '専門', reading: 'せんもん', meaning: 'specialty / expertise' }, { word: '正門', reading: 'せいもん', meaning: 'front gate' }],
		recipes: [{ kanji: '聞', reading: 'ぶん', meaning: 'hear / ask', breakdown: '門 + 耳', clue: 'An ear pressed to the gate is listening.' }, { kanji: '間', reading: 'かん', meaning: 'interval / space', breakdown: '門 + 日', clue: 'Sunlight through gate panels — a gap in time or space.' }]
	},
	'雨': {
		mnemonic: 'A sky-line at the top, a window frame below it, and four drops of rain falling inside. The whole scene is rain coming through.',
		etymology: 'A pictograph of rain falling from the sky: the top horizontal stroke is the cloud or sky, the frame below encloses the scene, and the four inner dots (originally more numerous) are individual raindrops. It serves as the "weather canopy" for most meteorological kanji — snow, electricity, frost, and clouds all build on this base.',
		tags: ['rain', 'weather'],
		examples: [{ word: '雨', reading: 'あめ', meaning: 'rain' }, { word: '大雨', reading: 'おおあめ', meaning: 'heavy rain' }, { word: '雨具', reading: 'あまぐ', meaning: 'rain gear' }],
		recipes: [{ kanji: '雪', reading: 'ゆき', meaning: 'snow', breakdown: '雨 + 彗 (lower)', clue: 'Frozen rain swept down.' }, { kanji: '電', reading: 'でん', meaning: 'electricity', breakdown: '雨 + 申', clue: 'Lightning in the rain cloud.' }]
	},
	'宀': {
		mnemonic: 'A peaked roof with walls — shelter from above. Any kanji wearing this hat is about a covered space.',
		etymology: 'A pictograph of a roof in cross-section: the peak at the top and two descending eave strokes. It marks kanji where the meaning involves covered or enclosed spaces — dwellings, storage, official halls, and anything protected from the elements. One of the most productive "enclosure from above" components.',
		tags: ['roof', 'shelter'],
		examples: [{ word: '家', reading: 'いえ', meaning: 'house / home' }, { word: '安全', reading: 'あんぜん', meaning: 'safety' }, { word: '宿', reading: 'やど', meaning: 'lodging / inn' }],
		recipes: [{ kanji: '安', reading: 'あん', meaning: 'peaceful', breakdown: '宀 + 女', clue: 'A woman sheltered under a roof means peace.' }, { kanji: '家', reading: 'か', meaning: 'house', breakdown: '宀 + 豕', clue: 'A roof over a pig — the farm household.' }]
	},
	'艹': {
		mnemonic: 'Two grass shoots growing from a shared root — the crown of plants atop a character. If you see it, something botanical follows.',
		etymology: 'Originally 草 (grass) in abbreviated form — two or three upward shoots above a horizontal root line. During script standardization this was reduced to the two-stroke crown form 艹. It marks all kanji about plants, herbs, flowers, grasses, and vegetation.',
		tags: ['grass top', 'plant'],
		examples: [{ word: '花', reading: 'はな', meaning: 'flower' }, { word: '茶', reading: 'ちゃ', meaning: 'tea' }, { word: '草', reading: 'くさ', meaning: 'grass / weed' }],
		recipes: [{ kanji: '花', reading: 'か', meaning: 'flower', breakdown: '艹 + 化', clue: 'Plant crown marks botanical transformation.' }, { kanji: '茶', reading: 'ちゃ', meaning: 'tea', breakdown: '艹 + 人 + 木', clue: 'Tea is the plant that defined a civilization.' }]
	},
	'辶': {
		mnemonic: 'A road with a trail behind it — one step forward and the path receding. Motion, travel, approach.',
		etymology: 'Derived from 辵 (walk + stop alternating = going along a road) compressed into a corner-wrapping shape. The bottom stroke is the road and the hooked curve above it represents the alternating motion of walking. It marks kanji about motion, routes, spatial relationships (near, far, pass), and roads.',
		variants: ['⻌'],
		tags: ['movement', 'road'],
		examples: [{ word: '近い', reading: 'ちかい', meaning: 'near / close' }, { word: '道', reading: 'みち', meaning: 'road / path' }, { word: '返す', reading: 'かえす', meaning: 'to return something' }],
		recipes: [{ kanji: '近', reading: 'きん', meaning: 'near', breakdown: '斤 + 辶', clue: 'The movement trail shifts the meaning into location.' }, { kanji: '道', reading: 'どう', meaning: 'road / way', breakdown: '首 + 辶', clue: 'A head leading along a path.' }]
	},
	'⻌': {
		mnemonic: 'Visual variant of shinnyou. Same road-and-motion signal, slightly flatter print shape depending on font.',
		etymology: 'An alternate rendering of 辶 (shinnyou) that appears in some typefaces and handwriting styles. The difference is purely calligraphic — one extra horizontal stroke at the base of the hook. Both forms carry identical meaning and are used interchangeably across printed Japanese.',
		variants: ['辶'],
		tags: ['movement variant', 'path'],
		examples: [{ word: '週', reading: 'しゅう', meaning: 'week' }, { word: '追う', reading: 'おう', meaning: 'to chase' }, { word: '遠い', reading: 'とおい', meaning: 'far / distant' }],
		recipes: [{ kanji: '週', reading: 'しゅう', meaning: 'week', breakdown: '周 + ⻌', clue: 'The walking trail wraps around the cycle.' }, { kanji: '追', reading: 'つい', meaning: 'chase', breakdown: '𠂤 + ⻌', clue: 'Movement with urgency — pursuit.' }]
	},
	'石': {
		mnemonic: 'A cliff overhang with a block of stone sitting below it — the image of a boulder fallen from a rockface.',
		etymology: 'Composed of 厂 (cliff / overhang) above and 口 (a block shape) below, representing a stone that has broken away from a cliff face. It marks kanji about stone, minerals, hardness, and weight — including geology, masonry, and tools.',
		tags: ['stone', 'mineral'],
		examples: [{ word: '石', reading: 'いし', meaning: 'stone / rock' }, { word: '宝石', reading: 'ほうせき', meaning: 'jewel / gem' }, { word: '石油', reading: 'せきゆ', meaning: 'petroleum / oil' }],
		recipes: [{ kanji: '岩', reading: 'がん', meaning: 'boulder', breakdown: '山 + 石', clue: 'Mountain plus stone gives rock.' }, { kanji: '研', reading: 'けん', meaning: 'polish / research', breakdown: '石 + 开', clue: 'Grinding stone leads to polish and refinement.' }]
	},
	'禾': {
		mnemonic: 'A grain stalk with a heavy head drooping to one side — the visual weight of a ripe harvest.',
		etymology: 'A pictograph of a grain plant, most likely millet or rice: the vertical stroke is the stalk, the horizontal cross-stroke is a leaf, and the angled top stroke is the drooping seed-head bent down by its own weight. It marks kanji about grain crops, harvest, agriculture, and tax (since grain was used as currency).',
		tags: ['grain', 'crop'],
		examples: [{ word: '秋', reading: 'あき', meaning: 'autumn' }, { word: '科学', reading: 'かがく', meaning: 'science' }, { word: '利益', reading: 'りえき', meaning: 'profit / benefit' }],
		recipes: [{ kanji: '秋', reading: 'しゅう', meaning: 'autumn', breakdown: '禾 + 火', clue: 'Grain plus fire — the season of harvest bonfires.' }, { kanji: '科', reading: 'か', meaning: 'department / subject', breakdown: '禾 + 斗', clue: 'Measuring grain becomes classifying knowledge.' }]
	},
	'竹': {
		mnemonic: 'Two bamboo stalks with leaves drooping down — the characteristic droop of fresh bamboo. At the top of kanji it shrinks to the compact crown ⺮.',
		etymology: 'A pictograph of two bamboo culms side by side, each showing a single leaf drooping outward. Bamboo was among the most important materials in East Asian culture — writing slips, pipes, tools, musical instruments — and this radical marks all bamboo-material objects. The abbreviated top form ⺮ is used in nearly all compounds.',
		variants: ['⺮'],
		tags: ['bamboo', 'top radical'],
		examples: [{ word: '竹', reading: 'たけ', meaning: 'bamboo' }, { word: '笛', reading: 'ふえ', meaning: 'flute / whistle' }, { word: '筆', reading: 'ふで', meaning: 'brush / pen' }],
		recipes: [{ kanji: '答', reading: 'とう', meaning: 'answer', breakdown: '⺮ + 合', clue: 'A bamboo slip joining things — a written answer.' }, { kanji: '第', reading: 'だい', meaning: 'ordinal number', breakdown: '⺮ + 弟', clue: 'Bamboo-strip rank lists — ordinal counting.' }]
	},
	'耳': {
		mnemonic: 'The ear in cross-section: a rectangular outer form with parallel interior strokes like the layers of the inner ear.',
		etymology: 'A pictograph of a human ear seen from the side: the outer vertical strokes are the ear frame, and the three horizontal strokes inside represent the cartilage folds of the outer ear. Remarkably faithful to anatomy for a 3,000-year-old pictograph. It marks kanji about hearing, listening, and by extension obedience (to a ruler\'s words).',
		tags: ['ear', 'hearing'],
		examples: [{ word: '耳', reading: 'みみ', meaning: 'ear' }, { word: '耳鼻科', reading: 'じびか', meaning: 'ENT department' }, { word: '聞こえる', reading: 'きこえる', meaning: 'can be heard' }],
		recipes: [{ kanji: '聞', reading: 'ぶん', meaning: 'hear / ask', breakdown: '門 + 耳', clue: 'An ear at the gate is listening for sound.' }, { kanji: '職', reading: 'しょく', meaning: 'job / occupation', breakdown: '耳 + 戠', clue: 'The ear component anchors the sound-based left side.' }]
	},
	'足': {
		mnemonic: 'A knee joint above a foot — the full lower leg from knee down, with the foot at the base.',
		etymology: 'A pictograph of a leg from the knee down: the upper part represents the knee or shin, and the lower part is the foot with toes. It covers movement, steps, walking, dancing, and also the meaning "sufficient" — possibly because having feet means you can go and obtain what you need.',
		tags: ['foot', 'leg', 'movement'],
		examples: [{ word: '足', reading: 'あし', meaning: 'foot / leg' }, { word: '足りる', reading: 'たりる', meaning: 'to be sufficient' }, { word: '遠足', reading: 'えんそく', meaning: 'excursion / field trip' }],
		recipes: [{ kanji: '路', reading: 'ろ', meaning: 'road / route', breakdown: '足 + 各', clue: 'Roads are made for feet to travel.' }, { kanji: '踊', reading: 'おど', meaning: 'dance', breakdown: '足 + 甬', clue: 'Feet in motion — the foot radical signals dancing.' }]
	},
	'阝': {
		mnemonic: 'Two radicals in disguise as one shape: on the left it means hill/mound (阜); on the right it means city/village (邑). Position reveals identity.',
		etymology: 'Two historically distinct radicals that merged into the same written form 阝 in modern script. On the left side it derives from 阜 (earthen mound, staircase, high ground) and marks terrain-related kanji. On the right side it derives from 邑 (walled settlement, city, district) and marks administrative and urban kanji. This is one of the most important position-sensitive radicals to learn.',
		variants: ['⻖', '⻏'],
		tags: ['hill or city', 'position-sensitive'],
		examples: [{ word: '院', reading: 'いん', meaning: 'institution / hospital' }, { word: '都', reading: 'みやこ', meaning: 'capital city' }, { word: '部', reading: 'ぶ', meaning: 'section / department' }],
		recipes: [{ kanji: '院', reading: 'いん', meaning: 'institution', breakdown: '阝(left) + 完', clue: 'On the left it signals terrain or built establishment.' }, { kanji: '都', reading: 'と', meaning: 'capital city', breakdown: '者 + 阝(right)', clue: 'On the right it always signals city or settlement.' }]
	},

	// ── Extended radicals ─────────────────────────────────────────
	'刀': {
		mnemonic: 'A curved blade with a back edge — the silhouette of a single-edged sword or cleaver.',
		etymology: 'A pictograph of a curved-blade knife or sword in profile: the curved stroke is the cutting edge and the short angled stroke at the top is the point or spine. One of the most ancient pictographic radicals. On the right side of kanji it compresses into the two-stroke 刂.',
		variants: ['刂'],
		tags: ['blade', 'cut'],
		examples: [{ word: '刀', reading: 'かたな', meaning: 'sword / knife' }, { word: '刀剣', reading: 'とうけん', meaning: 'swords and blades' }, { word: '小刀', reading: 'こがたな', meaning: 'penknife' }],
		recipes: [{ kanji: '分', reading: 'ぶん', meaning: 'divide / part', breakdown: '八 + 刀', clue: 'A knife separating things.' }, { kanji: '切', reading: 'せつ', meaning: 'cut', breakdown: '七 + 刀', clue: 'A knife action is explicitly a cut.' }]
	},
	'刂': {
		mnemonic: 'Two strokes on the right side — a blade stripped to its essentials. Wherever you see this, cutting or dividing is happening.',
		etymology: 'The right-side compressed form of 刀 (sword/knife). The two-stroke shape retains the spine-and-edge quality of the original. It appears as the right component in many action kanji — cutting, carving, scraping, peeling — and is one of the clearest semantic indicators in the script.',
		variants: ['刀'],
		tags: ['knife side', 'right-side'],
		examples: [{ word: '別れる', reading: 'わかれる', meaning: 'to part / separate' }, { word: '利く', reading: 'きく', meaning: 'to work / be effective' }, { word: '刻む', reading: 'きざむ', meaning: 'to carve / mince' }],
		recipes: [{ kanji: '別', reading: 'べつ', meaning: 'separate / different', breakdown: '另 + 刂', clue: 'A knife creating division — separate.' }, { kanji: '利', reading: 'り', meaning: 'profit / sharp', breakdown: '禾 + 刂', clue: 'A blade on grain — harvesting profit.' }]
	},
	'又': {
		mnemonic: 'A right hand with two fingers extended — the oldest pictograph of a hand grasping or doing something again.',
		etymology: 'A pictograph of a right hand, specifically showing the thumb and index finger. It originally meant "right hand" and evolved to mean "again / moreover" — the idea of doing something once more with the same hand. In compound kanji it often appears as a gripping or supportive component.',
		tags: ['hand', 'again'],
		examples: [{ word: '友', reading: 'とも', meaning: 'friend' }, { word: '受ける', reading: 'うける', meaning: 'to receive' }, { word: '取る', reading: 'とる', meaning: 'to take' }],
		recipes: [{ kanji: '友', reading: 'ゆう', meaning: 'friend', breakdown: '又 + 丿', clue: 'Two hands reaching toward each other.' }, { kanji: '反', reading: 'はん', meaning: 'oppose / reverse', breakdown: '厂 + 又', clue: 'A hand pushing against a cliff — reversal.' }]
	},
	'大': {
		mnemonic: 'A person with arms and legs spread wide — as big as a human can make themselves.',
		etymology: 'A pictograph of a person (人) with both arms extended horizontally — the largest a human silhouette can be. It is the natural size-up of 人 (standing person) and 小 (small). The concept of bigness derives directly from this expanded human posture.',
		tags: ['big', 'person spread'],
		examples: [{ word: '大きい', reading: 'おおきい', meaning: 'big / large' }, { word: '大学', reading: 'だいがく', meaning: 'university' }, { word: '大切', reading: 'たいせつ', meaning: 'important / precious' }],
		recipes: [{ kanji: '太', reading: 'たい', meaning: 'fat / thick', breakdown: '大 + 丶', clue: 'A big person with one extra weight stroke — thick.' }, { kanji: '天', reading: 'てん', meaning: 'sky / heaven', breakdown: '一 + 大', clue: 'Above the outstretched person is the sky.' }]
	},
	'工': {
		mnemonic: 'A ruler or carpenter\'s square — the top and bottom bars are surfaces being measured, the vertical is the standard.',
		etymology: 'Originally depicted a carpenter\'s adze or square rule — the horizontal strokes are the two surfaces it connects and the vertical stroke is the measuring edge. It marks kanji about craft, construction, labor, and skilled work. In ancient China, 工 was the official character for artisans and tradespeople.',
		tags: ['craft', 'work'],
		examples: [{ word: '工場', reading: 'こうじょう', meaning: 'factory' }, { word: '工事', reading: 'こうじ', meaning: 'construction work' }, { word: '大工', reading: 'だいく', meaning: 'carpenter' }],
		recipes: [{ kanji: '左', reading: 'さ', meaning: 'left', breakdown: '工 + 又(left)', clue: 'The left hand holding the work tool.' }, { kanji: '空', reading: 'くう', meaning: 'sky / empty', breakdown: '穴 + 工', clue: 'Hollow work dug out — an empty space.' }]
	},
	'弓': {
		mnemonic: 'An archer\'s bow in profile — the curved body with a notch for the bowstring.',
		etymology: 'A pictograph of an archer\'s bow seen from the side: the curved stroke is the bow stave and the small hook or curve is the notch where the string is attached. It marks kanji about archery, bending, drawing back, and tension.',
		tags: ['bow', 'archery', 'curve'],
		examples: [{ word: '弓', reading: 'ゆみ', meaning: 'bow (archery)' }, { word: '弓道', reading: 'きゅうどう', meaning: 'Japanese archery' }, { word: '引く', reading: 'ひく', meaning: 'to pull / draw' }],
		recipes: [{ kanji: '引', reading: 'いん', meaning: 'pull / draw', breakdown: '弓 + 丨', clue: 'A bow with the arrow in place — drawing back.' }, { kanji: '弱', reading: 'じゃく', meaning: 'weak', breakdown: '弓 + 弓 + strokes', clue: 'Two bows gone limp — weakness.' }]
	},
	'彡': {
		mnemonic: 'Three parallel diagonal strokes — streaming hair, feathers, or fine lines. A mark of texture and shine.',
		etymology: 'Derived from an image of flowing hair, fur, or fine parallel lines. The three strokes represent texture through repetition. It marks kanji about hair, fur, ornamentation, decoration, and any surface quality — including coloring and striping.',
		tags: ['hair', 'texture', 'stripes'],
		examples: [{ word: '彩る', reading: 'いろどる', meaning: 'to color / adorn' }, { word: '形', reading: 'かたち', meaning: 'shape / form' }, { word: '影', reading: 'かげ', meaning: 'shadow / silhouette' }],
		recipes: [{ kanji: '形', reading: 'けい', meaning: 'shape', breakdown: '开 + 彡', clue: 'An outline filled with texture strokes.' }, { kanji: '彩', reading: 'さい', meaning: 'color / brilliance', breakdown: '采 + 彡', clue: 'Plucked strands of color — vivid decoration.' }]
	},
	'彳': {
		mnemonic: 'The left half of 行 (go/row) — two footstep-like strokes that signal walking or moving along a route.',
		etymology: 'A component derived by splitting 行 (crossroads / go) down the middle. The three strokes represent alternating footsteps — left, right, left — moving forward. It marks kanji about roads, movement, behavior, and routes, often combined with a right-side element.',
		tags: ['step', 'road', 'left-side'],
		examples: [{ word: '待つ', reading: 'まつ', meaning: 'to wait' }, { word: '得る', reading: 'える', meaning: 'to obtain' }, { word: '後ろ', reading: 'うしろ', meaning: 'behind / back' }],
		recipes: [{ kanji: '待', reading: 'たい', meaning: 'wait', breakdown: '彳 + 寺', clue: 'Someone stopped on a road — waiting.' }, { kanji: '行', reading: 'こう', meaning: 'go / conduct', breakdown: '彳 + 亍', clue: 'Both sides of the crossroads — going forward.' }]
	},
	'攵': {
		mnemonic: 'A hand holding a stick raised to strike — the old pictograph of someone administering a blow or correction.',
		etymology: 'A simplified form of 攴 (strike lightly / tap), which itself showed a hand holding a rod. The four-stroke 攵 is the clerical and modern version. It marks kanji about hitting, striking, causing to happen, and administrative action — the idea of bringing force or order through a decisive blow.',
		tags: ['strike', 'action'],
		examples: [{ word: '教える', reading: 'おしえる', meaning: 'to teach' }, { word: '改める', reading: 'あらためる', meaning: 'to reform' }, { word: '放つ', reading: 'はなつ', meaning: 'to release' }],
		recipes: [{ kanji: '教', reading: 'きょう', meaning: 'teach', breakdown: '孝 + 攵', clue: 'The strike component marks active instruction.' }, { kanji: '政', reading: 'せい', meaning: 'government', breakdown: '正 + 攵', clue: 'Governing is correcting through decisive action.' }]
	},
	'白': {
		mnemonic: 'The sun just risen from behind something — or a skull stripped bare. Purity, clarity, and blankness.',
		etymology: 'The etymology is debated: one reading is a pictograph of the rising sun just cresting the horizon (brightness = whiteness). Another sees it as a bleached skull. Either way, the meaning settled firmly on white, pure, blank, and by extension clear or plain. It marks kanji about whiteness, clarity, and stating plainly.',
		tags: ['white', 'clear'],
		examples: [{ word: '白い', reading: 'しろい', meaning: 'white' }, { word: '白紙', reading: 'はくし', meaning: 'blank paper' }, { word: '告白', reading: 'こくはく', meaning: 'confession' }],
		recipes: [{ kanji: '泊', reading: 'はく', meaning: 'stay overnight', breakdown: '氵 + 白', clue: 'Water and whiteness — a pale, still resting place.' }, { kanji: '拍', reading: 'はく', meaning: 'beat / clap', breakdown: '扌 + 白', clue: 'A hand striking cleanly — a beat.' }]
	},
	'皮': {
		mnemonic: 'A hand peeling the hide from an animal — the original image of stripping away the outer layer.',
		etymology: 'A pictograph showing a hand peeling or flaying an animal skin from a carcass. The upper component is a hand-with-tool and the lower represents the skin being pulled. It covers skin, hide, leather, peeling, and surface layers.',
		tags: ['skin', 'hide', 'surface'],
		examples: [{ word: '皮膚', reading: 'ひふ', meaning: 'skin' }, { word: '皮肉', reading: 'ひにく', meaning: 'irony / sarcasm' }, { word: '毛皮', reading: 'けがわ', meaning: 'fur / pelt' }],
		recipes: [{ kanji: '彼', reading: 'かれ', meaning: 'he / that one', breakdown: '彳 + 皮', clue: 'Moving past — that one over there.' }, { kanji: '波', reading: 'は', meaning: 'wave', breakdown: '氵 + 皮', clue: 'Water surface rippling — the skin of the water.' }]
	},
	'見': {
		mnemonic: 'An eye mounted on legs going out to look — the act of actively seeing, not just having eyes.',
		etymology: 'Composed of 目 (eye) above and 儿 (human legs) below — a person with prominent eyes walking around to see. It marks kanji about seeing, looking, visiting, and showing, emphasizing active observation rather than mere optical function.',
		tags: ['see', 'look', 'visit'],
		examples: [{ word: '見る', reading: 'みる', meaning: 'to see / look' }, { word: '見物', reading: 'けんぶつ', meaning: 'sightseeing' }, { word: '意見', reading: 'いけん', meaning: 'opinion' }],
		recipes: [{ kanji: '視', reading: 'し', meaning: 'look at / regard', breakdown: '示 + 見', clue: 'Showing and seeing — formal observation.' }, { kanji: '覚える', reading: 'おぼえる', meaning: 'remember / learn', breakdown: '学 upper + 見', clue: 'To see and have it stick — learning through sight.' }]
	},
	'貝': {
		mnemonic: 'A cowrie shell in profile: the round body above, two legs dangling below. Shells were ancient currency.',
		etymology: 'A pictograph of a cowrie shell — the oval body and two tiny "legs" are the shell\'s natural lip-opening. Cowrie shells were the first currency in ancient China, so 貝 became the radical for all money, trade, commerce, and economic transactions. Without this radical, kanji for selling, buying, and riches would look completely different.',
		tags: ['shell', 'money', 'trade'],
		examples: [{ word: '貝', reading: 'かい', meaning: 'shellfish' }, { word: '財布', reading: 'さいふ', meaning: 'wallet' }, { word: '賛成', reading: 'さんせい', meaning: 'agreement / approval' }],
		recipes: [{ kanji: '買', reading: 'かい', meaning: 'buy', breakdown: '網 + 貝', clue: 'A net catching shells — acquiring with money.' }, { kanji: '貸', reading: 'たい', meaning: 'lend', breakdown: '代 + 貝', clue: 'Money changing hands — lending.' }]
	},
	'走': {
		mnemonic: 'A person with arms swinging and feet moving fast — the whole-body image of running.',
		etymology: 'Composed of 夭 (a person bending forward with energy) above and 止 (foot/stop) below — but here 止 signals movement rather than stopping. The combination captures a person lunging forward in motion. It marks kanji about running, rushing, and fleeing.',
		tags: ['run', 'rush'],
		examples: [{ word: '走る', reading: 'はしる', meaning: 'to run' }, { word: '競走', reading: 'きょうそう', meaning: 'race' }, { word: '走行', reading: 'そうこう', meaning: 'traveling / running (of vehicles)' }],
		recipes: [{ kanji: '起', reading: 'き', meaning: 'rise / get up', breakdown: '走 + 己', clue: 'Movement starting from the self — rising into action.' }, { kanji: '越', reading: 'えつ', meaning: 'exceed / cross over', breakdown: '走 + 戉', clue: 'Running past a boundary — exceeding.' }]
	},
	'身': {
		mnemonic: 'A pregnant woman in profile — the swelling abdomen makes the body concept visceral and unmistakable.',
		etymology: 'A pictograph of a person with a prominent belly — the ancient depiction of a pregnant body. Over time the meaning shifted from "pregnant" to "body" in general, and then to "oneself / one\'s own person." It marks kanji about the body, identity, and personal experience.',
		tags: ['body', 'self'],
		examples: [{ word: '身体', reading: 'からだ', meaning: 'body' }, { word: '自身', reading: 'じしん', meaning: 'oneself' }, { word: '身分', reading: 'みぶん', meaning: 'social status / identity' }],
		recipes: [{ kanji: '射', reading: 'しゃ', meaning: 'shoot / fire', breakdown: '身 + 寸', clue: 'The body aligned to release — shooting.' }, { kanji: '躬', reading: 'きゅう', meaning: 'personally / in person', breakdown: '身 + 弓', clue: 'Body plus bow — the archer in person.' }]
	},
	'里': {
		mnemonic: 'A field sitting on top of soil — land measured, settled, and named. Village and the mile-like unit of distance.',
		etymology: 'Composed of 田 (field) over 土 (earth/soil) — cultivated land on settled ground. It marks both the concept of a rural village (people living on their fields) and the Chinese unit of distance 里 (about 500 meters), derived from the idea of measuring land by how far one walks between settlements.',
		tags: ['village', 'measure', 'distance'],
		examples: [{ word: '里', reading: 'さと', meaning: 'village / hometown' }, { word: '万里', reading: 'ばんり', meaning: 'ten thousand ri / vast distance' }, { word: '郷里', reading: 'きょうり', meaning: 'hometown' }],
		recipes: [{ kanji: '重', reading: 'じゅう', meaning: 'heavy / pile up', breakdown: '千 + 里', clue: 'A thousand ri of layered earth — heavy.' }, { kanji: '量', reading: 'りょう', meaning: 'quantity', breakdown: '旦 + 里', clue: 'Measuring out by land units — quantity.' }]
	},
	'頁': {
		mnemonic: 'A big head on top of a human body — the oversized face of an important person, which became the word for page.',
		etymology: 'Originally a pictograph of a large, prominent human head atop a body — symbolizing the most important part of a person. By extension it covered "head" in both literal and figurative senses, and later "page" (the head of a document). It marks kanji about the head, face, and matters related to the front or top of things.',
		tags: ['head', 'page'],
		examples: [{ word: '頭', reading: 'あたま', meaning: 'head' }, { word: '顔', reading: 'かお', meaning: 'face' }, { word: '顕著', reading: 'けんちょ', meaning: 'remarkable / prominent' }],
		recipes: [{ kanji: '頭', reading: 'とう', meaning: 'head', breakdown: '豆 + 頁', clue: 'The head radical makes the meaning unmissable.' }, { kanji: '顔', reading: 'がん', meaning: 'face', breakdown: '彦 + 頁', clue: 'The page/head radical anchors the facial meaning.' }]
	},
	'風': {
		mnemonic: 'A sail catching air, or a phoenix soaring — wind is invisible but its effects are everywhere in this character.',
		etymology: 'Originally combined the phonetic 凡 (sail-like shape) with 虫 (insect/creature) — the ancient belief was that wind was caused by insects or creatures moving through the air. The current form preserves 凡 inside an enclosing frame. It marks kanji about wind, style, and manner.',
		tags: ['wind', 'style'],
		examples: [{ word: '風', reading: 'かぜ', meaning: 'wind' }, { word: '台風', reading: 'たいふう', meaning: 'typhoon' }, { word: '風景', reading: 'ふうけい', meaning: 'scenery / landscape' }],
		recipes: [{ kanji: '風', reading: 'ふう', meaning: 'wind / style', breakdown: '凡 + 虫 (historical)', clue: 'The whole character is the radical here.' }, { kanji: '楓', reading: 'かえで', meaning: 'maple tree', breakdown: '木 + 風', clue: 'Trees that tremble and spin in the wind.' }]
	},
	'鳥': {
		mnemonic: 'A bird with a beak, feathers, and a tail — a recognizable bird silhouette that hasn\'t changed in three millennia.',
		etymology: 'A pictograph of a bird in profile: the head and beak at the top, body feathers in the middle strokes, and the characteristic tail at the base (the four dots 灬 represent tail feathers). It marks all kanji about specific bird species and bird-related concepts. A related simpler form 隹 covers smaller birds.',
		tags: ['bird'],
		examples: [{ word: '鳥', reading: 'とり', meaning: 'bird' }, { word: '小鳥', reading: 'ことり', meaning: 'small bird' }, { word: '鳥居', reading: 'とりい', meaning: 'torii gate' }],
		recipes: [{ kanji: '島', reading: 'とう', meaning: 'island', breakdown: '鳥 + 山', clue: 'A bird-shaped mountain rising from water — island.' }, { kanji: '鳴く', reading: 'なく', meaning: 'to sing / cry (of animals)', breakdown: '口 + 鳥', clue: 'A bird opening its mouth — calling out.' }]
	},
	'魚': {
		mnemonic: 'A fish with a head, body scales, and tail fin — the fish silhouette stripped to its essentials.',
		etymology: 'A pictograph of a fish seen in profile: the top strokes form the head and mouth, the middle strokes represent the scales and body, and the four bottom dots (灬) are the tail fin. Ancient oracle-bone versions show a more detailed fish. It marks all kanji about specific fish species and seafood.',
		tags: ['fish', 'seafood'],
		examples: [{ word: '魚', reading: 'さかな', meaning: 'fish' }, { word: '金魚', reading: 'きんぎょ', meaning: 'goldfish' }, { word: '魚介類', reading: 'ぎょかいるい', meaning: 'seafood' }],
		recipes: [{ kanji: '鮮', reading: 'せん', meaning: 'fresh / vivid', breakdown: '魚 + 羊', clue: 'Fresh fish and lamb — the freshest foods.' }, { kanji: '漁', reading: 'ぎょ', meaning: 'fishing', breakdown: '氵 + 魚', clue: 'Water and fish — fishing.' }]
	},
	'虫': {
		mnemonic: 'A coiled snake or worm — the original meaning was "snake," and it expanded to cover all crawling creatures.',
		etymology: 'Originally a pictograph of a coiled snake, head raised. In ancient classification it covered all crawling and wriggling life — snakes, worms, insects, and even some reptiles. Over time "snake" was specified with other characters and 虫 shifted toward insects and small creatures, but the coiled-snake origin is why it looks the way it does.',
		tags: ['insect', 'creature'],
		examples: [{ word: '虫', reading: 'むし', meaning: 'insect / bug' }, { word: '昆虫', reading: 'こんちゅう', meaning: 'insect' }, { word: '害虫', reading: 'がいちゅう', meaning: 'pest' }],
		recipes: [{ kanji: '蛇', reading: 'じゃ', meaning: 'snake', breakdown: '虫 + 它', clue: 'Creature radical returns to the original snake meaning.' }, { kanji: '蜂', reading: 'はち', meaning: 'bee / wasp', breakdown: '虫 + 夆', clue: 'The insect radical identifies the creature.' }]
	},
	'肉': {
		mnemonic: 'A piece of meat with visible muscle layers — raw flesh with the grain running through it. In compound kanji it looks just like 月.',
		etymology: 'A pictograph of a cut of meat showing internal fiber lines. The original form had a framing rectangle with two horizontal strokes inside representing muscle layers. In compound kanji the shape merges completely with 月 (moon) — so the same visual component means either "moon" (standalone) or "flesh/body" (in compounds on the left side). Context is key.',
		tags: ['meat', 'flesh', 'body'],
		examples: [{ word: '肉', reading: 'にく', meaning: 'meat / flesh' }, { word: '筋肉', reading: 'きんにく', meaning: 'muscle' }, { word: '肉体', reading: 'にくたい', meaning: 'physical body' }],
		recipes: [{ kanji: '胸', reading: 'むね', meaning: 'chest', breakdown: '月(肉) + 匈', clue: 'Flesh radical marks body parts.' }, { kanji: '脳', reading: 'のう', meaning: 'brain', breakdown: '月(肉) + 囟', clue: 'The flesh/body radical identifies this as an organ.' }]
	},
	'衣': {
		mnemonic: 'A robe spread open — the collar at the top, sleeves fanning out, and the hemline sweeping below.',
		etymology: 'A pictograph of a garment laid flat and open: the top strokes show the collar and shoulder line, and the lower strokes show the hanging fabric. It covers clothing, robes, and textiles. In compound kanji the left-side compressed form 衤 is used.',
		variants: ['衤'],
		tags: ['clothing', 'fabric'],
		examples: [{ word: '衣服', reading: 'いふく', meaning: 'clothes / garments' }, { word: '衣食住', reading: 'いしょくじゅう', meaning: 'food, clothing, and shelter' }, { word: '薄衣', reading: 'うすごろも', meaning: 'thin garment' }],
		recipes: [{ kanji: '裁', reading: 'さい', meaning: 'cut cloth / judge', breakdown: '衣 + 𠂉', clue: 'Cutting the cloth — the clothing radical inside.' }, { kanji: '装', reading: 'そう', meaning: 'dress / equip', breakdown: '壮 + 衣', clue: 'Donning equipment over clothing.' }]
	},
	'衤': {
		mnemonic: 'Clothing compressed to the left side — a collar and one hanging sleeve. Anywhere you see it, the kanji is about fabric, dress, or covering.',
		etymology: 'The left-side component form of 衣 (clothing/robe), reduced to fit beside a right-side element. The shape preserves the collar-and-sleeve profile of the original. It marks all kanji about specific garments, wearing, and textiles.',
		variants: ['衣'],
		tags: ['clothing side', 'left-side'],
		examples: [{ word: '初めて', reading: 'はじめて', meaning: 'for the first time' }, { word: '被る', reading: 'かぶる', meaning: 'to wear on the head' }, { word: '裸', reading: 'はだか', meaning: 'naked' }],
		recipes: [{ kanji: '初', reading: 'しょ', meaning: 'first / beginning', breakdown: '衤 + 刀', clue: 'Cutting the first piece of cloth — beginning.' }, { kanji: '裕', reading: 'ゆう', meaning: 'abundance', breakdown: '衤 + 谷', clue: 'Clothing plus a valley — comfortable abundance.' }]
	},
	'示': {
		mnemonic: 'An altar table with ritual offerings — the ancient picture of displaying something to the spirits.',
		etymology: 'A pictograph of a sacrificial altar: the horizontal stroke at the top is the altar table surface, and the three drops hanging below are offerings dripping down (blood, wine, or grain). It marks kanji about spirits, gods, ritual, and omens. The left-side form is 礻.',
		variants: ['礻'],
		tags: ['spirit', 'ritual', 'show'],
		examples: [{ word: '神', reading: 'かみ', meaning: 'god / spirit' }, { word: '礼', reading: 'れい', meaning: 'gratitude / ceremony' }, { word: '祭り', reading: 'まつり', meaning: 'festival' }],
		recipes: [{ kanji: '神', reading: 'しん', meaning: 'god / divine', breakdown: '礻 + 申', clue: 'The spirit radical makes the divine explicit.' }, { kanji: '祭', reading: 'さい', meaning: 'festival / ritual', breakdown: '月(flesh) + 又 + 示', clue: 'Offering meat at the altar — a ritual.' }]
	},
	'礻': {
		mnemonic: 'The altar radical on the left side — one horizontal bar and two hanging drops. Religious, sacred, or ceremonial meaning follows.',
		etymology: 'The left-side component form of 示 (altar/spirit). The reduction to four strokes preserves the hanging-drops quality of the original altar shape. It appears in kanji about gods, shrines, prayers, omens, blessings, and ceremonies.',
		variants: ['示'],
		tags: ['spirit side', 'shrine', 'left-side'],
		examples: [{ word: '神社', reading: 'じんじゃ', meaning: 'Shinto shrine' }, { word: '礼儀', reading: 'れいぎ', meaning: 'etiquette / manners' }, { word: '祈る', reading: 'いのる', meaning: 'to pray' }],
		recipes: [{ kanji: '福', reading: 'ふく', meaning: 'fortune / happiness', breakdown: '礻 + 畐', clue: 'A full vessel at the altar — divine fortune.' }, { kanji: '祈', reading: 'き', meaning: 'pray', breakdown: '礻 + 斤', clue: 'At the altar, cutting away doubt — prayer.' }]
	},
	'米': {
		mnemonic: 'Grains of rice scattering in all eight directions from a central point — the star-burst of a polished grain.',
		etymology: 'A pictograph of rice grains dispersed around a central stalk — the star-burst pattern represents the husked grain or the spreading of seeds. It marks kanji about rice (the staple grain of Japan and China), measurement (rice was currency), and fine granular substances.',
		tags: ['rice', 'grain'],
		examples: [{ word: '米', reading: 'こめ', meaning: 'rice (uncooked)' }, { word: '玄米', reading: 'げんまい', meaning: 'brown rice' }, { word: '米国', reading: 'べいこく', meaning: 'United States of America' }],
		recipes: [{ kanji: '粉', reading: 'こな', meaning: 'powder / flour', breakdown: '米 + 分', clue: 'Rice divided into fine particles — flour.' }, { kanji: '精', reading: 'せい', meaning: 'polish / spirit', breakdown: '米 + 青', clue: 'Rice polished to its blue-white core — refined.' }]
	},
	'麦': {
		mnemonic: 'A wheat or barley plant with grain at the top and roots at the bottom — the cereal staple of northern China.',
		etymology: 'A pictograph of a wheat or barley plant: the upper strokes represent the grain head and stalk, and the lower strokes (derived from 夂, foot going downward) represent roots or the grain being ground underfoot at harvest. It marks kanji about wheat, barley, and bread-grain crops.',
		tags: ['wheat', 'barley', 'grain'],
		examples: [{ word: '麦', reading: 'むぎ', meaning: 'wheat / barley' }, { word: '小麦', reading: 'こむぎ', meaning: 'wheat' }, { word: '麦茶', reading: 'むぎちゃ', meaning: 'barley tea' }],
		recipes: [{ kanji: '麺', reading: 'めん', meaning: 'noodle', breakdown: '麦 + 面', clue: 'Grain-flour formed into noodles.' }, { kanji: '麹', reading: 'こうじ', meaning: 'koji mold (fermentation)', breakdown: '麦 + 匊', clue: 'Grain that has been cultured and fermented.' }]
	},
	'牛': {
		mnemonic: 'A bull\'s head with two horns spreading to the sides and a vertical muzzle — seen straight on.',
		etymology: 'A pictograph of a cow or ox head viewed from the front: two spreading horns at the top, a horizontal stroke for the head, and a vertical downstroke for the muzzle. Cattle were fundamental to ancient agriculture (plowing) and ritual sacrifice. The radical marks all bovine animals and their products.',
		tags: ['cow', 'ox', 'livestock'],
		examples: [{ word: '牛', reading: 'うし', meaning: 'cow / ox' }, { word: '牛乳', reading: 'ぎゅうにゅう', meaning: 'milk' }, { word: '牛肉', reading: 'ぎゅうにく', meaning: 'beef' }],
		recipes: [{ kanji: '物', reading: 'もの', meaning: 'thing / object', breakdown: '牛 + 勿', clue: 'The cow radical signals something tangible.' }, { kanji: '特', reading: 'とく', meaning: 'special', breakdown: '牛 + 寺', clue: 'A bull at a temple — something exceptional.' }]
	},
	'馬': {
		mnemonic: 'A horse in profile: head and mane at the top, four legs (the four dots) running below.',
		etymology: 'A pictograph of a horse in motion — the top strokes form the head, mane, and neck, the body is suggested by the torso strokes, and the four dots at the base represent the four legs (a common pictographic shorthand). Horses were central to military and transport in ancient East Asia, and this radical marks all equine kanji.',
		tags: ['horse', 'transport'],
		examples: [{ word: '馬', reading: 'うま', meaning: 'horse' }, { word: '競馬', reading: 'けいば', meaning: 'horse racing' }, { word: '馬力', reading: 'ばりき', meaning: 'horsepower' }],
		recipes: [{ kanji: '騎', reading: 'き', meaning: 'ride a horse', breakdown: '馬 + 奇', clue: 'The horse radical marks the act of riding.' }, { kanji: '駅', reading: 'えき', meaning: 'train station', breakdown: '馬 + 尺', clue: 'Historically a horse relay station — now a train stop.' }]
	},
	'羊': {
		mnemonic: 'A sheep face-on: two curved horns spreading up and outward from a central head — unmistakably pastoral.',
		etymology: 'A pictograph of a sheep or ram\'s head viewed from the front: the two curving strokes are the horns, and the lower strokes form the snout. Sheep were important for wool, meat, and sacrifice. In Chinese culture, the sheep/ram was associated with auspiciousness and beauty — 美 (beautiful) combines 羊 with 大.',
		tags: ['sheep', 'livestock'],
		examples: [{ word: '羊', reading: 'ひつじ', meaning: 'sheep' }, { word: '羊毛', reading: 'ようもう', meaning: 'wool' }, { word: '美しい', reading: 'うつくしい', meaning: 'beautiful' }],
		recipes: [{ kanji: '美', reading: 'び', meaning: 'beautiful', breakdown: '羊 + 大', clue: 'A big sheep — the ancient picture of something splendid.' }, { kanji: '善', reading: 'ぜん', meaning: 'good / virtue', breakdown: '羊 + 誩', clue: 'Sheep as a symbol of auspiciousness yields goodness.' }]
	},
	'犬': {
		mnemonic: 'A dog standing with a dot marking its wagging tail — the simplest distinction from 大 (big/person) is that one dot.',
		etymology: 'A pictograph of a dog: the base shape is identical to 大 (a person standing with arms out) but a single dot is added to represent the upright tail. This one-dot difference encodes the entire distinction. In compound kanji the dog radical usually appears on the left as 犭.',
		variants: ['犭'],
		tags: ['dog', 'animal'],
		examples: [{ word: '犬', reading: 'いぬ', meaning: 'dog' }, { word: '愛犬', reading: 'あいけん', meaning: 'beloved dog' }, { word: '子犬', reading: 'こいぬ', meaning: 'puppy' }],
		recipes: [{ kanji: '狗', reading: 'く', meaning: 'dog (literary)', breakdown: '犭 + 句', clue: 'The animal-side radical makes the creature meaning clear.' }, { kanji: '犯', reading: 'はん', meaning: 'crime / offend', breakdown: '犭 + 巳', clue: 'An animal instinct acting against rules.' }]
	},
	'犭': {
		mnemonic: 'The animal side radical — three strokes suggesting a creature crouching to leap. Any wild animal or beast lives here.',
		etymology: 'The left-side compressed form of 犬 (dog) that expanded to represent wild animals in general. When 犬 was used as a component in compound characters, the side form was freed to mark a broader animal category — predators, game animals, and beasts of all kinds.',
		variants: ['犬'],
		tags: ['animal side', 'left-side'],
		examples: [{ word: '猫', reading: 'ねこ', meaning: 'cat' }, { word: '狐', reading: 'きつね', meaning: 'fox' }, { word: '狼', reading: 'おおかみ', meaning: 'wolf' }],
		recipes: [{ kanji: '猫', reading: 'びょう', meaning: 'cat', breakdown: '犭 + 苗', clue: 'The animal radical marks the four-legged creature.' }, { kanji: '狩', reading: 'しゅ', meaning: 'hunting', breakdown: '犭 + 守', clue: 'Animals being guarded and pursued — hunting.' }]
	},
	'方': {
		mnemonic: 'A plow seen from above, or two boats lashed side by side — the idea of direction, side, and comparing two things.',
		etymology: 'The original meaning is debated: one analysis sees a pictograph of a plow with its handle pointing in a direction; another interprets two boats moored side-by-side, implying comparison and direction. Either way, 方 settled into meanings of direction, side, manner, and method — and it marks a large family of directional and manner kanji.',
		tags: ['direction', 'method', 'side'],
		examples: [{ word: '方向', reading: 'ほうこう', meaning: 'direction' }, { word: '方法', reading: 'ほうほう', meaning: 'method / way' }, { word: '地方', reading: 'ちほう', meaning: 'region / locality' }],
		recipes: [{ kanji: '放', reading: 'ほう', meaning: 'release', breakdown: '方 + 攵', clue: 'Directing a strike — letting something loose.' }, { kanji: '旅', reading: 'りょ', meaning: 'travel', breakdown: '方 + 㫃 + 人', clue: 'People moving in a direction — travel.' }]
	},
	'父': {
		mnemonic: 'Two hands — one on top of the other — holding a stone tool or a rod of authority. The father\'s hands at work.',
		etymology: 'A pictograph of two hands gripping a stone tool or a rod: the upper strokes are hands and the lower diagonal strokes are the handle or implement. The original meaning was "to work with one\'s hands," and by extension "the male head of the household who labors." It came to mean father as the working authority figure.',
		tags: ['father', 'authority'],
		examples: [{ word: '父', reading: 'ちち', meaning: 'father' }, { word: '父親', reading: 'ちちおや', meaning: 'father (formal)' }, { word: '祖父', reading: 'そふ', meaning: 'grandfather' }],
		recipes: [{ kanji: '爸', reading: 'ちち', meaning: 'dad (informal)', breakdown: '父 + 巴', clue: 'Father with a softening sound component.' }, { kanji: '爺', reading: 'じじい', meaning: 'old man / grandfather', breakdown: '父 + 耶', clue: 'Father grown old.' }]
	},
	'止': {
		mnemonic: 'A footprint or foot with toes pointing upward — to stop is to plant your foot and stand still.',
		etymology: 'A pictograph of a footprint or foot: the vertical stroke is the leg, and the two or three horizontal strokes are the toes spread out. Originally meaning "foot" or "footstep," the meaning shifted to "stop" — one interpretation being the foot planted in place to halt movement. It also appears as a semantic element in 走 (run) and 歩 (walk).',
		tags: ['stop', 'foot', 'step'],
		examples: [{ word: '止まる', reading: 'とまる', meaning: 'to stop' }, { word: '禁止', reading: 'きんし', meaning: 'prohibition' }, { word: '中止', reading: 'ちゅうし', meaning: 'suspension / cancellation' }],
		recipes: [{ kanji: '歩', reading: 'ほ', meaning: 'walk / step', breakdown: '止 + 少', clue: 'A foot taking small steps — walking.' }, { kanji: '正', reading: 'せい', meaning: 'correct / proper', breakdown: '一 + 止', clue: 'A foot stopping at the right line — correctness.' }]
	},
	'夕': {
		mnemonic: 'The moon at evening — a crescent barely visible in the fading light, only half of the full 月.',
		etymology: 'A pictograph of the crescent moon seen in the evening sky — deliberately drawn as only half of 月 (moon) to represent the dim, partial visibility of the moon at dusk. It marks kanji about evening, dusk, night, and twilight — and also appears in names and compounds related to the late-day atmosphere.',
		tags: ['evening', 'dusk', 'night'],
		examples: [{ word: '夕方', reading: 'ゆうがた', meaning: 'evening' }, { word: '夕食', reading: 'ゆうしょく', meaning: 'dinner / evening meal' }, { word: '夕日', reading: 'ゆうひ', meaning: 'evening sun / sunset' }],
		recipes: [{ kanji: '外', reading: 'がい', meaning: 'outside', breakdown: '夕 + 卜', clue: 'Evening with divination — something outside the norm.' }, { kanji: '多', reading: 'た', meaning: 'many', breakdown: '夕 + 夕', clue: 'Two evenings piling up — more and more.' }]
	},
	'广': {
		mnemonic: 'A cliff with a roof extending outward — a lean-to shelter built against a rock face, open on the lower side.',
		etymology: 'A pictograph of a cliff overhang (厂) extended to include a roof and enclosed walls — the image of a building constructed against a hillside or cliff. It marks kanji about structures built into or alongside terrain: halls, houses, kitchens, and workshops attached to a wall.',
		tags: ['cliff', 'lean-to', 'building'],
		examples: [{ word: '広い', reading: 'ひろい', meaning: 'wide / spacious' }, { word: '店', reading: 'みせ', meaning: 'shop / store' }, { word: '府', reading: 'ふ', meaning: 'urban prefecture' }],
		recipes: [{ kanji: '広', reading: 'こう', meaning: 'wide', breakdown: '广 + 厶', clue: 'The open lean-to structure suggests spaciousness.' }, { kanji: '庭', reading: 'てい', meaning: 'garden / yard', breakdown: '广 + 廷', clue: 'The covered structure opens into an outdoor court.' }]
	},
	'厂': {
		mnemonic: 'A bare cliff overhang — no walls, just rock jutting out. Rawness, exposure, and stone.',
		etymology: 'A pictograph of a cliff face or rock overhang seen in profile: the horizontal stroke at the top is the overhanging rock and the descending stroke is the cliff face below. It marks kanji about cliffs, steep surfaces, exposed environments, and flat-roofed structures. The covered version with walls is 广.',
		tags: ['cliff', 'overhang', 'raw'],
		examples: [{ word: '原', reading: 'はら', meaning: 'plain / field' }, { word: '厚い', reading: 'あつい', meaning: 'thick / deep' }, { word: '压力', reading: 'あつりょく', meaning: 'pressure' }],
		recipes: [{ kanji: '厚', reading: 'こう', meaning: 'thick / kind', breakdown: '厂 + 𩺊', clue: 'A cliff piled deep — thickness.' }, { kanji: '原', reading: 'げん', meaning: 'origin / field', breakdown: '厂 + 泉', clue: 'A spring at the base of a cliff — the source.' }]
	},
	'尸': {
		mnemonic: 'A person lying flat or draped over a surface — either a body at rest, or someone hunched over a ledge.',
		etymology: 'Originally a pictograph of a lying-down human form, specifically a corpse laid out for burial. Over time the meaning expanded to cover any flat, horizontal human shape — hence its use in kanji about roofs, rooms, flat surfaces, and occupancy. The "flat over something" sense is more productive than the death meaning.',
		tags: ['flat roof', 'body', 'reclined'],
		examples: [{ word: '尻', reading: 'しり', meaning: 'buttocks / bottom' }, { word: '層', reading: 'そう', meaning: 'layer / stratum' }, { word: '居る', reading: 'いる', meaning: 'to be / exist (animate)' }],
		recipes: [{ kanji: '居', reading: 'きょ', meaning: 'reside / be present', breakdown: '尸 + 古', clue: 'A body resting in place — dwelling.' }, { kanji: '屋', reading: 'おく', meaning: 'house / shop', breakdown: '尸 + 至', clue: 'A flat roof overhead — a place where someone is.' }]
	},
	'冫': {
		mnemonic: 'Two ice crystals — tiny shards of frozen water. Cold, frozen, or chilled.',
		etymology: 'A pictograph of ice crystals forming on a surface — the two-stroke shape represents the angular crystalline structure of ice or frost. It marks kanji about cold, freezing, chilling, and winter phenomena. Different from 氵 (three water dots for liquid water), this is specifically solidified or extremely cold water.',
		tags: ['ice', 'cold'],
		examples: [{ word: '冷たい', reading: 'つめたい', meaning: 'cold (to the touch)' }, { word: '凍る', reading: 'こおる', meaning: 'to freeze' }, { word: '準備', reading: 'じゅんび', meaning: 'preparation' }],
		recipes: [{ kanji: '冷', reading: 'れい', meaning: 'cold / cool', breakdown: '冫 + 令', clue: 'Ice crystals plus a cooling command — cold.' }, { kanji: '凍', reading: 'とう', meaning: 'freeze', breakdown: '冫 + 東', clue: 'Ice on the east — winter freezing.' }]
	},
	'冖': {
		mnemonic: 'A cover or lid seen from the side — a flat cap placed over something to conceal or protect it.',
		etymology: 'A pictograph of a covering cloth or lid placed over an object — the horizontal stroke is the top and the two descending edges are the sides of the cover. It marks kanji where the semantic content involves covering, concealing, or capping something. Compare with 宀 (full peaked roof with walls) — 冖 is just the flat cover layer.',
		tags: ['cover', 'lid'],
		examples: [{ word: '冠', reading: 'かんむり', meaning: 'crown / top' }, { word: '冥', reading: 'めい', meaning: 'dark / netherworld' }, { word: '写す', reading: 'うつす', meaning: 'to copy / photograph' }],
		recipes: [{ kanji: '写', reading: 'しゃ', meaning: 'copy / photograph', breakdown: '冖 + 与', clue: 'A cover that reproduces what is below.' }, { kanji: '冠', reading: 'かん', meaning: 'crown', breakdown: '冖 + 元 + 寸', clue: 'A cover placed on the head — a crown.' }]
	},
	'几': {
		mnemonic: 'A low table or stool — two legs and a flat top. Something you rest things on or lean against.',
		etymology: 'A pictograph of a low table or armrest stool common in ancient East Asian settings: the horizontal stroke is the surface and the two diagonal strokes are the legs. It marks kanji involving tables, small furniture, and resting surfaces. Also appears in 凡 (ordinary) as a structural component.',
		tags: ['table', 'stool', 'furniture'],
		examples: [{ word: '机', reading: 'つくえ', meaning: 'desk' }, { word: '凡庸', reading: 'ぼんよう', meaning: 'mediocrity / ordinariness' }, { word: '処理', reading: 'しょり', meaning: 'processing / handling' }],
		recipes: [{ kanji: '机', reading: 'き', meaning: 'desk', breakdown: '木 + 几', clue: 'Wood made into a table — a desk.' }, { kanji: '凡', reading: 'ぼん', meaning: 'ordinary', breakdown: '几 + 丶', clue: 'A plain table with nothing special on it.' }]
	},
	'凵': {
		mnemonic: 'An open container or vessel viewed from the front — three sides and an open top waiting to receive something.',
		etymology: 'A pictograph of a container open at the top: two sides and a bottom, with the opening facing upward. It appears in kanji about containers, openings, mouths, and receiving. It is sometimes called the "open box" component and marks the receptive or hollow quality in characters.',
		tags: ['container', 'opening', 'hollow'],
		examples: [{ word: '出る', reading: 'でる', meaning: 'to go out / exit' }, { word: '函', reading: 'はこ', meaning: 'box / container' }, { word: '凶', reading: 'きょう', meaning: 'misfortune / bad luck' }],
		recipes: [{ kanji: '出', reading: 'しゅつ', meaning: 'exit / come out', breakdown: '山 + 凵', clue: 'Something emerging upward from a container.' }, { kanji: '凶', reading: 'きょう', meaning: 'misfortune', breakdown: '凵 + 乂', clue: 'A cross mark inside an open vessel — something bad inside.' }]
	},
	'八': {
		mnemonic: 'Two strokes spreading apart — the image of dividing, separating, or spreading in two directions.',
		etymology: 'Originally a pictograph of two things being divided or spread apart — the spreading strokes represent separation or divergence. The number eight was assigned to this phonetically in ancient Chinese, but the shape retained its underlying "divide / spread" meaning as a structural component in many kanji.',
		tags: ['eight', 'divide', 'spread'],
		examples: [{ word: '八', reading: 'はち', meaning: 'eight' }, { word: '八月', reading: 'はちがつ', meaning: 'August' }, { word: '八方', reading: 'はっぽう', meaning: 'all directions' }],
		recipes: [{ kanji: '分', reading: 'ぶん', meaning: 'divide / part', breakdown: '八 + 刀', clue: 'Two strokes spreading plus a knife — division.' }, { kanji: '公', reading: 'こう', meaning: 'public', breakdown: '八 + 厶', clue: 'Spreading away from the private — going public.' }]
	},
	'儿': {
		mnemonic: 'Two legs walking — the bottom part of a standing person stripped to the bare minimum.',
		etymology: 'A reduction of 人 (person) to just the two leg strokes, used specifically when the human element appears at the bottom of a compound character. It is not a separate concept from 人 but a positional variant — the "legs" of a character rather than the full body.',
		tags: ['legs', 'person-bottom'],
		examples: [{ word: '見る', reading: 'みる', meaning: 'to see' }, { word: '元気', reading: 'げんき', meaning: 'healthy / energetic' }, { word: '先生', reading: 'せんせい', meaning: 'teacher' }],
		recipes: [{ kanji: '見', reading: 'けん', meaning: 'see', breakdown: '目 + 儿', clue: 'An eye on legs — actively going out to see.' }, { kanji: '元', reading: 'げん', meaning: 'origin / root', breakdown: '一 + 儿', clue: 'Legs with a foundation above — the root of something.' }]
	},
	'入': {
		mnemonic: 'Two strokes converging inward — like a funnel drawing something inside. Entering, going in.',
		etymology: 'A pictograph of two paths or lines converging into a single point — the visual of something going inward, entering a space. It is the directional opposite of 八 (spreading apart) and 人 (person standing). It marks kanji about entering, putting in, and going inside.',
		tags: ['enter', 'go in'],
		examples: [{ word: '入る', reading: 'はいる', meaning: 'to enter' }, { word: '入口', reading: 'いりぐち', meaning: 'entrance' }, { word: '輸入', reading: 'ゆにゅう', meaning: 'import' }],
		recipes: [{ kanji: '内', reading: 'ない', meaning: 'inside', breakdown: '冂 + 入', clue: 'Something entering an enclosure — the inside.' }, { kanji: '込む', reading: 'こむ', meaning: 'to be crowded / put into', breakdown: '辶 + 入', clue: 'Moving inside — crowding in.' }]
	},
	'匸': {
		mnemonic: 'A box open on the right side — something hiding or being concealed within a partial enclosure.',
		etymology: 'A pictograph of a three-sided enclosure open on the right — the image of hiding or storing something partially out of sight. It marks kanji where concealment, hiding, or enclosure within a partial frame is part of the meaning. Rare as a standalone but structurally important.',
		tags: ['hiding', 'enclosure', 'conceal'],
		examples: [{ word: '匹', reading: 'ひき', meaning: 'counter for small animals' }, { word: '医', reading: 'い', meaning: 'medicine / doctor' }, { word: '匿名', reading: 'とくめい', meaning: 'anonymity' }],
		recipes: [{ kanji: '医', reading: 'い', meaning: 'medicine', breakdown: '匸 + 矢', clue: 'An arrow hidden away — a doctor\'s needle.' }, { kanji: '匿', reading: 'とく', meaning: 'conceal / hide', breakdown: '匸 + 若', clue: 'Something young tucked away — concealed.' }]
	},
	'囗': {
		mnemonic: 'A four-sided enclosure — a walled space, a territory, a boundary. Bigger and more deliberate than 口 (mouth).',
		etymology: 'A pictograph of a walled enclosure or bounded territory: the four strokes form a complete closed rectangle. It marks kanji about countries, enclosed areas, circles, and boundaries. The visual difference from 口 (mouth) is its larger size and the semantic emphasis on enclosure rather than opening.',
		tags: ['enclosure', 'territory', 'boundary'],
		examples: [{ word: '国', reading: 'くに', meaning: 'country / nation' }, { word: '囲む', reading: 'かこむ', meaning: 'to surround' }, { word: '固い', reading: 'かたい', meaning: 'hard / firm' }],
		recipes: [{ kanji: '国', reading: 'こく', meaning: 'country', breakdown: '囗 + 玉', clue: 'A jewel inside a walled territory — a nation.' }, { kanji: '囲', reading: 'い', meaning: 'surround', breakdown: '囗 + 韦', clue: 'The enclosure radical makes the surrounding explicit.' }]
	},
	'讠': {
		mnemonic: 'The simplified speech radical used in modern Chinese-influenced forms — two strokes that signal words, speech, and communication.',
		etymology: 'The simplified (shinjitai-adjacent) two-stroke form of 言 (speech/words) found in some modern-print kanji and Chinese simplified script. In Japanese it appears in a handful of characters that were simplified. It carries the same semantic content as 訁 — language, speaking, recording.',
		variants: ['言', '訁'],
		tags: ['speech simplified', 'left-side'],
		examples: [{ word: '訂正', reading: 'ていせい', meaning: 'correction / revision' }, { word: '記録', reading: 'きろく', meaning: 'record / documentation' }, { word: '認める', reading: 'みとめる', meaning: 'to recognize / approve' }],
		recipes: [{ kanji: '订', reading: 'てい', meaning: 'revise / staple', breakdown: '讠 + 丁', clue: 'Speech corrected with a nail stroke — revision.' }, { kanji: '认', reading: 'にん', meaning: 'recognize', breakdown: '讠 + 忍', clue: 'Speech confirming what the heart endures — recognition.' }]
	}
};

function withRadicalDetails(items: CardItem[]): CardItem[] {
	return items.map((item) => (radicalDetails[item.character] ? { ...item, ...radicalDetails[item.character] } : item));
}

// ─────────────────────────────────────────────
// N5 KANJI ENRICHMENT — etymology, components, examples, strokeCount
// ─────────────────────────────────────────────

const kanjiN5Enrichment: Record<string, Pick<CardItem, 'etymology' | 'components' | 'examples' | 'strokeCount'>> = {
	'一': {
		strokeCount: 1,
		etymology: 'Originally a single horizontal tally stroke in ancient oracle bone script, the simplest possible picture of the number one. The shape has not changed in over three thousand years.',
		components: ['一 (one horizontal line)'],
		examples: [
			{ word: '一つ', reading: 'ひとつ', meaning: 'one (thing)' },
			{ word: '一番', reading: 'いちばん', meaning: 'number one / most' },
			{ word: '一日', reading: 'いちにち', meaning: 'one day' },
			{ word: '一人', reading: 'ひとり', meaning: 'one person / alone' }
		]
	},
	'二': {
		strokeCount: 2,
		etymology: 'Two horizontal tally strokes stacked, directly derived from the earliest Chinese counting numerals. What you see is exactly what ancient scribes carved into oracle bones.',
		components: ['二 (two horizontal lines)'],
		examples: [
			{ word: '二つ', reading: 'ふたつ', meaning: 'two (things)' },
			{ word: '二人', reading: 'ふたり', meaning: 'two people' },
			{ word: '二月', reading: 'にがつ', meaning: 'February' },
			{ word: '二十', reading: 'にじゅう', meaning: 'twenty' }
		]
	},
	'三': {
		strokeCount: 3,
		etymology: 'Three horizontal tally strokes, the direct pictographic ancestor of the number. Ancient Chinese used finger tallies and these strokes represent three upright fingers laid flat into writing. The same counting logic — one stroke per unit — appears in many world writing systems.',
		components: ['三 (three horizontal lines)'],
		examples: [
			{ word: '三つ', reading: 'みっつ', meaning: 'three (things)' },
			{ word: '三角', reading: 'さんかく', meaning: 'triangle' },
			{ word: '三月', reading: 'さんがつ', meaning: 'March' },
			{ word: '三人', reading: 'さんにん', meaning: 'three people' }
		]
	},
	'四': {
		strokeCount: 5,
		etymology: 'Originally depicted a nose breathing out (four breaths = four). The current form evolved through seal script into a box with two internal lines, gradually drifting away from the pictograph. The native Japanese word よん (yon) is preferred in many contexts because し (shi) sounds like 死 (death).',
		components: ['囗 (enclosure)', '儿 (legs / inner division)'],
		examples: [
			{ word: '四つ', reading: 'よっつ', meaning: 'four (things)' },
			{ word: '四月', reading: 'しがつ', meaning: 'April' },
			{ word: '四角', reading: 'しかく', meaning: 'square / rectangle' },
			{ word: '四人', reading: 'よにん', meaning: 'four people' }
		]
	},
	'五': {
		strokeCount: 4,
		etymology: 'The ancient form showed an X shape sandwiched between two horizontal lines, symbolizing the intersection between heaven and earth — the midpoint in the series one through ten. Five was philosophically significant in Chinese cosmology as the center of the five directions.',
		components: ['一 (upper line)', '乂 (cross)', '一 (lower line)'],
		examples: [
			{ word: '五つ', reading: 'いつつ', meaning: 'five (things)' },
			{ word: '五月', reading: 'ごがつ', meaning: 'May' },
			{ word: '五十', reading: 'ごじゅう', meaning: 'fifty' },
			{ word: '五感', reading: 'ごかん', meaning: 'five senses' }
		]
	},
	'六': {
		strokeCount: 4,
		etymology: 'Originally depicted a hut or tent shape, and was borrowed phonetically for the number six in early Chinese. The meaning "six" is purely phonetic — the shelter shape was hijacked because it sounded like the word for six in archaic Chinese.',
		components: ['亠 (lid radical)', '八 (eight / spreading)'],
		examples: [
			{ word: '六つ', reading: 'むっつ', meaning: 'six (things)' },
			{ word: '六月', reading: 'ろくがつ', meaning: 'June' },
			{ word: '六十', reading: 'ろくじゅう', meaning: 'sixty' },
			{ word: '六本木', reading: 'ろっぽんぎ', meaning: 'Roppongi (place name)' }
		]
	},
	'七': {
		strokeCount: 2,
		etymology: 'Originally a pictograph of something cut — a horizontal line crossed by a downward stroke suggesting division or slicing. The word for seven was borrowed onto this shape because the sounds matched in archaic Chinese. The character later simplified to its current angular form.',
		components: ['七 (undivided — single semantic unit)'],
		examples: [
			{ word: '七つ', reading: 'ななつ', meaning: 'seven (things)' },
			{ word: '七月', reading: 'しちがつ', meaning: 'July' },
			{ word: '七夕', reading: 'たなばた', meaning: 'Star Festival (July 7)' },
			{ word: '七十', reading: 'ななじゅう', meaning: 'seventy' }
		]
	},
	'八': {
		strokeCount: 2,
		etymology: 'Two diverging strokes pointing away from each other — originally meaning "to divide" or "separate." The number eight was phonetically assigned to this shape. The spreading form later became the radical 八 suggesting division or spreading apart.',
		components: ['八 (two diverging strokes)'],
		examples: [
			{ word: '八つ', reading: 'やっつ', meaning: 'eight (things)' },
			{ word: '八月', reading: 'はちがつ', meaning: 'August' },
			{ word: '八百屋', reading: 'やおや', meaning: 'greengrocer' },
			{ word: '八十', reading: 'はちじゅう', meaning: 'eighty' }
		]
	},
	'九': {
		strokeCount: 2,
		etymology: 'Originally a pictograph of a bent arm at the elbow — the arm stretching as far as it can go, suggesting the idea of "reaching the limit" or "fullness." Since nine is the largest single digit, the near-limit imagery fit naturally. The hook at the bottom preserves the bent-arm shape.',
		components: ['九 (bent stroke — single semantic unit)'],
		examples: [
			{ word: '九つ', reading: 'ここのつ', meaning: 'nine (things)' },
			{ word: '九月', reading: 'くがつ', meaning: 'September' },
			{ word: '九十', reading: 'きゅうじゅう', meaning: 'ninety' },
			{ word: '九州', reading: 'きゅうしゅう', meaning: 'Kyushu (island)' }
		]
	},
	'十': {
		strokeCount: 2,
		etymology: 'A vertical stroke crossed by a horizontal one — a cross or plus sign marking completeness. In ancient China, ten was considered a complete cycle, and the cross shape suggests all four directions covered. The shape is one of the most ancient and stable number symbols.',
		components: ['十 (cross — vertical meets horizontal)'],
		examples: [
			{ word: '十', reading: 'じゅう', meaning: 'ten' },
			{ word: '十月', reading: 'じゅうがつ', meaning: 'October' },
			{ word: '十分', reading: 'じゅうぶん', meaning: 'sufficient / ten minutes' },
			{ word: '二十歳', reading: 'はたち', meaning: 'twenty years old' }
		]
	},
	'百': {
		strokeCount: 6,
		etymology: 'Combines 一 (one) over 白 (white). The white element 白 was originally a pictograph of an acorn or thumb, and was phonetically borrowed here. Together with 一, it suggests "one step beyond," indicating the next counting unit after ten.',
		components: ['一 (one)', '白 (white / phonetic element)'],
		examples: [
			{ word: '百円', reading: 'ひゃくえん', meaning: '100 yen' },
			{ word: '百貨店', reading: 'ひゃっかてん', meaning: 'department store' },
			{ word: '三百', reading: 'さんびゃく', meaning: 'three hundred' },
			{ word: '百科事典', reading: 'ひゃっかじてん', meaning: 'encyclopedia' }
		]
	},
	'千': {
		strokeCount: 3,
		etymology: 'Combines 十 (ten) with a slash or person stroke 亻 at the top. The person element acts as an amplifier — "a person\'s count of ten" multiplied up to one thousand. Some analyses read the top stroke as a number multiplier marker used in early Chinese counting systems.',
		components: ['亻 (person / amplifier stroke)', '十 (ten)'],
		examples: [
			{ word: '千円', reading: 'せんえん', meaning: '1,000 yen' },
			{ word: '三千', reading: 'さんぜん', meaning: 'three thousand' },
			{ word: '千葉', reading: 'ちば', meaning: 'Chiba (place name)' },
			{ word: '一千万', reading: 'いっせんまん', meaning: 'ten million' }
		]
	},
	'万': {
		strokeCount: 3,
		etymology: 'Originally a pictograph of a scorpion in oracle bone script — the creature was used phonetically because the word for scorpion sounded like the word for ten thousand in archaic Chinese. The current simplified form bears no resemblance to the scorpion, but the phonetic origin is well-documented.',
		components: ['万 (simplified from scorpion pictograph — single unit)'],
		examples: [
			{ word: '一万円', reading: 'いちまんえん', meaning: '10,000 yen' },
			{ word: '万能', reading: 'ばんのう', meaning: 'all-purpose / almighty' },
			{ word: '万歳', reading: 'ばんざい', meaning: 'hooray / banzai' },
			{ word: '万国', reading: 'ばんこく', meaning: 'all nations / world' }
		]
	},
	'円': {
		strokeCount: 4,
		etymology: 'The traditional form 圓 depicted a round enclosed space with a person inside, conveying circularity. The modern simplified 円 retains the enclosure 門-like frame with a single inner mark. The "yen" currency took its name from this character\'s meaning of "round/circle," as early coins were round.',
		components: ['冂 (open enclosure)', '一 (inner stroke)'],
		examples: [
			{ word: '百円', reading: 'ひゃくえん', meaning: '100 yen' },
			{ word: '円形', reading: 'えんけい', meaning: 'circular shape' },
			{ word: '半円', reading: 'はんえん', meaning: 'semicircle' },
			{ word: '円周', reading: 'えんしゅう', meaning: 'circumference' }
		]
	},
	'年': {
		strokeCount: 6,
		etymology: 'Originally depicted a person 人 carrying a bundle of harvested grain 禾, symbolizing the annual harvest cycle. The harvest was the defining event of the year in agricultural society. Over time the figure and grain merged into the current abstract form, but the agricultural heartbeat remains.',
		components: ['禾 (grain stalk — compressed)', '千 (person carrying)'],
		examples: [
			{ word: '今年', reading: 'ことし', meaning: 'this year' },
			{ word: '来年', reading: 'らいねん', meaning: 'next year' },
			{ word: '毎年', reading: 'まいとし', meaning: 'every year' },
			{ word: '年齢', reading: 'ねんれい', meaning: 'age' }
		]
	},
	'月': {
		strokeCount: 4,
		etymology: 'A direct pictograph of the crescent moon — the curved outer arc and inner lines originally represented the crescent shape with its lit and shadowed halves. On the left side of kanji, this same shape often means "flesh/body" (肉), creating an interesting dual identity.',
		components: ['月 (moon crescent pictograph)'],
		examples: [
			{ word: '今月', reading: 'こんげつ', meaning: 'this month' },
			{ word: '来月', reading: 'らいげつ', meaning: 'next month' },
			{ word: '三ヶ月', reading: 'さんかげつ', meaning: 'three months' },
			{ word: '月曜日', reading: 'げつようび', meaning: 'Monday' }
		]
	},
	'日': {
		strokeCount: 4,
		etymology: 'A pictograph of the sun — originally a circle with a central dot indicating it is full of light, not empty like the moon crescent. The square shape evolved because ancient scribes could not easily draw perfect circles with a brush or bone stylus. The internal horizontal stroke is the remnant of the original center dot.',
		components: ['日 (sun pictograph — box with center line)'],
		examples: [
			{ word: '今日', reading: 'きょう', meaning: 'today' },
			{ word: '日本語', reading: 'にほんご', meaning: 'Japanese language' },
			{ word: '毎日', reading: 'まいにち', meaning: 'every day' },
			{ word: '日曜日', reading: 'にちようび', meaning: 'Sunday' }
		]
	},
	'時': {
		strokeCount: 10,
		etymology: 'Combines 日 (sun) and 寺 (temple). The temple element 寺 originally depicted a hand holding a foot, suggesting measured steps — it became associated with government administration and precise record-keeping. Together with the sun, it evokes the sun\'s measured march across the sky: time.',
		components: ['日 (sun)', '寺 (temple / measured steps — phonetic)'],
		examples: [
			{ word: '時間', reading: 'じかん', meaning: 'time / duration' },
			{ word: '何時', reading: 'なんじ', meaning: 'what time' },
			{ word: '時々', reading: 'ときどき', meaning: 'sometimes' },
			{ word: '時計', reading: 'とけい', meaning: 'clock / watch' }
		]
	},
	'分': {
		strokeCount: 4,
		etymology: 'Combines 刀 (knife) and 八 (divide/split). The knife cutting something apart perfectly captures the meaning: dividing, separating, understanding (分かる wakaru), and the minute as a division of an hour. The core concept across all meanings is "to divide into parts."',
		components: ['八 (divide / split apart)', '刀 (knife)'],
		examples: [
			{ word: '三十分', reading: 'さんじっぷん', meaning: 'thirty minutes' },
			{ word: '自分', reading: 'じぶん', meaning: 'oneself' },
			{ word: '十分', reading: 'じゅうぶん', meaning: 'enough / sufficient' },
			{ word: '気分', reading: 'きぶん', meaning: 'feeling / mood' }
		]
	},
	'半': {
		strokeCount: 5,
		etymology: 'Depicts a cow or ox 牛 being split down the middle by a knife, leaving two halves. The vertical stroke through the center is the dividing line, and the shape below suggests the split animal. This visceral image of bisection made it the natural choice for "half."',
		components: ['丷 (eight / split marker)', '牛 (cow — lower half)'],
		examples: [
			{ word: '半分', reading: 'はんぶん', meaning: 'half' },
			{ word: '一時半', reading: 'いちじはん', meaning: 'one-thirty' },
			{ word: '半年', reading: 'はんとし', meaning: 'half a year' },
			{ word: '半分', reading: 'はんぶん', meaning: 'half portion' }
		]
	},
	'今': {
		strokeCount: 4,
		etymology: 'Originally showed a person bending down with something held in the mouth or hands — the "current moment" captured as a living action happening right now. The roof-like top 亼 gathers meaning downward into the present point 今, giving the sense of convergence at this instant.',
		components: ['亼 (converging roof)', '一 (base — the present moment)'],
		examples: [
			{ word: '今日', reading: 'きょう', meaning: 'today' },
			{ word: '今年', reading: 'ことし', meaning: 'this year' },
			{ word: '今すぐ', reading: 'いますぐ', meaning: 'right now' },
			{ word: '今月', reading: 'こんげつ', meaning: 'this month' }
		]
	},
	'毎': {
		strokeCount: 6,
		etymology: 'Built on 母 (mother) with an extra stroke — the mother who nurtures each and every day without fail. The maternal regularity behind daily care was abstracted into the meaning "every / each time." The top component 𠂉 is a hairpin ornament worn by a woman, placing this firmly in the domain of household regularity.',
		components: ['𠂉 (hairpin ornament)', '母 (mother — lower form)'],
		examples: [
			{ word: '毎日', reading: 'まいにち', meaning: 'every day' },
			{ word: '毎週', reading: 'まいしゅう', meaning: 'every week' },
			{ word: '毎年', reading: 'まいとし', meaning: 'every year' },
			{ word: '毎朝', reading: 'まいあさ', meaning: 'every morning' }
		]
	},
	'何': {
		strokeCount: 7,
		etymology: 'Originally showed a person 亻 carrying a load on a shoulder pole, which was "whatever" burden they might be carrying. The right element 可 (possible / approval) was added phonetically. The character evolved into the general interrogative "what" — the carrier can haul any unspecified thing.',
		components: ['亻 (person)', '可 (possible — phonetic)'],
		examples: [
			{ word: '何時', reading: 'なんじ', meaning: 'what time' },
			{ word: '何人', reading: 'なんにん', meaning: 'how many people' },
			{ word: '何月', reading: 'なんがつ', meaning: 'what month' },
			{ word: '何か', reading: 'なにか', meaning: 'something' }
		]
	},
	'人': {
		strokeCount: 2,
		etymology: 'One of the most ancient pictographs in Chinese writing — a profile of a person standing upright, with two legs visible. The stroke to the left is the body, and the stroke to the right is the supporting leg. When placed on the left side of a kanji, it compresses into 亻.',
		components: ['人 (standing person profile — two strokes)'],
		examples: [
			{ word: '日本人', reading: 'にほんじん', meaning: 'Japanese person' },
			{ word: '一人', reading: 'ひとり', meaning: 'one person / alone' },
			{ word: '二人', reading: 'ふたり', meaning: 'two people' },
			{ word: '人気', reading: 'にんき', meaning: 'popularity' }
		]
	},
	'男': {
		strokeCount: 7,
		etymology: 'A semantic compound: 田 (rice field) plus 力 (strength / power). Together they paint a picture of the person who exerts strength in the fields — traditionally the male role in agrarian society. The logic is clear and unambiguous in the original cultural context.',
		components: ['田 (rice field)', '力 (strength / power)'],
		examples: [
			{ word: '男の人', reading: 'おとこのひと', meaning: 'man' },
			{ word: '男子', reading: 'だんし', meaning: 'boy / male' },
			{ word: '長男', reading: 'ちょうなん', meaning: 'eldest son' },
			{ word: '男性', reading: 'だんせい', meaning: 'male gender' }
		]
	},
	'女': {
		strokeCount: 3,
		etymology: 'Originally a pictograph of a person kneeling with arms crossed — a posture of courtesy or deference in ancient China. The three strokes capture the kneeling silhouette. Over centuries the form straightened and abstracted, but the original kneeling posture is visible in the diagonal crossing stroke.',
		components: ['女 (kneeling figure — three strokes)'],
		examples: [
			{ word: '女の人', reading: 'おんなのひと', meaning: 'woman' },
			{ word: '女子', reading: 'じょし', meaning: 'girl / female' },
			{ word: '女性', reading: 'じょせい', meaning: 'female gender' },
			{ word: '彼女', reading: 'かのじょ', meaning: 'she / girlfriend' }
		]
	},
	'子': {
		strokeCount: 3,
		etymology: 'A pictograph of an infant with a large head, arms outstretched, and legs still swaddled — unable to walk yet. The large top stroke is the head, the horizontal cross is the arms, and the curved bottom is the swaddled lower body. One of the most vivid pictographs in the kanji system.',
		components: ['子 (infant with arms spread — three strokes)'],
		examples: [
			{ word: '子供', reading: 'こども', meaning: 'child / children' },
			{ word: '男の子', reading: 'おとこのこ', meaning: 'boy' },
			{ word: '女の子', reading: 'おんなのこ', meaning: 'girl' },
			{ word: '子猫', reading: 'こねこ', meaning: 'kitten' }
		]
	},
	'父': {
		strokeCount: 4,
		etymology: 'Originally depicted a hand gripping a stone axe or rod — the implement of authority, labor, and discipline. The raised hand holding the tool symbolized the paternal role as authority figure and provider. The crossed strokes at the top represent the hand and implement fused together.',
		components: ['爻 (crossed authority strokes)', '父 (hand holding implement)'],
		examples: [
			{ word: 'お父さん', reading: 'おとうさん', meaning: 'father (polite)' },
			{ word: '父親', reading: 'ちちおや', meaning: 'father' },
			{ word: '父母', reading: 'ふぼ', meaning: 'parents' },
			{ word: '祖父', reading: 'そふ', meaning: 'grandfather' }
		]
	},
	'母': {
		strokeCount: 5,
		etymology: 'A transformation of 女 (woman) with two dots added inside the chest area, representing nursing breasts — the visual marker of a nursing mother. This is one of the most direct and anatomically specific pictographic additions in Chinese character history. The dots are the key diagnostic feature.',
		components: ['女 (woman)', '丶丶 (two dots — nursing)'],
		examples: [
			{ word: 'お母さん', reading: 'おかあさん', meaning: 'mother (polite)' },
			{ word: '母親', reading: 'ははおや', meaning: 'mother' },
			{ word: '父母', reading: 'ふぼ', meaning: 'parents' },
			{ word: '祖母', reading: 'そぼ', meaning: 'grandmother' }
		]
	},
	'友': {
		strokeCount: 4,
		etymology: 'Originally two right hands 又 placed together — clasping or cooperating. The oracle bone form shows two hands extending toward each other in a gesture of mutual aid or shared direction. The friendship implied is one of shared purpose and mutual help, not just affection.',
		components: ['又 (right hand)', '又 (right hand — two hands together)'],
		examples: [
			{ word: '友達', reading: 'ともだち', meaning: 'friend(s)' },
			{ word: '友人', reading: 'ゆうじん', meaning: 'friend (formal)' },
			{ word: '親友', reading: 'しんゆう', meaning: 'close friend' },
			{ word: '友好', reading: 'ゆうこう', meaning: 'friendship / amity' }
		]
	},
	'私': {
		strokeCount: 7,
		etymology: 'Combines 禾 (grain / rice plant) with 厶 (private enclosure). The image is a person privately fencing off their own section of the grain field — claiming personal ownership. The "private" meaning came first; the first-person pronoun use followed naturally since "mine" implies "I."',
		components: ['禾 (grain stalk)', '厶 (private enclosure)'],
		examples: [
			{ word: '私', reading: 'わたし', meaning: 'I / me' },
			{ word: '私立', reading: 'しりつ', meaning: 'private (institution)' },
			{ word: '私服', reading: 'しふく', meaning: 'plain clothes / civilian clothes' },
			{ word: '私用', reading: 'しよう', meaning: 'private use' }
		]
	},
	'大': {
		strokeCount: 3,
		etymology: 'A person 人 with arms stretched wide to the sides — the gesture of indicating great size ("this big!"). One of the most visceral and intuitive pictographs: a standing person demonstrating largeness with outstretched arms. The horizontal stroke is the arms; the lower two strokes are the legs.',
		components: ['大 (person with arms spread wide)'],
		examples: [
			{ word: '大きい', reading: 'おおきい', meaning: 'big / large' },
			{ word: '大学', reading: 'だいがく', meaning: 'university' },
			{ word: '大人', reading: 'おとな', meaning: 'adult' },
			{ word: '大切', reading: 'たいせつ', meaning: 'important / precious' }
		]
	},
	'小': {
		strokeCount: 3,
		etymology: 'Three strokes: a central vertical line with a dot on each side being pushed apart, or alternatively, a larger thing 大 with its arms drawn in. The visual contrast with 大 (big, arms out) is intentional — the compressed, inward form suggests smallness. Some analyses see it as grains of sand scattering.',
		components: ['小 (vertical stroke with flanking dots)'],
		examples: [
			{ word: '小さい', reading: 'ちいさい', meaning: 'small / little' },
			{ word: '小学校', reading: 'しょうがっこう', meaning: 'elementary school' },
			{ word: '小説', reading: 'しょうせつ', meaning: 'novel' },
			{ word: '小包', reading: 'こづつみ', meaning: 'package / parcel' }
		]
	},
	'中': {
		strokeCount: 4,
		etymology: 'Originally depicted a vertical pole or flagstaff passing through the center of a target or drum — the center point that everything else is measured from. The box represents the target or bounded space; the vertical line pierces exactly through the middle. A brilliantly simple geometric idea.',
		components: ['口 (box / bounded space)', '｜ (vertical center line)'],
		examples: [
			{ word: '中学校', reading: 'ちゅうがっこう', meaning: 'middle school' },
			{ word: '中国', reading: 'ちゅうごく', meaning: 'China' },
			{ word: '途中', reading: 'とちゅう', meaning: 'on the way / midway' },
			{ word: '中心', reading: 'ちゅうしん', meaning: 'center / core' }
		]
	},
	'上': {
		strokeCount: 3,
		etymology: 'A pointing stroke above a baseline — the visual indication of "above." Ancient forms show a dot or tick above a horizontal line, directly pointing upward. The character is almost entirely diagrammatic, one of the clearest spatial indicators in the writing system.',
		components: ['一 (baseline)', '上 (upward indicator above baseline)'],
		examples: [
			{ word: '上手', reading: 'じょうず', meaning: 'skilled / good at' },
			{ word: '上着', reading: 'うわぎ', meaning: 'jacket / outerwear' },
			{ word: '以上', reading: 'いじょう', meaning: 'more than / above' },
			{ word: '上がる', reading: 'あがる', meaning: 'to rise / go up' }
		]
	},
	'下': {
		strokeCount: 3,
		etymology: 'A pointing stroke below a baseline — the mirror image of 上 (up), placing the indicator underneath the reference line. The visual logic is completely parallel: 上 points up, 下 points down. Both characters are among the oldest and most stable in the written language.',
		components: ['一 (baseline)', '下 (downward indicator below baseline)'],
		examples: [
			{ word: '下手', reading: 'へた', meaning: 'unskilled / poor at' },
			{ word: '地下', reading: 'ちか', meaning: 'underground' },
			{ word: '以下', reading: 'いか', meaning: 'less than / below' },
			{ word: '下がる', reading: 'さがる', meaning: 'to lower / go down' }
		]
	},
	'左': {
		strokeCount: 5,
		etymology: 'Combines 左 (hand — left stroke) with 工 (work / craft). The left hand was associated with assisting the craftsman, holding the work while the right hand wielded the tool. The left-hand helper role in craft work became the etymological anchor of this character.',
		components: ['𠂇 (left hand)', '工 (work / craft)'],
		examples: [
			{ word: '左側', reading: 'ひだりがわ', meaning: 'left side' },
			{ word: '左折', reading: 'させつ', meaning: 'turn left' },
			{ word: '左右', reading: 'さゆう', meaning: 'left and right' },
			{ word: '左手', reading: 'ひだりて', meaning: 'left hand' }
		]
	},
	'右': {
		strokeCount: 5,
		etymology: 'Combines a right-hand stroke with 口 (mouth). The right hand was the one used for eating and speaking — the dominant, active hand. The association of the dominant hand with the mouth (for eating and speaking) gave 右 its identifying combination.',
		components: ['𠂇 (right hand stroke)', '口 (mouth)'],
		examples: [
			{ word: '右側', reading: 'みぎがわ', meaning: 'right side' },
			{ word: '右折', reading: 'うせつ', meaning: 'turn right' },
			{ word: '左右', reading: 'さゆう', meaning: 'left and right' },
			{ word: '右手', reading: 'みぎて', meaning: 'right hand' }
		]
	},
	'前': {
		strokeCount: 9,
		etymology: 'Originally combined a boat moving forward with a knife — the knife cutting through water at the prow. Later simplified, but the idea of forward movement, cutting ahead, was preserved. 前 consistently means "in front" in both spatial and temporal senses.',
		components: ['𦣻 (halted foot)', '月 (moon / boat shape)', '刀 (knife — cutting forward)'],
		examples: [
			{ word: '前に', reading: 'まえに', meaning: 'in front / before' },
			{ word: '名前', reading: 'なまえ', meaning: 'name' },
			{ word: '午前', reading: 'ごぜん', meaning: 'AM / morning' },
			{ word: '以前', reading: 'いぜん', meaning: 'before / previously' }
		]
	},
	'後': {
		strokeCount: 9,
		etymology: 'Combines the movement radical 彳 (footsteps), 幺 (thread / small), and 夂 (foot going backward). Together these elements paint a picture of slow, hindered, backward movement — someone dragging their feet, falling behind. The temporal meaning "after" follows naturally from "behind in movement."',
		components: ['彳 (walking steps)', '幺 (thread / tied)', '夂 (backward foot)'],
		examples: [
			{ word: '後で', reading: 'あとで', meaning: 'later / afterward' },
			{ word: '午後', reading: 'ごご', meaning: 'PM / afternoon' },
			{ word: '最後', reading: 'さいご', meaning: 'last / final' },
			{ word: '後ろ', reading: 'うしろ', meaning: 'behind / back' }
		]
	},
	'外': {
		strokeCount: 5,
		etymology: 'Combines 夕 (evening / crescent moon) and 卜 (divination crack). Ancient diviners read oracle bones at dusk — outside the house, under the night sky. The practice of divination outdoors in the evening gave 外 its "outside" meaning. What begins as ritual context becomes pure spatial reference.',
		components: ['夕 (evening / crescent)', '卜 (divination crack)'],
		examples: [
			{ word: '外国', reading: 'がいこく', meaning: 'foreign country' },
			{ word: '外出', reading: 'がいしゅつ', meaning: 'going out' },
			{ word: '案外', reading: 'あんがい', meaning: 'unexpectedly' },
			{ word: '外食', reading: 'がいしょく', meaning: 'eating out' }
		]
	},
	'火': {
		strokeCount: 4,
		etymology: 'A direct pictograph of a flame — the central trunk of fire with two tongues of flame spreading outward at the sides. The bottom strokes represent the fuel or base; the rising top stroke is the flame itself. At the bottom of kanji it compresses into four dots 灬, representing burning coals.',
		components: ['火 (flame pictograph — four strokes)'],
		examples: [
			{ word: '火曜日', reading: 'かようび', meaning: 'Tuesday' },
			{ word: '花火', reading: 'はなび', meaning: 'fireworks' },
			{ word: '火事', reading: 'かじ', meaning: 'fire (disaster)' },
			{ word: '火山', reading: 'かざん', meaning: 'volcano' }
		]
	},
	'水': {
		strokeCount: 4,
		etymology: 'A pictograph of a river flowing — the central vertical stroke is the main current, and the two side strokes are tributary branches. When placed on the left side of a kanji, it compresses into three drops 氵. This character is the source for the entire water/liquid radical family.',
		components: ['水 (river with branches — pictograph)'],
		examples: [
			{ word: '水曜日', reading: 'すいようび', meaning: 'Wednesday' },
			{ word: '水道', reading: 'すいどう', meaning: 'waterworks / tap water' },
			{ word: '飲み水', reading: 'のみず', meaning: 'drinking water' },
			{ word: '水泳', reading: 'すいえい', meaning: 'swimming' }
		]
	},
	'木': {
		strokeCount: 4,
		etymology: 'A pictograph of a tree — vertical trunk, horizontal branches spreading left and right, and roots descending below. The shape is still unmistakably tree-like. When the roots are emphasized with an extra stroke at the bottom, it becomes 本 (root / origin); when the top is cut, it becomes 末 (tip / end).',
		components: ['木 (tree — trunk, branches, roots)'],
		examples: [
			{ word: '木曜日', reading: 'もくようび', meaning: 'Thursday' },
			{ word: '木材', reading: 'もくざい', meaning: 'lumber / timber' },
			{ word: '大木', reading: 'たいぼく', meaning: 'large tree' },
			{ word: '木の葉', reading: 'このは', meaning: 'leaf' }
		]
	},
	'金': {
		strokeCount: 8,
		etymology: 'Combines 土 (earth/ground) over a representation of nuggets buried underground, with a roof 𠆢 suggesting stored wealth. Gold was found by digging — the character captures the image of precious metal emerging from the earth. It serves as the metal radical family, covering gold, silver, iron, and all hard materials.',
		components: ['𠆢 (roof / stored)', '王 (king / jade tablets)', '丷 (scattered nuggets)'],
		examples: [
			{ word: '金曜日', reading: 'きんようび', meaning: 'Friday' },
			{ word: 'お金', reading: 'おかね', meaning: 'money' },
			{ word: '金色', reading: 'きんいろ', meaning: 'gold color' },
			{ word: '黄金', reading: 'おうごん', meaning: 'gold' }
		]
	},
	'土': {
		strokeCount: 3,
		etymology: 'A cross shape with a long base — the upper horizontal stroke represents the ground surface, the vertical stroke is a plant or post rising from it, and the lower horizontal stroke is the ground itself. The image is a seedling emerging from fertile earth. One of the most ancient semantic components.',
		components: ['一 (surface ground line)', '十 (post or sprout crossing the surface)'],
		examples: [
			{ word: '土曜日', reading: 'どようび', meaning: 'Saturday' },
			{ word: '土地', reading: 'とち', meaning: 'land / soil' },
			{ word: '土台', reading: 'どだい', meaning: 'foundation / base' },
			{ word: '粘土', reading: 'ねんど', meaning: 'clay' }
		]
	},
	'山': {
		strokeCount: 3,
		etymology: 'One of the most iconic pictographs — three peaks of a mountain range, with the central peak highest. The image is so clear that mountain symbols across many ancient writing systems share the same three-peak form. The character has barely changed from its oracle bone original three thousand years ago.',
		components: ['山 (three mountain peaks — pictograph)'],
		examples: [
			{ word: '富士山', reading: 'ふじさん', meaning: 'Mt. Fuji' },
			{ word: '山登り', reading: 'やまのぼり', meaning: 'mountain climbing' },
			{ word: '火山', reading: 'かざん', meaning: 'volcano' },
			{ word: '山道', reading: 'やまみち', meaning: 'mountain path' }
		]
	},
	'川': {
		strokeCount: 3,
		etymology: 'Three parallel vertical lines with a slight curve, representing the parallel channels of a river or stream. The outer lines are the banks, the center is the main current — or alternatively, three tributaries flowing in parallel. One of the clearest pictographs in the kanji system.',
		components: ['川 (three flowing channels — pictograph)'],
		examples: [
			{ word: '川', reading: 'かわ', meaning: 'river' },
			{ word: '小川', reading: 'おがわ', meaning: 'stream / brook' },
			{ word: '川沿い', reading: 'かわぞい', meaning: 'along the river' },
			{ word: '神奈川', reading: 'かながわ', meaning: 'Kanagawa (prefecture)' }
		]
	},
	'空': {
		strokeCount: 8,
		etymology: 'Combines 穴 (hole / cave) and 工 (craft / work). The idea is a cave hollowed out by craftsman\'s work — a hollow space. From the hollowness of a cave, the meaning expanded to the sky (a vast hollow above) and then to emptiness in general. 空 covers both sky and void.',
		components: ['穴 (hole / cave)', '工 (work / craft — hollowing)'],
		examples: [
			{ word: '空港', reading: 'くうこう', meaning: 'airport' },
			{ word: '青空', reading: 'あおぞら', meaning: 'blue sky' },
			{ word: '空気', reading: 'くうき', meaning: 'air / atmosphere' },
			{ word: '空白', reading: 'くうはく', meaning: 'blank / empty space' }
		]
	},
	'花': {
		strokeCount: 7,
		etymology: 'Combines 艹 (grass/plant crown) and 化 (transform / change). Flowers are the transformation of a plant — the moment it blossoms and changes form. The 化 element also carries the sound (ka), making this a phonosemantic compound: plant radical for category, 化 for both meaning and sound.',
		components: ['艹 (grass / plant radical)', '化 (transform — semantic + phonetic)'],
		examples: [
			{ word: '花火', reading: 'はなび', meaning: 'fireworks' },
			{ word: '花束', reading: 'はなたば', meaning: 'bouquet' },
			{ word: '桜の花', reading: 'さくらのはな', meaning: 'cherry blossom' },
			{ word: '花見', reading: 'はなみ', meaning: 'flower viewing' }
		]
	},
	'雨': {
		strokeCount: 8,
		etymology: 'A pictograph of a sky with rain falling from a cloud — the top horizontal stroke is the sky, the box below is the cloud, and the four dots inside are raindrops falling through the air. The structure is remarkably faithful to its original oracle bone form, which also showed dots suspended inside a cloud shape.',
		components: ['一 (sky)', '冂 (cloud frame)', '丶丶丶丶 (four raindrops)'],
		examples: [
			{ word: '雨の日', reading: 'あめのひ', meaning: 'rainy day' },
			{ word: '大雨', reading: 'おおあめ', meaning: 'heavy rain' },
			{ word: '雨季', reading: 'うき', meaning: 'rainy season' },
			{ word: '小雨', reading: 'こさめ', meaning: 'light rain / drizzle' }
		]
	},
	'電': {
		strokeCount: 13,
		etymology: 'Combines 雨 (rain) and 申 (stretch / lightning shape). The 申 element originally depicted lightning — a zigzag bolt stretching across the sky during a thunderstorm. Rain plus lightning equals electricity, which was first understood as a weather phenomenon before being harnessed as technology.',
		components: ['雨 (rain)', '申 (lightning bolt / stretch)'],
		examples: [
			{ word: '電車', reading: 'でんしゃ', meaning: 'train' },
			{ word: '電話', reading: 'でんわ', meaning: 'telephone' },
			{ word: '電気', reading: 'でんき', meaning: 'electricity' },
			{ word: '電子', reading: 'でんし', meaning: 'electron / electronic' }
		]
	},
	'車': {
		strokeCount: 7,
		etymology: 'A pictograph of a wheeled cart seen directly from above — the horizontal lines are the axle and crossbeams, and the vertical center line is the axle pole. The ancient oracle bone form even showed the two wheels on each end of the axle. The bird\'s-eye view of a cart is unmistakable.',
		components: ['車 (cart from above — axle, beams, wheels)'],
		examples: [
			{ word: '電車', reading: 'でんしゃ', meaning: 'train' },
			{ word: '自動車', reading: 'じどうしゃ', meaning: 'automobile' },
			{ word: '駐車場', reading: 'ちゅうしゃじょう', meaning: 'parking lot' },
			{ word: '車道', reading: 'しゃどう', meaning: 'roadway / lane' }
		]
	},
	'駅': {
		strokeCount: 14,
		etymology: 'Combines 馬 (horse) and 尺 (measure / unit of length). Historically, post stations were placed at measured intervals along roads so that dispatched riders could swap out tired horses. The measuring unit 尺 captures the standardized spacing between horse-relay stations — a system that predates railroads by centuries.',
		components: ['馬 (horse)', '尺 (measure / unit of length)'],
		examples: [
			{ word: '駅前', reading: 'えきまえ', meaning: 'in front of the station' },
			{ word: '駅員', reading: 'えきいん', meaning: 'station staff' },
			{ word: '終点駅', reading: 'しゅうてんえき', meaning: 'terminal station' },
			{ word: '地下鉄駅', reading: 'ちかてつえき', meaning: 'subway station' }
		]
	},
	'食': {
		strokeCount: 9,
		etymology: 'Combines 𠆢 (a gathering or covering roof) with a vessel of food below and a person leaning in to eat. The full image is a person bending over a covered food vessel — the act of eating. As a radical it covers all eating, drinking, and food-related concepts.',
		components: ['𠆢 (cover / roof)', '良 (food vessel with contents)'],
		examples: [
			{ word: '食事', reading: 'しょくじ', meaning: 'meal' },
			{ word: '食べ物', reading: 'たべもの', meaning: 'food' },
			{ word: '外食', reading: 'がいしょく', meaning: 'eating out' },
			{ word: '食堂', reading: 'しょくどう', meaning: 'cafeteria / dining hall' }
		]
	},
	'飲': {
		strokeCount: 12,
		etymology: 'Combines 食 (food/eating) and 欠 (yawning mouth / open wide). The 欠 element shows a person with their mouth wide open — exactly what you do when drinking. Together: food radical (ingestion category) plus open mouth (the action) equals drinking.',
		components: ['食 (food / eat radical)', '欠 (open mouth / yawn)'],
		examples: [
			{ word: '飲み物', reading: 'のみもの', meaning: 'beverage / drink' },
			{ word: '飲み水', reading: 'のみず', meaning: 'drinking water' },
			{ word: '飲食店', reading: 'いんしょくてん', meaning: 'restaurant / eatery' },
			{ word: '暴飲', reading: 'ぼういん', meaning: 'excessive drinking' }
		]
	},
	'見': {
		strokeCount: 7,
		etymology: 'A pictograph of an eye 目 mounted on human legs 儿 — an eye that goes out to look, that walks around and observes. The combination captures the active, directed nature of seeing: not passive reception but purposeful looking. The legs beneath the eye are the character\'s most memorable feature.',
		components: ['目 (eye)', '儿 (legs / person walking)'],
		examples: [
			{ word: '見る', reading: 'みる', meaning: 'to see / watch' },
			{ word: '意見', reading: 'いけん', meaning: 'opinion' },
			{ word: '見学', reading: 'けんがく', meaning: 'field trip / observation' },
			{ word: '発見', reading: 'はっけん', meaning: 'discovery' }
		]
	},
	'聞': {
		strokeCount: 14,
		etymology: 'Places 耳 (ear) inside 門 (gate) — an ear pressed up against the gate, listening carefully to what is happening outside. The image is vivid: straining to catch sound through a barrier. This ear-at-the-gate construction makes 聞 both "to hear" and "to ask" (listening for an answer).',
		components: ['門 (gate)', '耳 (ear — inside the gate)'],
		examples: [
			{ word: '聞く', reading: 'きく', meaning: 'to hear / ask' },
			{ word: '新聞', reading: 'しんぶん', meaning: 'newspaper' },
			{ word: '見聞', reading: 'けんぶん', meaning: 'knowledge / experience' },
			{ word: '聞き取り', reading: 'ききとり', meaning: 'listening comprehension' }
		]
	},
	'言': {
		strokeCount: 7,
		etymology: 'Combines 口 (mouth) with what originally showed a musical note or a flute — sound coming from a mouth in a structured, melodic way. The early form suggested not just any noise but deliberate, patterned speech. As the character for "say/speak," it became the root for the entire speech radical family.',
		components: ['口 (mouth)', '三 (structured sound waves / lines above mouth)'],
		examples: [
			{ word: '言葉', reading: 'ことば', meaning: 'word / language' },
			{ word: '言う', reading: 'いう', meaning: 'to say' },
			{ word: '発言', reading: 'はつげん', meaning: 'statement / remark' },
			{ word: '方言', reading: 'ほうげん', meaning: 'dialect' }
		]
	},
	'話': {
		strokeCount: 13,
		etymology: 'Combines 言 (speech radical 訁) and 舌 (tongue). A story is tongue-talk — the tongue is the articulator of speech, and placing it beside the speech radical creates a character about the full physical act of talking, not just the words. The tongue element also carries the sound wa.',
		components: ['訁 (speech radical)', '舌 (tongue — semantic + phonetic)'],
		examples: [
			{ word: '話す', reading: 'はなす', meaning: 'to talk / speak' },
			{ word: '電話', reading: 'でんわ', meaning: 'telephone' },
			{ word: '会話', reading: 'かいわ', meaning: 'conversation' },
			{ word: '話題', reading: 'わだい', meaning: 'topic / subject' }
		]
	},
	'読': {
		strokeCount: 14,
		etymology: 'Combines 言 (speech radical 訁) and 売 (sell). The 売 element is phonetic (both share the doku sound family), but the semantic logic also holds: reading was historically equated with reading aloud — speech applied to written text. Literacy was oral performance before it was silent.',
		components: ['訁 (speech radical)', '売 (sell — phonetic element)'],
		examples: [
			{ word: '読む', reading: 'よむ', meaning: 'to read' },
			{ word: '読書', reading: 'どくしょ', meaning: 'reading (books)' },
			{ word: '読み方', reading: 'よみかた', meaning: 'how to read / reading' },
			{ word: '音読み', reading: 'おんよみ', meaning: 'on reading' }
		]
	},
	'書': {
		strokeCount: 10,
		etymology: 'Combines 聿 (brush — a hand holding a writing implement) and 曰 (say / speech tablet). The image is a brush pressed to a writing surface producing speech-marks — text. The 聿 element is one of the earliest depictions of a writing brush in Chinese script, and it anchors 書 firmly in the act of physical writing.',
		components: ['聿 (writing brush / hand + stick)', '曰 (tablet / speech surface)'],
		examples: [
			{ word: '書く', reading: 'かく', meaning: 'to write' },
			{ word: '教科書', reading: 'きょうかしょ', meaning: 'textbook' },
			{ word: '辞書', reading: 'じしょ', meaning: 'dictionary' },
			{ word: '書道', reading: 'しょどう', meaning: 'calligraphy' }
		]
	},
	'来': {
		strokeCount: 7,
		etymology: 'Originally a pictograph of a wheat plant — the ripening crop that "comes" each harvest season was used phonetically for the word "come" because they sounded alike in ancient Chinese. The grain roots are visible in the lower spreading strokes, though the agricultural origin is now invisible to most users.',
		components: ['来 (wheat plant — repurposed pictograph)'],
		examples: [
			{ word: '来る', reading: 'くる', meaning: 'to come' },
			{ word: '来年', reading: 'らいねん', meaning: 'next year' },
			{ word: '来週', reading: 'らいしゅう', meaning: 'next week' },
			{ word: '将来', reading: 'しょうらい', meaning: 'future' }
		]
	},
	'行': {
		strokeCount: 6,
		etymology: 'Originally depicted a crossroads — two paths meeting at a junction. The character literally shows the shape of an intersection viewed from above: two sets of strokes branching in opposite directions from a center point. From crossroads came "going" and "traveling," and eventually any kind of action or conduct.',
		components: ['行 (crossroads — left and right paths)'],
		examples: [
			{ word: '行く', reading: 'いく', meaning: 'to go' },
			{ word: '旅行', reading: 'りょこう', meaning: 'travel / trip' },
			{ word: '行動', reading: 'こうどう', meaning: 'action / behavior' },
			{ word: '銀行', reading: 'ぎんこう', meaning: 'bank' }
		]
	},
	'帰': {
		strokeCount: 10,
		etymology: 'Combines 刀 (knife), 帚 (broom), and 止 (foot / stop). The original image was a person sweeping up before departure or after return — the broom being the act of tidying the home. The knife element suggested cutting away from a place. Together they capture the concept of returning to one\'s own space.',
		components: ['刀 (knife)', '帚 (broom)', '止 (foot / stopping point)'],
		examples: [
			{ word: '帰る', reading: 'かえる', meaning: 'to return home' },
			{ word: '帰国', reading: 'きこく', meaning: 'return to one\'s home country' },
			{ word: '日帰り', reading: 'ひがえり', meaning: 'day trip' },
			{ word: '帰宅', reading: 'きたく', meaning: 'returning home' }
		]
	},
	'入': {
		strokeCount: 2,
		etymology: 'A V-shape or inverted wedge — the natural shape of something entering a space, like a nail driving in or a person ducking through a low opening. The two strokes converge at the bottom, suggesting penetration into an enclosure. Compare with 人 (person) which has asymmetric legs; 入 is more symmetrically V-shaped.',
		components: ['入 (entering wedge — two converging strokes)'],
		examples: [
			{ word: '入る', reading: 'はいる', meaning: 'to enter' },
			{ word: '入口', reading: 'いりぐち', meaning: 'entrance' },
			{ word: '入学', reading: 'にゅうがく', meaning: 'school enrollment' },
			{ word: '記入', reading: 'きにゅう', meaning: 'fill in / write in' }
		]
	},
	'出': {
		strokeCount: 5,
		etymology: 'Originally showed a foot emerging from a pit or enclosure — a plant sprouting up through the ground, or a person stepping up and out of a sunken dwelling. The two mountain-like strokes at the top suggest something rising above a baseline. The lower enclosure was the ground or vessel being exited.',
		components: ['山 (rising / sprouting shape × 2)', '凵 (open container — exited)'],
		examples: [
			{ word: '出る', reading: 'でる', meaning: 'to exit / go out' },
			{ word: '出口', reading: 'でぐち', meaning: 'exit' },
			{ word: '出発', reading: 'しゅっぱつ', meaning: 'departure' },
			{ word: '輸出', reading: 'ゆしゅつ', meaning: 'export' }
		]
	},
	'国': {
		strokeCount: 8,
		etymology: 'The traditional form 國 showed an enclosure 囗 containing 或 (territory with a weapon defending it). The modern simplified form retains 囗 (border/boundary) containing 玉 (jade/treasure). A country is a bordered space protecting something precious — the territory and its people are the national treasure.',
		components: ['囗 (outer border / enclosure)', '玉 (jade / precious — the protected interior)'],
		examples: [
			{ word: '日本国', reading: 'にほんこく', meaning: 'Japan (formal)' },
			{ word: '外国', reading: 'がいこく', meaning: 'foreign country' },
			{ word: '全国', reading: 'ぜんこく', meaning: 'whole country' },
			{ word: '国語', reading: 'こくご', meaning: 'national language / Japanese' }
		]
	},
	'語': {
		strokeCount: 14,
		etymology: 'Combines 言 (speech radical 訁) and 吾 (I / self). Self-speech — the words that come from within oneself — gives the sense of a language as the particular voice or tongue of a group. 吾 also serves phonetically (go sound). A language is literally "the speech of one\'s own group."',
		components: ['訁 (speech radical)', '吾 (self / I — semantic + phonetic)'],
		examples: [
			{ word: '日本語', reading: 'にほんご', meaning: 'Japanese language' },
			{ word: '英語', reading: 'えいご', meaning: 'English language' },
			{ word: '語学', reading: 'ごがく', meaning: 'language study' },
			{ word: '単語', reading: 'たんご', meaning: 'vocabulary word' }
		]
	},
	'学': {
		strokeCount: 8,
		etymology: 'The traditional form 學 showed two hands above exchanging knowledge — the radical 爻 (double X, meaning "cross/teach") above a child 子 inside a building. Children learning under crossed teaching hands inside a school. The simplified 学 retains the child 子 at the bottom, anchoring it in learning.',
		components: ['𠆢 (roof / building)', '冖 (cover / shelter)', '子 (child)'],
		examples: [
			{ word: '大学', reading: 'だいがく', meaning: 'university' },
			{ word: '学校', reading: 'がっこう', meaning: 'school' },
			{ word: '学生', reading: 'がくせい', meaning: 'student' },
			{ word: '語学', reading: 'ごがく', meaning: 'language study' }
		]
	},
	'校': {
		strokeCount: 10,
		etymology: 'Combines 木 (tree/wood) and 交 (intersect / mix). The original image was a wooden frame or lattice used for penning animals — interlocking wooden stakes. This corrective enclosure became associated with institutions of discipline and instruction: schools, military camps, and checkpoints all use 校.',
		components: ['木 (wood / tree)', '交 (intersect / cross — structural lattice)'],
		examples: [
			{ word: '学校', reading: 'がっこう', meaning: 'school' },
			{ word: '小学校', reading: 'しょうがっこう', meaning: 'elementary school' },
			{ word: '高校', reading: 'こうこう', meaning: 'high school' },
			{ word: '校長', reading: 'こうちょう', meaning: 'school principal' }
		]
	},
	'先': {
		strokeCount: 6,
		etymology: 'Combines 土 (earth/ground) over 儿 (person with legs). The original image showed a foot or person going ahead — crossing the ground first, arriving before others. The "ahead" in space became "ahead" in time (previous, former), and eventually "the one who went before you" became the word for teacher (先生 sensei).',
		components: ['土 (earth — going before)', '儿 (person / legs going forward)'],
		examples: [
			{ word: '先生', reading: 'せんせい', meaning: 'teacher' },
			{ word: '先に', reading: 'さきに', meaning: 'first / ahead' },
			{ word: '先週', reading: 'せんしゅう', meaning: 'last week' },
			{ word: '先輩', reading: 'せんぱい', meaning: 'senior / upperclassman' }
		]
	},
	'生': {
		strokeCount: 5,
		etymology: 'A pictograph of a plant 屮 sprouting from the ground — the horizontal stroke is the soil line, and the rising strokes are the young plant breaking through. Birth, life, and growth are all captured in the image of emergence. The character\'s versatility (birth, life, raw, grow, student) all flow from this single seedling image.',
		components: ['生 (sprouting plant from ground — five strokes)'],
		examples: [
			{ word: '先生', reading: 'せんせい', meaning: 'teacher' },
			{ word: '学生', reading: 'がくせい', meaning: 'student' },
			{ word: '生活', reading: 'せいかつ', meaning: 'life / lifestyle' },
			{ word: '誕生日', reading: 'たんじょうび', meaning: 'birthday' }
		]
	},
	'名': {
		strokeCount: 6,
		etymology: 'Combines 夕 (evening / dusk) and 口 (mouth). In darkness, when you cannot see someone\'s face, you call out their name. The image is evening with a mouth calling out — the necessity of names when visual identification fails. A name is what you say at dusk to find someone.',
		components: ['夕 (evening / dusk)', '口 (mouth — calling out)'],
		examples: [
			{ word: '名前', reading: 'なまえ', meaning: 'name' },
			{ word: '名刺', reading: 'めいし', meaning: 'business card' },
			{ word: '有名', reading: 'ゆうめい', meaning: 'famous' },
			{ word: '名古屋', reading: 'なごや', meaning: 'Nagoya (city)' }
		]
	},
	'白': {
		strokeCount: 5,
		etymology: 'Originally a pictograph of an acorn or thumb with a prominent white tip — the shining white of polished bone or the pale acorn cap. Some analyses trace it to a pictograph of a candle flame. Either way, the bright, pale, reflective quality of the image gave 白 its meaning of white and, by extension, clear or bright.',
		components: ['白 (bright tip over a base — five strokes)'],
		examples: [
			{ word: '白い', reading: 'しろい', meaning: 'white' },
			{ word: '白黒', reading: 'しろくろ', meaning: 'black and white' },
			{ word: '余白', reading: 'よはく', meaning: 'margin / blank space' },
			{ word: '白紙', reading: 'はくし', meaning: 'blank paper' }
		]
	},
	'黒': {
		strokeCount: 11,
		etymology: 'Combines 里 (village / black earth) and 灬 (fire / soot dots). The image is soot-blackened earth from fire — the black char left after burning. Early oracle bone forms showed a person with a blackened face (from soot or tattooing). The fire dots at the bottom are the key diagnostic feature.',
		components: ['里 (village / earth)', '灬 (fire — soot)'],
		examples: [
			{ word: '黒い', reading: 'くろい', meaning: 'black' },
			{ word: '黒板', reading: 'こくばん', meaning: 'blackboard' },
			{ word: '白黒', reading: 'しろくろ', meaning: 'black and white' },
			{ word: '黒字', reading: 'くろじ', meaning: 'in the black (profit)' }
		]
	},
	'赤': {
		strokeCount: 7,
		etymology: 'Combines 大 (large / person with arms spread) and 火 (fire). A person standing before a fire, glowing red-orange in the firelight. The image of a figure lit by flames captures the specific red-orange hue of fire and heated metal. The character appears early in oracle bone records associated with fire, blood, and warmth.',
		components: ['大 (large person / spread arms)', '火 (fire — below the figure)'],
		examples: [
			{ word: '赤い', reading: 'あかい', meaning: 'red' },
			{ word: '赤ちゃん', reading: 'あかちゃん', meaning: 'baby' },
			{ word: '赤信号', reading: 'あかしんごう', meaning: 'red light' },
			{ word: '赤字', reading: 'あかじ', meaning: 'in the red (deficit)' }
		]
	},
	'青': {
		strokeCount: 8,
		etymology: 'Combines 生 (life / sprouting plant) and 丹 (red cinnabar pigment, here serving as a color well). The sprouting plant that is green, and the natural pigment colors, both relate to raw, living color at the blue-green end of the spectrum. Japanese 青 (ao) covers both blue and green, a famously broad color term.',
		components: ['生 (sprouting / living — upper part)', '丹 (pigment well / color source — lower part)'],
		examples: [
			{ word: '青い', reading: 'あおい', meaning: 'blue / green' },
			{ word: '青空', reading: 'あおぞら', meaning: 'blue sky' },
			{ word: '青年', reading: 'せいねん', meaning: 'youth / young person' },
			{ word: '青信号', reading: 'あおしんごう', meaning: 'green light' }
		]
	},
	'高': {
		strokeCount: 10,
		etymology: 'A pictograph of a tall tower or high-gabled building — the top shows a pointed roof, the middle is a window or observation deck, and the bottom is the elevated base or gate structure. The character still reads as a tall building if you look at it from the right angle. Height in architecture became the abstract concept of height and cost.',
		components: ['高 (tall tower / gabled building pictograph)'],
		examples: [
			{ word: '高い', reading: 'たかい', meaning: 'tall / expensive' },
			{ word: '高校', reading: 'こうこう', meaning: 'high school' },
			{ word: '最高', reading: 'さいこう', meaning: 'the best / highest' },
			{ word: '高速', reading: 'こうそく', meaning: 'high speed' }
		]
	},
	'安': {
		strokeCount: 6,
		etymology: 'Combines 宀 (roof / house) and 女 (woman). A woman safe inside a home — the ancient image of domestic peace and security. The character reflects the patriarchal household structure of ancient China, where a woman sheltered indoors represented the household\'s stability and tranquility. Today it simply means "peaceful" and "cheap/affordable."',
		components: ['宀 (roof / house)', '女 (woman — sheltered inside)'],
		examples: [
			{ word: '安い', reading: 'やすい', meaning: 'cheap / inexpensive' },
			{ word: '安全', reading: 'あんぜん', meaning: 'safety / safe' },
			{ word: '安心', reading: 'あんしん', meaning: 'peace of mind' },
			{ word: '不安', reading: 'ふあん', meaning: 'anxiety / unease' }
		]
	}
};

// ─────────────────────────────────────────────
// JLPT N5 KANJI (80 kanji)
// ─────────────────────────────────────────────

const kanjiN5: CardItem[] = [
	{ character: '一', romaji: 'ichi', meaning: 'one', readings: { on: ['イチ', 'イツ'], kun: ['ひと-'] }, tags: ['N5'] },
	{ character: '二', romaji: 'ni', meaning: 'two', readings: { on: ['ニ'], kun: ['ふた-'] }, tags: ['N5'] },
	{ character: '三', romaji: 'san', meaning: 'three', readings: { on: ['サン'], kun: ['み-'] }, tags: ['N5'] },
	{ character: '四', romaji: 'shi / yon', meaning: 'four', readings: { on: ['シ'], kun: ['よ-', 'よん'] }, tags: ['N5'] },
	{ character: '五', romaji: 'go', meaning: 'five', readings: { on: ['ゴ'], kun: ['いつ-'] }, tags: ['N5'] },
	{ character: '六', romaji: 'roku', meaning: 'six', readings: { on: ['ロク'], kun: ['む-'] }, tags: ['N5'] },
	{ character: '七', romaji: 'shichi / nana', meaning: 'seven', readings: { on: ['シチ'], kun: ['なな'] }, tags: ['N5'] },
	{ character: '八', romaji: 'hachi', meaning: 'eight', readings: { on: ['ハチ'], kun: ['や-'] }, tags: ['N5'] },
	{ character: '九', romaji: 'ku / kyuu', meaning: 'nine', readings: { on: ['キュウ', 'ク'], kun: ['ここの-'] }, tags: ['N5'] },
	{ character: '十', romaji: 'juu', meaning: 'ten', readings: { on: ['ジュウ', 'ジッ'], kun: ['とお'] }, tags: ['N5'] },
	{ character: '百', romaji: 'hyaku', meaning: 'hundred', readings: { on: ['ヒャク'], kun: [] }, tags: ['N5'] },
	{ character: '千', romaji: 'sen', meaning: 'thousand', readings: { on: ['セン'], kun: ['ち'] }, tags: ['N5'] },
	{ character: '万', romaji: 'man', meaning: 'ten thousand', readings: { on: ['マン', 'バン'], kun: [] }, tags: ['N5'] },
	{ character: '円', romaji: 'en', meaning: 'yen / circle', readings: { on: ['エン'], kun: ['まる'] }, tags: ['N5'] },
	{ character: '年', romaji: 'nen / toshi', meaning: 'year', readings: { on: ['ネン'], kun: ['とし'] }, tags: ['N5'] },
	{ character: '月', romaji: 'getsu / tsuki', meaning: 'month / moon', readings: { on: ['ゲツ', 'ガツ'], kun: ['つき'] }, tags: ['N5'] },
	{ character: '日', romaji: 'nichi / hi', meaning: 'day / sun', readings: { on: ['ニチ', 'ジツ'], kun: ['ひ', 'か'] }, tags: ['N5'] },
	{ character: '時', romaji: 'ji / toki', meaning: 'time / hour', readings: { on: ['ジ'], kun: ['とき'] }, tags: ['N5'] },
	{ character: '分', romaji: 'fun / bun', meaning: 'minute / part', readings: { on: ['フン', 'ブン', 'フ'], kun: ['わ-'] }, tags: ['N5'] },
	{ character: '半', romaji: 'han', meaning: 'half', readings: { on: ['ハン'], kun: ['なか-'] }, tags: ['N5'] },
	{ character: '今', romaji: 'ima / kon', meaning: 'now', readings: { on: ['コン', 'キン'], kun: ['いま'] }, tags: ['N5'] },
	{ character: '毎', romaji: 'mai', meaning: 'every', readings: { on: ['マイ'], kun: [] }, tags: ['N5'] },
	{ character: '何', romaji: 'nani / nan', meaning: 'what', readings: { on: ['カ'], kun: ['なに', 'なん'] }, tags: ['N5'] },
	{ character: '人', romaji: 'jin / hito', meaning: 'person', readings: { on: ['ジン', 'ニン'], kun: ['ひと'] }, tags: ['N5'] },
	{ character: '男', romaji: 'dan / otoko', meaning: 'man', readings: { on: ['ダン', 'ナン'], kun: ['おとこ'] }, tags: ['N5'] },
	{ character: '女', romaji: 'jo / onna', meaning: 'woman', readings: { on: ['ジョ', 'ニョ'], kun: ['おんな'] }, tags: ['N5'] },
	{ character: '子', romaji: 'shi / ko', meaning: 'child', readings: { on: ['シ', 'ス'], kun: ['こ'] }, tags: ['N5'] },
	{ character: '父', romaji: 'chichi / fu', meaning: 'father', readings: { on: ['フ'], kun: ['ちち'] }, tags: ['N5'] },
	{ character: '母', romaji: 'haha / bo', meaning: 'mother', readings: { on: ['ボ'], kun: ['はは'] }, tags: ['N5'] },
	{ character: '友', romaji: 'tomo / yuu', meaning: 'friend', readings: { on: ['ユウ'], kun: ['とも'] }, tags: ['N5'] },
	{ character: '私', romaji: 'watashi / shi', meaning: 'I / private', readings: { on: ['シ'], kun: ['わたし', 'わたくし'] }, tags: ['N5'] },
	{ character: '大', romaji: 'dai / oo', meaning: 'big / large', readings: { on: ['ダイ', 'タイ'], kun: ['おお-'] }, tags: ['N5'] },
	{ character: '小', romaji: 'shou / chii', meaning: 'small / little', readings: { on: ['ショウ'], kun: ['ちい-', 'こ'] }, tags: ['N5'] },
	{ character: '中', romaji: 'chuu / naka', meaning: 'middle / inside', readings: { on: ['チュウ'], kun: ['なか'] }, tags: ['N5'] },
	{ character: '上', romaji: 'jou / ue', meaning: 'up / above', readings: { on: ['ジョウ'], kun: ['うえ', 'あ-'] }, tags: ['N5'] },
	{ character: '下', romaji: 'ka / shita', meaning: 'down / below', readings: { on: ['カ', 'ゲ'], kun: ['した', 'さ-', 'くだ-'] }, tags: ['N5'] },
	{ character: '左', romaji: 'hidari / sa', meaning: 'left', readings: { on: ['サ'], kun: ['ひだり'] }, tags: ['N5'] },
	{ character: '右', romaji: 'migi / u', meaning: 'right', readings: { on: ['ウ', 'ユウ'], kun: ['みぎ'] }, tags: ['N5'] },
	{ character: '前', romaji: 'mae / zen', meaning: 'front / before', readings: { on: ['ゼン'], kun: ['まえ'] }, tags: ['N5'] },
	{ character: '後', romaji: 'ato / go', meaning: 'after / behind', readings: { on: ['ゴ', 'コウ'], kun: ['のち', 'あと', 'うし-'] }, tags: ['N5'] },
	{ character: '外', romaji: 'soto / gai', meaning: 'outside', readings: { on: ['ガイ', 'ゲ'], kun: ['そと', 'ほか'] }, tags: ['N5'] },
	{ character: '火', romaji: 'ka / hi', meaning: 'fire', readings: { on: ['カ'], kun: ['ひ'] }, tags: ['N5'] },
	{ character: '水', romaji: 'sui / mizu', meaning: 'water', readings: { on: ['スイ'], kun: ['みず'] }, tags: ['N5'] },
	{ character: '木', romaji: 'moku / ki', meaning: 'tree / wood', readings: { on: ['モク', 'ボク'], kun: ['き'] }, tags: ['N5'] },
	{ character: '金', romaji: 'kin / kane', meaning: 'gold / money', readings: { on: ['キン', 'コン'], kun: ['かね'] }, tags: ['N5'] },
	{ character: '土', romaji: 'do / tsuchi', meaning: 'earth / soil', readings: { on: ['ド', 'ト'], kun: ['つち'] }, tags: ['N5'] },
	{ character: '山', romaji: 'yama / san', meaning: 'mountain', readings: { on: ['サン'], kun: ['やま'] }, tags: ['N5'] },
	{ character: '川', romaji: 'kawa / sen', meaning: 'river', readings: { on: ['セン'], kun: ['かわ'] }, tags: ['N5'] },
	{ character: '空', romaji: 'sora / kuu', meaning: 'sky / empty', readings: { on: ['クウ'], kun: ['そら', 'あ-', 'から'] }, tags: ['N5'] },
	{ character: '花', romaji: 'hana / ka', meaning: 'flower', readings: { on: ['カ'], kun: ['はな'] }, tags: ['N5'] },
	{ character: '雨', romaji: 'ame / u', meaning: 'rain', readings: { on: ['ウ'], kun: ['あめ', 'あま-'] }, tags: ['N5'] },
	{ character: '電', romaji: 'den', meaning: 'electricity', readings: { on: ['デン'], kun: [] }, tags: ['N5'] },
	{ character: '車', romaji: 'kuruma / sha', meaning: 'car / vehicle', readings: { on: ['シャ'], kun: ['くるま'] }, tags: ['N5'] },
	{ character: '駅', romaji: 'eki', meaning: 'train station', readings: { on: ['エキ'], kun: [] }, tags: ['N5'] },
	{ character: '食', romaji: 'shoku / ta', meaning: 'eat / food', readings: { on: ['ショク', 'ジキ'], kun: ['た-', 'く-'] }, tags: ['N5'] },
	{ character: '飲', romaji: 'in / no', meaning: 'drink', readings: { on: ['イン'], kun: ['の-'] }, tags: ['N5'] },
	{ character: '見', romaji: 'ken / mi', meaning: 'see / look', readings: { on: ['ケン'], kun: ['み-'] }, tags: ['N5'] },
	{ character: '聞', romaji: 'bun / ki', meaning: 'hear / ask', readings: { on: ['ブン', 'モン'], kun: ['き-'] }, tags: ['N5'] },
	{ character: '言', romaji: 'gen / i', meaning: 'say / speak', readings: { on: ['ゲン', 'ゴン'], kun: ['い-', 'こと'] }, tags: ['N5'] },
	{ character: '話', romaji: 'wa / hana', meaning: 'talk / story', readings: { on: ['ワ'], kun: ['はな-', 'はなし'] }, tags: ['N5'] },
	{ character: '読', romaji: 'doku / yo', meaning: 'read', readings: { on: ['ドク', 'トク'], kun: ['よ-'] }, tags: ['N5'] },
	{ character: '書', romaji: 'sho / ka', meaning: 'write', readings: { on: ['ショ'], kun: ['か-'] }, tags: ['N5'] },
	{ character: '来', romaji: 'rai / ku', meaning: 'come', readings: { on: ['ライ'], kun: ['く-', 'き-', 'こ-'] }, tags: ['N5'] },
	{ character: '行', romaji: 'kou / i', meaning: 'go', readings: { on: ['コウ', 'ギョウ'], kun: ['い-', 'ゆ-', 'おこな-'] }, tags: ['N5'] },
	{ character: '帰', romaji: 'ki / kae', meaning: 'return home', readings: { on: ['キ'], kun: ['かえ-'] }, tags: ['N5'] },
	{ character: '入', romaji: 'nyuu / hai', meaning: 'enter', readings: { on: ['ニュウ'], kun: ['い-', 'はい-'] }, tags: ['N5'] },
	{ character: '出', romaji: 'shutsu / de', meaning: 'exit / leave', readings: { on: ['シュツ', 'スイ'], kun: ['で-', 'だ-'] }, tags: ['N5'] },
	{ character: '国', romaji: 'koku / kuni', meaning: 'country', readings: { on: ['コク'], kun: ['くに'] }, tags: ['N5'] },
	{ character: '語', romaji: 'go / kata', meaning: 'language / word', readings: { on: ['ゴ'], kun: ['かた-'] }, tags: ['N5'] },
	{ character: '学', romaji: 'gaku / mana', meaning: 'study / learn', readings: { on: ['ガク'], kun: ['まな-'] }, tags: ['N5'] },
	{ character: '校', romaji: 'kou', meaning: 'school', readings: { on: ['コウ'], kun: [] }, tags: ['N5'] },
	{ character: '先', romaji: 'sen / saki', meaning: 'ahead / previous', readings: { on: ['セン'], kun: ['さき'] }, tags: ['N5'] },
	{ character: '生', romaji: 'sei / nama', meaning: 'life / birth', readings: { on: ['セイ', 'ショウ'], kun: ['い-', 'う-', 'は-', 'なま'] }, tags: ['N5'] },
	{ character: '名', romaji: 'mei / na', meaning: 'name', readings: { on: ['メイ', 'ミョウ'], kun: ['な'] }, tags: ['N5'] },
	{ character: '白', romaji: 'haku / shiro', meaning: 'white', readings: { on: ['ハク', 'ビャク'], kun: ['しろ', 'しら-'] }, tags: ['N5'] },
	{ character: '黒', romaji: 'koku / kuro', meaning: 'black', readings: { on: ['コク'], kun: ['くろ'] }, tags: ['N5'] },
	{ character: '赤', romaji: 'seki / aka', meaning: 'red', readings: { on: ['セキ', 'シャク'], kun: ['あか'] }, tags: ['N5'] },
	{ character: '青', romaji: 'sei / ao', meaning: 'blue / green', readings: { on: ['セイ', 'ショウ'], kun: ['あお'] }, tags: ['N5'] },
	{ character: '高', romaji: 'kou / taka', meaning: 'high / expensive', readings: { on: ['コウ'], kun: ['たか-'] }, tags: ['N5'] },
	{ character: '安', romaji: 'an / yasu', meaning: 'peaceful / cheap', readings: { on: ['アン'], kun: ['やす-'] }, tags: ['N5'] },
].map((item) => (kanjiN5Enrichment[item.character] ? { ...item, ...kanjiN5Enrichment[item.character] } : item));

// ─────────────────────────────────────────────
// JLPT N4 KANJI (170 kanji)
// ─────────────────────────────────────────────

const kanjiN4: CardItem[] = [
	{ character: '内', romaji: 'uchi / nai', meaning: 'inside / within', readings: { on: ['ナイ', 'ダイ'], kun: ['うち'] }, tags: ['N4'] },
	{ character: '好', romaji: 'kou / su', meaning: 'like / fond', readings: { on: ['コウ'], kun: ['す-', 'この-'] }, tags: ['N4'] },
	{ character: '間', romaji: 'kan / aida', meaning: 'interval / between', readings: { on: ['カン', 'ケン'], kun: ['あいだ', 'ま'] }, tags: ['N4'] },
	{ character: '会', romaji: 'kai / a', meaning: 'meet / society', readings: { on: ['カイ', 'エ'], kun: ['あ-'] }, tags: ['N4'] },
	{ character: '同', romaji: 'dou / ona', meaning: 'same', readings: { on: ['ドウ'], kun: ['おな-'] }, tags: ['N4'] },
	{ character: '事', romaji: 'ji / koto', meaning: 'thing / matter', readings: { on: ['ジ', 'ズ'], kun: ['こと'] }, tags: ['N4'] },
	{ character: '自', romaji: 'ji / mizu', meaning: 'self', readings: { on: ['ジ', 'シ'], kun: ['みずか-'] }, tags: ['N4'] },
	{ character: '社', romaji: 'sha', meaning: 'company / shrine', readings: { on: ['シャ'], kun: ['やしろ'] }, tags: ['N4'] },
	{ character: '発', romaji: 'hatsu', meaning: 'depart / emit', readings: { on: ['ハツ', 'ホツ'], kun: [] }, tags: ['N4'] },
	{ character: '者', romaji: 'sha / mono', meaning: 'person (suffix)', readings: { on: ['シャ'], kun: ['もの'] }, tags: ['N4'] },
	{ character: '地', romaji: 'chi / ji', meaning: 'ground / place', readings: { on: ['チ', 'ジ'], kun: [] }, tags: ['N4'] },
	{ character: '業', romaji: 'gyou / waza', meaning: 'business / work', readings: { on: ['ギョウ', 'ゴウ'], kun: ['わざ'] }, tags: ['N4'] },
	{ character: '方', romaji: 'kata / hou', meaning: 'direction / way', readings: { on: ['ホウ'], kun: ['かた'] }, tags: ['N4'] },
	{ character: '新', romaji: 'shin / atara', meaning: 'new', readings: { on: ['シン'], kun: ['あたら-', 'あら-', 'にい-'] }, tags: ['N4'] },
	{ character: '場', romaji: 'jou / ba', meaning: 'place / scene', readings: { on: ['ジョウ'], kun: ['ば'] }, tags: ['N4'] },
	{ character: '員', romaji: 'in', meaning: 'member / staff', readings: { on: ['イン'], kun: [] }, tags: ['N4'] },
	{ character: '立', romaji: 'ritsu / ta', meaning: 'stand', readings: { on: ['リツ', 'リュウ'], kun: ['た-'] }, tags: ['N4'] },
	{ character: '開', romaji: 'kai / hira', meaning: 'open', readings: { on: ['カイ'], kun: ['ひら-', 'あ-'] }, tags: ['N4'] },
	{ character: '手', romaji: 'shu / te', meaning: 'hand', readings: { on: ['シュ'], kun: ['て'] }, tags: ['N4'] },
	{ character: '力', romaji: 'ryoku / chikara', meaning: 'power / strength', readings: { on: ['リョク', 'リキ'], kun: ['ちから'] }, tags: ['N4'] },
	{ character: '問', romaji: 'mon / to', meaning: 'question / ask', readings: { on: ['モン'], kun: ['と-'] }, tags: ['N4'] },
	{ character: '代', romaji: 'dai / ka', meaning: 'generation / replace', readings: { on: ['ダイ', 'タイ'], kun: ['か-', 'しろ'] }, tags: ['N4'] },
	{ character: '動', romaji: 'dou / ugo', meaning: 'move', readings: { on: ['ドウ'], kun: ['うご-'] }, tags: ['N4'] },
	{ character: '京', romaji: 'kyou / kei', meaning: 'capital', readings: { on: ['キョウ', 'ケイ'], kun: [] }, tags: ['N4'] },
	{ character: '目', romaji: 'moku / me', meaning: 'eye', readings: { on: ['モク', 'ボク'], kun: ['め', 'ま-'] }, tags: ['N4'] },
	{ character: '通', romaji: 'tsuu / too', meaning: 'pass through / commute', readings: { on: ['ツウ'], kun: ['とお-', 'かよ-'] }, tags: ['N4'] },
	{ character: '理', romaji: 'ri', meaning: 'reason / logic', readings: { on: ['リ'], kun: [] }, tags: ['N4'] },
	{ character: '体', romaji: 'tai / karada', meaning: 'body', readings: { on: ['タイ', 'テイ'], kun: ['からだ'] }, tags: ['N4'] },
	{ character: '田', romaji: 'den / ta', meaning: 'rice field', readings: { on: ['デン'], kun: ['た'] }, tags: ['N4'] },
	{ character: '主', romaji: 'shu / nushi', meaning: 'master / main', readings: { on: ['シュ', 'ス'], kun: ['ぬし', 'おも'] }, tags: ['N4'] },
	{ character: '題', romaji: 'dai', meaning: 'topic / title', readings: { on: ['ダイ'], kun: [] }, tags: ['N4'] },
	{ character: '意', romaji: 'i', meaning: 'intention / meaning', readings: { on: ['イ'], kun: [] }, tags: ['N4'] },
	{ character: '不', romaji: 'fu / bu', meaning: 'not / un-', readings: { on: ['フ', 'ブ'], kun: [] }, tags: ['N4'] },
	{ character: '作', romaji: 'saku / tsuku', meaning: 'make / create', readings: { on: ['サク', 'サ'], kun: ['つく-'] }, tags: ['N4'] },
	{ character: '用', romaji: 'you / mochi', meaning: 'use / business', readings: { on: ['ヨウ'], kun: ['もち-'] }, tags: ['N4'] },
	{ character: '度', romaji: 'do / tabi', meaning: 'degree / time', readings: { on: ['ド', 'ト', 'タク'], kun: ['たび'] }, tags: ['N4'] },
	{ character: '強', romaji: 'kyou / tsuyo', meaning: 'strong', readings: { on: ['キョウ', 'ゴウ'], kun: ['つよ-', 'し-'] }, tags: ['N4'] },
	{ character: '公', romaji: 'kou', meaning: 'public / official', readings: { on: ['コウ'], kun: ['おおやけ'] }, tags: ['N4'] },
	{ character: '持', romaji: 'ji / mo', meaning: 'hold / carry', readings: { on: ['ジ'], kun: ['も-'] }, tags: ['N4'] },
	{ character: '野', romaji: 'ya / no', meaning: 'field / plains', readings: { on: ['ヤ'], kun: ['の'] }, tags: ['N4'] },
	{ character: '以', romaji: 'i', meaning: 'by means of / compared with', readings: { on: ['イ'], kun: ['もっ-'] }, tags: ['N4'] },
	{ character: '思', romaji: 'shi / omo', meaning: 'think', readings: { on: ['シ'], kun: ['おも-'] }, tags: ['N4'] },
	{ character: '家', romaji: 'ka / ie', meaning: 'house / home', readings: { on: ['カ', 'ケ'], kun: ['いえ', 'や'] }, tags: ['N4'] },
	{ character: '世', romaji: 'sei / yo', meaning: 'world / generation', readings: { on: ['セイ', 'セ'], kun: ['よ'] }, tags: ['N4'] },
	{ character: '多', romaji: 'ta / oo', meaning: 'many / much', readings: { on: ['タ'], kun: ['おお-'] }, tags: ['N4'] },
	{ character: '正', romaji: 'sei / tada', meaning: 'correct / right', readings: { on: ['セイ', 'ショウ'], kun: ['ただ-', 'まさ'] }, tags: ['N4'] },
	{ character: '院', romaji: 'in', meaning: 'institution / hall', readings: { on: ['イン'], kun: [] }, tags: ['N4'] },
	{ character: '心', romaji: 'shin / kokoro', meaning: 'heart / mind', readings: { on: ['シン'], kun: ['こころ'] }, tags: ['N4'] },
	{ character: '界', romaji: 'kai', meaning: 'world / boundary', readings: { on: ['カイ'], kun: [] }, tags: ['N4'] },
	{ character: '教', romaji: 'kyou / oshi', meaning: 'teach', readings: { on: ['キョウ'], kun: ['おし-', 'おそ-'] }, tags: ['N4'] },
	{ character: '文', romaji: 'bun / fumi', meaning: 'writing / sentence', readings: { on: ['ブン', 'モン'], kun: ['ふみ'] }, tags: ['N4'] },
	{ character: '元', romaji: 'gen / moto', meaning: 'origin / former', readings: { on: ['ゲン', 'ガン'], kun: ['もと'] }, tags: ['N4'] },
	{ character: '重', romaji: 'juu / omo', meaning: 'heavy / important', readings: { on: ['ジュウ', 'チョウ'], kun: ['おも-', 'かさ-'] }, tags: ['N4'] },
	{ character: '近', romaji: 'kin / chika', meaning: 'near / close', readings: { on: ['キン', 'コン'], kun: ['ちか-'] }, tags: ['N4'] },
	{ character: '考', romaji: 'kou / kanga', meaning: 'think / consider', readings: { on: ['コウ'], kun: ['かんが-'] }, tags: ['N4'] },
	{ character: '画', romaji: 'ga / kaku', meaning: 'picture / stroke', readings: { on: ['ガ', 'カク', 'カイ'], kun: ['えが-'] }, tags: ['N4'] },
	{ character: '海', romaji: 'kai / umi', meaning: 'sea / ocean', readings: { on: ['カイ'], kun: ['うみ'] }, tags: ['N4'] },
	{ character: '売', romaji: 'bai / u', meaning: 'sell', readings: { on: ['バイ'], kun: ['う-'] }, tags: ['N4'] },
	{ character: '知', romaji: 'chi / shi', meaning: 'know', readings: { on: ['チ'], kun: ['し-'] }, tags: ['N4'] },
	{ character: '道', romaji: 'dou / michi', meaning: 'road / way', readings: { on: ['ドウ', 'トウ'], kun: ['みち'] }, tags: ['N4'] },
	{ character: '集', romaji: 'shuu / atsu', meaning: 'gather / collect', readings: { on: ['シュウ'], kun: ['あつ-'] }, tags: ['N4'] },
	{ character: '別', romaji: 'betsu / waka', meaning: 'separate / different', readings: { on: ['ベツ'], kun: ['わか-'] }, tags: ['N4'] },
	{ character: '物', romaji: 'butsu / mono', meaning: 'thing / object', readings: { on: ['ブツ', 'モツ'], kun: ['もの'] }, tags: ['N4'] },
	{ character: '使', romaji: 'shi / tsuka', meaning: 'use / employ', readings: { on: ['シ'], kun: ['つか-'] }, tags: ['N4'] },
	{ character: '品', romaji: 'hin / shina', meaning: 'goods / article', readings: { on: ['ヒン', 'ホン'], kun: ['しな'] }, tags: ['N4'] },
	{ character: '市', romaji: 'shi / ichi', meaning: 'city / market', readings: { on: ['シ'], kun: ['いち'] }, tags: ['N4'] },
	{ character: '町', romaji: 'chou / machi', meaning: 'town / block', readings: { on: ['チョウ'], kun: ['まち'] }, tags: ['N4'] },
	{ character: '村', romaji: 'son / mura', meaning: 'village', readings: { on: ['ソン'], kun: ['むら'] }, tags: ['N4'] },
	{ character: '店', romaji: 'ten / mise', meaning: 'shop / store', readings: { on: ['テン'], kun: ['みせ'] }, tags: ['N4'] },
	{ character: '病', romaji: 'byou / yamai', meaning: 'illness', readings: { on: ['ビョウ', 'ヘイ'], kun: ['やまい', 'や-'] }, tags: ['N4'] },
	{ character: '医', romaji: 'i', meaning: 'medicine / doctor', readings: { on: ['イ'], kun: [] }, tags: ['N4'] },
	{ character: '薬', romaji: 'yaku / kusuri', meaning: 'medicine / drug', readings: { on: ['ヤク'], kun: ['くすり'] }, tags: ['N4'] },
	{ character: '引', romaji: 'in / hi', meaning: 'pull / draw', readings: { on: ['イン'], kun: ['ひ-'] }, tags: ['N4'] },
	{ character: '運', romaji: 'un / hako', meaning: 'carry / luck', readings: { on: ['ウン'], kun: ['はこ-'] }, tags: ['N4'] },
	{ character: '泳', romaji: 'ei / oyo', meaning: 'swim', readings: { on: ['エイ'], kun: ['およ-'] }, tags: ['N4'] },
	{ character: '映', romaji: 'ei / utsu', meaning: 'reflect / project', readings: { on: ['エイ'], kun: ['うつ-'] }, tags: ['N4'] },
	{ character: '音', romaji: 'on / oto', meaning: 'sound', readings: { on: ['オン', 'イン'], kun: ['おと', 'ね'] }, tags: ['N4'] },
	{ character: '楽', romaji: 'raku / tano', meaning: 'music / comfort', readings: { on: ['ガク', 'ラク'], kun: ['たの-'] }, tags: ['N4'] },
	{ character: '漢', romaji: 'kan', meaning: 'Chinese / kanji', readings: { on: ['カン'], kun: [] }, tags: ['N4'] },
	{ character: '記', romaji: 'ki / shiru', meaning: 'record / write down', readings: { on: ['キ'], kun: ['しる-'] }, tags: ['N4'] },
	{ character: '起', romaji: 'ki / o', meaning: 'wake up / occur', readings: { on: ['キ'], kun: ['お-'] }, tags: ['N4'] },
	{ character: '急', romaji: 'kyuu / iso', meaning: 'urgent / hurry', readings: { on: ['キュウ'], kun: ['いそ-'] }, tags: ['N4'] },
	{ character: '去', romaji: 'ko / sa', meaning: 'past / leave', readings: { on: ['キョ', 'コ'], kun: ['さ-'] }, tags: ['N4'] },
	{ character: '曲', romaji: 'kyoku / ma', meaning: 'song / bend', readings: { on: ['キョク'], kun: ['ま-'] }, tags: ['N4'] },
	{ character: '研', romaji: 'ken / to', meaning: 'polish / study', readings: { on: ['ケン'], kun: ['と-'] }, tags: ['N4'] },
	{ character: '答', romaji: 'tou / kota', meaning: 'answer', readings: { on: ['トウ'], kun: ['こた-'] }, tags: ['N4'] },
	{ character: '試', romaji: 'shi / kokoro', meaning: 'test / try', readings: { on: ['シ'], kun: ['こころ-', 'ため-'] }, tags: ['N4'] },
	{ character: '合', romaji: 'gou / a', meaning: 'combine / suit', readings: { on: ['ゴウ', 'ガッ', 'カッ'], kun: ['あ-'] }, tags: ['N4'] },
	{ character: '走', romaji: 'sou / hashi', meaning: 'run', readings: { on: ['ソウ'], kun: ['はし-'] }, tags: ['N4'] },
	{ character: '送', romaji: 'sou / oku', meaning: 'send', readings: { on: ['ソウ'], kun: ['おく-'] }, tags: ['N4'] },
	{ character: '待', romaji: 'tai / ma', meaning: 'wait', readings: { on: ['タイ'], kun: ['ま-'] }, tags: ['N4'] },
	{ character: '貸', romaji: 'tai / ka', meaning: 'lend', readings: { on: ['タイ'], kun: ['か-'] }, tags: ['N4'] },
	{ character: '買', romaji: 'bai / ka', meaning: 'buy', readings: { on: ['バイ'], kun: ['か-'] }, tags: ['N4'] },
	{ character: '借', romaji: 'shaku / ka', meaning: 'borrow', readings: { on: ['シャク'], kun: ['か-'] }, tags: ['N4'] },
	{ character: '住', romaji: 'juu / su', meaning: 'live / reside', readings: { on: ['ジュウ'], kun: ['す-'] }, tags: ['N4'] },
	{ character: '転', romaji: 'ten / koro', meaning: 'roll / transfer', readings: { on: ['テン'], kun: ['ころ-'] }, tags: ['N4'] },
	{ character: '乗', romaji: 'jou / no', meaning: 'ride / board', readings: { on: ['ジョウ'], kun: ['の-'] }, tags: ['N4'] },
	{ character: '降', romaji: 'kou / fu', meaning: 'descend / fall', readings: { on: ['コウ'], kun: ['お-', 'ふ-'] }, tags: ['N4'] },
	{ character: '働', romaji: 'dou / hatara', meaning: 'work', readings: { on: ['ドウ'], kun: ['はたら-'] }, tags: ['N4'] },
	{ character: '押', romaji: 'ou / o', meaning: 'push', readings: { on: ['オウ'], kun: ['お-'] }, tags: ['N4'] },
	{ character: '始', romaji: 'shi / haji', meaning: 'begin', readings: { on: ['シ'], kun: ['はじ-'] }, tags: ['N4'] },
	{ character: '終', romaji: 'shuu / o', meaning: 'end / finish', readings: { on: ['シュウ'], kun: ['お-'] }, tags: ['N4'] },
	{ character: '死', romaji: 'shi / shi', meaning: 'die / death', readings: { on: ['シ'], kun: ['し-'] }, tags: ['N4'] },
	{ character: '注', romaji: 'chuu / soso', meaning: 'pour / note', readings: { on: ['チュウ'], kun: ['そそ-'] }, tags: ['N4'] },
	{ character: '洗', romaji: 'sen / ara', meaning: 'wash', readings: { on: ['セン'], kun: ['あら-'] }, tags: ['N4'] },
	{ character: '授', romaji: 'ju / sazu', meaning: 'grant / teach', readings: { on: ['ジュ'], kun: ['さず-'] }, tags: ['N4'] },
	{ character: '習', romaji: 'shuu / nara', meaning: 'learn / practice', readings: { on: ['シュウ'], kun: ['なら-'] }, tags: ['N4'] },
	{ character: '週', romaji: 'shuu', meaning: 'week', readings: { on: ['シュウ'], kun: [] }, tags: ['N4'] },
	{ character: '族', romaji: 'zoku', meaning: 'family / tribe', readings: { on: ['ゾク'], kun: [] }, tags: ['N4'] },
	{ character: '旅', romaji: 'ryo / tabi', meaning: 'travel / journey', readings: { on: ['リョ'], kun: ['たび'] }, tags: ['N4'] },
	{ character: '館', romaji: 'kan', meaning: 'hall / building', readings: { on: ['カン'], kun: [] }, tags: ['N4'] },
	{ character: '飯', romaji: 'han / meshi', meaning: 'meal / cooked rice', readings: { on: ['ハン'], kun: ['めし'] }, tags: ['N4'] },
	{ character: '茶', romaji: 'cha / sa', meaning: 'tea', readings: { on: ['チャ', 'サ'], kun: [] }, tags: ['N4'] },
	{ character: '牛', romaji: 'gyuu / ushi', meaning: 'cow / beef', readings: { on: ['ギュウ'], kun: ['うし'] }, tags: ['N4'] },
	{ character: '肉', romaji: 'niku', meaning: 'meat / flesh', readings: { on: ['ニク'], kun: [] }, tags: ['N4'] },
	{ character: '魚', romaji: 'gyo / sakana', meaning: 'fish', readings: { on: ['ギョ'], kun: ['さかな', 'うお'] }, tags: ['N4'] },
	{ character: '鳥', romaji: 'chou / tori', meaning: 'bird', readings: { on: ['チョウ'], kun: ['とり'] }, tags: ['N4'] },
	{ character: '犬', romaji: 'ken / inu', meaning: 'dog', readings: { on: ['ケン'], kun: ['いぬ'] }, tags: ['N4'] },
	{ character: '猫', romaji: 'byou / neko', meaning: 'cat', readings: { on: ['ビョウ'], kun: ['ねこ'] }, tags: ['N4'] },
	{ character: '馬', romaji: 'ba / uma', meaning: 'horse', readings: { on: ['バ'], kun: ['うま', 'ま'] }, tags: ['N4'] },
	{ character: '林', romaji: 'rin / hayashi', meaning: 'woods / grove', readings: { on: ['リン'], kun: ['はやし'] }, tags: ['N4'] },
	{ character: '森', romaji: 'shin / mori', meaning: 'forest', readings: { on: ['シン'], kun: ['もり'] }, tags: ['N4'] },
	{ character: '石', romaji: 'seki / ishi', meaning: 'stone / rock', readings: { on: ['セキ', 'シャク', 'コク'], kun: ['いし'] }, tags: ['N4'] },
	{ character: '南', romaji: 'nan / minami', meaning: 'south', readings: { on: ['ナン', 'ナ'], kun: ['みなみ'] }, tags: ['N4'] },
	{ character: '北', romaji: 'hoku / kita', meaning: 'north', readings: { on: ['ホク'], kun: ['きた'] }, tags: ['N4'] },
	{ character: '東', romaji: 'tou / higashi', meaning: 'east', readings: { on: ['トウ'], kun: ['ひがし'] }, tags: ['N4'] },
	{ character: '西', romaji: 'sei / nishi', meaning: 'west', readings: { on: ['セイ', 'サイ'], kun: ['にし'] }, tags: ['N4'] },
	{ character: '春', romaji: 'shun / haru', meaning: 'spring', readings: { on: ['シュン'], kun: ['はる'] }, tags: ['N4'] },
	{ character: '夏', romaji: 'ka / natsu', meaning: 'summer', readings: { on: ['カ', 'ゲ'], kun: ['なつ'] }, tags: ['N4'] },
	{ character: '冬', romaji: 'tou / fuyu', meaning: 'winter', readings: { on: ['トウ'], kun: ['ふゆ'] }, tags: ['N4'] },
	{ character: '天', romaji: 'ten / ama', meaning: 'heaven / sky', readings: { on: ['テン'], kun: ['あま', 'あめ'] }, tags: ['N4'] },
	{ character: '気', romaji: 'ki / ke', meaning: 'spirit / energy', readings: { on: ['キ', 'ケ'], kun: [] }, tags: ['N4'] },
	{ character: '風', romaji: 'fuu / kaze', meaning: 'wind / style', readings: { on: ['フウ', 'フ'], kun: ['かぜ', 'かざ-'] }, tags: ['N4'] },
	{ character: '光', romaji: 'kou / hikari', meaning: 'light', readings: { on: ['コウ'], kun: ['ひかり', 'ひか-'] }, tags: ['N4'] },
	{ character: '池', romaji: 'chi / ike', meaning: 'pond / reservoir', readings: { on: ['チ'], kun: ['いけ'] }, tags: ['N4'] },
	{ character: '港', romaji: 'kou / minato', meaning: 'harbor / port', readings: { on: ['コウ'], kun: ['みなと'] }, tags: ['N4'] },
	{ character: '橋', romaji: 'kyou / hashi', meaning: 'bridge', readings: { on: ['キョウ'], kun: ['はし'] }, tags: ['N4'] },
	{ character: '角', romaji: 'kaku / kado', meaning: 'corner / angle', readings: { on: ['カク'], kun: ['かど', 'つの'] }, tags: ['N4'] },
	{ character: '番', romaji: 'ban', meaning: 'number / turn / watch', readings: { on: ['バン'], kun: [] }, tags: ['N4'] },
	{ character: '号', romaji: 'gou', meaning: 'number / name', readings: { on: ['ゴウ'], kun: [] }, tags: ['N4'] },
	{ character: '形', romaji: 'kei / kata', meaning: 'shape / form', readings: { on: ['ケイ', 'ギョウ'], kun: ['かた', 'かたち'] }, tags: ['N4'] },
	{ character: '色', romaji: 'shoku / iro', meaning: 'color', readings: { on: ['ショク', 'シキ'], kun: ['いろ'] }, tags: ['N4'] },
	{ character: '様', romaji: 'you / sama', meaning: 'manner / Mr./Ms.', readings: { on: ['ヨウ'], kun: ['さま'] }, tags: ['N4'] },
	{ character: '的', romaji: 'teki', meaning: 'target / -like (suffix)', readings: { on: ['テキ'], kun: ['まと'] }, tags: ['N4'] },
	{ character: '化', romaji: 'ka / ke', meaning: 'change / transform', readings: { on: ['カ', 'ケ'], kun: ['ば-'] }, tags: ['N4'] },
	{ character: '部', romaji: 'bu', meaning: 'part / section', readings: { on: ['ブ'], kun: [] }, tags: ['N4'] },
	{ character: '工', romaji: 'kou / ku', meaning: 'craft / work', readings: { on: ['コウ', 'ク'], kun: [] }, tags: ['N4'] },
	{ character: '建', romaji: 'ken / ta', meaning: 'build / construct', readings: { on: ['ケン', 'コン'], kun: ['た-'] }, tags: ['N4'] },
	{ character: '図', romaji: 'zu / haka', meaning: 'map / diagram', readings: { on: ['ズ', 'ト'], kun: ['はか-'] }, tags: ['N4'] },
	{ character: '歌', romaji: 'ka / uta', meaning: 'song / sing', readings: { on: ['カ'], kun: ['うた', 'うた-'] }, tags: ['N4'] },
	{ character: '写', romaji: 'sha / utsu', meaning: 'copy / photograph', readings: { on: ['シャ'], kun: ['うつ-'] }, tags: ['N4'] },
	{ character: '真', romaji: 'shin / ma', meaning: 'truth / genuine', readings: { on: ['シン'], kun: ['ま'] }, tags: ['N4'] },
	{ character: '切', romaji: 'setsu / ki', meaning: 'cut / important', readings: { on: ['セツ', 'サイ'], kun: ['き-'] }, tags: ['N4'] },
	{ character: '計', romaji: 'kei / haka', meaning: 'measure / plan', readings: { on: ['ケイ'], kun: ['はか-'] }, tags: ['N4'] },
	{ character: '台', romaji: 'dai / tai', meaning: 'stand / platform', readings: { on: ['ダイ', 'タイ'], kun: [] }, tags: ['N4'] },
	{ character: '交', romaji: 'kou / ma', meaning: 'exchange / mix', readings: { on: ['コウ'], kun: ['ま-', 'か-'] }, tags: ['N4'] },
	{ character: '悪', romaji: 'aku / waru', meaning: 'bad / evil', readings: { on: ['アク', 'オ'], kun: ['わる-'] }, tags: ['N4'] },
	{ character: '便', romaji: 'ben / bin', meaning: 'convenient / mail', readings: { on: ['ベン', 'ビン'], kun: ['たよ-'] }, tags: ['N4'] },
	{ character: '勉', romaji: 'ben', meaning: 'diligence / study', readings: { on: ['ベン'], kun: [] }, tags: ['N4'] },
	{ character: '特', romaji: 'toku', meaning: 'special', readings: { on: ['トク'], kun: [] }, tags: ['N4'] },
	{ character: '感', romaji: 'kan', meaning: 'feeling / sense', readings: { on: ['カン'], kun: [] }, tags: ['N4'] },
	{ character: '彼', romaji: 'kare / hi', meaning: 'he / that', readings: { on: ['ヒ'], kun: ['かれ', 'か-'] }, tags: ['N4'] },
	{ character: '有', romaji: 'yuu / a', meaning: 'exist / have', readings: { on: ['ユウ', 'ウ'], kun: ['あ-'] }, tags: ['N4'] },
	{ character: '無', romaji: 'mu / na', meaning: 'nothing / without', readings: { on: ['ム', 'ブ'], kun: ['な-'] }, tags: ['N4'] },
	{ character: '全', romaji: 'zen / matta', meaning: 'whole / complete', readings: { on: ['ゼン'], kun: ['まった-', 'すべ-'] }, tags: ['N4'] },
	{ character: '少', romaji: 'shou / suko', meaning: 'few / little', readings: { on: ['ショウ'], kun: ['すく-', 'すこ-'] }, tags: ['N4'] },
	{ character: '太', romaji: 'tai / futo', meaning: 'fat / thick', readings: { on: ['タイ', 'タ'], kun: ['ふと-'] }, tags: ['N4'] },
	{ character: '細', romaji: 'sai / hoso', meaning: 'thin / fine', readings: { on: ['サイ'], kun: ['ほそ-', 'こま-'] }, tags: ['N4'] },
	{ character: '長', romaji: 'chou / naga', meaning: 'long / chief', readings: { on: ['チョウ'], kun: ['なが-'] }, tags: ['N4'] },
	{ character: '短', romaji: 'tan / mijika', meaning: 'short', readings: { on: ['タン'], kun: ['みじか-'] }, tags: ['N4'] },
	{ character: '早', romaji: 'sou / haya', meaning: 'early / fast', readings: { on: ['ソウ', 'サッ'], kun: ['はや-'] }, tags: ['N4'] },
	{ character: '遅', romaji: 'chi / oso', meaning: 'late / slow', readings: { on: ['チ'], kun: ['おそ-'] }, tags: ['N4'] },
	{ character: '広', romaji: 'kou / hiro', meaning: 'wide / broad', readings: { on: ['コウ'], kun: ['ひろ-'] }, tags: ['N4'] },
	{ character: '若', romaji: 'jaku / waka', meaning: 'young', readings: { on: ['ジャク', 'ニャク'], kun: ['わか-', 'も-'] }, tags: ['N4'] },
	{ character: '暑', romaji: 'sho / atsu', meaning: 'hot (weather)', readings: { on: ['ショ'], kun: ['あつ-'] }, tags: ['N4'] },
	{ character: '寒', romaji: 'kan / samu', meaning: 'cold (weather)', readings: { on: ['カン'], kun: ['さむ-'] }, tags: ['N4'] },
	{ character: '暖', romaji: 'dan / atata', meaning: 'warm', readings: { on: ['ダン', 'ノン'], kun: ['あたた-'] }, tags: ['N4'] },
	{ character: '涼', romaji: 'ryou / suzu', meaning: 'cool / refreshing', readings: { on: ['リョウ'], kun: ['すず-'] }, tags: ['N4'] },
	{ character: '忙', romaji: 'bou / isoga', meaning: 'busy', readings: { on: ['ボウ', 'モウ'], kun: ['いそが-'] }, tags: ['N4'] },
	{ character: '悲', romaji: 'hi / kana', meaning: 'sad', readings: { on: ['ヒ'], kun: ['かな-'] }, tags: ['N4'] },
	{ character: '嬉', romaji: 'ki / ureshi', meaning: 'happy / glad', readings: { on: ['キ'], kun: ['うれ-'] }, tags: ['N4'] },
	{ character: '困', romaji: 'kon / koma', meaning: 'troubled / troubled', readings: { on: ['コン'], kun: ['こま-'] }, tags: ['N4'] },
	{ character: '心配', romaji: 'shinpai', meaning: 'worry / concern', readings: { on: ['シン', 'ハイ'], kun: [] }, tags: ['N4'] },
	{ character: '大事', romaji: 'daiji', meaning: 'important / serious', readings: { on: ['ダイ', 'ジ'], kun: [] }, tags: ['N4'] },
	{ character: '立派', romaji: 'rippa', meaning: 'splendid / fine', readings: { on: ['リッ', 'ハ'], kun: [] }, tags: ['N4'] },
	{ character: '変', romaji: 'hen / ka', meaning: 'strange / change', readings: { on: ['ヘン'], kun: ['か-'] }, tags: ['N4'] },
	{ character: '複', romaji: 'fuku', meaning: 'complex / double', readings: { on: ['フク'], kun: [] }, tags: ['N4'] },
	{ character: '雑', romaji: 'zatsu', meaning: 'miscellaneous / rough', readings: { on: ['ザツ', 'ゾウ'], kun: [] }, tags: ['N4'] },
	{ character: '残', romaji: 'zan / noko', meaning: 'remain / leftover', readings: { on: ['ザン'], kun: ['のこ-'] }, tags: ['N4'] },
	{ character: '受', romaji: 'ju / u', meaning: 'receive', readings: { on: ['ジュ'], kun: ['う-'] }, tags: ['N4'] },
	{ character: '伝', romaji: 'den / tsuta', meaning: 'transmit / convey', readings: { on: ['デン'], kun: ['つた-'] }, tags: ['N4'] },
	{ character: '説', romaji: 'setsu / toki', meaning: 'explain / theory', readings: { on: ['セツ', 'ゼイ'], kun: ['と-'] }, tags: ['N4'] },
	{ character: '信', romaji: 'shin', meaning: 'trust / believe', readings: { on: ['シン'], kun: [] }, tags: ['N4'] },
	{ character: '頼', romaji: 'rai / tano', meaning: 'rely / request', readings: { on: ['ライ'], kun: ['たの-', 'たよ-'] }, tags: ['N4'] },
	{ character: '決', romaji: 'ketsu / ki', meaning: 'decide', readings: { on: ['ケツ'], kun: ['き-'] }, tags: ['N4'] },
	{ character: '選', romaji: 'sen / era', meaning: 'select / choose', readings: { on: ['セン'], kun: ['えら-'] }, tags: ['N4'] },
	{ character: '調', romaji: 'chou / shira', meaning: 'investigate / tune', readings: { on: ['チョウ'], kun: ['しら-'] }, tags: ['N4'] },
	{ character: '払', romaji: 'futsu / hara', meaning: 'pay', readings: { on: ['フツ', 'ホツ'], kun: ['はら-'] }, tags: ['N4'] },
	{ character: '取', romaji: 'shu / to', meaning: 'take', readings: { on: ['シュ'], kun: ['と-'] }, tags: ['N4'] },
	{ character: '渡', romaji: 'to / wata', meaning: 'cross / hand over', readings: { on: ['ト'], kun: ['わた-'] }, tags: ['N4'] },
	{ character: '返', romaji: 'hen / kae', meaning: 'return / reply', readings: { on: ['ヘン'], kun: ['かえ-'] }, tags: ['N4'] },
	{ character: '落', romaji: 'raku / ochi', meaning: 'fall / drop', readings: { on: ['ラク'], kun: ['お-'] }, tags: ['N4'] },
	{ character: '続', romaji: 'zoku / tsuzu', meaning: 'continue', readings: { on: ['ゾク'], kun: ['つづ-'] }, tags: ['N4'] },
	{ character: '追', romaji: 'tsui / o', meaning: 'chase', readings: { on: ['ツイ'], kun: ['お-'] }, tags: ['N4'] },
];

// ─────────────────────────────────────────────
// JLPT N3 KANJI (370 kanji)
// ─────────────────────────────────────────────

const kanjiN3: CardItem[] = [
	{ character: '悪', romaji: 'aku / waru', meaning: 'bad / evil', readings: { on: ['アク', 'オ'], kun: ['わる-', 'にく-'] }, tags: ['N3'] },
	{ character: '安', romaji: 'an / yasu', meaning: 'cheap / peaceful', readings: { on: ['アン'], kun: ['やす-'] }, tags: ['N3'] },
	{ character: '暗', romaji: 'an / kura', meaning: 'dark', readings: { on: ['アン'], kun: ['くら-'] }, tags: ['N3'] },
	{ character: '意', romaji: 'i', meaning: 'intention / meaning', readings: { on: ['イ'], kun: [] }, tags: ['N3'] },
	{ character: '育', romaji: 'iku / soda', meaning: 'raise / grow', readings: { on: ['イク'], kun: ['そだ-', 'はぐく-'] }, tags: ['N3'] },
	{ character: '員', romaji: 'in', meaning: 'member / personnel', readings: { on: ['イン'], kun: [] }, tags: ['N3'] },
	{ character: '院', romaji: 'in', meaning: 'institution / hall', readings: { on: ['イン'], kun: [] }, tags: ['N3'] },
	{ character: '飲', romaji: 'in / no', meaning: 'drink', readings: { on: ['イン'], kun: ['の-'] }, tags: ['N3'] },
	{ character: '運', romaji: 'un / hako', meaning: 'carry / luck', readings: { on: ['ウン'], kun: ['はこ-'] }, tags: ['N3'] },
	{ character: '泳', romaji: 'ei / oyo', meaning: 'swim', readings: { on: ['エイ'], kun: ['およ-'] }, tags: ['N3'] },
	{ character: '英', romaji: 'ei', meaning: 'England / hero / excellent', readings: { on: ['エイ'], kun: [] }, tags: ['N3'] },
	{ character: '遠', romaji: 'en / too', meaning: 'far / distant', readings: { on: ['エン', 'オン'], kun: ['とお-'] }, tags: ['N3'] },
	{ character: '王', romaji: 'ou', meaning: 'king', readings: { on: ['オウ'], kun: [] }, tags: ['N3'] },
	{ character: '音', romaji: 'on / oto', meaning: 'sound', readings: { on: ['オン', 'イン'], kun: ['おと', 'ね'] }, tags: ['N3'] },
	{ character: '花', romaji: 'ka / hana', meaning: 'flower', readings: { on: ['カ'], kun: ['はな'] }, tags: ['N3'] },
	{ character: '荷', romaji: 'ka / ni', meaning: 'baggage / load', readings: { on: ['カ'], kun: ['に'] }, tags: ['N3'] },
	{ character: '界', romaji: 'kai', meaning: 'world / boundary', readings: { on: ['カイ'], kun: [] }, tags: ['N3'] },
	{ character: '各', romaji: 'kaku', meaning: 'each / every', readings: { on: ['カク'], kun: ['おのおの'] }, tags: ['N3'] },
	{ character: '角', romaji: 'kaku / kado', meaning: 'corner / angle / horn', readings: { on: ['カク'], kun: ['かど', 'つの'] }, tags: ['N3'] },
	{ character: '活', romaji: 'katsu', meaning: 'lively / life', readings: { on: ['カツ'], kun: [] }, tags: ['N3'] },
	{ character: '感', romaji: 'kan', meaning: 'feeling / sense', readings: { on: ['カン'], kun: [] }, tags: ['N3'] },
	{ character: '漢', romaji: 'kan', meaning: 'Chinese / kanji', readings: { on: ['カン'], kun: [] }, tags: ['N3'] },
	{ character: '館', romaji: 'kan', meaning: 'building / hall', readings: { on: ['カン'], kun: [] }, tags: ['N3'] },
	{ character: '岩', romaji: 'gan / iwa', meaning: 'boulder / rock', readings: { on: ['ガン'], kun: ['いわ'] }, tags: ['N3'] },
	{ character: '願', romaji: 'gan / nega', meaning: 'wish / request', readings: { on: ['ガン'], kun: ['ねが-'] }, tags: ['N3'] },
	{ character: '期', romaji: 'ki / go', meaning: 'period / term', readings: { on: ['キ', 'ゴ'], kun: [] }, tags: ['N3'] },
	{ character: '記', romaji: 'ki', meaning: 'record / notation', readings: { on: ['キ'], kun: ['しる-'] }, tags: ['N3'] },
	{ character: '帰', romaji: 'ki / kae', meaning: 'return home', readings: { on: ['キ'], kun: ['かえ-'] }, tags: ['N3'] },
	{ character: '起', romaji: 'ki / o', meaning: 'get up / occur', readings: { on: ['キ'], kun: ['お-'] }, tags: ['N3'] },
	{ character: '疑', romaji: 'gi / utaga', meaning: 'doubt / suspect', readings: { on: ['ギ'], kun: ['うたが-'] }, tags: ['N3'] },
	{ character: '急', romaji: 'kyuu / iso', meaning: 'urgent / hurry', readings: { on: ['キュウ'], kun: ['いそ-'] }, tags: ['N3'] },
	{ character: '球', romaji: 'kyuu / tama', meaning: 'ball / sphere', readings: { on: ['キュウ'], kun: ['たま'] }, tags: ['N3'] },
	{ character: '究', romaji: 'kyuu / kiwa', meaning: 'research / investigate', readings: { on: ['キュウ'], kun: ['きわ-'] }, tags: ['N3'] },
	{ character: '橋', romaji: 'kyou / hashi', meaning: 'bridge', readings: { on: ['キョウ'], kun: ['はし'] }, tags: ['N3'] },
	{ character: '業', romaji: 'gyou / waza', meaning: 'business / work', readings: { on: ['ギョウ', 'ゴウ'], kun: ['わざ'] }, tags: ['N3'] },
	{ character: '曲', romaji: 'kyoku / ma', meaning: 'bend / music', readings: { on: ['キョク'], kun: ['ま-'] }, tags: ['N3'] },
	{ character: '局', romaji: 'kyoku', meaning: 'bureau / office', readings: { on: ['キョク'], kun: [] }, tags: ['N3'] },
	{ character: '近', romaji: 'kin / chika', meaning: 'near / close', readings: { on: ['キン', 'コン'], kun: ['ちか-'] }, tags: ['N3'] },
	{ character: '空', romaji: 'kuu / sora', meaning: 'sky / empty', readings: { on: ['クウ'], kun: ['そら', 'あ-', 'から'] }, tags: ['N3'] },
	{ character: '軍', romaji: 'gun', meaning: 'army / military', readings: { on: ['グン'], kun: [] }, tags: ['N3'] },
	{ character: '形', romaji: 'kei / kata', meaning: 'shape / form', readings: { on: ['ケイ', 'ギョウ'], kun: ['かたち', 'かた'] }, tags: ['N3'] },
	{ character: '経', romaji: 'kei / he', meaning: 'pass through / longitude', readings: { on: ['ケイ', 'キョウ'], kun: ['へ-'] }, tags: ['N3'] },
	{ character: '計', romaji: 'kei / haka', meaning: 'measure / plan', readings: { on: ['ケイ'], kun: ['はか-'] }, tags: ['N3'] },
	{ character: '軽', romaji: 'kei / karu', meaning: 'light / easy', readings: { on: ['ケイ'], kun: ['かる-', 'かろ-'] }, tags: ['N3'] },
	{ character: '血', romaji: 'ketsu / chi', meaning: 'blood', readings: { on: ['ケツ'], kun: ['ち'] }, tags: ['N3'] },
	{ character: '現', romaji: 'gen / arawa', meaning: 'present / appear', readings: { on: ['ゲン'], kun: ['あらわ-'] }, tags: ['N3'] },
	{ character: '言', romaji: 'gen / koto', meaning: 'say / word', readings: { on: ['ゲン', 'ゴン'], kun: ['い-', 'こと'] }, tags: ['N3'] },
	{ character: '研', romaji: 'ken / to', meaning: 'polish / sharpen', readings: { on: ['ケン'], kun: ['と-'] }, tags: ['N3'] },
	{ character: '建', romaji: 'ken / ta', meaning: 'build / construct', readings: { on: ['ケン', 'コン'], kun: ['た-'] }, tags: ['N3'] },
	{ character: '験', romaji: 'ken / gen', meaning: 'effect / experience', readings: { on: ['ケン', 'ゲン'], kun: [] }, tags: ['N3'] },
	{ character: '原', romaji: 'gen / hara', meaning: 'original / field', readings: { on: ['ゲン'], kun: ['はら'] }, tags: ['N3'] },
	{ character: '固', romaji: 'ko / kata', meaning: 'hard / solid', readings: { on: ['コ'], kun: ['かた-'] }, tags: ['N3'] },
	{ character: '後', romaji: 'go / ato', meaning: 'after / behind', readings: { on: ['ゴ', 'コウ'], kun: ['あと', 'うし-', 'のち'] }, tags: ['N3'] },
	{ character: '語', romaji: 'go / kata', meaning: 'language / word', readings: { on: ['ゴ'], kun: ['かた-'] }, tags: ['N3'] },
	{ character: '工', romaji: 'kou / ku', meaning: 'craft / work', readings: { on: ['コウ', 'ク'], kun: [] }, tags: ['N3'] },
	{ character: '公', romaji: 'kou', meaning: 'public / official', readings: { on: ['コウ'], kun: ['おおやけ'] }, tags: ['N3'] },
	{ character: '効', romaji: 'kou / ki', meaning: 'effect / efficiency', readings: { on: ['コウ'], kun: ['き-'] }, tags: ['N3'] },
	{ character: '光', romaji: 'kou / hikari', meaning: 'light / shine', readings: { on: ['コウ'], kun: ['ひかり', 'ひか-'] }, tags: ['N3'] },
	{ character: '号', romaji: 'gou', meaning: 'number / name', readings: { on: ['ゴウ'], kun: [] }, tags: ['N3'] },
	{ character: '合', romaji: 'gou / a', meaning: 'combine / suit', readings: { on: ['ゴウ', 'ガッ'], kun: ['あ-'] }, tags: ['N3'] },
	{ character: '国', romaji: 'koku / kuni', meaning: 'country', readings: { on: ['コク'], kun: ['くに'] }, tags: ['N3'] },
	{ character: '黒', romaji: 'koku / kuro', meaning: 'black', readings: { on: ['コク'], kun: ['くろ-'] }, tags: ['N3'] },
	{ character: '今', romaji: 'kon / ima', meaning: 'now / this', readings: { on: ['コン', 'キン'], kun: ['いま'] }, tags: ['N3'] },
	{ character: '根', romaji: 'kon / ne', meaning: 'root / basis', readings: { on: ['コン'], kun: ['ね'] }, tags: ['N3'] },
	{ character: '差', romaji: 'sa / sa', meaning: 'difference / distinction', readings: { on: ['サ'], kun: ['さ-'] }, tags: ['N3'] },
	{ character: '最', romaji: 'sai / motto', meaning: 'most / extreme', readings: { on: ['サイ'], kun: ['もっと-'] }, tags: ['N3'] },
	{ character: '材', romaji: 'zai', meaning: 'timber / material', readings: { on: ['ザイ'], kun: [] }, tags: ['N3'] },
	{ character: '作', romaji: 'saku / tsuku', meaning: 'make / create', readings: { on: ['サク', 'サ'], kun: ['つく-'] }, tags: ['N3'] },
	{ character: '産', romaji: 'san / uma', meaning: 'birth / product', readings: { on: ['サン'], kun: ['う-'] }, tags: ['N3'] },
	{ character: '市', romaji: 'shi / ichi', meaning: 'city / market', readings: { on: ['シ'], kun: ['いち'] }, tags: ['N3'] },
	{ character: '死', romaji: 'shi / shi', meaning: 'death / die', readings: { on: ['シ'], kun: ['し-'] }, tags: ['N3'] },
	{ character: '指', romaji: 'shi / yubi', meaning: 'finger / point', readings: { on: ['シ'], kun: ['ゆび', 'さ-'] }, tags: ['N3'] },
	{ character: '止', romaji: 'shi / to', meaning: 'stop', readings: { on: ['シ'], kun: ['と-', 'や-'] }, tags: ['N3'] },
	{ character: '次', romaji: 'ji / tsugi', meaning: 'next / order', readings: { on: ['ジ', 'シ'], kun: ['つぎ', 'つ-'] }, tags: ['N3'] },
	{ character: '式', romaji: 'shiki', meaning: 'ceremony / formula', readings: { on: ['シキ'], kun: [] }, tags: ['N3'] },
	{ character: '実', romaji: 'jitsu / mi', meaning: 'reality / fruit', readings: { on: ['ジツ'], kun: ['み', 'みの-'] }, tags: ['N3'] },
	{ character: '写', romaji: 'sha / utsu', meaning: 'copy / photograph', readings: { on: ['シャ'], kun: ['うつ-'] }, tags: ['N3'] },
	{ character: '者', romaji: 'sha / mono', meaning: 'person / someone', readings: { on: ['シャ'], kun: ['もの'] }, tags: ['N3'] },
	{ character: '守', romaji: 'shu / mamo', meaning: 'protect / guard', readings: { on: ['シュ', 'ス'], kun: ['まも-', 'もり'] }, tags: ['N3'] },
	{ character: '首', romaji: 'shu / kubi', meaning: 'neck / head', readings: { on: ['シュ'], kun: ['くび'] }, tags: ['N3'] },
	{ character: '受', romaji: 'ju / u', meaning: 'receive', readings: { on: ['ジュ'], kun: ['う-'] }, tags: ['N3'] },
	{ character: '宿', romaji: 'shuku / yado', meaning: 'lodging / inn', readings: { on: ['シュク'], kun: ['やど-'] }, tags: ['N3'] },
	{ character: '術', romaji: 'jutsu', meaning: 'art / technique', readings: { on: ['ジュツ'], kun: [] }, tags: ['N3'] },
	{ character: '春', romaji: 'shun / haru', meaning: 'spring', readings: { on: ['シュン'], kun: ['はる'] }, tags: ['N3'] },
	{ character: '順', romaji: 'jun', meaning: 'order / sequence', readings: { on: ['ジュン'], kun: [] }, tags: ['N3'] },
	{ character: '初', romaji: 'sho / haji', meaning: 'first / beginning', readings: { on: ['ショ'], kun: ['はじ-', 'はつ', 'うい', 'そ-'] }, tags: ['N3'] },
	{ character: '勝', romaji: 'shou / ka', meaning: 'win / victory', readings: { on: ['ショウ'], kun: ['か-'] }, tags: ['N3'] },
	{ character: '消', romaji: 'shou / ki', meaning: 'extinguish / vanish', readings: { on: ['ショウ'], kun: ['き-', 'け-'] }, tags: ['N3'] },
	{ character: '乗', romaji: 'jou / no', meaning: 'ride / board', readings: { on: ['ジョウ'], kun: ['の-'] }, tags: ['N3'] },
	{ character: '植', romaji: 'shoku / u', meaning: 'plant / grow', readings: { on: ['ショク'], kun: ['う-'] }, tags: ['N3'] },
	{ character: '申', romaji: 'shin / mou', meaning: 'say humbly / monkey', readings: { on: ['シン'], kun: ['もう-'] }, tags: ['N3'] },
	{ character: '身', romaji: 'shin / mi', meaning: 'body / oneself', readings: { on: ['シン'], kun: ['み'] }, tags: ['N3'] },
	{ character: '信', romaji: 'shin', meaning: 'trust / believe', readings: { on: ['シン'], kun: [] }, tags: ['N3'] },
	{ character: '深', romaji: 'shin / fuka', meaning: 'deep / profound', readings: { on: ['シン'], kun: ['ふか-'] }, tags: ['N3'] },
	{ character: '進', romaji: 'shin / susu', meaning: 'advance / progress', readings: { on: ['シン'], kun: ['すす-'] }, tags: ['N3'] },
	{ character: '数', romaji: 'suu / kazu', meaning: 'number / count', readings: { on: ['スウ', 'ス', 'サク'], kun: ['かず', 'かぞ-'] }, tags: ['N3'] },
	{ character: '図', romaji: 'zu / haka', meaning: 'diagram / plan', readings: { on: ['ズ', 'ト'], kun: ['はか-'] }, tags: ['N3'] },
	{ character: '世', romaji: 'sei / yo', meaning: 'world / generation', readings: { on: ['セイ', 'セ'], kun: ['よ'] }, tags: ['N3'] },
	{ character: '整', romaji: 'sei / totono', meaning: 'tidy / arrange', readings: { on: ['セイ'], kun: ['ととの-'] }, tags: ['N3'] },
	{ character: '性', romaji: 'sei / shou', meaning: 'nature / sex / gender', readings: { on: ['セイ', 'ショウ'], kun: [] }, tags: ['N3'] },
	{ character: '政', romaji: 'sei / masa', meaning: 'politics / government', readings: { on: ['セイ', 'ショウ'], kun: ['まつりごと'] }, tags: ['N3'] },
	{ character: '席', romaji: 'seki', meaning: 'seat', readings: { on: ['セキ'], kun: [] }, tags: ['N3'] },
	{ character: '積', romaji: 'seki / tsu', meaning: 'accumulate / pile', readings: { on: ['セキ'], kun: ['つ-'] }, tags: ['N3'] },
	{ character: '説', romaji: 'setsu / to', meaning: 'explain / theory', readings: { on: ['セツ', 'ゼイ'], kun: ['と-'] }, tags: ['N3'] },
	{ character: '節', romaji: 'setsu / fushi', meaning: 'section / season', readings: { on: ['セツ', 'セチ'], kun: ['ふし'] }, tags: ['N3'] },
	{ character: '戦', romaji: 'sen / tataka', meaning: 'war / battle', readings: { on: ['セン'], kun: ['たたか-', 'いくさ'] }, tags: ['N3'] },
	{ character: '線', romaji: 'sen', meaning: 'line / track', readings: { on: ['セン'], kun: [] }, tags: ['N3'] },
	{ character: '全', romaji: 'zen / matta', meaning: 'whole / complete', readings: { on: ['ゼン'], kun: ['まった-', 'すべ-'] }, tags: ['N3'] },
	{ character: '想', romaji: 'sou', meaning: 'thought / idea', readings: { on: ['ソウ', 'ソ'], kun: ['おも-'] }, tags: ['N3'] },
	{ character: '争', romaji: 'sou / araso', meaning: 'compete / dispute', readings: { on: ['ソウ'], kun: ['あらそ-'] }, tags: ['N3'] },
	{ character: '相', romaji: 'sou / ai', meaning: 'mutually / appearance', readings: { on: ['ソウ', 'ショウ'], kun: ['あい-'] }, tags: ['N3'] },
	{ character: '続', romaji: 'zoku / tsuzu', meaning: 'continue', readings: { on: ['ゾク'], kun: ['つづ-'] }, tags: ['N3'] },
	{ character: '息', romaji: 'soku / iki', meaning: 'breath / son', readings: { on: ['ソク'], kun: ['いき'] }, tags: ['N3'] },
	{ character: '速', romaji: 'soku / haya', meaning: 'fast / speed', readings: { on: ['ソク'], kun: ['はや-', 'すみ-'] }, tags: ['N3'] },
	{ character: '側', romaji: 'soku / gawa', meaning: 'side / flank', readings: { on: ['ソク'], kun: ['がわ', 'そば'] }, tags: ['N3'] },
	{ character: '打', romaji: 'da / u', meaning: 'hit / strike', readings: { on: ['ダ'], kun: ['う-'] }, tags: ['N3'] },
	{ character: '対', romaji: 'tai / tsui', meaning: 'opposite / versus', readings: { on: ['タイ', 'ツイ'], kun: ['むか-'] }, tags: ['N3'] },
	{ character: '待', romaji: 'tai / ma', meaning: 'wait', readings: { on: ['タイ'], kun: ['ま-'] }, tags: ['N3'] },
	{ character: '達', romaji: 'tatsu', meaning: 'reach / attain', readings: { on: ['タツ', 'ダ'], kun: [] }, tags: ['N3'] },
	{ character: '談', romaji: 'dan', meaning: 'talk / discuss', readings: { on: ['ダン'], kun: [] }, tags: ['N3'] },
	{ character: '地', romaji: 'chi / ji', meaning: 'ground / place', readings: { on: ['チ', 'ジ'], kun: [] }, tags: ['N3'] },
	{ character: '注', romaji: 'chuu / sosogu', meaning: 'pour / attention', readings: { on: ['チュウ'], kun: ['そそ-', 'さ-'] }, tags: ['N3'] },
	{ character: '着', romaji: 'chaku / ki', meaning: 'arrive / wear', readings: { on: ['チャク', 'ジャク'], kun: ['き-', 'つ-'] }, tags: ['N3'] },
	{ character: '中', romaji: 'chuu / naka', meaning: 'middle / inside', readings: { on: ['チュウ'], kun: ['なか'] }, tags: ['N3'] },
	{ character: '柱', romaji: 'chuu / hashira', meaning: 'pillar / pole', readings: { on: ['チュウ'], kun: ['はしら'] }, tags: ['N3'] },
	{ character: '昼', romaji: 'chuu / hiru', meaning: 'noon / daytime', readings: { on: ['チュウ'], kun: ['ひる'] }, tags: ['N3'] },
	{ character: '頂', romaji: 'chou / itadaki', meaning: 'summit / top / receive humbly', readings: { on: ['チョウ'], kun: ['いただ-'] }, tags: ['N3'] },
	{ character: '調', romaji: 'chou / shira', meaning: 'investigate / tune', readings: { on: ['チョウ'], kun: ['しら-', 'とと-'] }, tags: ['N3'] },
	{ character: '通', romaji: 'tsuu / too', meaning: 'pass through / commute', readings: { on: ['ツウ', 'ツ'], kun: ['とお-', 'かよ-'] }, tags: ['N3'] },
	{ character: '低', romaji: 'tei / hiku', meaning: 'low / short', readings: { on: ['テイ'], kun: ['ひく-'] }, tags: ['N3'] },
	{ character: '定', romaji: 'tei / sada', meaning: 'decide / fixed', readings: { on: ['テイ', 'ジョウ'], kun: ['さだ-'] }, tags: ['N3'] },
	{ character: '的', romaji: 'teki / mato', meaning: 'target / -ic (suffix)', readings: { on: ['テキ'], kun: ['まと'] }, tags: ['N3'] },
	{ character: '点', romaji: 'ten', meaning: 'point / dot', readings: { on: ['テン'], kun: [] }, tags: ['N3'] },
	{ character: '電', romaji: 'den', meaning: 'electricity / lightning', readings: { on: ['デン'], kun: [] }, tags: ['N3'] },
	{ character: '特', romaji: 'toku', meaning: 'special', readings: { on: ['トク'], kun: [] }, tags: ['N3'] },
	{ character: '読', romaji: 'doku / yo', meaning: 'read', readings: { on: ['ドク', 'トク', 'トウ'], kun: ['よ-'] }, tags: ['N3'] },
	{ character: '内', romaji: 'nai / uchi', meaning: 'inside / within', readings: { on: ['ナイ', 'ダイ'], kun: ['うち'] }, tags: ['N3'] },
	{ character: '難', romaji: 'nan / muzuka', meaning: 'difficult / hard', readings: { on: ['ナン', 'ダン'], kun: ['むずか-', 'かた-'] }, tags: ['N3'] },
	{ character: '肉', romaji: 'niku', meaning: 'meat / flesh', readings: { on: ['ニク'], kun: [] }, tags: ['N3'] },
	{ character: '熱', romaji: 'netsu / atsu', meaning: 'heat / fever', readings: { on: ['ネツ'], kun: ['あつ-'] }, tags: ['N3'] },
	{ character: '年', romaji: 'nen / toshi', meaning: 'year', readings: { on: ['ネン'], kun: ['とし'] }, tags: ['N3'] },
	{ character: '農', romaji: 'nou', meaning: 'agriculture', readings: { on: ['ノウ'], kun: [] }, tags: ['N3'] },
	{ character: '能', romaji: 'nou', meaning: 'ability / talent', readings: { on: ['ノウ'], kun: [] }, tags: ['N3'] },
	{ character: '配', romaji: 'hai / kuba', meaning: 'distribute / worry', readings: { on: ['ハイ'], kun: ['くば-'] }, tags: ['N3'] },
	{ character: '反', romaji: 'han / hone', meaning: 'anti- / opposite', readings: { on: ['ハン', 'タン'], kun: ['そ-'] }, tags: ['N3'] },
	{ character: '板', romaji: 'han / ita', meaning: 'board / plank', readings: { on: ['ハン', 'バン'], kun: ['いた'] }, tags: ['N3'] },
	{ character: '悲', romaji: 'hi / kana', meaning: 'sad / grief', readings: { on: ['ヒ'], kun: ['かな-'] }, tags: ['N3'] },
	{ character: '美', romaji: 'bi / utsuku', meaning: 'beautiful', readings: { on: ['ビ', 'ミ'], kun: ['うつく-'] }, tags: ['N3'] },
	{ character: '表', romaji: 'hyou / omote', meaning: 'surface / express', readings: { on: ['ヒョウ'], kun: ['おもて', 'あらわ-'] }, tags: ['N3'] },
	{ character: '品', romaji: 'hin / shina', meaning: 'goods / article', readings: { on: ['ヒン', 'ホン'], kun: ['しな'] }, tags: ['N3'] },
	{ character: '部', romaji: 'bu / be', meaning: 'part / department', readings: { on: ['ブ'], kun: ['べ'] }, tags: ['N3'] },
	{ character: '服', romaji: 'fuku', meaning: 'clothes / obey', readings: { on: ['フク'], kun: [] }, tags: ['N3'] },
	{ character: '物', romaji: 'butsu / mono', meaning: 'thing / object', readings: { on: ['ブツ', 'モツ'], kun: ['もの'] }, tags: ['N3'] },
	{ character: '文', romaji: 'bun / fumi', meaning: 'writing / sentence', readings: { on: ['ブン', 'モン'], kun: ['ふみ'] }, tags: ['N3'] },
	{ character: '分', romaji: 'bun / waka', meaning: 'part / understand', readings: { on: ['ブン', 'フン', 'ブ'], kun: ['わ-'] }, tags: ['N3'] },
	{ character: '文化', romaji: 'bunka', meaning: 'culture', readings: { on: ['ブン', 'カ'], kun: [] }, tags: ['N3'] },
	{ character: '平', romaji: 'hei / taiра', meaning: 'flat / peaceful', readings: { on: ['ヘイ', 'ビョウ'], kun: ['たい-', 'ひら'] }, tags: ['N3'] },
	{ character: '別', romaji: 'betsu / waka', meaning: 'separate / different', readings: { on: ['ベツ'], kun: ['わか-'] }, tags: ['N3'] },
	{ character: '変', romaji: 'hen / ka', meaning: 'change / strange', readings: { on: ['ヘン'], kun: ['か-'] }, tags: ['N3'] },
	{ character: '返', romaji: 'hen / kae', meaning: 'return / reply', readings: { on: ['ヘン'], kun: ['かえ-'] }, tags: ['N3'] },
	{ character: '方', romaji: 'hou / kata', meaning: 'direction / way', readings: { on: ['ホウ'], kun: ['かた'] }, tags: ['N3'] },
	{ character: '報', romaji: 'hou', meaning: 'report / reward', readings: { on: ['ホウ'], kun: ['むく-'] }, tags: ['N3'] },
	{ character: '放', romaji: 'hou / hana', meaning: 'release / emit', readings: { on: ['ホウ'], kun: ['はな-', 'はな-'] }, tags: ['N3'] },
	{ character: '法', romaji: 'hou / no', meaning: 'law / method', readings: { on: ['ホウ', 'ハッ', 'ホッ'], kun: ['のり'] }, tags: ['N3'] },
	{ character: '亡', romaji: 'bou / na', meaning: 'die / lose', readings: { on: ['ボウ', 'モウ'], kun: ['な-'] }, tags: ['N3'] },
	{ character: '忘', romaji: 'bou / wasu', meaning: 'forget', readings: { on: ['ボウ'], kun: ['わす-'] }, tags: ['N3'] },
	{ character: '末', romaji: 'matsu / sue', meaning: 'end / tip', readings: { on: ['マツ', 'バツ'], kun: ['すえ'] }, tags: ['N3'] },
	{ character: '満', romaji: 'man / mi', meaning: 'full / satisfy', readings: { on: ['マン', 'バン'], kun: ['み-'] }, tags: ['N3'] },
	{ character: '命', romaji: 'mei / inochi', meaning: 'life / command', readings: { on: ['メイ', 'ミョウ'], kun: ['いのち'] }, tags: ['N3'] },
	{ character: '明', romaji: 'mei / aka', meaning: 'bright / clear', readings: { on: ['メイ', 'ミョウ'], kun: ['あか-', 'あき-', 'あ-'] }, tags: ['N3'] },
	{ character: '目', romaji: 'moku / me', meaning: 'eye / look', readings: { on: ['モク', 'ボク'], kun: ['め', 'ま-'] }, tags: ['N3'] },
	{ character: '問', romaji: 'mon / to', meaning: 'question / problem', readings: { on: ['モン'], kun: ['と-'] }, tags: ['N3'] },
	{ character: '役', romaji: 'yaku / e', meaning: 'role / service', readings: { on: ['ヤク', 'エキ'], kun: [] }, tags: ['N3'] },
	{ character: '約', romaji: 'yaku', meaning: 'promise / approximately', readings: { on: ['ヤク'], kun: [] }, tags: ['N3'] },
	{ character: '有', romaji: 'yuu / a', meaning: 'exist / have', readings: { on: ['ユウ', 'ウ'], kun: ['あ-'] }, tags: ['N3'] },
	{ character: '友', romaji: 'yuu / tomo', meaning: 'friend', readings: { on: ['ユウ'], kun: ['とも'] }, tags: ['N3'] },
	{ character: '用', romaji: 'you / mochi', meaning: 'use / business', readings: { on: ['ヨウ'], kun: ['もち-'] }, tags: ['N3'] },
	{ character: '洋', romaji: 'you', meaning: 'ocean / western', readings: { on: ['ヨウ'], kun: [] }, tags: ['N3'] },
	{ character: '様', romaji: 'you / sama', meaning: 'appearance / Mr/Ms', readings: { on: ['ヨウ'], kun: ['さま'] }, tags: ['N3'] },
	{ character: '要', romaji: 'you / i', meaning: 'need / important', readings: { on: ['ヨウ'], kun: ['い-'] }, tags: ['N3'] },
	{ character: '夜', romaji: 'ya / yoru', meaning: 'night', readings: { on: ['ヤ'], kun: ['よ', 'よる'] }, tags: ['N3'] },
	{ character: '野', romaji: 'ya / no', meaning: 'field / plains', readings: { on: ['ヤ'], kun: ['の'] }, tags: ['N3'] },
	{ character: '薬', romaji: 'yaku / kusuri', meaning: 'medicine / drug', readings: { on: ['ヤク'], kun: ['くすり'] }, tags: ['N3'] },
	{ character: '礼', romaji: 'rei / rei', meaning: 'thanks / courtesy', readings: { on: ['レイ', 'ライ'], kun: [] }, tags: ['N3'] },
	{ character: '列', romaji: 'retsu', meaning: 'row / file / column', readings: { on: ['レツ'], kun: [] }, tags: ['N3'] },
	{ character: '練', romaji: 'ren / ne', meaning: 'practice / knead', readings: { on: ['レン'], kun: ['ね-'] }, tags: ['N3'] },
	{ character: '路', romaji: 'ro / michi', meaning: 'road / path', readings: { on: ['ロ'], kun: ['じ', 'みち'] }, tags: ['N3'] },
	{ character: '和', romaji: 'wa / yawa', meaning: 'harmony / Japan', readings: { on: ['ワ', 'オ'], kun: ['やわ-', 'なご-'] }, tags: ['N3'] },
	{ character: '話', romaji: 'wa / hana', meaning: 'talk / story', readings: { on: ['ワ'], kun: ['はな-', 'はなし'] }, tags: ['N3'] },
	{ character: '々', romaji: 'noma', meaning: 'repetition mark', readings: { on: [], kun: [] }, tags: ['N3'] },
	{ character: '開', romaji: 'kai / hira', meaning: 'open', readings: { on: ['カイ'], kun: ['ひら-', 'あ-'] }, tags: ['N3'] },
	{ character: '代', romaji: 'dai / ka', meaning: 'generation / era / substitute', readings: { on: ['ダイ', 'タイ'], kun: ['か-', 'しろ'] }, tags: ['N3'] },
	{ character: '以', romaji: 'i', meaning: 'by means of / compared with', readings: { on: ['イ'], kun: ['もっ-'] }, tags: ['N3'] },
	{ character: '遊', romaji: 'yuu / aso', meaning: 'play / recreation', readings: { on: ['ユウ', 'ユ'], kun: ['あそ-'] }, tags: ['N3'] },
	{ character: '加', romaji: 'ka / kuwa', meaning: 'add / join', readings: { on: ['カ'], kun: ['くわ-'] }, tags: ['N3'] },
	{ character: '果', romaji: 'ka / hate', meaning: 'fruit / result', readings: { on: ['カ'], kun: ['は-', 'はて'] }, tags: ['N3'] },
	{ character: '夏', romaji: 'ka / natsu', meaning: 'summer', readings: { on: ['カ', 'ゲ'], kun: ['なつ'] }, tags: ['N3'] },
	{ character: '仮', romaji: 'ka / kari', meaning: 'temporary / false', readings: { on: ['カ', 'ケ'], kun: ['かり-'] }, tags: ['N3'] },
	{ character: '家', romaji: 'ka / ie', meaning: 'house / expert', readings: { on: ['カ', 'ケ'], kun: ['いえ', 'や'] }, tags: ['N3'] },
	{ character: '科', romaji: 'ka', meaning: 'department / subject', readings: { on: ['カ'], kun: [] }, tags: ['N3'] },
	{ character: '過', romaji: 'ka / sugi', meaning: 'pass / exceed', readings: { on: ['カ'], kun: ['す-', 'あやま-'] }, tags: ['N3'] },
	{ character: '価', romaji: 'ka / ata', meaning: 'value / price', readings: { on: ['カ'], kun: ['あたい'] }, tags: ['N3'] },
	{ character: '解', romaji: 'kai / to', meaning: 'solve / understand', readings: { on: ['カイ', 'ゲ'], kun: ['と-', 'ほど-'] }, tags: ['N3'] },
	{ character: '確', romaji: 'kaku / tashi', meaning: 'certain / confirm', readings: { on: ['カク'], kun: ['たし-', 'かた-'] }, tags: ['N3'] },
	{ character: '革', romaji: 'kaku / kawa', meaning: 'leather / reform', readings: { on: ['カク'], kun: ['かわ'] }, tags: ['N3'] },
	{ character: '格', romaji: 'kaku / ko', meaning: 'rank / status', readings: { on: ['カク', 'コウ', 'ゴウ'], kun: [] }, tags: ['N3'] },
	{ character: '干', romaji: 'kan / ho', meaning: 'dry / interfere', readings: { on: ['カン'], kun: ['ほ-'] }, tags: ['N3'] },
	{ character: '巻', romaji: 'kan / ma', meaning: 'roll / volume', readings: { on: ['カン'], kun: ['ま-'] }, tags: ['N3'] },
	{ character: '関', romaji: 'kan / seki', meaning: 'barrier / connection', readings: { on: ['カン'], kun: ['せき', 'かか-'] }, tags: ['N3'] },
	{ character: '完', romaji: 'kan', meaning: 'complete / perfect', readings: { on: ['カン'], kun: [] }, tags: ['N3'] },
	{ character: '眼', romaji: 'gan / me', meaning: 'eyeball / vision', readings: { on: ['ガン', 'ゲン'], kun: ['まなこ', 'め'] }, tags: ['N3'] },
	{ character: '寄', romaji: 'ki / yo', meaning: 'approach / gather', readings: { on: ['キ'], kun: ['よ-'] }, tags: ['N3'] },
	{ character: '奇', romaji: 'ki', meaning: 'strange / odd', readings: { on: ['キ'], kun: ['く-'] }, tags: ['N3'] },
	{ character: '危', romaji: 'ki / aya', meaning: 'dangerous', readings: { on: ['キ'], kun: ['あぶ-', 'あや-'] }, tags: ['N3'] },
	{ character: '規', romaji: 'ki', meaning: 'standard / rule', readings: { on: ['キ'], kun: [] }, tags: ['N3'] },
	{ character: '議', romaji: 'gi', meaning: 'deliberation / discussion', readings: { on: ['ギ'], kun: [] }, tags: ['N3'] },
	{ character: '技', romaji: 'gi / waza', meaning: 'skill / technique', readings: { on: ['ギ'], kun: ['わざ'] }, tags: ['N3'] },
	{ character: '逆', romaji: 'gyaku / saka', meaning: 'reverse / opposite', readings: { on: ['ギャク'], kun: ['さか-', 'さか'] }, tags: ['N3'] },
	{ character: '客', romaji: 'kyaku / kaku', meaning: 'guest / customer', readings: { on: ['キャク', 'カク'], kun: [] }, tags: ['N3'] },
	{ character: '許', romaji: 'kyo / yuru', meaning: 'permit / allow', readings: { on: ['キョ'], kun: ['ゆる-'] }, tags: ['N3'] },
	{ character: '共', romaji: 'kyou / tomo', meaning: 'together / both', readings: { on: ['キョウ'], kun: ['とも'] }, tags: ['N3'] },
	{ character: '協', romaji: 'kyou', meaning: 'co-operate', readings: { on: ['キョウ'], kun: [] }, tags: ['N3'] },
	{ character: '境', romaji: 'kyou / sakai', meaning: 'boundary / area', readings: { on: ['キョウ', 'ケイ'], kun: ['さかい'] }, tags: ['N3'] },
	{ character: '供', romaji: 'kyou / ku', meaning: 'offer / accompany', readings: { on: ['キョウ', 'ク'], kun: ['とも', 'そな-'] }, tags: ['N3'] },
	{ character: '況', romaji: 'kyou', meaning: 'condition / state of affairs', readings: { on: ['キョウ'], kun: [] }, tags: ['N3'] },
	{ character: '金', romaji: 'kin / kane', meaning: 'gold / money', readings: { on: ['キン', 'コン'], kun: ['かね', 'かな-'] }, tags: ['N3'] },
	{ character: '苦', romaji: 'ku / kuru', meaning: 'suffering / pain', readings: { on: ['ク'], kun: ['くる-', 'にが-', 'にく-'] }, tags: ['N3'] },
	{ character: '組', romaji: 'so / ku', meaning: 'group / assemble', readings: { on: ['ソ'], kun: ['く-'] }, tags: ['N3'] },
	{ character: '湖', romaji: 'ko / mizuumi', meaning: 'lake', readings: { on: ['コ'], kun: ['みずうみ'] }, tags: ['N3'] },
	{ character: '混', romaji: 'kon / ma', meaning: 'mix / confused', readings: { on: ['コン'], kun: ['ま-'] }, tags: ['N3'] },
	{ character: '骨', romaji: 'kotsu / hone', meaning: 'bone', readings: { on: ['コツ'], kun: ['ほね'] }, tags: ['N3'] },
	{ character: '際', romaji: 'sai / kiwa', meaning: 'occasion / edge', readings: { on: ['サイ'], kun: ['きわ'] }, tags: ['N3'] },
	{ character: '幸', romaji: 'kou / shiawa', meaning: 'happiness / fortune', readings: { on: ['コウ'], kun: ['さち', 'しあわ-'] }, tags: ['N3'] },
	{ character: '港', romaji: 'kou / minato', meaning: 'harbor / port', readings: { on: ['コウ'], kun: ['みなと'] }, tags: ['N3'] },
	{ character: '降', romaji: 'kou / fu', meaning: 'descend / precipitate', readings: { on: ['コウ'], kun: ['お-', 'ふ-'] }, tags: ['N3'] },
	{ character: '告', romaji: 'koku / tsu', meaning: 'inform / announce', readings: { on: ['コク'], kun: ['つ-'] }, tags: ['N3'] },
	{ character: '困', romaji: 'kon / koma', meaning: 'troubled / distressed', readings: { on: ['コン'], kun: ['こま-'] }, tags: ['N3'] },
	{ character: '座', romaji: 'za / suwa', meaning: 'sit / seat', readings: { on: ['ザ'], kun: ['すわ-'] }, tags: ['N3'] },
	{ character: '罪', romaji: 'zai / tsumi', meaning: 'crime / sin', readings: { on: ['ザイ'], kun: ['つみ'] }, tags: ['N3'] },
	{ character: '冊', romaji: 'satsu / saku', meaning: 'volume / counter for books', readings: { on: ['サツ', 'サク'], kun: [] }, tags: ['N3'] },
	{ character: '刷', romaji: 'satsu / su', meaning: 'print', readings: { on: ['サツ'], kun: ['す-'] }, tags: ['N3'] },
	{ character: '酸', romaji: 'san / su', meaning: 'acid / sour', readings: { on: ['サン'], kun: ['す-'] }, tags: ['N3'] },
	{ character: '参', romaji: 'san / mai', meaning: 'attend / visit humbly', readings: { on: ['サン'], kun: ['まい-'] }, tags: ['N3'] },
	{ character: '試', romaji: 'shi / kokoromi', meaning: 'test / try', readings: { on: ['シ'], kun: ['こころ-', 'ため-'] }, tags: ['N3'] },
	{ character: '自', romaji: 'ji / mizuka', meaning: 'oneself / self', readings: { on: ['ジ', 'シ'], kun: ['みずか-'] }, tags: ['N3'] },
	{ character: '辞', romaji: 'ji / ya', meaning: 'quit / resign', readings: { on: ['ジ'], kun: ['や-'] }, tags: ['N3'] },
	{ character: '捨', romaji: 'sha / su', meaning: 'throw away', readings: { on: ['シャ'], kun: ['す-'] }, tags: ['N3'] },
	{ character: '集', romaji: 'shuu / atsu', meaning: 'gather / collect', readings: { on: ['シュウ'], kun: ['あつ-'] }, tags: ['N3'] },
	{ character: '祝', romaji: 'shuku / iwa', meaning: 'celebrate', readings: { on: ['シュク', 'シュウ'], kun: ['いわ-'] }, tags: ['N3'] },
	{ character: '州', romaji: 'shuu / su', meaning: 'state / continent', readings: { on: ['シュウ'], kun: ['す'] }, tags: ['N3'] },
	{ character: '周', romaji: 'shuu / mawa', meaning: 'circumference / around', readings: { on: ['シュウ'], kun: ['まわ-'] }, tags: ['N3'] },
	{ character: '場', romaji: 'jou / ba', meaning: 'place / location', readings: { on: ['ジョウ'], kun: ['ば'] }, tags: ['N3'] },
	{ character: '丈', romaji: 'jou / take', meaning: 'stature / length', readings: { on: ['ジョウ'], kun: ['たけ'] }, tags: ['N3'] },
	{ character: '城', romaji: 'jou / shiro', meaning: 'castle', readings: { on: ['ジョウ', 'セイ'], kun: ['しろ'] }, tags: ['N3'] },
	{ character: '常', romaji: 'jou / tsune', meaning: 'normal / usual', readings: { on: ['ジョウ'], kun: ['つね', 'とこ'] }, tags: ['N3'] },
	{ character: '状', romaji: 'jou', meaning: 'condition / form', readings: { on: ['ジョウ'], kun: [] }, tags: ['N3'] },
	{ character: '助', romaji: 'jo / tasu', meaning: 'help / assist', readings: { on: ['ジョ'], kun: ['たす-', 'すけ'] }, tags: ['N3'] },
	{ character: '除', romaji: 'jo / nozoku', meaning: 'exclude / remove', readings: { on: ['ジョ', 'ジ'], kun: ['のぞ-'] }, tags: ['N3'] },
	{ character: '商', romaji: 'shou / akina', meaning: 'commerce / trade', readings: { on: ['ショウ'], kun: ['あきな-'] }, tags: ['N3'] },
	{ character: '将', romaji: 'shou', meaning: 'general / commander', readings: { on: ['ショウ', 'ソウ'], kun: [] }, tags: ['N3'] },
	{ character: '上', romaji: 'jou / ue', meaning: 'above / up', readings: { on: ['ジョウ', 'ショウ'], kun: ['うえ', 'うわ-', 'かみ', 'あ-', 'のぼ-'] }, tags: ['N3'] },
	{ character: '触', romaji: 'shoku / sa', meaning: 'touch / contact', readings: { on: ['ショク'], kun: ['ふ-', 'さわ-'] }, tags: ['N3'] },
	{ character: '察', romaji: 'satsu', meaning: 'guess / perceive', readings: { on: ['サツ'], kun: [] }, tags: ['N3'] },
	{ character: '散', romaji: 'san / chi', meaning: 'scatter / disperse', readings: { on: ['サン'], kun: ['ち-'] }, tags: ['N3'] },
	{ character: '支', romaji: 'shi / sasae', meaning: 'branch / support', readings: { on: ['シ'], kun: ['ささ-'] }, tags: ['N3'] },
	{ character: '私', romaji: 'shi / watashi', meaning: 'I / private', readings: { on: ['シ'], kun: ['わたし', 'わたくし'] }, tags: ['N3'] },
	{ character: '施', romaji: 'shi / se', meaning: 'give / perform', readings: { on: ['シ', 'セ'], kun: ['ほどこ-'] }, tags: ['N3'] },
	{ character: '志', romaji: 'shi / kokorozashi', meaning: 'aspiration / will', readings: { on: ['シ'], kun: ['こころざ-', 'こころざし'] }, tags: ['N3'] },
	{ character: '誌', romaji: 'shi', meaning: 'journal / magazine', readings: { on: ['シ'], kun: [] }, tags: ['N3'] },
	{ character: '歯', romaji: 'shi / ha', meaning: 'tooth', readings: { on: ['シ'], kun: ['は'] }, tags: ['N3'] },
	{ character: '質', romaji: 'shitsu / chi', meaning: 'quality / nature', readings: { on: ['シツ', 'チ'], kun: [] }, tags: ['N3'] },
	{ character: '社', romaji: 'sha', meaning: 'company / society / shrine', readings: { on: ['シャ'], kun: ['やしろ'] }, tags: ['N3'] },
	{ character: '若', romaji: 'jaku / waka', meaning: 'young', readings: { on: ['ジャク', 'ニャク'], kun: ['わか-', 'も-'] }, tags: ['N3'] },
	{ character: '弱', romaji: 'jaku / yowa', meaning: 'weak', readings: { on: ['ジャク'], kun: ['よわ-'] }, tags: ['N3'] },
	{ character: '石', romaji: 'seki / ishi', meaning: 'stone', readings: { on: ['セキ', 'シャク', 'コク'], kun: ['いし'] }, tags: ['N3'] },
	{ character: '赤', romaji: 'seki / aka', meaning: 'red', readings: { on: ['セキ', 'シャク'], kun: ['あか-'] }, tags: ['N3'] },
	{ character: '専', romaji: 'sen / moppa', meaning: 'specialty / exclusive', readings: { on: ['セン'], kun: ['もっぱ-'] }, tags: ['N3'] },
	{ character: '選', romaji: 'sen / era', meaning: 'select / choose', readings: { on: ['セン'], kun: ['えら-'] }, tags: ['N3'] },
	{ character: '底', romaji: 'tei / soko', meaning: 'bottom / base', readings: { on: ['テイ'], kun: ['そこ'] }, tags: ['N3'] },
	{ character: '等', romaji: 'tou / nado', meaning: 'equal / etc.', readings: { on: ['トウ'], kun: ['など', 'ひと-'] }, tags: ['N3'] },
	{ character: '土', romaji: 'do / tsuchi', meaning: 'earth / soil', readings: { on: ['ド', 'ト'], kun: ['つち'] }, tags: ['N3'] },
	{ character: '島', romaji: 'tou / shima', meaning: 'island', readings: { on: ['トウ'], kun: ['しま'] }, tags: ['N3'] },
	{ character: '湯', romaji: 'tou / yu', meaning: 'hot water / bath', readings: { on: ['トウ'], kun: ['ゆ'] }, tags: ['N3'] },
	{ character: '登', romaji: 'tou / nobo', meaning: 'climb / ascend', readings: { on: ['トウ', 'ト'], kun: ['のぼ-'] }, tags: ['N3'] },
	{ character: '動', romaji: 'dou / ugo', meaning: 'move / motion', readings: { on: ['ドウ'], kun: ['うご-'] }, tags: ['N3'] },
	{ character: '道', romaji: 'dou / michi', meaning: 'road / way', readings: { on: ['ドウ', 'トウ'], kun: ['みち'] }, tags: ['N3'] },
	{ character: '独', romaji: 'doku / hito', meaning: 'alone / Germany', readings: { on: ['ドク'], kun: ['ひと-'] }, tags: ['N3'] },
	{ character: '届', romaji: 'todo', meaning: 'deliver / reach', readings: { on: [], kun: ['とど-'] }, tags: ['N3'] },
	{ character: '仲', romaji: 'chuu / naka', meaning: 'relation / middleman', readings: { on: ['チュウ'], kun: ['なか'] }, tags: ['N3'] },
	{ character: '直', romaji: 'choku / nao', meaning: 'straight / fix', readings: { on: ['チョク', 'ジキ'], kun: ['なお-', 'ただ-'] }, tags: ['N3'] },
	{ character: '追', romaji: 'tsui / o', meaning: 'chase / follow', readings: { on: ['ツイ'], kun: ['お-'] }, tags: ['N3'] },
	{ character: '都', romaji: 'to / miyako', meaning: 'capital / metropolis', readings: { on: ['ト', 'ツ'], kun: ['みやこ'] }, tags: ['N3'] },
	{ character: '取', romaji: 'shu / to', meaning: 'take / obtain', readings: { on: ['シュ'], kun: ['と-'] }, tags: ['N3'] },
	{ character: '得', romaji: 'toku / e', meaning: 'obtain / gain', readings: { on: ['トク'], kun: ['え-', 'う-'] }, tags: ['N3'] },
	{ character: '認', romaji: 'nin / mito', meaning: 'recognize / admit', readings: { on: ['ニン'], kun: ['みと-'] }, tags: ['N3'] },
	{ character: '念', romaji: 'nen', meaning: 'thought / idea', readings: { on: ['ネン'], kun: [] }, tags: ['N3'] },
	{ character: '敗', romaji: 'hai / yabu', meaning: 'defeat / lose', readings: { on: ['ハイ'], kun: ['やぶ-'] }, tags: ['N3'] },
	{ character: '比', romaji: 'hi / kura', meaning: 'compare / ratio', readings: { on: ['ヒ'], kun: ['くら-'] }, tags: ['N3'] },
	{ character: '批', romaji: 'hi', meaning: 'criticism', readings: { on: ['ヒ'], kun: [] }, tags: ['N3'] },
	{ character: '皮', romaji: 'hi / kawa', meaning: 'skin / peel', readings: { on: ['ヒ'], kun: ['かわ'] }, tags: ['N3'] },
	{ character: '費', romaji: 'hi / tsuiya', meaning: 'expense / spend', readings: { on: ['ヒ'], kun: ['つい-'] }, tags: ['N3'] },
	{ character: '非', romaji: 'hi', meaning: 'un- / not', readings: { on: ['ヒ'], kun: [] }, tags: ['N3'] },
	{ character: '飛', romaji: 'hi / to', meaning: 'fly', readings: { on: ['ヒ'], kun: ['と-'] }, tags: ['N3'] },
	{ character: '付', romaji: 'fu / tsu', meaning: 'attach / adhere', readings: { on: ['フ'], kun: ['つ-'] }, tags: ['N3'] },
	{ character: '負', romaji: 'fu / ma', meaning: 'lose / carry', readings: { on: ['フ'], kun: ['ま-', 'お-'] }, tags: ['N3'] },
	{ character: '武', romaji: 'bu / take', meaning: 'military / warrior', readings: { on: ['ブ', 'ム'], kun: ['たけ-'] }, tags: ['N3'] },
	{ character: '複', romaji: 'fuku', meaning: 'complex / double', readings: { on: ['フク'], kun: [] }, tags: ['N3'] },
	{ character: '粉', romaji: 'fun / ko', meaning: 'powder / flour', readings: { on: ['フン'], kun: ['こ', 'こな'] }, tags: ['N3'] },
	{ character: '辺', romaji: 'hen / ata', meaning: 'area / vicinity', readings: { on: ['ヘン'], kun: ['あた-', 'べ'] }, tags: ['N3'] },
	{ character: '歩', romaji: 'ho / aru', meaning: 'walk / step', readings: { on: ['ホ', 'ブ', 'フ'], kun: ['ある-', 'あゆ-'] }, tags: ['N3'] },
	{ character: '訪', romaji: 'hou / otazu', meaning: 'visit', readings: { on: ['ホウ'], kun: ['おとず-', 'たず-'] }, tags: ['N3'] },
	{ character: '棒', romaji: 'bou', meaning: 'stick / rod', readings: { on: ['ボウ'], kun: [] }, tags: ['N3'] },
	{ character: '民', romaji: 'min / tami', meaning: 'people / nation', readings: { on: ['ミン'], kun: ['たみ'] }, tags: ['N3'] },
	{ character: '無', romaji: 'mu / na', meaning: 'nothing / without', readings: { on: ['ム', 'ブ'], kun: ['な-'] }, tags: ['N3'] },
	{ character: '迷', romaji: 'mei / mayo', meaning: 'lost / puzzled', readings: { on: ['メイ'], kun: ['まよ-'] }, tags: ['N3'] },
	{ character: '面', romaji: 'men / omo', meaning: 'face / surface', readings: { on: ['メン', 'ベン'], kun: ['おも', 'おもて', 'つら'] }, tags: ['N3'] },
	{ character: '由', romaji: 'yuu / yu', meaning: 'reason / cause', readings: { on: ['ユウ', 'ユ', 'ユイ'], kun: ['よし'] }, tags: ['N3'] },
	{ character: '優', romaji: 'yuu / yasa', meaning: 'gentle / superior', readings: { on: ['ユウ'], kun: ['やさ-', 'すぐ-'] }, tags: ['N3'] },
	{ character: '欲', romaji: 'yoku / hoshi', meaning: 'desire / want', readings: { on: ['ヨク'], kun: ['ほ-'] }, tags: ['N3'] },
	{ character: '翌', romaji: 'yoku', meaning: 'following (day)', readings: { on: ['ヨク'], kun: [] }, tags: ['N3'] },
	{ character: '落', romaji: 'raku / ochi', meaning: 'fall / drop', readings: { on: ['ラク'], kun: ['お-'] }, tags: ['N3'] },
	{ character: '利', romaji: 'ri / ki', meaning: 'advantage / profit', readings: { on: ['リ'], kun: ['き-'] }, tags: ['N3'] },
	{ character: '理', romaji: 'ri', meaning: 'reason / logic', readings: { on: ['リ'], kun: [] }, tags: ['N3'] },
	{ character: '量', romaji: 'ryou / haka', meaning: 'quantity / measure', readings: { on: ['リョウ'], kun: ['はか-'] }, tags: ['N3'] },
	{ character: '林', romaji: 'rin / hayashi', meaning: 'woods / grove', readings: { on: ['リン'], kun: ['はやし'] }, tags: ['N3'] },
	{ character: '輪', romaji: 'rin / wa', meaning: 'wheel / ring', readings: { on: ['リン'], kun: ['わ'] }, tags: ['N3'] },
	{ character: '歴', romaji: 'reki', meaning: 'history / career', readings: { on: ['レキ'], kun: [] }, tags: ['N3'] },
	{ character: '連', romaji: 'ren / tsura', meaning: 'connect / take along', readings: { on: ['レン'], kun: ['つら-', 'つ-'] }, tags: ['N3'] },
	{ character: '論', romaji: 'ron', meaning: 'argument / theory', readings: { on: ['ロン'], kun: [] }, tags: ['N3'] },
	{ character: '渡', romaji: 'to / wata', meaning: 'cross / hand over', readings: { on: ['ト'], kun: ['わた-'] }, tags: ['N3'] },
	{ character: '廊', romaji: 'rou', meaning: 'corridor / hall', readings: { on: ['ロウ'], kun: [] }, tags: ['N3'] },
	{ character: '老', romaji: 'rou / o', meaning: 'old age', readings: { on: ['ロウ'], kun: ['お-', 'ふ-'] }, tags: ['N3'] },
	{ character: '労', romaji: 'rou', meaning: 'labor / toil', readings: { on: ['ロウ'], kun: ['ねぎら-'] }, tags: ['N3'] },
	{ character: '緑', romaji: 'ryoku / midori', meaning: 'green', readings: { on: ['リョク', 'ロク'], kun: ['みどり'] }, tags: ['N3'] },
	{ character: '令', romaji: 'rei', meaning: 'command / order', readings: { on: ['レイ'], kun: [] }, tags: ['N3'] },
	{ character: '例', romaji: 'rei / tato', meaning: 'example / precedent', readings: { on: ['レイ'], kun: ['たと-'] }, tags: ['N3'] },
	{ character: '冷', romaji: 'rei / tsu', meaning: 'cold / cool', readings: { on: ['レイ'], kun: ['つめ-', 'ひ-', 'さ-'] }, tags: ['N3'] },
];

const vocabulary: CardItem[] = [
	{ character: 'ママ', romaji: 'mama', meaning: 'mom' },
	{ character: 'パパ', romaji: 'papa', meaning: 'dad' },
	{ character: 'はい', romaji: 'hai', meaning: 'yes' },
	{ character: 'ワンワン', romaji: 'wan-wan', meaning: 'woof (doggy)' },
	{ character: 'ニャーニャー', romaji: 'nyā-nyā', meaning: 'meow (kitty)' },
	{ character: 'おいしい', romaji: 'oishii', meaning: 'delicious' },
	{ character: 'いたい', romaji: 'itai', meaning: 'ouch / it hurts' },
	{ character: 'すき', romaji: 'suki', meaning: 'like / love' },
	{ character: 'だめ', romaji: 'dame', meaning: 'no good / stop' },
	{ character: 'あぶない', romaji: 'abunai', meaning: 'dangerous' },
	{ character: 'こんにちは', romaji: 'konnichiwa', meaning: 'hello' },
	{ character: 'ありがとう', romaji: 'arigatou', meaning: 'thank you' },
	{ character: 'ごめんなさい', romaji: 'gomen nasai', meaning: "I'm sorry" },
	{ character: 'さようなら', romaji: 'sayounara', meaning: 'goodbye' },
	{ character: 'おはよう', romaji: 'ohayou', meaning: 'good morning' }
];

// ─────────────────────────────────────────────
// ESSENTIAL PHRASES
// ─────────────────────────────────────────────

const essentialGreetings: CardItem[] = [
	{
		character: 'こんにちは',
		romaji: 'konnichiwa',
		meaning: 'hello / good afternoon',
		context: 'All-purpose daytime greeting, safe any time between late morning and evening.',
		tags: ['phrase', 'N5', 'greeting']
	},
	{
		character: 'おはようございます',
		romaji: 'ohayou gozaimasu',
		meaning: 'good morning (polite)',
		context: 'Polite morning greeting — use at work, school, or with strangers before midday.',
		tags: ['phrase', 'N5', 'greeting']
	},
	{
		character: 'おはよう',
		romaji: 'ohayou',
		meaning: 'good morning (casual)',
		context: 'Casual version of おはようございます — fine with friends and family.',
		tags: ['phrase', 'N5', 'greeting']
	},
	{
		character: 'こんばんは',
		romaji: 'konbanwa',
		meaning: 'good evening',
		context: 'Evening greeting once the sun goes down or after around 6 pm.',
		tags: ['phrase', 'N5', 'greeting']
	},
	{
		character: 'おやすみなさい',
		romaji: 'oyasumi nasai',
		meaning: 'good night (polite)',
		context: 'Said when parting at night or heading to bed. Drop なさい for casual speech.',
		tags: ['phrase', 'N5', 'greeting']
	},
	{
		character: 'さようなら',
		romaji: 'sayounara',
		meaning: 'goodbye (formal)',
		context: 'A final, somewhat formal farewell — implies you may not see each other soon.',
		tags: ['phrase', 'N5', 'greeting']
	},
	{
		character: 'またね',
		romaji: 'mata ne',
		meaning: 'see you later',
		context: 'Casual "see you" between friends — implies you will meet again soon.',
		tags: ['phrase', 'N5', 'greeting']
	},
	{
		character: 'じゃあね',
		romaji: 'jā ne',
		meaning: 'bye then / later',
		context: 'Very casual parting word, equivalent to "later" or "catch ya."',
		tags: ['phrase', 'N5', 'greeting']
	},
	{
		character: 'よろしくおねがいします',
		romaji: 'yoroshiku onegaishimasu',
		meaning: 'pleased to meet you / I\'m in your care',
		context: 'Said when meeting someone new, starting a project together, or asking a favour.',
		tags: ['phrase', 'N5', 'greeting']
	},
	{
		character: 'はじめまして',
		romaji: 'hajimemashite',
		meaning: 'nice to meet you',
		context: 'Said the very first time you meet someone — comes before よろしくおねがいします.',
		tags: ['phrase', 'N5', 'greeting']
	}
];

const essentialPoliteness: CardItem[] = [
	{
		character: 'ありがとうございます',
		romaji: 'arigatou gozaimasu',
		meaning: 'thank you very much',
		context: 'Polite thank-you for any situation. Drop ございます for a casual ありがとう.',
		tags: ['phrase', 'N5', 'polite']
	},
	{
		character: 'どういたしまして',
		romaji: 'dou itashimashite',
		meaning: 'you\'re welcome',
		context: 'Standard reply to a thank-you. Also いえいえ ("not at all") works for casual settings.',
		tags: ['phrase', 'N5', 'polite']
	},
	{
		character: 'すみません',
		romaji: 'sumimasen',
		meaning: 'excuse me / I\'m sorry',
		context: 'The most useful word in Japan: gets attention, apologises for small inconveniences, says "pardon me."',
		tags: ['phrase', 'N5', 'polite']
	},
	{
		character: 'ごめんなさい',
		romaji: 'gomen nasai',
		meaning: 'I\'m sorry (sincere)',
		context: 'A genuine apology for a mistake or wrongdoing — more heartfelt than すみません.',
		tags: ['phrase', 'N5', 'polite']
	},
	{
		character: 'おねがいします',
		romaji: 'onegaishimasu',
		meaning: 'please (I humbly request)',
		context: 'Said when making a request or placing an order — politer than ください alone.',
		tags: ['phrase', 'N5', 'polite']
	},
	{
		character: 'どうぞ',
		romaji: 'douzo',
		meaning: 'please go ahead / here you are',
		context: 'Offering something, inviting someone through a door, or urging someone to proceed.',
		tags: ['phrase', 'N5', 'polite']
	},
	{
		character: 'いただきます',
		romaji: 'itadakimasu',
		meaning: 'let\'s eat / I humbly receive',
		context: 'Said before eating — expresses gratitude for the food. Never skip it in Japan.',
		tags: ['phrase', 'N5', 'polite']
	},
	{
		character: 'ごちそうさまでした',
		romaji: 'gochisousama deshita',
		meaning: 'thank you for the meal',
		context: 'Said after finishing a meal to express gratitude to the cook or host.',
		tags: ['phrase', 'N5', 'polite']
	}
];

const essentialNavigation: CardItem[] = [
	{
		character: 'どこですか',
		romaji: 'doko desu ka',
		meaning: 'where is it?',
		context: 'Ask this after naming a place — e.g. "駅はどこですか" (where is the station?).',
		tags: ['phrase', 'N5', 'travel']
	},
	{
		character: 'えき',
		romaji: 'eki',
		meaning: 'station (train/subway)',
		context: 'Key word for getting around — combine with どこ or the line name.',
		tags: ['phrase', 'N5', 'travel']
	},
	{
		character: 'トイレ',
		romaji: 'toire',
		meaning: 'toilet / restroom',
		context: 'Ask "トイレはどこですか" and you will never be lost in Japan.',
		tags: ['phrase', 'N5', 'travel']
	},
	{
		character: 'みぎ',
		romaji: 'migi',
		meaning: 'right (direction)',
		context: 'Used in directions — みぎにまがってください means "please turn right."',
		tags: ['phrase', 'N5', 'travel']
	},
	{
		character: 'ひだり',
		romaji: 'hidari',
		meaning: 'left (direction)',
		context: 'Used in directions — ひだりにまがってください means "please turn left."',
		tags: ['phrase', 'N5', 'travel']
	},
	{
		character: 'まっすぐ',
		romaji: 'massugu',
		meaning: 'straight ahead',
		context: 'A direction word you will hear constantly — まっすぐいってください means "go straight."',
		tags: ['phrase', 'N5', 'travel']
	},
	{
		character: 'ちょっとまってください',
		romaji: 'chotto matte kudasai',
		meaning: 'please wait a moment',
		context: 'Buy yourself time in a conversation or ask someone to hold on while you think.',
		tags: ['phrase', 'N5', 'travel']
	},
	{
		character: 'きっぷ',
		romaji: 'kippu',
		meaning: 'ticket',
		context: 'Transit or event ticket — you will see this on vending machines at stations.',
		tags: ['phrase', 'N5', 'travel']
	},
	{
		character: 'なんじですか',
		romaji: 'nanji desu ka',
		meaning: 'what time is it?',
		context: 'Ask a passerby or check — useful when your phone is out of battery.',
		tags: ['phrase', 'N5', 'travel']
	},
	{
		character: 'チェックイン',
		romaji: 'chekku in',
		meaning: 'check-in',
		context: 'Used at hotels and airports — same concept as English, borrowed as katakana.',
		tags: ['phrase', 'travel']
	}
];

const essentialEating: CardItem[] = [
	{
		character: 'これをください',
		romaji: 'kore wo kudasai',
		meaning: 'I\'ll have this, please',
		context: 'Point at the menu photo or dish and say this — works even without knowing the name.',
		tags: ['phrase', 'N5', 'food']
	},
	{
		character: 'おすすめはなんですか',
		romaji: 'osusume wa nan desu ka',
		meaning: 'what do you recommend?',
		context: 'Great icebreaker at restaurants — staff love being asked and often give a great pick.',
		tags: ['phrase', 'N5', 'food']
	},
	{
		character: 'おいしい',
		romaji: 'oishii',
		meaning: 'delicious',
		context: 'Say this while eating and watch the chef smile. Simple, powerful, universally appreciated.',
		tags: ['phrase', 'N5', 'food']
	},
	{
		character: 'おかいけい',
		romaji: 'okaikei',
		meaning: 'the bill / check please',
		context: 'Ask for the bill at a restaurant. You can also mime writing on your hand.',
		tags: ['phrase', 'N5', 'food']
	},
	{
		character: 'みずをください',
		romaji: 'mizu wo kudasai',
		meaning: 'water, please',
		context: 'Water is usually free at Japanese restaurants but you sometimes need to ask.',
		tags: ['phrase', 'N5', 'food']
	},
	{
		character: 'アレルギーがあります',
		romaji: 'arerugī ga arimasu',
		meaning: 'I have an allergy',
		context: 'Vital if you have food allergies — follow up with the specific allergen name.',
		tags: ['phrase', 'travel', 'food']
	},
	{
		character: 'からい',
		romaji: 'karai',
		meaning: 'spicy',
		context: 'Useful for ordering — からいものがすきです means "I like spicy food."',
		tags: ['phrase', 'N5', 'food']
	}
];

const essentialShopping: CardItem[] = [
	{
		character: 'いくらですか',
		romaji: 'ikura desu ka',
		meaning: 'how much does it cost?',
		context: 'Essential shopping phrase — point at an item and ask this.',
		tags: ['phrase', 'N5', 'shopping']
	},
	{
		character: 'たかい',
		romaji: 'takai',
		meaning: 'expensive',
		context: 'Comment on the price or ask for something cheaper — たかいですね means "that\'s pricey."',
		tags: ['phrase', 'N5', 'shopping']
	},
	{
		character: 'やすい',
		romaji: 'yasui',
		meaning: 'cheap / inexpensive',
		context: 'Compliment a good deal — やすい！ expresses pleasant surprise at a low price.',
		tags: ['phrase', 'N5', 'shopping']
	},
	{
		character: 'ちょっとみているだけです',
		romaji: 'chotto mite iru dake desu',
		meaning: 'just browsing, thank you',
		context: 'Say this when a shop assistant approaches and you are not ready to buy.',
		tags: ['phrase', 'N5', 'shopping']
	},
	{
		character: 'これにします',
		romaji: 'kore ni shimasu',
		meaning: 'I\'ll take this one',
		context: 'Signals your final choice to the shop assistant when you have decided.',
		tags: ['phrase', 'N5', 'shopping']
	},
	{
		character: 'ふくろはいりません',
		romaji: 'fukuro wa irimasen',
		meaning: 'no bag needed',
		context: 'Cashiers always offer a bag — decline politely and save plastic.',
		tags: ['phrase', 'travel', 'shopping']
	},
	{
		character: 'カードでもいいですか',
		romaji: 'kādo demo ii desu ka',
		meaning: 'can I pay by card?',
		context: 'Japan is still largely cash-based, so always worth asking before you pull out your card.',
		tags: ['phrase', 'travel', 'shopping']
	}
];

const essentialNumbers: CardItem[] = [
	{
		character: '〜えん',
		romaji: '〜en',
		meaning: '〜 yen',
		context: 'The currency suffix — ¥500 is ごひゃくえん. Recognise it on price tags and receipts.',
		tags: ['phrase', 'N5', 'numbers']
	},
	{
		character: 'ひとつ',
		romaji: 'hitotsu',
		meaning: 'one (piece)',
		context: 'Native Japanese counter for one item — use when ordering or picking a single thing.',
		tags: ['phrase', 'N5', 'numbers']
	},
	{
		character: 'ふたつ',
		romaji: 'futatsu',
		meaning: 'two (pieces)',
		context: 'Native counter for two items — hold up two fingers alongside for clarity.',
		tags: ['phrase', 'N5', 'numbers']
	},
	{
		character: 'みっつ',
		romaji: 'mittsu',
		meaning: 'three (pieces)',
		context: 'Native counter for three items — part of the ひとつ/ふたつ/みっつ set every traveller needs.',
		tags: ['phrase', 'N5', 'numbers']
	},
	{
		character: 'ひとり',
		romaji: 'hitori',
		meaning: 'one person',
		context: 'Tell a restaurant host your party size — ひとりです means "just me."',
		tags: ['phrase', 'N5', 'numbers']
	},
	{
		character: 'ふたり',
		romaji: 'futari',
		meaning: 'two people',
		context: 'For a party of two — ふたりです is the most common table request in Japan.',
		tags: ['phrase', 'N5', 'numbers']
	}
];

const essentialEmergency: CardItem[] = [
	{
		character: 'わかりません',
		romaji: 'wakarimasen',
		meaning: 'I don\'t understand',
		context: 'Honest and polite way to signal you did not follow — gives the other person a chance to rephrase.',
		tags: ['phrase', 'N5', 'emergency']
	},
	{
		character: 'もういちどおねがいします',
		romaji: 'mou ichido onegaishimasu',
		meaning: 'please say that again',
		context: 'Ask someone to repeat themselves slowly — much better than smiling and nodding.',
		tags: ['phrase', 'N5', 'emergency']
	},
	{
		character: 'えいごがはなせますか',
		romaji: 'eigo ga hanasemasu ka',
		meaning: 'do you speak English?',
		context: 'A lifeline when a conversation goes beyond your Japanese — staff in tourist areas often do.',
		tags: ['phrase', 'N5', 'emergency']
	},
	{
		character: 'たすけてください',
		romaji: 'tasukete kudasai',
		meaning: 'please help me',
		context: 'Emergency phrase — shout it loudly if you are in danger or need urgent assistance.',
		tags: ['phrase', 'N5', 'emergency']
	},
	{
		character: 'きゅうきゅうしゃをよんでください',
		romaji: 'kyūkyūsha wo yonde kudasai',
		meaning: 'please call an ambulance',
		context: 'For medical emergencies — or just dial 119 (the Japanese emergency number for ambulance and fire).',
		tags: ['phrase', 'emergency']
	},
	{
		character: 'にほんごがわかりません',
		romaji: 'nihongo ga wakarimasen',
		meaning: 'I don\'t understand Japanese',
		context: 'Sets expectations from the start when someone speaks to you in Japanese.',
		tags: ['phrase', 'N5', 'emergency']
	},
	{
		character: 'ゆっくりはなしてください',
		romaji: 'yukkuri hanashite kudasai',
		meaning: 'please speak slowly',
		context: 'Ask this if someone is speaking too fast — native speakers often slow down dramatically.',
		tags: ['phrase', 'N5', 'emergency']
	}
];

const essentialSocial: CardItem[] = [
	{
		character: 'そうですね',
		romaji: 'sou desu ne',
		meaning: 'I see / that\'s right / hmm',
		context: 'The classic conversation filler — shows you are listening and processing. Use it constantly.',
		tags: ['phrase', 'N5', 'social']
	},
	{
		character: 'なるほど',
		romaji: 'naruhodo',
		meaning: 'I see / I understand now',
		context: 'Shows you just understood something — a natural response when something clicks.',
		tags: ['phrase', 'N5', 'social']
	},
	{
		character: 'ほんとうですか',
		romaji: 'hontou desu ka',
		meaning: 'really? / is that true?',
		context: 'Express surprise or interest in what someone just said. ほんとう alone works too.',
		tags: ['phrase', 'N5', 'social']
	},
	{
		character: 'がんばってください',
		romaji: 'ganbatte kudasai',
		meaning: 'good luck / do your best',
		context: 'Cheer someone on before a challenge — one of the most encouraging phrases in Japanese.',
		tags: ['phrase', 'N5', 'social']
	},
	{
		character: 'だいじょうぶですか',
		romaji: 'daijoubu desu ka',
		meaning: 'are you okay?',
		context: 'Check on someone\'s wellbeing, or respond with だいじょうぶです ("I\'m fine") when asked.',
		tags: ['phrase', 'N5', 'social']
	},
	{
		character: 'たのしかったです',
		romaji: 'tanoshikatta desu',
		meaning: 'that was fun',
		context: 'After an activity or meal — a warm way to end an outing and express genuine enjoyment.',
		tags: ['phrase', 'N5', 'social']
	},
	{
		character: 'また会いましょう',
		romaji: 'mata aimashou',
		meaning: 'let\'s meet again',
		context: 'A warm closing after spending time with someone — shows you want to see them again.',
		tags: ['phrase', 'N5', 'social']
	}
];

const essentialVerbs: CardItem[] = [
	{
		character: 'たべます',
		romaji: 'tabemasu',
		meaning: 'eat (polite present)',
		context: 'Polite form of 食べる. Use in sentences like なにをたべますか ("what will you eat?").',
		tags: ['phrase', 'N5', 'verb']
	},
	{
		character: 'のみます',
		romaji: 'nomimasu',
		meaning: 'drink (polite present)',
		context: 'Polite form of 飲む. なにをのみますか means "what will you drink?"',
		tags: ['phrase', 'N5', 'verb']
	},
	{
		character: 'いきます',
		romaji: 'ikimasu',
		meaning: 'go (polite present)',
		context: 'Polite form of 行く. どこにいきますか means "where are you going?"',
		tags: ['phrase', 'N5', 'verb']
	},
	{
		character: 'きます',
		romaji: 'kimasu',
		meaning: 'come (polite present)',
		context: 'Polite form of 来る. にほんにきました means "I came to Japan."',
		tags: ['phrase', 'N5', 'verb']
	},
	{
		character: 'みます',
		romaji: 'mimasu',
		meaning: 'see / look / watch (polite present)',
		context: 'Polite form of 見る. えいがをみます means "I will watch a movie."',
		tags: ['phrase', 'N5', 'verb']
	},
	{
		character: 'かいます',
		romaji: 'kaimasu',
		meaning: 'buy (polite present)',
		context: 'Polite form of 買う. おみやげをかいます means "I will buy souvenirs."',
		tags: ['phrase', 'N5', 'verb']
	},
	{
		character: 'わかります',
		romaji: 'wakarimasu',
		meaning: 'understand (polite present)',
		context: 'Polite form of 分かる. わかりますか means "do you understand?" or "do you know?"',
		tags: ['phrase', 'N5', 'verb']
	},
	{
		character: 'あります',
		romaji: 'arimasu',
		meaning: 'there is / I have (inanimate)',
		context: 'Existence verb for objects and places — ~~はどこにありますか means "where is ~~?"',
		tags: ['phrase', 'N5', 'verb']
	},
	{
		character: 'います',
		romaji: 'imasu',
		meaning: 'there is / I am (animate)',
		context: 'Existence verb for living things — ひとがいます means "there is a person here."',
		tags: ['phrase', 'N5', 'verb']
	}
];

// ─────────────────────────────────────────────
// COLUMNS (sectioned)
// ─────────────────────────────────────────────

export const columns: Column[] = [
	{
		id: 'hiragana',
		title: 'Hiragana',
		titleJp: 'ひらがな',
		hint: 'The basic alphabet',
		sections: [
			{ id: 'basic', title: 'Basic', titleJp: '五十音', items: hiraganaBasic },
			{ id: 'dakuon', title: 'Voiced', titleJp: '濁音', items: hiraganaDakuon },
			{ id: 'handakuon', title: 'P-sounds', titleJp: '半濁音', items: hiraganaHandakuon },
			{ id: 'yoon', title: 'Contracted', titleJp: '拗音', items: hiraganaYoon },
			{ id: 'sokuon', title: 'Double', titleJp: '促音', items: hiraganaSokuon }
		]
	},
	{
		id: 'katakana',
		title: 'Katakana',
		titleJp: 'カタカナ',
		hint: 'Foreign words',
		sections: [
			{ id: 'basic', title: 'Basic', titleJp: 'ゴジュウオン', items: katakanaBasic },
			{ id: 'dakuon', title: 'Voiced', titleJp: 'ダクオン', items: katakanaDakuon },
			{ id: 'handakuon', title: 'P-sounds', titleJp: 'ハンダクオン', items: katakanaHandakuon },
			{ id: 'yoon', title: 'Contracted', titleJp: 'ヨウオン', items: katakanaYoon },
			{ id: 'sokuon', title: 'Double', titleJp: 'ソクオン', items: katakanaSokuon }
		]
	},
	{
		id: 'radicals',
		title: 'Radicals',
		titleJp: '部首',
		hint: 'Building blocks',
		sections: [
			{ id: 'core', title: 'Core', titleJp: '基本', items: withRadicalDetails(radicals) },
			{ id: 'extended', title: 'Extended', titleJp: '拡張', items: radicalsExtended }
		]
	},
	{
		id: 'kanji',
		title: 'Kanji',
		titleJp: '漢字',
		hint: 'Reference sheets',
		sections: [
			{ id: 'n5', title: 'N5', titleJp: 'N5', items: kanjiN5 },
			{ id: 'n4', title: 'N4', titleJp: 'N4', items: kanjiN4 },
			{ id: 'n3', title: 'N3', titleJp: 'N3', items: kanjiN3 }
		]
	},
	{
		id: 'vocabulary',
		title: 'Vocabulary',
		titleJp: '語彙',
		hint: 'Daily words & phrases',
		sections: [
			{ id: 'common', title: 'Common', titleJp: '日常', items: vocabulary },
			{ id: 'greetings', title: 'Greetings & Farewells', titleJp: 'あいさつ', items: essentialGreetings },
			{ id: 'politeness', title: 'Politeness Staples', titleJp: '礼儀', items: essentialPoliteness },
			{ id: 'navigation', title: 'Getting Around', titleJp: '移動', items: essentialNavigation },
			{ id: 'eating', title: 'Eating & Ordering', titleJp: '食事', items: essentialEating },
			{ id: 'shopping', title: 'Shopping', titleJp: '買い物', items: essentialShopping },
			{ id: 'numbers', title: 'Numbers in Context', titleJp: '数', items: essentialNumbers },
			{ id: 'emergency', title: 'Emergency & Confusion', titleJp: '緊急', items: essentialEmergency },
			{ id: 'social', title: 'Social Phrases', titleJp: '社交', items: essentialSocial },
			{ id: 'verbs', title: 'Essential Verbs', titleJp: '動詞', items: essentialVerbs }
		]
	}
];
