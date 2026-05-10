import type { CustomVocabItem } from '$lib/firebase';

const LEARNED_KEY = 'kotsu.learned.v1';
const CUSTOM_VOCAB_KEY = 'kotsu.custom-vocab.v1';
const PENDING_KEY = 'kotsu.pending.v1';

type PendingMutation =
	| { type: 'markLearned'; columnId: string; index: number }
	| { type: 'unmarkLearned'; columnId: string; index: number }
	| { type: 'addVocab'; item: CustomVocabItem }
	| { type: 'removeVocab'; item: CustomVocabItem };

function canStore(): boolean {
	return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function readJson<T>(key: string, fallback: T): T {
	if (!canStore()) return fallback;
	try {
		const raw = localStorage.getItem(key);
		return raw ? (JSON.parse(raw) as T) : fallback;
	} catch {
		return fallback;
	}
}

function writeJson<T>(key: string, value: T): void {
	if (!canStore()) return;
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// ignore storage failures
	}
}

export function readLearned(): Record<string, boolean> {
	return readJson<Record<string, boolean>>(LEARNED_KEY, {});
}

export function writeLearned(learned: Record<string, boolean>): void {
	writeJson(LEARNED_KEY, learned);
}

export function readCustomVocab(): CustomVocabItem[] {
	return readJson<CustomVocabItem[]>(CUSTOM_VOCAB_KEY, []);
}

export function writeCustomVocab(items: CustomVocabItem[]): void {
	writeJson(CUSTOM_VOCAB_KEY, items);
}

export function readPendingMutations(): PendingMutation[] {
	return readJson<PendingMutation[]>(PENDING_KEY, []);
}

export function writePendingMutations(items: PendingMutation[]): void {
	writeJson(PENDING_KEY, items);
}

export function queuePendingMutation(item: PendingMutation): void {
	const pending = readPendingMutations();
	pending.push(item);
	writePendingMutations(pending);
}

export function mergeCustomVocab(...lists: CustomVocabItem[][]): CustomVocabItem[] {
	const map = new Map<string, CustomVocabItem>();
	for (const list of lists) {
		for (const item of list) {
			map.set(item.id, item);
		}
	}
	return Array.from(map.values()).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}
