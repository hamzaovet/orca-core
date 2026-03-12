import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || "AIzaSyBmhjq_JB-H1YNoyDtdOkGXiKyPGkLKEd4",
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || "ardent-fastness-406222.firebaseapp.com",
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || "ardent-fastness-406222",
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || "ardent-fastness-406222.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "672193064869",
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || "1:672193064869:web:7bd6400e5454262de5024c"
};

const app = initializeApp(firebaseConfig);

export const auth    = getAuth(app);
export const db      = getFirestore(app);
// Storage is used for client-admin project file sharing (ProjectDetails workspace)
export const storage = getStorage(app);