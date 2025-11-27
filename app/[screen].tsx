import { useLocalSearchParams, Redirect } from "expo-router";
import { screens, ScreenKey } from "../src/screens/registry";

/**
 * Dynamic route for any screen in the registry.
 * This handles future screens that don't have explicit route files.
 * Explicit routes (e.g., app/login-simple.tsx) take precedence.
 */
export default function ScreenRoute() {
  const { screen } = useLocalSearchParams<{ screen: string }>();
  const screenKey = (screen as ScreenKey) || "login-simple";

  // Validate screen key exists in registry
  if (!(screenKey in screens)) {
    // Redirect to default if invalid
    return <Redirect href="/login-simple" />;
  }

  const ActiveScreen = screens[screenKey];
  return <ActiveScreen />;
}

