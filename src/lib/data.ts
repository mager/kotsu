export interface RadicalRecipe {
	kanji: string;
	reading?: string;
	meaning: string;
	breakdown: string;
	clue: string;
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

const kanji: CardItem[] = [
	{ character: '一', romaji: 'ichi', meaning: 'one', readings: { on: ['イチ', 'イツ'], kun: ['ひと-'] } },
	{ character: '二', romaji: 'ni', meaning: 'two', readings: { on: ['ニ'], kun: ['ふた-'] } },
	{ character: '三', romaji: 'san', meaning: 'three', readings: { on: ['サン'], kun: ['み-'] } },
	{ character: '四', romaji: 'shi / yon', meaning: 'four', readings: { on: ['シ'], kun: ['よ-', 'よん'] } },
	{ character: '五', romaji: 'go', meaning: 'five', readings: { on: ['ゴ'], kun: ['いつ-'] } },
	{ character: '六', romaji: 'roku', meaning: 'six', readings: { on: ['ロク'], kun: ['む-'] } },
	{ character: '七', romaji: 'shichi / nana', meaning: 'seven', readings: { on: ['シチ'], kun: ['なな'] } },
	{ character: '八', romaji: 'hachi', meaning: 'eight', readings: { on: ['ハチ'], kun: ['や-'] } },
	{ character: '九', romaji: 'ku / kyuu', meaning: 'nine', readings: { on: ['キュウ', 'ク'], kun: ['ここの-'] } },
	{ character: '十', romaji: 'juu', meaning: 'ten', readings: { on: ['ジュウ', 'ジッ'], kun: ['とお'] } },
	{ character: '日', romaji: 'nichi / hi', meaning: 'day / sun', readings: { on: ['ニチ', 'ジツ'], kun: ['ひ', 'か'] } },
	{ character: '月', romaji: 'getsu / tsuki', meaning: 'month / moon', readings: { on: ['ゲツ', 'ガツ'], kun: ['つき'] } },
	{ character: '火', romaji: 'ka / hi', meaning: 'fire', readings: { on: ['カ'], kun: ['ひ'] } },
	{ character: '水', romaji: 'sui / mizu', meaning: 'water', readings: { on: ['スイ'], kun: ['みず'] } },
	{ character: '木', romaji: 'moku / ki', meaning: 'tree / wood', readings: { on: ['モク', 'ボク'], kun: ['き'] } },
	{ character: '金', romaji: 'kin / kane', meaning: 'gold / money', readings: { on: ['キン', 'コン'], kun: ['かね'] } },
	{ character: '土', romaji: 'do / tsuchi', meaning: 'earth / soil', readings: { on: ['ド', 'ト'], kun: ['つち'] } },
	{ character: '人', romaji: 'jin / hito', meaning: 'person', readings: { on: ['ジン', 'ニン'], kun: ['ひと'] } },
	{ character: '大', romaji: 'dai / oo', meaning: 'big / large', readings: { on: ['ダイ', 'タイ'], kun: ['おお-'] } },
	{ character: '小', romaji: 'shou / chii', meaning: 'small / little', readings: { on: ['ショウ'], kun: ['ちい-', 'こ'] } },
	{ character: '中', romaji: 'chuu / naka', meaning: 'middle / inside', readings: { on: ['チュウ'], kun: ['なか'] } },
	{ character: '上', romaji: 'jou / ue', meaning: 'up / above', readings: { on: ['ジョウ'], kun: ['うえ', 'あ-'] } },
	{ character: '下', romaji: 'ka / shita', meaning: 'down / below', readings: { on: ['カ', 'ゲ'], kun: ['した', 'さ-', 'くだ-'] } },
	{ character: '年', romaji: 'nen / toshi', meaning: 'year', readings: { on: ['ネン'], kun: ['とし'] } }
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
		sections: [{ id: 'core', title: 'Core', titleJp: '基本', items: withRadicalDetails(radicals) }]
	},
	{
		id: 'kanji',
		title: 'Kanji N5',
		titleJp: '漢字',
		hint: 'JLPT N5 starters',
		sections: [{ id: 'n5', title: 'N5', titleJp: 'N5', items: kanji }]
	},
	{
		id: 'vocabulary',
		title: 'Vocabulary',
		titleJp: '語彙',
		hint: 'Baby to pro',
		sections: [{ id: 'common', title: 'Common', titleJp: '日常', items: vocabulary }]
	}
];
