import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: 'AIzaSyDmSYKdFqLfU8rreC8xNFb3XlEOAO9BApY',
    authDomain: 'emergingswe-bd158.firebaseapp.com',
    projectId: 'emergingswe-bd158',
    storageBucket: 'emergingswe-bd158.appspot.com',
    messagingSenderId: '378618311898',
    appId: '1:378618311898:web:6aba3c00a8b08387c761e3',
    measurementId: 'G-EJEDSFVTPZ',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();

export default db;