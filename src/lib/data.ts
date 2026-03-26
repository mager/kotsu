export interface CardItem {
	character: string;
	romaji: string;
	meaning: string;
	readings?: { on?: string[]; kun?: string[] };
	pair?: string; // matching character in another system (e.g. katakana ↔ hiragana)
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
	{ character: '水', romaji: 'mizu', meaning: 'water' },
	{ character: '火', romaji: 'hi', meaning: 'fire' },
	{ character: '木', romaji: 'ki', meaning: 'tree' },
	{ character: '金', romaji: 'kane', meaning: 'metal / gold' },
	{ character: '土', romaji: 'tsuchi', meaning: 'earth' },
	{ character: '日', romaji: 'hi / nichi', meaning: 'sun / day' },
	{ character: '月', romaji: 'tsuki', meaning: 'moon / month' },
	{ character: '山', romaji: 'yama', meaning: 'mountain' },
	{ character: '川', romaji: 'kawa', meaning: 'river' },
	{ character: '口', romaji: 'kuchi', meaning: 'mouth' },
	{ character: '目', romaji: 'me', meaning: 'eye' },
	{ character: '手', romaji: 'te', meaning: 'hand' },
	{ character: '心', romaji: 'kokoro', meaning: 'heart / mind' },
	{ character: '力', romaji: 'chikara', meaning: 'power' },
	{ character: '田', romaji: 'ta', meaning: 'rice field' },
	{ character: '女', romaji: 'onna', meaning: 'woman' },
	{ character: '子', romaji: 'ko', meaning: 'child' },
	{ character: '糸', romaji: 'ito', meaning: 'thread' },
	{ character: '言', romaji: 'koto', meaning: 'speech' },
	{ character: '食', romaji: 'shoku', meaning: 'eat / food' },
	{ character: '車', romaji: 'kuruma', meaning: 'vehicle' },
	{ character: '門', romaji: 'mon', meaning: 'gate' },
	{ character: '雨', romaji: 'ame', meaning: 'rain' }
];

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
		sections: [{ id: 'core', title: 'Core', titleJp: '基本', items: radicals }]
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
