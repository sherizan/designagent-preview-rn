import React, { createContext, useContext } from "react";
import { Appearance } from "react-native";
import type { DesignAgentTheme } from "./tokens/types";
import { midnightTheme } from "./tokens/themes";

// A ThemeFamily represents a named theme with light/dark variants.
export type ThemeFamily = {
  id: string;                // "midnight", "activeGreen", "wellnessPeach"
  label: string;             // Human-readable name
  light: DesignAgentTheme;   // Light variant
  dark: DesignAgentTheme;    // Dark variant
  defaultMode: "light" | "dark";
};

export type DesignAgentProviderMode = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: DesignAgentTheme;
  family: ThemeFamily;
  mode: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export type DesignAgentProviderProps = {
  children: React.ReactNode;
  /**
   * themeId selects a ThemeFamily from the registry (e.g. "midnight", "activeGreen").
   * If omitted, defaults to "midnight".
   */
  themeId?: string;
  /**
   * mode controls whether we use light, dark, or follow the system preference.
   * - "dark"   → always use family.dark
   * - "light"  → always use family.light
   * - "system" → use Appearance.getColorScheme() or fall back to family.defaultMode
   * Defaults to "dark" in our preview app.
   */
  mode?: DesignAgentProviderMode;
  /**
   * themeOverride lets consumers bypass the family/mode logic
   * and inject a fully custom DesignAgentTheme directly.
   */
  themeOverride?: DesignAgentTheme;
};

// This will be updated by the theme registry, but we need a placeholder.
let themeFamilyRegistry: Record<string, ThemeFamily> = {
  midnight: {
    id: "midnight",
    label: "Midnight",
    light: midnightTheme, // can be same as dark for now
    dark: midnightTheme,
    defaultMode: "dark",
  },
};

/**
 * Internal helper to register theme families.
 * The actual registry will be defined in src/design-system/themes/registry.ts.
 */
export const setThemeFamilyRegistry = (registry: Record<string, ThemeFamily>) => {
  themeFamilyRegistry = registry;
};

const getThemeFamily = (themeId?: string): ThemeFamily => {
  const fallback = themeFamilyRegistry["midnight"];
  if (!themeId) return fallback;
  return themeFamilyRegistry[themeId] ?? fallback;
};

/**
 * DesignAgentProvider
 * Resolves ThemeFamily + mode into a concrete DesignAgentTheme.
 */
export const DesignAgentProvider: React.FC<DesignAgentProviderProps> = ({
  children,
  themeId,
  mode = "dark",
  themeOverride,
}) => {
  // If themeOverride is provided, skip family logic and use that directly.
  if (themeOverride) {
    const overrideFamily: ThemeFamily = {
      id: "override",
      label: "Override Theme",
      light: themeOverride,
      dark: themeOverride,
      defaultMode: "dark",
    };
    return React.createElement(
      ThemeContext.Provider,
      {
        value: { theme: themeOverride, family: overrideFamily, mode: "dark" },
      },
      children
    );
  }

  const family = getThemeFamily(themeId);
  let resolvedMode: "light" | "dark";

  if (mode === "system") {
    const systemColorScheme = Appearance.getColorScheme(); // "light" | "dark" | null
    if (systemColorScheme === "light" || systemColorScheme === "dark") {
      resolvedMode = systemColorScheme;
    } else {
      resolvedMode = family.defaultMode;
    }
  } else {
    resolvedMode = mode;
  }

  const activeTheme =
    resolvedMode === "light" ? family.light : family.dark;

  const value: ThemeContextValue = {
    theme: activeTheme,
    family,
    mode: resolvedMode,
  };

  return React.createElement(
    ThemeContext.Provider,
    { value },
    children
  );
};

/**
 * useTheme
 * Hook for components/screens to access the resolved theme.
 */
export const useTheme = (): DesignAgentTheme => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Fallback: if no provider is found, treat midnight/dark as default.
    return midnightTheme;
  }
  return ctx.theme;
};

/**
 * useThemeMeta
 * If needed later, consumers can access which family and mode are active.
 */
export const useThemeMeta = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    const fallbackFamily = getThemeFamily("midnight");
    return {
      theme: fallbackFamily.dark,
      family: fallbackFamily,
      mode: "dark",
    };
  }
  return ctx;
};

/**
 * createTheme
 * Helper to create a new theme by merging overrides on top of midnightTheme.
 * Consumers can use this to adapt DesignAgent to their brand.
 */
export const createTheme = (
  overrides: Partial<DesignAgentTheme>
): DesignAgentTheme => {
  // Deep-ish merge with defaults.
  // This is a simple merge; if needed we can make it smarter later.
  return {
    ...midnightTheme,
    ...overrides,
    colors: {
      ...midnightTheme.colors,
      ...(overrides.colors ?? {}),
    },
    spacing: {
      ...midnightTheme.spacing,
      ...(overrides.spacing ?? {}),
    },
    radius: {
      ...midnightTheme.radius,
      ...(overrides.radius ?? {}),
    },
    typography: {
      ...midnightTheme.typography,
      ...(overrides.typography ?? {}),
    },
  };
};
