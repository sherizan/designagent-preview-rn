import type { DesignAgentTheme } from "./types";
import { baseSpacing, baseRadius, baseTypography } from "./base";

// Light theme for login-simple screen
export const lightTheme: DesignAgentTheme = {
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceMuted: "#FFFFFF",
    primary: "#000000",
    primarySoft: "rgba(0, 0, 0, 0.1)",
    text: "#000000",
    textMuted: "rgba(0, 0, 0, 0.4)", // Black with 40% opacity for gray text (placeholders, muted)
    danger: "#F97373",
    border: "rgba(0, 0, 0, 0.2)", // Black with opacity for borders
    inputBackground: "#FFFFFF", // White background for inputs
  },
  spacing: baseSpacing,
  radius: baseRadius,
  typography: baseTypography,
};

