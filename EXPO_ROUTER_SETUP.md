# Expo Router Setup

## Installation

Before running the app, install the required expo-router dependencies:

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens
```

This will install:
- `expo-router` - File-based routing for Expo
- `react-native-safe-area-context` - Safe area handling
- `react-native-screens` - Native screen components

## Routing Structure

The app uses expo-router with file-based routing:

- `/` → Redirects to `/login-simple`
- `/login-simple` → Renders `LoginSimpleScreen` (from registry)
- `/login-hero` → Renders `LoginHeroScreen` (from registry)
- `/[screen]` → Dynamic route for future screens (uses registry)

All screens are sourced from `src/screens/registry.ts` as the single source of truth.

