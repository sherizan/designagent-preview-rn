import { baseSpacing, baseRadius, baseBorderWidth, baseButtonHeight, baseIconSize, baseTypography } from "./base";

export type DesignTheme = {
  colors: {
    background: string;
    surface: string;
    surfaceMuted: string;
    primary: string;
    primarySoft: string;
    text: string;
    textMuted: string;
    danger: string;
    border: string;
    inputBackground: string;
  };
  spacing: typeof baseSpacing;
  radius: typeof baseRadius;
  borderWidth: typeof baseBorderWidth;
  buttonHeight: typeof baseButtonHeight;
  iconSize: typeof baseIconSize;
  typography: typeof baseTypography;
};

export const midnightTheme: DesignTheme = {
  colors: {
    background: "#020617",
    surface: "#0F172A", // Slightly lighter for cards/surfaces
    surfaceMuted: "#1E293B",
    primary: "#6366F1",
    primarySoft: "#4F46E51A",
    text: "#F9FAFB",
    textMuted: "#9CA3AF",
    danger: "#F97373",
    border: "#334155", // Lighter border for better visibility
    inputBackground: "rgba(255, 255, 255, 0.05)", // Subtle white overlay for inputs
  },
  spacing: baseSpacing,
  radius: baseRadius,
  borderWidth: baseBorderWidth,
  buttonHeight: baseButtonHeight,
  iconSize: baseIconSize,
  typography: baseTypography,
};

