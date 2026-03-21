export interface CardItem {
	character: string;
	romaji: string;
	meaning: string;
	readings?: { on?: string[]; kun?: string[] };
	pair?: string; // matching character in another system (e.g. katakana ↔ hiragana)
}

export interface Column {
	id: string;
	title: string;
	titleJp: string;
	hint: string;
	items: CardItem[];
}

const hiragana: CardItem[] = [
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

const katakana: CardItem[] = [
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
	{ character: 'ごめんなさい', romaji: 'gomen nasai', meaning: 'I\'m sorry' },
	{ character: 'さようなら', romaji: 'sayounara', meaning: 'goodbye' },
	{ character: 'おはよう', romaji: 'ohayou', meaning: 'good morning' }
];

export const columns: Column[] = [
	{ id: 'hiragana', title: 'Hiragana', titleJp: 'ひらがな', hint: 'The basic alphabet', items: hiragana },
	{ id: 'katakana', title: 'Katakana', titleJp: 'カタカナ', hint: 'Foreign words', items: katakana },
	{ id: 'radicals', title: 'Radicals', titleJp: '部首', hint: 'Building blocks', items: radicals },
	{ id: 'kanji', title: 'Kanji N5', titleJp: '漢字', hint: 'JLPT N5 starters', items: kanji },
	{ id: 'vocabulary', title: 'Vocabulary', titleJp: '語彙', hint: 'Baby to pro', items: vocabulary }
];
