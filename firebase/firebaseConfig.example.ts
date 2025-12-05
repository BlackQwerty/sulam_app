import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @ts-ignore - getReactNativePersistence exists but TypeScript definitions are incomplete
import { getReactNativePersistence } from 'firebase/auth';

// TODO: Replace these placeholder values with your actual Firebase configuration
// Get these values from: https://console.firebase.google.com/
// 1. Go to Project Settings (gear icon)
// 2. Scroll down to "Your apps" section
// 3. Click on the web app icon (</>)
// 4. Copy the configuration values

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
