import type { DesignAgentTheme } from "../tokens/types";

import { midnightTheme } from "../tokens/themes";

import { createTheme, setThemeFamilyRegistry, ThemeFamily } from "../theme";

// Type helper to ensure partial theme overrides are properly typed
type PartialTheme = Partial<DesignAgentTheme>;

// Base midnight (dark-first). For now, light/dark can be same.
const midnightDark: DesignAgentTheme = midnightTheme;

const midnightLight: DesignAgentTheme = createTheme({
  // Light variant - adjust colors for light mode
  colors: {
    background: "#FFFFFF",
    surface: "#F9FAFB",
    surfaceMuted: "#F3F4F6",
    surfaceAlt: "#F1F5F9",
    primary: "#000000", // Black primary
    primaryForeground: "#FFFFFF",
    primarySoft: "#F3F4F6", // Light gray for light mode
    text: "#111827",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    inputBackground: "rgba(0, 0, 0, 0.05)",
    accent: "#38BDF8", // Cyan accent
    success: "#22C55E", // Green success
    warning: "#FACC15", // Yellow warning
    danger: "#F97373", // Coral danger
  } as PartialTheme["colors"],
  radius: {
    sm: 6,
    md: 12,
    lg: 20,
    full: 999,
  } as PartialTheme["radius"],
  typography: {
    ...midnightTheme.typography,
    body: {
      fontSize: 14,
      lineHeight: 20,
    },
  } as PartialTheme["typography"],
});

// Active Green family
const activeGreenDark: DesignAgentTheme = createTheme({
  colors: {
    background: midnightTheme.colors.background,
    surface: midnightTheme.colors.surface,
    surfaceMuted: midnightTheme.colors.surfaceMuted,
    surfaceAlt: midnightTheme.colors.surfaceAlt,
    primary: "#22C55E",
    primaryForeground: "#FFFFFF",
    primarySoft: "#14532D",
    text: midnightTheme.colors.text,
    textMuted: midnightTheme.colors.textMuted,
    border: midnightTheme.colors.border,
    inputBackground: midnightTheme.colors.inputBackground,
    accent: "#22C55E", // Use primary green as accent
    success: "#22C55E", // Green success (same as primary)
    warning: "#FACC15", // Yellow warning
    danger: "#F97373", // Coral danger
  } as PartialTheme["colors"],
  radius: {
    sm: 6,
    md: 12,
    lg: 20,
    full: 999,
  } as PartialTheme["radius"],
  typography: {
    ...midnightTheme.typography,
  } as PartialTheme["typography"],
});

const activeGreenLight: DesignAgentTheme = createTheme({
  colors: {
    background: "#FFFFFF",
    surface: "#F9FAFB",
    surfaceMuted: "#F3F4F6",
    surfaceAlt: "#F1F5F9",
    primary: "#22C55E",
    primaryForeground: "#FFFFFF",
    primarySoft: "#D1FAE5",
    text: "#111827",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    inputBackground: "rgba(0, 0, 0, 0.05)",
    accent: "#22C55E", // Use primary green as accent
    success: "#22C55E", // Green success (same as primary)
    warning: "#FACC15", // Yellow warning
    danger: "#F97373", // Coral danger
  } as PartialTheme["colors"],
  radius: {
    sm: 6,
    md: 12,
    lg: 20,
    full: 999,
  } as PartialTheme["radius"],
  typography: {
    ...midnightTheme.typography,
  } as PartialTheme["typography"],
});

// Wellness Peach family
const wellnessPeachDark: DesignAgentTheme = createTheme({
  colors: {
    background: midnightTheme.colors.background,
    surface: midnightTheme.colors.surface,
    surfaceMuted: midnightTheme.colors.surfaceMuted,
    surfaceAlt: midnightTheme.colors.surfaceAlt,
    primary: "#F97373",
    primaryForeground: "#FFFFFF",
    primarySoft: "#7F1D1D",
    text: midnightTheme.colors.text,
    textMuted: midnightTheme.colors.textMuted,
    border: midnightTheme.colors.border,
    inputBackground: midnightTheme.colors.inputBackground,
    accent: "#F97373", // Use primary peach as accent
    success: "#22C55E", // Green success
    warning: "#FACC15", // Yellow warning
    danger: "#F97373", // Coral danger
  } as PartialTheme["colors"],
  radius: {
    sm: 6,
    md: 12,
    lg: 24,
    full: 999,
  } as PartialTheme["radius"],
  typography: {
    ...midnightTheme.typography,
  } as PartialTheme["typography"],
});

