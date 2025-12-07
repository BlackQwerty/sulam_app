# Firestore Security Rules for Sulam App

## FIX: Allow all authenticated users to READ products and announcements

The error `[code=permission-denied]` for normal users happens because the previous rules might have been too cached or strict.
This version explicitly allows `read` for ANY authenticated user, and `write` for admins.

### Copy & Paste these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // --- Helper Functions ---
    
    // Check if user is logged in
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Check if user is an Admin
    function isAdmin() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // --- Collection Rules ---

    // 1. Users Collection
    match /users/{userId} {
      // Users can read/write their own data
      allow read, write: if isAuthenticated() && request.auth.uid == userId;
      // Admins can read all users (helpful for management)
      allow read: if isAdmin();
    }

    // 2. Products Collection
    match /products/{productId} {
      // Anyone logged in can VIEW products (Fixes normal user error)
      allow read: if isAuthenticated();
      // Only Admins can add/edit/delete products
      allow write: if isAdmin();
    }

    // 3. Announcements/Sales Collection
    match /announcements/{announcementId} {
      // Anyone logged in can VIEW announcements
      allow read: if isAuthenticated();
      // Only Admins can manage announcements
      allow write: if isAdmin();
    }
  }
}
```

## How to Apply:
1. Go to **[Firebase Console](https://console.firebase.google.com)**.
2. Select your project **sulamapp**.
3. Go to **Firestore Database** > **Rules**.
4. **Delete** the existing rules.
5. **Paste** the code above.
6. Click **Publish**.

## Why this fixes it:
- The previous rule `allow read: if true` is sometimes flaky depending on console settings (if it thinks "true" means "public to the world" it might warn you, but `isAuthenticated()` is safer and clearer).
- This explicitly allows "normal users" (farmers) to READ the product list, which stops the red error logs.
