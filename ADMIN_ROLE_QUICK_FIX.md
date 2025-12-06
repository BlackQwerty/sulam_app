# Quick Fix for Admin Role

## The Problem
Firestore security rules are blocking the app from reading your role.

## The Solution
I've implemented a workaround that caches the role in AsyncStorage (local storage on the device).

## How to Set Your Role to Admin

### Method 1: Log Out and Log Back In
1. **Log out** from the app
2. **Log back in** with your admin account (maroq@gmail.com)
3. During login, the app will try to fetch your role from Firestore
4. If it succeeds, it will cache "admin" in AsyncStorage
5. If it fails, it will use "user" as default

### Method 2: Manually Set Role (Temporary)

Add this code temporarily to your LogInScreen to force set admin role:

In `LogInScreen.tsx`, after line 33, add:

```typescript
// TEMPORARY: Force set admin role
await AsyncStorage.setItem('userRole', 'admin');
console.log('Manually set role to admin');
```

Then:
1. Log in
2. The role will be set to "admin"
3. Remove this code after testing

### Method 3: Fix Firestore Rules (BEST SOLUTION)

Go to Firebase Console and set these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## What Changed

### LogInScreen.tsx
- Now fetches role from Firestore on login
- Caches it in AsyncStorage
- If Firestore fails, uses "user" as default

### App.tsx
- First checks AsyncStorage for cached role
- Only tries Firestore if no cache exists
- This avoids the permission error on every app start

## How It Works Now

```
Login → Try Firestore → Cache in AsyncStorage
                ↓
        (If permission error)
                ↓
        Use default "user"

App Start → Check AsyncStorage → Use cached role
                ↓
        (If no cache)
                ↓
        Try Firestore → Cache result
```

## Testing

1. **Log out** from the app
2. **Log back in**
3. Check console logs:
   - Should see: "User role cached: admin" (if Firestore works)
   - OR: "Error fetching role (will use default)" (if permissions block it)
4. After login, check console:
   - Should see: "Using cached role from AsyncStorage: admin"

## Console Logs to Look For

### On Login (Success):
```
User logged in successfully: maroq@gmail.com
User role cached: admin
```

### On Login (Permission Error):
```
User logged in successfully: maroq@gmail.com
Error fetching role (will use default): [FirebaseError: Missing or insufficient permissions.]
```

### On App Start (Using Cache):
```
Using cached role from AsyncStorage: admin
```

## If Still Showing "User"

If it still shows "User" after logging in:

1. The Firestore fetch failed (permission error)
2. It cached "user" as default
3. You need to either:
   - Fix Firestore rules (recommended)
   - Manually set the role in AsyncStorage (temporary)

## Temporary Manual Fix

Add this to LogInScreen.tsx after successful login:

```typescript
// TEMPORARY FIX - Remove after Firestore rules are fixed
if (email.trim() === 'maroq@gmail.com') {
  await AsyncStorage.setItem('userRole', 'admin');
  console.log('Admin role set for maroq@gmail.com');
}
```

This will force your account to have admin role until Firestore rules are fixed.
