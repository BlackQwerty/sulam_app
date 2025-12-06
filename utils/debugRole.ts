import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';

/**
 * Debug function to test role fetching
 * Add this to your LogInScreen or App.tsx temporarily
 */
export async function debugRoleFetch() {
  console.log('=== DEBUG: Starting Role Fetch Test ===');

  // 1. Check current user
  const user = auth.currentUser;
  if (!user) {
    console.log('❌ No user logged in');
    return;
  }
  console.log('✅ Current user UID:', user.uid);
  console.log('✅ Current user email:', user.email);
  console.log('✅ Current user displayName:', user.displayName);

  // 2. Check AsyncStorage cache
  try {
    const cachedRole = await AsyncStorage.getItem('userRole');
    console.log('📦 Cached role in AsyncStorage:', cachedRole);
  } catch (error) {
    console.log('❌ Error reading AsyncStorage:', error);
  }

  // 3. Fetch from Firestore
  try {
    console.log('🔍 Fetching from Firestore...');
    const userDocRef = doc(db, 'users', user.uid);
    console.log('📄 Document path:', `users/${user.uid}`);

    const userDoc = await getDoc(userDocRef);
    console.log('📄 Document exists:', userDoc.exists());

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('✅ Full document data:', JSON.stringify(userData, null, 2));
      console.log('✅ Role field:', userData.role);
      console.log('✅ Role type:', typeof userData.role);
    } else {
      console.log('❌ Document does not exist!');
    }
  } catch (error) {
    console.log('❌ Firestore error:', error);
  }

  console.log('=== DEBUG: End of Test ===');
}

/**
 * Function to force clear cache and reset role
 */
export async function clearRoleCache() {
  console.log('🗑️ Clearing role cache...');
  try {
    await AsyncStorage.removeItem('userRole');
    console.log('✅ Cache cleared successfully');
  } catch (error) {
    console.log('❌ Error clearing cache:', error);
  }
}

/**
 * Function to manually set role (for testing)
 */
export async function forceSetRole(role: string) {
  console.log(`🔧 Force setting role to: ${role}`);
  try {
    await AsyncStorage.setItem('userRole', role);
    console.log('✅ Role set successfully');
  } catch (error) {
    console.log('❌ Error setting role:', error);
  }
}
