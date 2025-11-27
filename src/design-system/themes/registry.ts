import type { DesignAgentTheme } from "../tokens/types";

import { midnightTheme } from "../tokens/themes";

import { createTheme, setThemeFamilyRegistry, ThemeFamily } from "../theme";

// Base midnight (dark-first). For now, light/dark can be same.
const midnightDark: DesignAgentTheme = midnightTheme;

const midnightLight: DesignAgentTheme = createTheme({
  // Light variant - adjust colors for light mode
  colors: {
    background: "#FFFFFF",
    surface: "#F9FAFB",
    surfaceMuted: "#F3F4F6",
    text: "#111827",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    inputBackground: "rgba(0, 0, 0, 0.05)",
  },
});

// Active Green family
const activeGreenDark: DesignAgentTheme = createTheme({
  colors: {
    primary: "#22C55E",
    primarySoft: "#22C55E1A",
  },
});

const activeGreenLight: DesignAgentTheme = createTheme({
  colors: {
    background: "#FFFFFF",
    surface: "#F9FAFB",
    surfaceMuted: "#F3F4F6",
    primary: "#22C55E",
    primarySoft: "#22C55E1A",
    text: "#111827",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    inputBackground: "rgba(0, 0, 0, 0.05)",
  },
});

// Wellness Peach family
const wellnessPeachDark: DesignAgentTheme = createTheme({
  colors: {
    primary: "#F97373",
    primarySoft: "#F973731A",
  },
  radius: {
    lg: 24,
  },
});

const wellnessPeachLight: DesignAgentTheme = createTheme({
  colors: {
    background: "#FFFFFF",
    surface: "#F9FAFB",
    surfaceMuted: "#F3F4F6",
    primary: "#F97373",
    primarySoft: "#F973731A",
    text: "#111827",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    inputBackground: "rgba(0, 0, 0, 0.05)",
  },
  radius: {
    lg: 24,
  },
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


