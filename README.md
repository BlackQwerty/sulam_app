# LPNM Mobile App - Welcome Screen

A React Native mobile application welcome screen for Lembaga Perindustrian Nanas Malaysia (LPNM).

## Features

- Custom welcome screen with pineapple illustration
- Two action buttons: Sign In and Log In
- Responsive design for mobile devices
- Custom color scheme matching LPNM branding

## Color Scheme

- Main Background: `#04383f`
- Header/Footer: `#065b66`
- Primary Button: `#006884`
- Text: White (`#fff`)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
test-app/
├── components/
│   ├── Header.tsx       # Top header with logo
│   └── Button.tsx       # Reusable button component
├── assets/
│   └── pineapple.svg    # Pineapple illustration
├── App.tsx              # Main application component
└── README.md
```

## Components

### Header
Displays the LPNM logo and organization name at the top of the screen.

### Button
Reusable button component with two variants:
- `filled`: Green background button
- `outlined`: White outline button

### App
Main welcome screen component that combines all elements.

## Customization

To modify colors, update the StyleSheet in each component:
- Background colors in `App.tsx`
- Button colors in `components/Button.tsx`
- Header colors in `components/Header.tsx`

## Technologies Used

- React Native 0.81.5
- Expo SDK 54
- TypeScript
- React Native SVG
- Lucide React Native (for icons)