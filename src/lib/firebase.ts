import { initializeApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut as firebaseSignOut,
	onAuthStateChanged,
	type User
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// TODO: Replace with your Firebase config from console
// Firebase Console → Project Settings → Your apps → Web
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'kotsu-875a3.firebaseapp.com',
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'kotsu-875a3',
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'kotsu-875a3.firebasestorage.app',
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
	const result = await signInWithPopup(auth, provider);
	// Create user doc if first time
	const userRef = doc(db, 'users', result.user.uid);
	const userDoc = await getDoc(userRef);
	if (!userDoc.exists()) {
		await setDoc(userRef, {
			displayName: result.user.displayName,
			email: result.user.email,
			photoURL: result.user.photoURL,
			createdAt: new Date().toISOString(),
			learned: {}
		});
	}
	return result.user;
}

export async function signOut() {
	await firebaseSignOut(auth);
}

export function onAuth(callback: (user: User | null) => void) {
	return onAuthStateChanged(auth, callback);
}

// Progress tracking
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
