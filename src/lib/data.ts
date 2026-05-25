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

const radicalDetails: Record<string, Pick<CardItem, 'mnemonic' | 'variants' | 'tags' | 'recipes'>> = {
	'人': { mnemonic: 'A standing person. On the left it compresses into 亻.', variants: ['亻'], tags: ['person', 'human'], recipes: [{ kanji: '休', reading: 'きゅう', meaning: 'rest', breakdown: '亻 + 木', clue: 'A person leaning on a tree is resting.' }, { kanji: '体', reading: 'たい', meaning: 'body', breakdown: '亻 + 本', clue: 'A person plus a central trunk gives the body.' }] },
	'亻': { mnemonic: 'The slim left-side person radical. If you see it, think human action or state.', variants: ['人'], tags: ['person side', 'left-side'], recipes: [{ kanji: '作', reading: 'さく', meaning: 'make', breakdown: '亻 + 乍', clue: 'A making action starts with a person.' }, { kanji: '住', reading: 'じゅう', meaning: 'live / reside', breakdown: '亻 + 主', clue: 'A person plus master/base becomes dwelling.' }] },
	'水': { mnemonic: 'A central stream with side branches. It almost always points to flow or liquid.', variants: ['氵'], tags: ['water', 'flow'], recipes: [{ kanji: '泉', reading: 'せん', meaning: 'spring', breakdown: '白 + 水', clue: 'White water bursting up becomes a spring.' }, { kanji: '永', reading: 'えい', meaning: 'eternity', breakdown: '丶 + 水-like flow', clue: 'The shape itself feels like water continuing.' }] },
	'氵': { mnemonic: 'Three water drops on the left nearly always mean liquid, washing, sea, or river.', variants: ['水'], tags: ['water side', 'liquid'], recipes: [{ kanji: '海', reading: 'かい', meaning: 'sea', breakdown: '氵 + 每', clue: 'Water on the left gives the whole kanji an ocean feeling.' }, { kanji: '酒', reading: 'しゅ', meaning: 'sake / alcohol', breakdown: '氵 + 酉', clue: 'Liquid plus fermentation jar gives sake.' }] },
	'火': { mnemonic: 'Open flame. At the bottom it often relaxes into four hot dots.', variants: ['灬'], tags: ['fire', 'heat'], recipes: [{ kanji: '炎', reading: 'えん', meaning: 'flame', breakdown: '火 + 火', clue: 'Two fires intensify into blaze.' }, { kanji: '灯', reading: 'とう', meaning: 'lamp', breakdown: '火 + 丁', clue: 'Fire with a small support becomes a lamp.' }] },
	'灬': { mnemonic: 'Fire pushed to the bottom like glowing coals.', variants: ['火'], tags: ['fire bottom', 'heat'], recipes: [{ kanji: '熱', reading: 'ねつ', meaning: 'heat', breakdown: '埶 + 灬', clue: 'Those four dots at the base radiate heat.' }, { kanji: '魚', reading: 'ぎょ', meaning: 'fish', breakdown: 'fish body + 灬', clue: 'The bottom dots are a memorable anchor.' }] },
	'木': { mnemonic: 'A trunk with branches — one of the cleanest semantic radicals.', tags: ['tree', 'wood'], recipes: [{ kanji: '林', reading: 'りん', meaning: 'woods', breakdown: '木 + 木', clue: 'Two trees make a grove.' }, { kanji: '森', reading: 'もり', meaning: 'forest', breakdown: '木 + 木 + 木', clue: 'Three trees turn the grove into forest.' }] },
	'金': { mnemonic: 'Metal, gold, money, or hardness. Left form often compresses to 釒.', variants: ['釒'], tags: ['metal', 'money'], recipes: [{ kanji: '銀', reading: 'ぎん', meaning: 'silver', breakdown: '釒 + 艮', clue: 'Precious metals advertise themselves with the metal radical.' }, { kanji: '鉄', reading: 'てつ', meaning: 'iron', breakdown: '釒 + 失', clue: 'The metal side makes the material obvious.' }] },
	'釒': { mnemonic: 'The left-side metal radical. Think coins, tools, blades, and minerals.', variants: ['金'], tags: ['metal side', 'left-side'], recipes: [{ kanji: '銅', reading: 'どう', meaning: 'copper', breakdown: '釒 + 同', clue: 'Metal side makes this a material kanji.' }, { kanji: '針', reading: 'しん', meaning: 'needle', breakdown: '釒 + 十', clue: 'A needle is a metal object, right in the radical.' }] },
	'土': { mnemonic: 'Ground with a surface line and a packed base.', tags: ['earth', 'ground'], recipes: [{ kanji: '地', reading: 'ち', meaning: 'ground', breakdown: '土 + 也', clue: 'Earth on the left anchors the meaning.' }, { kanji: '場', reading: 'じょう', meaning: 'place', breakdown: '土 + 昜', clue: 'A place is literally grounded with 土.' }] },
	'日': { mnemonic: 'The sun-box often signals day, light, time, or visibility.', tags: ['sun', 'time'], recipes: [{ kanji: '明', reading: 'めい', meaning: 'bright', breakdown: '日 + 月', clue: 'Sun plus moon makes brightness.' }, { kanji: '時', reading: 'じ', meaning: 'time', breakdown: '日 + 寺', clue: 'Time is built on the sun.' }] },
	'月': { mnemonic: 'Usually moon, but on the left side it often means flesh/body.', tags: ['moon', 'body'], recipes: [{ kanji: '明', reading: 'めい', meaning: 'bright', breakdown: '日 + 月', clue: 'Sun and moon together light everything up.' }, { kanji: '服', reading: 'ふく', meaning: 'clothes / obey', breakdown: '月 + 𠬝', clue: 'The body-side moon often points at body-related meanings.' }] },
	'山': { mnemonic: 'Three peaks. Hard to forget once you see the outline.', tags: ['mountain', 'terrain'], recipes: [{ kanji: '岩', reading: 'がん', meaning: 'boulder', breakdown: '山 + 石', clue: 'A mountain plus stone becomes rock.' }, { kanji: '島', reading: 'しま', meaning: 'island', breakdown: '山 + 鳥', clue: 'An island is mountain imagery rising from water.' }] },
	'川': { mnemonic: 'Three current lines flowing in parallel.', tags: ['river', 'stream'], recipes: [{ kanji: '州', reading: 'しゅう', meaning: 'state / sandbank', breakdown: '川 + 丶 + 丶', clue: 'Add dots to the river and you get river land.' }, { kanji: '順', reading: 'じゅん', meaning: 'order', breakdown: 'stream-like left side + 頁', clue: 'The left side preserves a feeling of smooth flow.' }] },
	'口': { mnemonic: 'A box you can read as mouth, opening, or container.', tags: ['box', 'mouth'], recipes: [{ kanji: '古', reading: 'こ', meaning: 'old', breakdown: '十 + 口', clue: 'An old story sits above a mouth.' }, { kanji: '知', reading: 'ち', meaning: 'know', breakdown: '矢 + 口', clue: 'Knowledge lands when the arrow reaches the mouth.' }] },
	'目': { mnemonic: 'A vertical eye shape with lashes top and bottom.', tags: ['eye', 'look'], recipes: [{ kanji: '見', reading: 'けん', meaning: 'see', breakdown: '目 + 儿', clue: 'An eye on legs goes out to see.' }, { kanji: '相', reading: 'そう', meaning: 'mutual / appearance', breakdown: '木 + 目', clue: 'Tree plus eye suggests looking closely.' }] },
	'手': { mnemonic: 'Open hand. On the left it compresses to 扌.', variants: ['扌'], tags: ['hand', 'action'], recipes: [{ kanji: '看', reading: 'かん', meaning: 'watch over', breakdown: '手 + 目', clue: 'A hand shading the eye helps you look.' }, { kanji: '手', reading: 'て', meaning: 'hand', breakdown: 'full form', clue: 'Keep this as the master shape for the side variant.' }] },
	'扌': { mnemonic: 'Hand on the left means touch, throw, push, hold, or make.', variants: ['手'], tags: ['hand side', 'action'], recipes: [{ kanji: '持', reading: 'じ', meaning: 'hold', breakdown: '扌 + 寺', clue: 'The hand radical tells you the kanji is something you do with your hands.' }, { kanji: '投', reading: 'とう', meaning: 'throw', breakdown: '扌 + 殳', clue: 'Throwing starts with the hand radical.' }] },
	'心': { mnemonic: 'Heart at full width; on the left it usually becomes 忄.', variants: ['忄'], tags: ['heart', 'emotion'], recipes: [{ kanji: '忍', reading: 'にん', meaning: 'endure', breakdown: '刃 + 心', clue: 'A blade over the heart is endurance.' }, { kanji: '思', reading: 'し', meaning: 'think', breakdown: '田 + 心', clue: 'A field of thought rests on the heart.' }] },
	'忄': { mnemonic: 'Heart squeezed to the left side — almost always a feeling clue.', variants: ['心'], tags: ['heart side', 'emotion'], recipes: [{ kanji: '情', reading: 'じょう', meaning: 'emotion', breakdown: '忄 + 青', clue: 'The emotion radical makes the feeling explicit.' }, { kanji: '忙', reading: 'ぼう', meaning: 'busy', breakdown: '忄 + 亡', clue: 'Busy is the heart losing its center.' }] },
	'力': { mnemonic: 'A bent shape carrying force.', tags: ['power', 'strength'], recipes: [{ kanji: '男', reading: 'だん', meaning: 'man', breakdown: '田 + 力', clue: 'Field plus strength was the old agrarian picture.' }, { kanji: '助', reading: 'じょ', meaning: 'help', breakdown: '且 + 力', clue: 'Help adds strength.' }] },
	'田': { mnemonic: 'A neatly divided rice field — also reads like grids and plots.', tags: ['field', 'grid'], recipes: [{ kanji: '男', reading: 'だん', meaning: 'man', breakdown: '田 + 力', clue: 'Field plus strength was the old picture.' }, { kanji: '町', reading: 'ちょう', meaning: 'town block', breakdown: '田 + 丁', clue: 'A town block feels like measured fields.' }] },
	'女': { mnemonic: 'Woman often carries meanings of relation, softness, or old social roles.', tags: ['woman', 'relation'], recipes: [{ kanji: '好', reading: 'こう', meaning: 'like', breakdown: '女 + 子', clue: 'Woman plus child became the old picture for affection.' }, { kanji: '安', reading: 'あん', meaning: 'peaceful', breakdown: '宀 + 女', clue: 'A woman under a roof suggested calm and safety.' }] },
	'子': { mnemonic: 'A child with head, arms, and legs tucked in.', tags: ['child', 'seed'], recipes: [{ kanji: '学', reading: 'がく', meaning: 'study', breakdown: '⺍ + 冖 + 子', clue: 'A child under a roof becomes learning.' }, { kanji: '字', reading: 'じ', meaning: 'character', breakdown: '宀 + 子', clue: 'A child under a roof became the idea of literacy.' }] },
	'糸': { mnemonic: 'Thread in full width; side form usually becomes 糹 in Japanese.', variants: ['糹', '纟'], tags: ['thread', 'fabric'], recipes: [{ kanji: '紙', reading: 'し', meaning: 'paper', breakdown: '糹 + 氏', clue: 'Paper starts with thread or fiber.' }, { kanji: '系', reading: 'けい', meaning: 'system / lineage', breakdown: 'thread-derived form', clue: 'Thread becomes the metaphor for lines and systems.' }] },
	'言': { mnemonic: 'A tongue of lines stacked above a mouth-like base.', variants: ['訁'], tags: ['speech', 'words'], recipes: [{ kanji: '語', reading: 'ご', meaning: 'language', breakdown: '言 + 吾', clue: 'Speech radical makes the whole kanji about words.' }, { kanji: '話', reading: 'わ', meaning: 'talk', breakdown: '言 + 舌', clue: 'Talking starts with the speech radical.' }] },
	'訁': { mnemonic: 'Speech squeezed onto the left edge.', variants: ['言'], tags: ['speech side', 'left-side'], recipes: [{ kanji: '計', reading: 'けい', meaning: 'measure / plan', breakdown: '訁 + 十', clue: 'Words on the left often mark speaking, stating, planning.' }, { kanji: '試', reading: 'し', meaning: 'test / try', breakdown: '訁 + 式', clue: 'A test is framed as something stated or tried.' }] },
	'食': { mnemonic: 'The full food radical. Left forms often compress to 飠.', variants: ['飠'], tags: ['food', 'eat'], recipes: [{ kanji: '飯', reading: 'はん', meaning: 'meal / rice', breakdown: '食 + 反', clue: 'Food radical up front tells you it is edible.' }, { kanji: '館', reading: 'かん', meaning: 'hall / building', breakdown: '食 + 官', clue: 'Historically tied to eating halls and lodgings.' }] },
	'飠': { mnemonic: 'Food radical in component form, usually hugging the left side.', variants: ['食'], tags: ['food side', 'left-side'], recipes: [{ kanji: '飲', reading: 'いん', meaning: 'drink', breakdown: '飠 + 欠', clue: 'Food-side marks ingestion, even for drinks.' }, { kanji: '餓', reading: 'が', meaning: 'starve', breakdown: '飠 + 我', clue: 'Without food, the semantic clue lands fast.' }] },
	'車': { mnemonic: 'A wheel-and-axle cart seen from above.', tags: ['vehicle', 'wheel'], recipes: [{ kanji: '転', reading: 'てん', meaning: 'turn', breakdown: '車 + 云', clue: 'Vehicle radical makes motion easy to feel.' }, { kanji: '軽', reading: 'けい', meaning: 'lightweight', breakdown: '車 + 圣', clue: 'Transport and movement kanji often start with 車.' }] },
	'門': { mnemonic: 'A double door you can open, close, enter, and hear through.', tags: ['gate', 'door'], recipes: [{ kanji: '聞', reading: 'ぶん', meaning: 'hear / ask', breakdown: '門 + 耳', clue: 'An ear at the gate listens.' }, { kanji: '間', reading: 'かん', meaning: 'interval / space', breakdown: '門 + 日', clue: 'The sun seen between gate doors becomes a gap.' }] },
	'雨': { mnemonic: 'Sky line, window frame, and drops underneath.', tags: ['rain', 'weather'], recipes: [{ kanji: '雪', reading: 'ゆき', meaning: 'snow', breakdown: '雨 + 彗 lower form', clue: 'Rain radical on top almost always signals weather.' }, { kanji: '電', reading: 'でん', meaning: 'electricity', breakdown: '雨 + 申', clue: 'Lightning belongs under the rain canopy.' }] },
	'宀': { mnemonic: 'A roof radical — shelter, home, storehouse, or protected space.', tags: ['roof', 'shelter'], recipes: [{ kanji: '安', reading: 'あん', meaning: 'peaceful', breakdown: '宀 + 女', clue: 'Roof above gives safety.' }, { kanji: '家', reading: 'か', meaning: 'house', breakdown: '宀 + 豕', clue: 'A roof is the instant clue that this kanji is about housed space.' }] },
	'艹': { mnemonic: 'Grass crown across the top — plants, herbs, flowers, growth.', tags: ['grass top', 'plant'], recipes: [{ kanji: '花', reading: 'か', meaning: 'flower', breakdown: '艹 + 化', clue: 'Plant crown means something botanical is coming.' }, { kanji: '茶', reading: 'ちゃ', meaning: 'tea', breakdown: '艹 + 人 + 木', clue: 'Tea starts with the grass radical.' }] },
	'辶': { mnemonic: 'The trailing road radical — think motion with a path behind it.', variants: ['⻌'], tags: ['movement', 'road'], recipes: [{ kanji: '近', reading: 'きん', meaning: 'near', breakdown: '斤 + 辶', clue: 'Add the movement trail and the meaning shifts into location.' }, { kanji: '道', reading: 'どう', meaning: 'road / way', breakdown: '首 + 辶', clue: 'A path radical almost always signals movement or travel.' }] },
	'⻌': { mnemonic: 'Visual variant of shinnyou. Same motion signal, slightly different print shape.', variants: ['辶'], tags: ['movement variant', 'path'], recipes: [{ kanji: '週', reading: 'しゅう', meaning: 'week', breakdown: '周 + ⻌', clue: 'The walking trail wraps the cycle.' }, { kanji: '追', reading: 'つい', meaning: 'chase', breakdown: '𠂤 + ⻌', clue: 'Chasing is movement plus pursuit.' }] },
	'石': { mnemonic: 'A cliff with a mouth-like stone block below.', tags: ['stone', 'mineral'], recipes: [{ kanji: '岩', reading: 'がん', meaning: 'boulder', breakdown: '山 + 石', clue: 'Mountain plus stone gives rock.' }, { kanji: '研', reading: 'けん', meaning: 'polish / grind', breakdown: '石 + 开', clue: 'Stone often points to minerals or grinding.' }] },
	'禾': { mnemonic: 'A grain stalk with a drooping head.', tags: ['grain', 'crop'], recipes: [{ kanji: '秋', reading: 'しゅう', meaning: 'autumn', breakdown: '禾 + 火', clue: 'Harvest grain plus fire gives the season of drying and burning.' }, { kanji: '科', reading: 'か', meaning: 'department / subject', breakdown: '禾 + 斗', clue: 'The grain radical often appears in crop or classification kanji.' }] },
	'竹': { mnemonic: 'Full bamboo; at the top it often shrinks to ⺮.', variants: ['⺮'], tags: ['bamboo', 'top radical'], recipes: [{ kanji: '答', reading: 'とう', meaning: 'answer', breakdown: '⺮ + 合', clue: 'The bamboo top is the giveaway in the compact form.' }, { kanji: '第', reading: 'だい', meaning: 'ordinal number', breakdown: '⺮ + 弟', clue: 'Twin leaves at the top usually mean bamboo.' }] },
	'耳': { mnemonic: 'The ear shape is literal enough to memorize visually.', tags: ['ear', 'hearing'], recipes: [{ kanji: '聞', reading: 'ぶん', meaning: 'hear / ask', breakdown: '門 + 耳', clue: 'An ear at the gate is listening.' }, { kanji: '職', reading: 'しょく', meaning: 'job', breakdown: '耳 + 戠', clue: 'The ear component is the visual anchor on the left.' }] },
	'足': { mnemonic: 'Foot extends to legs, steps, dancing, and sufficiency.', tags: ['foot', 'movement'], recipes: [{ kanji: '路', reading: 'ろ', meaning: 'road', breakdown: '足 + 各', clue: 'Roads are made for feet.' }, { kanji: '踊', reading: 'よう', meaning: 'dance', breakdown: '足 + 甬', clue: 'If it dances, expect the foot radical.' }] },
	'阝': { mnemonic: 'Two radicals in disguise: left-side usually means hill, right-side usually means city.', variants: ['⻖', '⻏'], tags: ['hill or city', 'side-sensitive'], recipes: [{ kanji: '院', reading: 'いん', meaning: 'institution', breakdown: '阝(left hill) + 完', clue: 'On the left, read terrain or built place.' }, { kanji: '都', reading: 'と', meaning: 'capital city', breakdown: '者 + 阝(right city)', clue: 'On the right, it usually signals town or city.' }] }
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
	{ character: '苦', romaji: 'ku / kuru', meaning: 'suffering / bitter', readings: { on: ['ク'], kun: ['くる-', 'にが-'] }, tags: ['N3'] },
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
	{ character: '困', romaji: 'kon / koma', meaning: 'troubled /困る', readings: { on: ['コン'], kun: ['こま-'] }, tags: ['N3'] },
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
	{ character: '取', romaji: 'shu / to', meaning: 'take', readings: { on: ['シュ'], kun: ['と-'] }, tags: ['N3'] },
	{ character: '守', romaji: 'shu / mamo', meaning: 'protect / guard', readings: { on: ['シュ', 'ス'], kun: ['まも-', 'もり'] }, tags: ['N3'] },
	{ character: '首', romaji: 'shu / kubi', meaning: 'neck / head', readings: { on: ['シュ'], kun: ['くび'] }, tags: ['N3'] },
	{ character: '受', romaji: 'ju / u', meaning: 'receive', readings: { on: ['ジュ'], kun: ['う-'] }, tags: ['N3'] },
	{ character: '宿', romaji: 'shuku / yado', meaning: 'lodging / inn', readings: { on: ['シュク'], kun: ['やど-'] }, tags: ['N3'] },
	{ character: '術', romaji: 'jutsu', meaning: 'art / technique', readings: { on: ['ジュツ'], kun: [] }, tags: ['N3'] },
	{ character: '春', romaji: 'shun / haru', meaning: 'spring', readings: { on: ['シュン'], kun: ['はる'] }, tags: ['N3'] },
	{ character: '順', romaji: 'jun', meaning: 'order / sequence', readings: { on: ['ジュン'], kun: [] }, tags: ['N3'] },
	{ character: '初', romaji: 'sho / haji', meaning: 'first / beginning', readings: { on: ['ショ'], kun: ['はじ-', 'はつ', 'うい', 'そ-'] }, tags: ['N3'] },
	{ character: '勝', romaji: 'shou / ka', meaning: 'win / victory', readings: { on: ['ショウ'], kun: ['か-'] }, tags: ['N3'] },
	{ character: '商', romaji: 'shou', meaning: 'commerce / trade', readings: { on: ['ショウ'], kun: ['あきな-'] }, tags: ['N3'] },
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
	{ character: '等', romaji: 'tou / hito', meaning: 'class / equal', readings: { on: ['トウ'], kun: ['ひと-', 'など'] }, tags: ['N3'] },
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
	{ character: '幸', romaji: 'kou / shiawa', meaning: 'happiness / luck', readings: { on: ['コウ'], kun: ['さち', 'しあわ-'] }, tags: ['N3'] },
	{ character: '辺', romaji: 'hen / ata', meaning: 'area / vicinity', readings: { on: ['ヘン'], kun: ['あた-', 'べ'] }, tags: ['N3'] },
	{ character: '歩', romaji: 'ho / aru', meaning: 'walk / step', readings: { on: ['ホ', 'ブ', 'フ'], kun: ['ある-', 'あゆ-'] }, tags: ['N3'] },
	{ character: '訪', romaji: 'hou / otazu', meaning: 'visit', readings: { on: ['ホウ'], kun: ['おとず-', 'たず-'] }, tags: ['N3'] },
	{ character: '忘', romaji: 'bou / wasu', meaning: 'forget', readings: { on: ['ボウ'], kun: ['わす-'] }, tags: ['N3'] },
	{ character: '亡', romaji: 'bou / na', meaning: 'die / lose', readings: { on: ['ボウ', 'モウ'], kun: ['な-'] }, tags: ['N3'] },
	{ character: '棒', romaji: 'bou', meaning: 'stick / rod', readings: { on: ['ボウ'], kun: [] }, tags: ['N3'] },
	{ character: '民', romaji: 'min / tami', meaning: 'people / nation', readings: { on: ['ミン'], kun: ['たみ'] }, tags: ['N3'] },
	{ character: '無', romaji: 'mu / na', meaning: 'nothing / without', readings: { on: ['ム', 'ブ'], kun: ['な-'] }, tags: ['N3'] },
	{ character: '迷', romaji: 'mei / mayo', meaning: 'lost / puzzled', readings: { on: ['メイ'], kun: ['まよ-'] }, tags: ['N3'] },
	{ character: '面', romaji: 'men / omo', meaning: 'face / surface', readings: { on: ['メン', 'ベン'], kun: ['おも', 'おもて', 'つら'] }, tags: ['N3'] },
	{ character: '守', romaji: 'shu / mamo', meaning: 'protect / defend', readings: { on: ['シュ', 'ス'], kun: ['まも-', 'もり'] }, tags: ['N3'] },
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
		hint: 'Daily words',
		sections: [{ id: 'common', title: 'Common', titleJp: '日常', items: vocabulary }]
	}
];
