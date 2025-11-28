import React from "react";
import { Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  DesignAgentProvider,
  DesignAgentProviderMode,
} from "../src/design-system/theme";
import {
  designAgentThemes,
  ThemeKey,
} from "../src/design-system/themes/registry";
import { screens } from "../src/screens/registry";

const DEFAULT_THEME: ThemeKey = "midnight";
const DEFAULT_MODE: DesignAgentProviderMode = "dark";

export default function LoginMinimalRoute() {
  const params = useLocalSearchParams<{
    theme?: string | string[];
    mode?: string | string[];
  }>();

  // Handle expo-router params which can be string or string[]
  const themeParamFromRouter = Array.isArray(params.theme)
    ? params.theme[0]
    : (params.theme as string | undefined);
  const modeParamFromRouter = Array.isArray(params.mode)
    ? params.mode[0]
    : (params.mode as string | undefined);

  // On web, read directly from URL for more reliable query param reading
  const getThemeKey = (): ThemeKey => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const themeFromUrl = urlParams.get("theme") as ThemeKey | null;
        if (themeFromUrl && themeFromUrl in designAgentThemes) {
          return themeFromUrl;
        }
      } catch (error) {
        // Fall through to router params
      }
    }

    // Fallback to router params
    if (themeParamFromRouter && themeParamFromRouter in designAgentThemes) {
      return themeParamFromRouter as ThemeKey;
    }

    return DEFAULT_THEME;
  };

  const getMode = (): DesignAgentProviderMode => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const modeFromUrl = urlParams.get("mode");
        if (modeFromUrl === "light" || modeFromUrl === "dark" || modeFromUrl === "system") {
          return modeFromUrl as DesignAgentProviderMode;
        }
      } catch (error) {
        // Fall through to router params
      }
    }

    // Fallback to router params
    const allowedModes: DesignAgentProviderMode[] = ["light", "dark", "system"];
    if (modeParamFromRouter && allowedModes.includes(modeParamFromRouter as DesignAgentProviderMode)) {
      return modeParamFromRouter as DesignAgentProviderMode;
    }

    return DEFAULT_MODE;
  };

  const themeKey = getThemeKey();
  const mode = getMode();
  const Screen = screens["login-minimal"];

  return (
    <DesignAgentProvider key={`${themeKey}-${mode}`} themeId={themeKey} mode={mode}>
      <Screen />
    </DesignAgentProvider>
  );
}

