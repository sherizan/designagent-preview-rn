import React from "react";
import { Platform } from "react-native";
import { FontsProvider } from "./src/design-system/FontsProvider";
import { ThemeProvider } from "./src/design-system/ThemeContext";
import { midnightTheme } from "./src/design-system/tokens/themes";
import { screens, ScreenKey } from "./src/screens/registry";

const DEFAULT_SCREEN: ScreenKey = "login-simple";

function getScreenFromQuery(): ScreenKey {
  // Native: just use default
  if (Platform.OS !== "web" || typeof window === "undefined") {
    return DEFAULT_SCREEN;
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const param = params.get("screen") as ScreenKey | null;

    if (param && param in screens) {
      return param;
    }
  } catch (error) {
    // If anything goes wrong, fall back to default
    console.warn("Failed to read ?screen= from URL, using default.", error);
  }

  return DEFAULT_SCREEN;
}

export default function App() {
  const screenKey = getScreenFromQuery();
  const ActiveScreen = screens[screenKey];

  return (
    <FontsProvider>
      <ThemeProvider theme={midnightTheme}>
        <ActiveScreen />
      </ThemeProvider>
    </FontsProvider>
  );
}

