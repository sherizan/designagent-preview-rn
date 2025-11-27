# Query Parameter Screen Switching

## Implementation Complete ✅

The app now supports switching screens via URL query parameters on web.

## How It Works

### Web Platform
- Reads `?screen=` from URL query parameters
- Validates the screen key exists in the registry
- Falls back to default if invalid/missing

### Native Platform
- Always uses `DEFAULT_SCREEN` (no query params)
- Safe for Expo Go and native builds

## Testing

### 1. Start the app
```bash
npx expo start --web --clear
```

### 2. Test URLs

**Default (no param):**
- `http://localhost:19006/`
- Should show: `login-simple` screen

**With valid screen param:**
- `http://localhost:19006/?screen=login-simple`
- Should show: `login-simple` screen

- `http://localhost:19006/?screen=login-hero`
- Should show: `login-hero` screen

**With invalid param:**
- `http://localhost:19006/?screen=does-not-exist`
- Should show: `login-simple` (default fallback)
- Should NOT crash

## Adding New Screens

1. Create screen component in `src/screens/`
2. Import it in `src/screens/registry.ts`
3. Add to `screens` object:
   ```ts
   export const screens = {
     "login-simple": LoginSimpleScreen,
     "login-hero": LoginHeroScreen,
     "paywall-simple": PaywallSimpleScreen, // new
   };
   ```
4. The new screen will automatically be available via `?screen=paywall-simple`

## Future Usage

This will be used for:
- Embedding previews in iframes on DesignAgent.dev
- URLs like: `https://preview.designagent.dev/?screen=login-simple`
- Setting `livePreviewUrl` in screen data

## Code Structure

```ts
// App.tsx
function getScreenFromQuery(): ScreenKey {
  // Native: use default
  if (Platform.OS !== "web") return DEFAULT_SCREEN;
  
  // Web: read from URL
  const params = new URLSearchParams(window.location.search);
  const param = params.get("screen") as ScreenKey | null;
  
  // Validate and return
  if (param && param in screens) return param;
  return DEFAULT_SCREEN;
}
```

