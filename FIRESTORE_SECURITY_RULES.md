# Firestore Security Rules

## Copy these rules to Firebase Console

Go to Firebase Console → Firestore Database → Rules tab and paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // Allow users to read their own document
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Allow users to create their own document during signup
      allow create: if request.auth != null && request.auth.uid == userId;
      
      // Allow users to update their own document
      allow update: if request.auth != null && request.auth.uid == userId;
      
      // Allow users to delete their own document
      allow delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## How to Apply These Rules

### Step 1: Go to Firebase Console
1. Open https://console.firebase.google.com
2. Select your project: **sulamapp-3aa94**

### Step 2: Navigate to Firestore Rules
1. Click **Firestore Database** in the left menu
2. Click the **Rules** tab at the top

### Step 3: Replace the Rules
1. Delete all existing rules
2. Paste the rules above
3. Click **Publish**

### Step 4: Test
1. Reload your app
2. Log out and log back in
3. Check if the role now shows as "Admin"

## Current Issue

The error message shows:
```
Error fetching user role from Firestore: FirebaseError: Missing or insufficient permissions.
```

This means your current Firestore rules are blocking read access to the users collection.

## What These Rules Do

- ✅ Allow users to read their own data
- ✅ Allow users to create their own document (during signup)
- ✅ Allow users to update their own data (edit profile)
- ✅ Prevent users from reading other users' data
- ✅ Prevent unauthorized access

## Alternative: Temporary Open Rules (NOT RECOMMENDED FOR PRODUCTION)

If you just want to test quickly, you can use these temporary rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

⚠️ **WARNING:** These rules allow any authenticated user to read/write all data. Only use for testing!

## After Applying Rules

Once you've applied the rules:

1. **Reload the app**
2. **Log out** from the app
3. **Log back in** with your admin account
4. The console should now show:
   ```
   Fetching user data for UID: Ypj6k6T3vhpOB24A9Vhs
   User document data: {username: "maroq", email: "maroq@gmail.com", role: "admin", ...}
   User role from Firestore: admin
   ```
5. The sidebar and header should show **"Admin"**

## Troubleshooting

### If you still get permission errors:
1. Make sure you clicked **Publish** after pasting the rules
2. Wait 10-20 seconds for rules to propagate
3. Completely close and restart the app
4. Log out and log back in

### If the rules don't save:
- Check for syntax errors (the Firebase Console will show them)
- Make sure you're using `rules_version = '2';` at the top
- Make sure all brackets are properly closed
