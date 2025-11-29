import { Platform } from "react-native";
import {
  designAgentThemes,
  ThemeKey,
} from "@/design-system/themes/registry";
import { DesignAgentProviderMode } from "@/design-system/theme";

/**
 * Extracts theme key from query parameters.
 * On web, reads directly from URL for more reliable query param reading.
 * Falls back to Expo Router params if URL params are not available.
 */
export function getThemeKeyFromQuery(
  params: {
    theme?: string | string[];
  },
  defaultTheme: ThemeKey = "midnight"
): ThemeKey {
  const themeParamFromRouter = Array.isArray(params.theme)
    ? params.theme[0]
    : (params.theme as string | undefined);

  // On web, read directly from URL for more reliable query param reading
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

  return defaultTheme;
}

/**
 * Extracts mode from query parameters.
 * On web, reads directly from URL for more reliable query param reading.
 * Falls back to Expo Router params if URL params are not available.
 */
export function getModeFromQuery(
  params: {
    mode?: string | string[];
  },
  defaultMode: DesignAgentProviderMode = "dark"
): DesignAgentProviderMode {
  const modeParamFromRouter = Array.isArray(params.mode)
    ? params.mode[0]
    : (params.mode as string | undefined);

  // On web, read directly from URL for more reliable query param reading
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

  return defaultMode;
}

