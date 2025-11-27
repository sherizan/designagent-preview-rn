# DesignAgent Preview - React Native

A scalable React Native app structure for previewing DesignAgent screens.

## Setup

1. Install dependencies:

```bash
npx expo install expo-font @expo-google-fonts/urbanist
```

2. Start the development server:

```bash
npm start
```

## Structure

```
src/
  design-system/
    tokens/          # Design tokens (spacing, colors, typography)
    components/
      primitives/    # Base components (Text, Button, Card, etc.)
      patterns/      # Composed patterns (AuthHeader, AuthCard, etc.)
    theme.ts         # Theme hook
    FontsProvider.tsx
  screens/
    auth/            # Auth screen variations
    registry.ts      # Screen registry for easy switching
```

## Switching Screens

### Web (Query Parameters)

Use URL query parameters to switch screens:

- `http://localhost:19006/?screen=login-simple`
- `http://localhost:19006/?screen=login-hero`

### Native

Screens default to `login-simple`. To change the default, edit `DEFAULT_SCREEN` in `App.tsx`:

```tsx
const DEFAULT_SCREEN: ScreenKey = "login-hero";
```

See `QUERY_PARAM_GUIDE.md` for more details.

## Design System

The design system is built with:

- **Tokens**: Base spacing, radius, and typography values
- **Themes**: Color schemes (currently `midnightTheme`)
- **Primitives**: Reusable base components
- **Patterns**: Composed components for common UI patterns

All components are theme-aware and use the `useTheme()` hook.

