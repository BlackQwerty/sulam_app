---
description: Run React Native (Expo) project
---

1. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all packages listed in `package.json`.

2. **Start the Expo development server**
   ```bash
   npx expo start
   ```
   - The Metro bundler will launch and show a QR code.
   - Press `w` to open in a web browser, `a` for Android emulator/device, `i` for iOS simulator.

3. **Optional: Clear Metro cache** (if you encounter stale assets or transformer errors)
   ```bash
   npx expo start --clear
   ```

4. **Running on a specific platform**
   - Android: `npx expo run:android` (requires Android SDK and emulator/device)
   - iOS: `npx expo run:ios` (requires Xcode and simulator)

5. **Troubleshooting**
   - **SVG assets not loading**: Ensure `metro.config.js` includes the SVG transformer (already present) and `declarations.d.ts` declares `*.svg` modules.
   - **Missing Expo CLI**: Install globally with `npm install -g expo-cli` or use `npx expo` which works without global install.
   - **Watchman errors (macOS)**: Install via Homebrew `brew install watchman`.
   - **Metro bundler hangs**: Kill any running node processes and restart with `npx expo start --clear`.

6. **Stopping the server**
   Press `Ctrl+C` in the terminal where the Expo server is running.

**Note**: All commands should be run from the project root (`/Users/user/sulam_app`).
