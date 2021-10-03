import { initializeApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithRedirect,
	signOut,
} from 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASECONFIG!);
export const app = initializeApp(firebaseConfig);

// authentication
export const auth = getAuth();
export const googleprovider = new GoogleAuthProvider();

export const login = async () => {
	try {
		await signInWithRedirect(auth, googleprovider);
	} catch (e) {}
};

export const logout = () => {
	signOut(auth);
};

export const useAuthStateHook = () => useAuthState(auth);
