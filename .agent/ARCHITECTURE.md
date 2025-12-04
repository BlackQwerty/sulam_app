# App Architecture

## Overview
This is a React Native (Expo) application with a simple navigation system managed by state.

## File Structure

### `App.tsx` - Main Navigation Controller
- **Purpose**: Acts as the root component and navigation controller
- **Responsibilities**:
  - Manages global navigation state (`currentScreen`)
  - Renders the welcome/landing screen
  - Routes to different screens based on state
  - Passes navigation callbacks to child screens

### `screens/HomeScreen.tsx` - Home Dashboard
- **Purpose**: Main dashboard after user logs in
- **Features**:
  - Profile sidebar
  - Banner cards (New Sale, Today Price)
  - Menu grid with navigation buttons
  - Bottom navigation bar
- **Props**: Receives navigation callbacks from App.tsx to navigate to other screens

## Navigation Flow

```
App.tsx (Welcome Screen)
    ↓
    ├── Sign Up → HomeScreen
    └── Log In → HomeScreen
         ↓
         ├── Product Screen
         ├── Location Screen
         ├── Assistant Screen
         ├── About Us Screen
         ├── Pine-Bot Screen
         ├── Order Tracking Screen
         ├── Dashboard Screen
         ├── Weather Screen
         └── Payment Screen
```

## Key Points

1. **State-based Navigation**: Uses React `useState` to manage which screen is active
2. **Callback Props**: Each screen receives navigation callbacks as props
3. **Optional Callbacks**: All navigation props are optional (`?`) to prevent crashes
4. **Safe Invocation**: Uses optional chaining (`?.()`) when calling navigation callbacks

## Why This Architecture?

- **Simple**: No complex routing library needed for basic navigation
- **Type-safe**: TypeScript ensures all navigation props are correctly typed
- **Flexible**: Easy to add new screens by adding to the `Screen` type and creating conditional renders
- **Clear separation**: App.tsx handles routing, screens handle UI and logic
