import type { DesignAgentTheme } from "./types";
import { baseSpacing, baseRadius, baseTypography } from "./base";

export const midnightTheme: DesignAgentTheme = {
  colors: {
    background: "#020617",
    surface: "#020817",
    surfaceMuted: "#1E293B", // Keep for compatibility
    surfaceAlt: "#02091A",
    primary: "#000000",
    primaryForeground: "#FFFFFF",
    primarySoft: "#1F2937",
    text: "#F9FAFB",
    textMuted: "#9CA3AF",
    danger: "#F97373",
    border: "#1F2937",
    inputBackground: "rgba(255, 255, 255, 0.05)", // Subtle white overlay for inputs
    accent: "#38BDF8", // Cyan accent
    success: "#22C55E", // Green success
    warning: "#FACC15", // Yellow warning
  },
  spacing: baseSpacing,
  radius: {
    sm: 6,
    md: 12,
    lg: 20,
    full: 999,
  },
  typography: {
    ...baseTypography,
    body: {
      fontSize: 14,
      lineHeight: 20,
    },
  },
};

