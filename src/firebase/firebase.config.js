import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

console.log(import.meta.env.VITE_APP_APIKEY, "firebase api key");

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: 'lgn-goole-auth.firebaseapp.com',
  projectId: 'lgn-goole-auth',
  storageBucket: 'lgn-goole-auth.appspot.com',
  messagingSenderId: '860093380056',
  appId: '1:860093380056:web:7a9e1cee807d5dd6c4aead',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);