import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAKpjjm14NHy-KSLQ-kjYTPb6wXyDxzY4Y",
  authDomain: "eakthebill.firebaseapp.com",
  projectId: "eakthebill",
  storageBucket: "eakthebill.firebasestorage.app",
  messagingSenderId: "689173419469",
  appId: "1:689173419469:web:2007f6a9217d705b93a084",
  measurementId: "G-G7H3D8YF1N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
