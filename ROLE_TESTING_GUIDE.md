# 🔍 Role Fetching - Testing Guide

## What I Fixed

I changed the app to **always fetch the role from Firestore first** instead of using the cached version. This ensures you always see the latest role from the database.

### Changes Made:

1. **App.tsx** - Now fetches from Firestore first, cache is only used as fallback
2. **LogInScreen.tsx** - Added better logging with emojis for easy debugging

## How to Test

### Step 1: Clear Old Cache
The app might have cached "user" role from before. Let's clear it:

1. **Log out** from the app
2. **Close the app completely** (swipe up to force close)
3. **Reopen the app**

### Step 2: Log In Again
1. Click "LOG IN"
2. Enter: `maroq@gmail.com`
3. Enter your password
4. Click "LOG IN"

### Step 3: Check Console Logs

You should see these logs in order:

#### During Login:
```
🔍 [Login] Fetching user role for UID: ehw4WHAeQVN2ibwRqGzj3KRu8f93
✅ [Login] User document found: {username: "maroq", email: "maroq@gmail.com", role: "admin", ...}
✅ [Login] User role: admin
💾 [Login] Role cached in AsyncStorage: admin
User logged in successfully: maroq@gmail.com
```

#### After Login (App Start):
```
🔍 Fetching user data for UID: ehw4WHAeQVN2ibwRqGzj3KRu8f93
✅ User document data: {username: "maroq", email: "maroq@gmail.com", role: "admin", ...}
✅ User role from Firestore: admin
💾 Role cached in AsyncStorage: admin
```

### Step 4: Check UI

After logging in, you should see:

1. **Home Screen** (top left under profile icon): **"Admin"** ✅
2. **Sidebar** (badge next to "View profile"): **"Admin"** ✅

## Console Log Meanings

| Emoji | Meaning |
|-------|---------|
| 🔍 | Fetching data from Firestore |
| ✅ | Success - data found |
| 💾 | Saving to cache |
| ⚠️ | Warning - using fallback |
| ❌ | Error occurred |
| 🚪 | User logged out |
| 📦 | Using cached data |

## Troubleshooting

### Still Showing "User"?

#### Check Console Logs:

**If you see:**
```
❌ Error fetching user role from Firestore: [FirebaseError: Missing or insufficient permissions.]
```
**Solution:** Firestore rules not published correctly. Go back to Firebase Console and publish again.

**If you see:**
```
⚠️ No user document found in Firestore for UID: ...
```
**Solution:** User document doesn't exist. Sign up again or create document manually in Firebase Console.

**If you see:**
```
✅ User role from Firestore: admin
```
But UI still shows "User":
**Solution:** The role IS being fetched correctly. The issue is in the UI display. Check that HomeScreen and ProfileSidebar are receiving the role prop.

### Verify Firestore Document

1. Go to Firebase Console
2. Firestore Database → Data
3. Find `users` collection
4. Find your user document (UID: `ehw4WHAeQVN2ibwRqGzj3KRu8f93`)
5. Verify it has: `role: "admin"`

### Clear AsyncStorage Manually

If you want to force clear the cache:

Add this temporarily to LogInScreen.tsx after line 30:

```typescript
// TEMPORARY: Clear cache before login
await AsyncStorage.removeItem('userRole');
console.log('🗑️ Cache cleared');
```

Then remove it after testing.

## Expected Behavior

### For Admin User (role: "admin"):
- Home screen shows: "Admin"
- Sidebar shows: "Admin"
- Console shows: "✅ User role from Firestore: admin"

### For Farmer User (role: "farmer"):
- Home screen shows: "Farmer"
- Sidebar shows: "Farmer"
- Console shows: "✅ User role from Firestore: farmer"

### For Regular User (role: "user"):
- Home screen shows: "User"
- Sidebar shows: "User"
- Console shows: "✅ User role from Firestore: user"

## Testing Different Roles

To test different roles:

1. Go to Firebase Console → Firestore
2. Edit your user document
3. Change `role` field to:
   - `"admin"` - Will show "Admin"
   - `"farmer"` - Will show "Farmer"
   - `"user"` - Will show "User"
4. Save changes
5. Log out and log back in
6. Check if UI updates

## Quick Test Checklist

- [ ] Logged out completely
- [ ] Closed app (force close)
- [ ] Reopened app
- [ ] Logged in with maroq@gmail.com
- [ ] Checked console for "✅ User role from Firestore: admin"
- [ ] Checked home screen shows "Admin"
- [ ] Checked sidebar shows "Admin"
- [ ] Opened sidebar to verify badge

## If It Works

You should see:
- ✅ Console: "✅ User role from Firestore: admin"
- ✅ Home screen: "Admin" (top left)
- ✅ Sidebar: "Admin" (badge)

## If It Doesn't Work

Send me the console logs and I'll help debug!

Look for:
- Any ❌ error messages
- What role is being fetched
- Any permission errors
