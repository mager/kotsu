import { initializeApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut as firebaseSignOut,
	onAuthStateChanged,
	type User
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export interface CustomVocabItem {
	id: string;
	character: string;
	romaji: string;
	meaning: string;
	createdAt: string;
}

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyC9jAA4RL7Qw51spKiEY0U9pkkZ5B7XQ5c',
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'kotsu-875a3.firebaseapp.com',
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'kotsu-875a3',
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'kotsu-875a3.firebasestorage.app',
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '930402461940',
	appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:930402461940:web:fdc84810b27365569d16a1',
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-LMHHYJTNE8'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
	const result = await signInWithPopup(auth, provider);
	const userRef = doc(db, 'users', result.user.uid);
	const userDoc = await getDoc(userRef);
	if (!userDoc.exists()) {
		await setDoc(userRef, {
			displayName: result.user.displayName,
			email: result.user.email,
			photoURL: result.user.photoURL,
			username: '',
			createdAt: new Date().toISOString(),
			learned: {}
		});
	}
	return result.user;
}

export async function updateUsername(uid: string, username: string) {
	const userRef = doc(db, 'users', uid);
	await updateDoc(userRef, { username });
}

export async function getUsername(uid: string): Promise<string> {
	const userRef = doc(db, 'users', uid);
	const userDoc = await getDoc(userRef);
	if (userDoc.exists()) {
		return userDoc.data().username || '';
	}
	return '';
}

export async function signOut() {
	await firebaseSignOut(auth);
}

export function onAuth(callback: (user: User | null) => void) {
	return onAuthStateChanged(auth, callback);
}

export async function markLearned(uid: string, columnId: string, index: number) {
	const userRef = doc(db, 'users', uid);
	const key = `learned.${columnId}_${index}`;
	await updateDoc(userRef, { [key]: true });
}

export async function unmarkLearned(uid: string, columnId: string, index: number) {
	const userRef = doc(db, 'users', uid);
	const key = `learned.${columnId}_${index}`;
	await updateDoc(userRef, { [key]: false });
}

export async function getProgress(uid: string): Promise<Record<string, boolean>> {
	const userRef = doc(db, 'users', uid);
	const userDoc = await getDoc(userRef);
	if (userDoc.exists()) {
		return userDoc.data().learned || {};
	}
	return {};
}

export async function getCustomVocab(uid: string): Promise<CustomVocabItem[]> {
	const userRef = doc(db, 'users', uid);
	const userDoc = await getDoc(userRef);
	if (userDoc.exists()) {
		return userDoc.data().customVocab || [];
	}
	return [];
}

export async function addCustomVocab(uid: string, item: CustomVocabItem): Promise<void> {
	const userRef = doc(db, 'users', uid);
	await updateDoc(userRef, { customVocab: arrayUnion(item) });
}

export async function removeCustomVocab(uid: string, item: CustomVocabItem): Promise<void> {
	const userRef = doc(db, 'users', uid);
	await updateDoc(userRef, { customVocab: arrayRemove(item) });
}
