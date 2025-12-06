# Firestore Integration Documentation

## Overview
This document explains how user data is stored and managed in Firestore alongside Firebase Authentication.

## Architecture

### Firebase Authentication
Stores basic authentication data:
- Email
- Password (hashed)
- Display Name (username)
- Photo URL

### Firestore Database
Stores extended user profile data in the `users` collection:
- `username` - User's display name
- `email` - User's email address
- `role` - User role ('user' or 'admin')
- `createdAt` - Account creation timestamp
- `photoURL` - Profile picture URL (optional)
- `updatedAt` - Last profile update timestamp (optional)

## Data Flow

### User Registration (SignUpScreen)
1. User fills out registration form
2. `createUserWithEmailAndPassword()` creates Firebase Auth account
3. `updateProfile()` sets display name in Firebase Auth
4. `setDoc()` creates Firestore document in `users/{uid}` with:
   - username
   - email
   - role: 'user' (default)
   - createdAt: serverTimestamp()

### User Profile Update (EditProfileScreen)
1. User edits username and/or profile picture
2. `updateProfile()` updates Firebase Auth profile
3. `updateDoc()` updates Firestore document with:
   - username
   - photoURL
   - updatedAt: serverTimestamp()

### User Login (LogInScreen)
1. User logs in with email and password
2. Firebase Auth authenticates user
3. App.tsx `onAuthStateChanged` listener detects login
4. User data loaded from Firebase Auth (displayName, photoURL)
5. Additional data can be fetched from Firestore if needed

## Firestore Collection Structure

```
users (collection)
  └── {userId} (document)
      ├── username: string
      ├── email: string
      ├── role: "user" | "admin"
      ├── createdAt: Timestamp
      ├── photoURL?: string
      └── updatedAt?: Timestamp
```

## Code Examples

### Creating a User Document (SignUpScreen.tsx)
```typescript
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';

// After creating auth user
await setDoc(doc(db, 'users', userCredential.user.uid), {
  username: username.trim(),
  email: email.trim(),
  role: 'user',
  createdAt: serverTimestamp()
});
```

### Updating User Profile (EditProfileScreen.tsx)
```typescript
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';

const user = auth.currentUser;
if (user) {
  const userDocRef = doc(db, 'users', user.uid);
  await updateDoc(userDocRef, {
    username: username.trim(),
    photoURL: photoURL || '',
    updatedAt: serverTimestamp()
  });
}
```

### Reading User Data (Using Helper)
```typescript
import { getUserData } from '../utils/firestoreHelpers';
import { auth } from '../firebase/firebaseConfig';

const user = auth.currentUser;
if (user) {
  const userData = await getUserData(user.uid);
  console.log('User role:', userData?.role);
  console.log('Created at:', userData?.createdAt);
}
```

### Updating User Role (Admin Function)
```typescript
import { updateUserRole } from '../utils/firestoreHelpers';

// Promote user to admin
await updateUserRole(userId, 'admin');

// Demote admin to user
await updateUserRole(userId, 'user');
```

## Helper Functions

The `utils/firestoreHelpers.ts` file provides utility functions:

### `getUserData(userId: string)`
Fetches complete user data from Firestore.

**Returns:** `UserData | null`

**Example:**
```typescript
const userData = await getUserData('user123');
if (userData) {
  console.log(userData.username);
  console.log(userData.role);
}
```

### `updateUserData(userId: string, data: Partial<UserData>)`
Updates user data in Firestore.

**Example:**
```typescript
await updateUserData('user123', {
  username: 'NewUsername',
  photoURL: 'https://example.com/photo.jpg'
});
```

### `updateUserRole(userId: string, role: 'user' | 'admin')`
Updates user's role.

**Example:**
```typescript
await updateUserRole('user123', 'admin');
```

## Security Considerations

### Firestore Security Rules
You should implement Firestore security rules to protect user data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Users can update their own username and photoURL
      allow update: if request.auth != null 
                    && request.auth.uid == userId
                    && request.resource.data.diff(resource.data).affectedKeys()
                       .hasOnly(['username', 'photoURL', 'updatedAt']);
      
      // Only admins can update roles
      allow update: if request.auth != null 
                    && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
                    && request.resource.data.diff(resource.data).affectedKeys()
                       .hasOnly(['role', 'updatedAt']);
      
      // Only authenticated users can create (during signup)
      allow create: if request.auth != null 
                    && request.auth.uid == userId
                    && request.resource.data.role == 'user';
    }
  }
}
```

## Data Synchronization

### Why Store Data in Both Places?

**Firebase Auth:**
- Fast authentication
- Built-in security
- Easy to access current user data
- Limited to basic profile fields

**Firestore:**
- Extended user data
- Custom fields (role, timestamps, etc.)
- Queryable (find users by role, etc.)
- More flexible data structure

### Keeping Data in Sync

The app maintains synchronization by:
1. Updating both Firebase Auth and Firestore when profile changes
2. Using Firebase Auth as the source of truth for displayName and photoURL
3. Using Firestore for additional fields like role and timestamps

## Future Enhancements

1. **Profile Picture Storage**
   - Upload images to Firebase Storage
   - Store download URL in both Auth and Firestore
   
2. **Additional User Fields**
   - Bio/description
   - Location
   - Farm details
   - Contact information
   
3. **User Activity Tracking**
   - Last login timestamp
   - Activity logs
   
4. **Admin Dashboard**
   - View all users
   - Manage user roles
   - User statistics

## Troubleshooting

### Common Issues

**Issue:** "Missing or insufficient permissions"
- **Solution:** Check Firestore security rules, ensure user is authenticated

**Issue:** User document not created on signup
- **Solution:** Check console for errors, verify Firestore is initialized

**Issue:** Profile updates not reflecting
- **Solution:** Ensure both Auth and Firestore are updated, check for errors

**Issue:** Cannot read user data
- **Solution:** Verify user is logged in, check document path is correct

## Testing

### Test User Creation
1. Sign up with a new account
2. Check Firebase Console > Authentication (user should exist)
3. Check Firebase Console > Firestore > users collection (document should exist)
4. Verify all fields are populated correctly

### Test Profile Update
1. Log in with existing account
2. Edit profile (change username/photo)
3. Check Firebase Console > Authentication (displayName should update)
4. Check Firestore document (username, photoURL, updatedAt should update)

### Test Role Management
1. Use helper function to update user role
2. Verify role changes in Firestore
3. Test role-based features (if implemented)
