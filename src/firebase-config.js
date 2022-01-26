import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "e-commerce-9c9e9.firebaseapp.com",
    projectId: "e-commerce-9c9e9",
    storageBucket: "e-commerce-9c9e9.appspot.com",
    messagingSenderId: "746000720756",
    appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();

