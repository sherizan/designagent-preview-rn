import { createTheme } from "./theme";

/**
 * Example custom theme using createTheme helper
 * 
 * This demonstrates how consumers can adapt DesignAgent to their brand
 * by overriding specific theme properties while keeping the rest of the theme intact.
 * 
 * Usage:
 * ```tsx
 * <DesignAgentProvider themeOverride={exampleFitnessGreenTheme}>
 *   <YourApp />
 * </DesignAgentProvider>
 * ```
 * 
 * Note: For theme families with light/dark variants, use themeId and mode props instead.
 * ```tsx
 * <DesignAgentProvider themeId="activeGreen" mode="dark">
 *   <YourApp />
 * </DesignAgentProvider>
 * ```
 */
export const exampleFitnessGreenTheme = createTheme({
  colors: {
    primary: "#22C55E",
    primarySoft: "#22C55E1A",
  },
  radius: {
    lg: 24,
  },
  typography: {
    fontFamily: "System",
  },
});