const wellnessPeachLight: DesignAgentTheme = createTheme({
  colors: {
    background: "#FFFFFF",
    surface: "#F9FAFB",
    surfaceMuted: "#F3F4F6",
    surfaceAlt: "#F1F5F9",
    primary: "#F97373",
    primaryForeground: "#FFFFFF",
    primarySoft: "#FEE2E2",
    text: "#111827",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    inputBackground: "rgba(0, 0, 0, 0.05)",
    accent: "#F97373", // Use primary peach as accent
    success: "#22C55E", // Green success
    warning: "#FACC15", // Yellow warning
    danger: "#F97373", // Coral danger
  } as PartialTheme["colors"],
  radius: {
    sm: 6,
    md: 12,
    lg: 24,
    full: 999,
  } as PartialTheme["radius"],
  typography: {
    ...midnightTheme.typography,
  } as PartialTheme["typography"],
});

export const designAgentThemes: Record<string, ThemeFamily> = {
  midnight: {
    id: "midnight",
    label: "Midnight",
    light: midnightLight,
    dark: midnightDark,
    defaultMode: "dark",
  },
  activeGreen: {
    id: "activeGreen",
    label: "Active Green",
    light: activeGreenLight,
    dark: activeGreenDark,
    defaultMode: "dark",
  },
  wellnessPeach: {
    id: "wellnessPeach",
    label: "Wellness Peach",
    light: wellnessPeachLight,
    dark: wellnessPeachDark,
    defaultMode: "dark",
  },
};

// Register with the provider layer
setThemeFamilyRegistry(designAgentThemes);

export type ThemeKey = keyof typeof designAgentThemes;

/**
 * Query parameters for theme resolution
 */
export type ThemeQueryParams = {
  themeId?: string | string[];
  mode?: string | string[];
  customTheme?: string | string[];
  // Backwards compatibility: support old "theme" param
  theme?: string | string[];
};

/**
 * Resolves theme from query parameters.
 * Supports both themeId (new) and theme (legacy) for backwards compatibility.
 * Also supports customTheme parameter for fully custom themes.
 * Returns the resolved theme object and mode.
 */
export function resolveThemeFromQuery(
  params: ThemeQueryParams
): {
  themeId: string;
  theme: DesignAgentTheme;
  mode: "light" | "dark";
  customTheme?: DesignAgentTheme;
} {
  // Check for custom theme first (base64-encoded JSON)
  const rawCustomTheme = Array.isArray(params.customTheme)
    ? params.customTheme[0]
    : params.customTheme;
  
  if (rawCustomTheme) {
    try {
      const decoded = decodeURIComponent(atob(rawCustomTheme));
      const customTheme = JSON.parse(decoded) as DesignAgentTheme;
      
      // Resolve mode
      const rawMode = Array.isArray(params.mode) ? params.mode[0] : params.mode;
      const mode: "light" | "dark" = rawMode === "light" ? "light" : "dark";
      
      // Prefer themeId, fallback to theme for backwards compatibility
      const rawThemeId =
        Array.isArray(params.themeId)
          ? params.themeId[0]
          : params.themeId ||
            (Array.isArray(params.theme) ? params.theme[0] : params.theme);
      
      const themeId: string =
        rawThemeId && rawThemeId in designAgentThemes ? rawThemeId : "midnight";
      
      return { themeId, theme: customTheme, mode, customTheme };
    } catch (error) {
      console.error("Failed to parse custom theme:", error);
      // Fall through to regular theme resolution
    }
  }

  // Prefer themeId, fallback to theme for backwards compatibility
  const rawThemeId =
    Array.isArray(params.themeId)
      ? params.themeId[0]
      : params.themeId ||
        (Array.isArray(params.theme) ? params.theme[0] : params.theme);

  // Validate themeId exists in registry, default to "midnight"
  const themeId: string =
    rawThemeId && rawThemeId in designAgentThemes ? rawThemeId : "midnight";

  // Get the theme family
  const family = designAgentThemes[themeId];

  // Resolve mode
  const rawMode = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  const mode: "light" | "dark" = rawMode === "light" ? "light" : "dark";

  // Get the appropriate theme variant based on mode
  const theme = mode === "light" ? family.light : family.dark;

  return { themeId, theme, mode };
}


