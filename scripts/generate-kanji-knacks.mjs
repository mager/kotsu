#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import process from 'node:process';

const repoRoot = resolve(import.meta.dirname, '..');
const dataPath = resolve(repoRoot, 'src/lib/data.ts');
const outputPath = resolve(repoRoot, 'src/lib/generated/kanji-knacks.json');

const args = parseArgs(process.argv.slice(2));
const endpoint = trimSlash(args.endpoint ?? process.env.KOTSU_LLM_ENDPOINT ?? 'http://127.0.0.1:8000');
const model = args.model ?? process.env.KOTSU_LLM_MODEL ?? 'local';
const maxTokens = Number(args.tokens ?? 700);
const temperature = Number(args.temperature ?? 0.25);

const kanjiItems = await readKanjiItems();
const targets = selectTargets(kanjiItems, args);

if (targets.length === 0) {
	console.error('No kanji selected. Pass kanji characters, --limit N, or --all.');
	process.exit(1);
}

const existing = await readExistingKnacks();
const next = { ...existing };

for (const item of targets) {
	if (!args.force && next[item.character]) {
		console.log(`skip ${item.character}: already generated`);
		continue;
	}

	console.log(`generate ${item.character} (${item.meaning})`);
	const knack = await generateKnack(item);
	next[item.character] = knack;
	await writeJson(outputPath, sortRecord(next));
}

console.log(`wrote ${outputPath}`);

function parseArgs(argv) {
	const parsed = { kanji: [] };
	for (let i = 0; i < argv.length; i += 1) {
		const arg = argv[i];
		if (arg === '--all') parsed.all = true;
		else if (arg === '--force') parsed.force = true;
		else if (arg === '--limit') parsed.limit = argv[++i];
		else if (arg === '--endpoint') parsed.endpoint = argv[++i];
		else if (arg === '--model') parsed.model = argv[++i];
		else if (arg === '--tokens') parsed.tokens = argv[++i];
		else if (arg === '--temperature') parsed.temperature = argv[++i];
		else if (arg === '--help' || arg === '-h') {
			printHelp();
			process.exit(0);
		} else {
			parsed.kanji.push(arg);
		}
	}
	return parsed;
}

function printHelp() {
	console.log(`Usage:
  node scripts/generate-kanji-knacks.mjs 明 森
  node scripts/generate-kanji-knacks.mjs --limit 5
  node scripts/generate-kanji-knacks.mjs --all

Options:
  --endpoint URL       OpenAI-compatible local server. Default: http://127.0.0.1:8000
  --model NAME         Model id sent to the server. Default: local
  --tokens N           Max completion tokens. Default: 700
  --temperature N      Sampling temperature. Default: 0.25
  --force              Regenerate existing entries
`);
}

async function readKanjiItems() {
	const source = await readFile(dataPath, 'utf8');
	const kanjiBlock = source.match(/const kanji: CardItem\[] = \[([\s\S]*?)\n\];/);
	if (!kanjiBlock) throw new Error('Could not find kanji array in src/lib/data.ts');

	const items = [];
	const itemPattern =
		/\{\s*character: '([^']+)',\s*romaji: '([^']+)',\s*meaning: '([^']+)',\s*readings: \{\s*on: \[([^\]]*)\](?:,\s*kun: \[([^\]]*)\])?\s*\}\s*\}/g;

	for (const match of kanjiBlock[1].matchAll(itemPattern)) {
		items.push({
			character: match[1],
			romaji: match[2],
			meaning: match[3],
			on: parseArrayLiteral(match[4]),
			kun: parseArrayLiteral(match[5] ?? '')
		});
	}

	return items;
}

function parseArrayLiteral(value) {
	return [...value.matchAll(/'([^']+)'/g)].map((match) => match[1]);
}

function selectTargets(items, parsed) {
	if (parsed.kanji.length > 0) {
		const wanted = new Set(parsed.kanji.join('').split(''));
		return items.filter((item) => wanted.has(item.character));
	}
	if (parsed.all) return items;
	if (parsed.limit) return items.slice(0, Number(parsed.limit));
	return [];
}

async function readExistingKnacks() {
	try {
		const text = await readFile(outputPath, 'utf8');
		return JSON.parse(text);
	} catch {
		return {};
	}
}

