import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

/**
 * User data structure in Firestore
 */
export interface UserData {
  username: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: any; // Firestore Timestamp
  photoURL?: string;
  updatedAt?: any; // Firestore Timestamp
}

/**
 * Get user data from Firestore by user ID
 * @param userId - The Firebase Auth user ID
 * @returns User data or null if not found
 */
export async function getUserData(userId: string): Promise<UserData | null> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      console.log('No user document found for ID:', userId);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

/**
 * Update user data in Firestore
 * @param userId - The Firebase Auth user ID
 * @param data - Partial user data to update
 */
export async function updateUserData(
  userId: string,
  data: Partial<Omit<UserData, 'createdAt'>>
): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    console.log('User data updated successfully');
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
}

/**
 * Update user role in Firestore
 * @param userId - The Firebase Auth user ID
 * @param role - New role ('user' or 'admin')
 */
export async function updateUserRole(
  userId: string,
  role: 'user' | 'admin'
): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      role,
      updatedAt: serverTimestamp()
    });
    console.log('User role updated to:', role);
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
}

/**
 * Example usage in a component:
 * 
 * import { getUserData, updateUserData } from '../utils/firestoreHelpers';
 * import { auth } from '../firebase/firebaseConfig';
 * 
 * // Get current user's data
 * const user = auth.currentUser;
 * if (user) {
 *   const userData = await getUserData(user.uid);
 *   console.log('User role:', userData?.role);
 * }
 * 
 * // Update user's username
 * if (user) {
 *   await updateUserData(user.uid, { username: 'NewUsername' });
 * }
 */
