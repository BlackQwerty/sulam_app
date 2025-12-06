# Role Detection Fix - Complete Guide

## Issues Fixed

### 1. ✅ Sidebar Role Badge
**Before:** Hardcoded "Farmer"  
**After:** Dynamic role from Firestore (e.g., "Admin", "User")

### 2. ✅ Home Screen Header Role
**Before:** Hardcoded "Farmer" (top left of home screen)  
**After:** Dynamic role from Firestore (e.g., "Admin", "User")

## Changes Made

### 1. HomeScreen.tsx - Header Fix
**Line 120 - Changed from:**
```typescript
<Text style={styles.profileText}>Farmer</Text>
```

**To:**
```typescript
<Text style={styles.profileText}>
  {role.charAt(0).toUpperCase() + role.slice(1)}
</Text>
```

### 2. App.tsx - Enhanced Logging
Added detailed console logs to debug role fetching:
```typescript
console.log('Fetching user data for UID:', user.uid);
console.log('User document data:', userData);
console.log('User role from Firestore:', userData.role);
```

## How to Test

### Step 1: Check Console Logs
After logging in, you should see in the console:
```
Fetching user data for UID: Ypj6k6T3vhpOB24A9Vhs
User document data: {username: "maroq", email: "maroq@gmail.com", role: "admin", ...}
User role from Firestore: admin
```

### Step 2: Check UI
1. **Home Screen Header** (top left): Should show "Admin"
2. **Sidebar Badge**: Should show "Admin"

## Troubleshooting

### Issue: Still showing "User" or "Farmer"

**Possible Causes:**

1. **App needs to reload**
   - Solution: Close and restart the app
   - Or: Shake device → Reload

2. **User document doesn't exist in Firestore**
   - Check console for: "No user document found in Firestore"
   - Solution: Create user document manually in Firebase Console

3. **Role field is missing**
   - Check console for user document data
   - Solution: Add `role: "admin"` field in Firebase Console

4. **Cached state**
   - Solution: Log out and log back in

### Issue: Console shows error

**Error: "Error fetching user role from Firestore"**
- Check Firestore security rules
- Ensure user has read permission
- Check internet connection

**Error: "No user document found"**
- User document doesn't exist in `users` collection
- Create document with ID matching user's UID
- Add fields: `username`, `email`, `role`, `createdAt`

## Manual Fix in Firebase Console

If the role is not updating:

1. Go to Firebase Console
2. Navigate to Firestore Database
3. Find `users` collection
4. Find document with your user's UID
5. Ensure it has:
   ```
   role: "admin"
   ```
6. Save changes
7. Log out and log back in to the app

## Expected Console Output

### Successful Role Load:
```
Fetching user data for UID: Ypj6k6T3vhpOB24A9Vhs
User document data: {
  username: "maroq",
  email: "maroq@gmail.com", 
  role: "admin",
  createdAt: Timestamp
}
User role from Firestore: admin
```

### No Document Found:
```
Fetching user data for UID: Ypj6k6T3vhpOB24A9Vhs
No user document found in Firestore for UID: Ypj6k6T3vhpOB24A9Vhs
```

### Error:
```
Fetching user data for UID: Ypj6k6T3vhpOB24A9Vhs
Error fetching user role from Firestore: [Error details]
```

## Role Display Logic

The role is automatically capitalized:
- `"admin"` → **"Admin"**
- `"user"` → **"User"**
- `"farmer"` → **"Farmer"**

This happens in two places:
1. Home screen header (top left)
2. Sidebar badge

Both use the same logic:
```typescript
{role.charAt(0).toUpperCase() + role.slice(1)}
```

## Files Modified

1. ✏️ `/screens/HomeScreen.tsx` - Fixed header role display
2. ✏️ `/App.tsx` - Enhanced logging for debugging
3. ✏️ `/components/ProfileSidebar.tsx` - Already fixed in previous update

## Next Steps

1. **Reload the app** to see changes
2. **Check console logs** to verify role is being fetched
3. **Verify Firestore data** if role is not showing correctly
4. **Log out and log back in** if needed

## Quick Debug Checklist

- [ ] App has been reloaded
- [ ] User is logged in
- [ ] Console shows "Fetching user data for UID: ..."
- [ ] Console shows user document data
- [ ] Console shows "User role from Firestore: admin"
- [ ] Home screen header shows "Admin"
- [ ] Sidebar badge shows "Admin"

If all checkboxes are checked, the role detection is working correctly! ✅
