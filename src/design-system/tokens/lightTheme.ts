import { baseSpacing, baseRadius, baseBorderWidth, baseButtonHeight, baseIconSize, baseTypography } from "./base";
import { DesignTheme } from "./themes";

// Light theme for login-simple screen
export const lightTheme: DesignTheme = {
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
  borderWidth: baseBorderWidth,
  buttonHeight: baseButtonHeight,
  iconSize: baseIconSize,
  typography: baseTypography,
};

