import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  projectId: "gen-lang-client-0361667087",
  appId: "1:1030302893778:web:54a744710153a1f02e8f0b",
  apiKey: "AIzaSyAIipkYUMHWDNjOUjrBiOr2xg_MFzSaC18",
  authDomain: "gen-lang-client-0361667087.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-akmoderncreating-437376a8-1107-4fee-bfac-2b9b946d1b97",
  storageBucket: "gen-lang-client-0361667087.firebasestorage.app",
  messagingSenderId: "1030302893778",
  measurementId: "",
  oAuthClientId: "1030302893778-llt6bth9lkfup1s8fvjib2fa8jncc6bv.apps.googleusercontent.com",
  recaptchaSiteKey: ""
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

const databaseId = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? firebaseConfig.firestoreDatabaseId
  : undefined;

let firestoreInstance;
try {
  firestoreInstance = initializeFirestore(
    app,
    {
      experimentalForceLongPolling: true,
      experimentalAutoDetectLongPolling: true
    },
    databaseId
  );
} catch {
  firestoreInstance = databaseId ? getFirestore(app, databaseId) : getFirestore(app);
}

export const db = firestoreInstance;

export default app;
