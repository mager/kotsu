import { onAuth, getProgress, getCustomVocab, addCustomVocab, removeCustomVocab, type auth, type CustomVocabItem } from '$lib/firebase';
import type { User } from 'firebase/auth';

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

export function initAuth() {
	if (initialized) return;
	initialized = true;

	onAuth(async (user) => {
		state.user = user;
		state.loading = false;
		if (user) {
			const [learned, customVocab] = await Promise.all([
				getProgress(user.uid),
				getCustomVocab(user.uid)
			]);
			state.learned = learned;
			state.customVocab = customVocab;
		} else {
			state.learned = {};
			state.customVocab = [];
		}
	});
}

export function getCustomVocabItems(): CustomVocabItem[] {
	return state.customVocab;
}

export async function addVocabItem(item: CustomVocabItem): Promise<void> {
	if (!state.user) return;
	await addCustomVocab(state.user.uid, item);
	state.customVocab = [...state.customVocab, item];
}

export async function removeVocabItem(item: CustomVocabItem): Promise<void> {
	if (!state.user) return;
	await removeCustomVocab(state.user.uid, item);
	state.customVocab = state.customVocab.filter((v) => v.id !== item.id);
}

export function getAuthState() {
	return state;
}

export function setLearned(key: string, value: boolean) {
	state.learned = { ...state.learned, [key]: value };
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
	return { learned, total: 0 }; // total set by caller
}
