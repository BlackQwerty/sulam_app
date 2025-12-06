import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @ts-ignore - getReactNativePersistence exists but TypeScript definitions are incomplete
import { getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCypHITkqVOSbzR6FI068HzJWFTOWN5L9U",
  authDomain: "sulamapp-3aa94.firebaseapp.com",
  projectId: "sulamapp-3aa94",
  storageBucket: "sulamapp-3aa94.firebasestorage.app",
  messagingSenderId: "8668240646",
  appId: "1:8668240646:web:9fb9c47cfcfbcfc9315c87",
  measurementId: "G-X111R1PF8V"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);