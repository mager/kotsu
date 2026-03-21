import { onAuth, getProgress, type auth } from '$lib/firebase';
import type { User } from 'firebase/auth';

interface AuthState {
	user: User | null;
	loading: boolean;
	learned: Record<string, boolean>;
}

let state = $state<AuthState>({
	user: null,
	loading: true,
	learned: {}
});

let initialized = false;

export function initAuth() {
	if (initialized) return;
	initialized = true;

	onAuth(async (user) => {
		state.user = user;
		state.loading = false;
		if (user) {
			state.learned = await getProgress(user.uid);
		} else {
			state.learned = {};
		}
	});
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
