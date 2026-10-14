import {
	onAuth,
	getProgress,
	getCustomVocab,
	addCustomVocab,
	removeCustomVocab,
	markLearned,
	unmarkLearned,
	type CustomVocabItem
} from '$lib/firebase';
import type { User } from 'firebase/auth';
import { getColumnItems, columns } from '$lib/data';
import {
	mergeCustomVocab,
	queuePendingMutation,
	readCustomVocab,
	readLearned,
	readPendingMutations,
	writeCustomVocab,
	writeLearned,
	writePendingMutations
} from '$lib/offline';

interface AuthState {
	user: User | null;
	loading: boolean;
	learned: Record<string, boolean>;
	customVocab: CustomVocabItem[];
}

let state = $state<AuthState>({
	user: null,
	loading: true,
	learned: {},
	customVocab: []
});

let initialized = false;
let onlineListenerAttached = false;

function persistLocalState() {
	writeLearned(state.learned);
	writeCustomVocab(state.customVocab);
}

function hydrateLocalState() {
	state.learned = readLearned();
	state.customVocab = readCustomVocab();
}

async function flushPendingMutations(user: User | null) {
	if (!user) return;

	const pending = readPendingMutations();
	if (pending.length === 0) return;

	const remaining = [];

	for (const mutation of pending) {
		try {
			if (mutation.type === 'markLearned') {
				await markLearned(user.uid, mutation.columnId, mutation.index);
			} else if (mutation.type === 'unmarkLearned') {
				await unmarkLearned(user.uid, mutation.columnId, mutation.index);
			} else if (mutation.type === 'addVocab') {
				await addCustomVocab(user.uid, mutation.item);
			} else if (mutation.type === 'removeVocab') {
				await removeCustomVocab(user.uid, mutation.item);
			}
		} catch {
			remaining.push(mutation);
		}
	}

	writePendingMutations(remaining);
}

function queueLocalDiffsForUser(remoteLearned: Record<string, boolean>, remoteCustomVocab: CustomVocabItem[]) {
	for (const [key, value] of Object.entries(state.learned)) {
		if (!value || remoteLearned[key] === true) continue;
		const [columnId, indexStr] = key.split('_');
		queuePendingMutation({ type: 'markLearned', columnId, index: Number(indexStr) });
	}

	const remoteIds = new Set(remoteCustomVocab.map((item) => item.id));
	for (const item of state.customVocab) {
		if (!remoteIds.has(item.id)) {
			queuePendingMutation({ type: 'addVocab', item });
		}
	}
}

export function initAuth() {
	if (initialized) return;
	initialized = true;
	state.loading = true;
	hydrateLocalState();
	state.loading = false;

	if (typeof window !== 'undefined' && !onlineListenerAttached) {
		onlineListenerAttached = true;
		window.addEventListener('online', () => {
			flushPendingMutations(state.user).catch(() => {});
		});
	}

	onAuth(async (user) => {
		state.user = user;
		state.loading = false;

		if (!user) {
			persistLocalState();
			return;
		}

		try {
			const [remoteLearned, remoteCustomVocab] = await Promise.all([
				getProgress(user.uid),
				getCustomVocab(user.uid)
			]);

			queueLocalDiffsForUser(remoteLearned, remoteCustomVocab);
			state.learned = { ...remoteLearned, ...state.learned };
			state.customVocab = mergeCustomVocab(remoteCustomVocab, state.customVocab);
			persistLocalState();
			await flushPendingMutations(user);
		} catch {
			persistLocalState();
		}
	});
}

export function getCustomVocabItems(): CustomVocabItem[] {
	return state.customVocab;
}

export async function addVocabItem(item: CustomVocabItem): Promise<void> {
	state.customVocab = mergeCustomVocab(state.customVocab, [item]);
	persistLocalState();

	if (!state.user) return;
	queuePendingMutation({ type: 'addVocab', item });
	await flushPendingMutations(state.user);
}

export async function removeVocabItem(item: CustomVocabItem): Promise<void> {
	state.customVocab = state.customVocab.filter((v) => v.id !== item.id);
	persistLocalState();

	if (!state.user) return;
	queuePendingMutation({ type: 'removeVocab', item });
	await flushPendingMutations(state.user);
}

export function getAuthState() {
	return state;
}

export function setLearned(key: string, value: boolean) {
	state.learned = { ...state.learned, [key]: value };
	writeLearned(state.learned);
}

export async function setLearnedStatus(columnId: string, index: number, value: boolean): Promise<void> {
	const key = `${columnId}_${index}`;
	setLearned(key, value);

	if (!state.user) return;
	queuePendingMutation({ type: value ? 'markLearned' : 'unmarkLearned', columnId, index });
	await flushPendingMutations(state.user);
}

export function isLearned(columnId: string, index: number): boolean {
	return state.learned[`${columnId}_${index}`] === true;
}

export function getColumnProgress(columnId: string, total: number): number {
	let count = 0;
	for (let i = 0; i < total; i++) {
		if (state.learned[`${columnId}_${i}`] === true) count++;
	}
	return count;
}

export function getTotalProgress(): { learned: number; total: number } {
	const learned = Object.values(state.learned).filter(Boolean).length;
	const total = columns.reduce((sum, col) => sum + getColumnItems(col).length, 0);
	return { learned, total };
}
