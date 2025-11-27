import type { DesignAgentTheme } from "./types";
import { baseSpacing, baseRadius, baseTypography } from "./base";

export const midnightTheme: DesignAgentTheme = {
  colors: {
    background: "#020617",
    surface: "#0F172A", // Slightly lighter for cards/surfaces
    surfaceMuted: "#1E293B",
    primary: "#6366F1",
    primarySoft: "#4F46E51A",
    text: "#F9FAFB",
    textMuted: "#9CA3AF",
    danger: "#EF4444",
    border: "#1F2937",
    inputBackground: "rgba(255, 255, 255, 0.05)", // Subtle white overlay for inputs
  },
  spacing: baseSpacing,
  radius: baseRadius,
  typography: baseTypography,
};