async function generateKnack(item) {
	const response = await fetch(`${endpoint}/v1/chat/completions`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({
			model,
			messages: [
				{
					role: 'system',
					content:
						'You are a world-class Japanese etymologist and AI engineer writing compact learning data for Kotsu. Return only strict JSON. No markdown.'
				},
				{ role: 'user', content: promptFor(item) }
			],
			max_tokens: maxTokens,
			temperature,
			stream: false
		})
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`LLM server returned ${response.status}: ${body}`);
	}

	const data = await response.json();
	const content = data?.choices?.[0]?.message?.content;
	if (typeof content !== 'string') throw new Error(`No message content for ${item.character}`);

	const parsed = parseJsonObject(content);
	return validateKnack(parsed, item);
}

function promptFor(item) {
	return `Act as a world-class Japanese etymologist and AI engineer.
I am building Kotsu, a minimalist, vertical-first Kanji learning tool.
Generate one Knack for this kanji.

Input:
- kanji: ${item.character}
- meaning: ${item.meaning}
- primary On readings: ${item.on.join('・') || 'unknown'}
- Kun readings: ${item.kun.join('・') || 'none listed'}

Return a strictly valid JSON object with this exact shape:
{
  "kanji": "${item.character}",
  "meaning": "...",
  "radicals": ["...", "..."],
  "mnemonic": "...",
  "the_kotsu": "...",
  "pitch_accent": {
    "reading": "...",
    "pattern": "Heiban | Atamadaka | Nakadaka | Odaka"
  }
}

Constraints:
- Radical decomposition should be useful to a beginner, even if you use visual components instead of formal Kangxi radicals.
- Mnemonic style: thick black characters on paper-white. Direct, slightly witty, professional. No fluff.
- The Kotsu sentence must be one sentence.
- Pitch accent: use the primary On reading. If standalone accent is uncertain, choose a plausible learner cue and keep it modest.
- Return only JSON.`;
}

function parseJsonObject(content) {
	const trimmed = content.trim();
	try {
		return JSON.parse(trimmed);
	} catch {
		const start = trimmed.indexOf('{');
		const end = trimmed.lastIndexOf('}');
		if (start === -1 || end === -1 || end <= start) throw new Error(`Model did not return JSON: ${content}`);
		return JSON.parse(trimmed.slice(start, end + 1));
	}
}

function validateKnack(value, item) {
	const patterns = new Set(['Heiban', 'Atamadaka', 'Nakadaka', 'Odaka']);
	if (!value || typeof value !== 'object') throw new Error(`Invalid knack for ${item.character}: not an object`);
	if (value.kanji !== item.character) throw new Error(`Invalid knack for ${item.character}: kanji mismatch`);
	if (typeof value.meaning !== 'string' || value.meaning.length === 0) throw new Error(`Invalid meaning for ${item.character}`);
	if (!Array.isArray(value.radicals) || value.radicals.length === 0) throw new Error(`Invalid radicals for ${item.character}`);
	if (!value.radicals.every((part) => typeof part === 'string' && part.length > 0)) {
		throw new Error(`Invalid radical list for ${item.character}`);
	}
	if (typeof value.mnemonic !== 'string' || value.mnemonic.length === 0) throw new Error(`Invalid mnemonic for ${item.character}`);
	if (typeof value.the_kotsu !== 'string' || value.the_kotsu.length === 0) throw new Error(`Invalid the_kotsu for ${item.character}`);
	if (!value.pitch_accent || typeof value.pitch_accent !== 'object') throw new Error(`Missing pitch accent for ${item.character}`);
	if (typeof value.pitch_accent.reading !== 'string' || value.pitch_accent.reading.length === 0) {
		throw new Error(`Invalid pitch accent reading for ${item.character}`);
	}
	if (!patterns.has(value.pitch_accent.pattern)) throw new Error(`Invalid pitch accent pattern for ${item.character}`);
	return {
		kanji: value.kanji,
		meaning: value.meaning,
		radicals: value.radicals,
		mnemonic: value.mnemonic,
		the_kotsu: value.the_kotsu,
		pitch_accent: {
			reading: value.pitch_accent.reading,
			pattern: value.pitch_accent.pattern
		}
	};
}

async function writeJson(path, value) {
	await mkdir(dirname(path), { recursive: true });
	await writeFile(path, `${JSON.stringify(value, null, '\t')}\n`, 'utf8');
}

function sortRecord(record) {
	return Object.fromEntries(Object.entries(record).sort(([left], [right]) => left.localeCompare(right, 'ja')));
}

function trimSlash(value) {
	return value.endsWith('/') ? value.slice(0, -1) : value;
}
