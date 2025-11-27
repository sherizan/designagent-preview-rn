import { Platform } from "react-native";

/**
 * SPACING TOKENS - Edit these values to adjust spacing across your app
 * 
 * All spacing in your components uses these tokens via theme.spacing
 * Examples: theme.spacing.xs, theme.spacing.sm, theme.spacing.md, etc.
 * 
 * To adjust spacing:
 * 1. Edit the baseSpacingValues below to change the base spacing scale
 * 2. Adjust spacingMultiplier to fine-tune iOS vs Android differences
 *    - Set to 1.0 for both platforms to have identical spacing
 *    - iOS typically benefits from slightly more spacing (1.0-1.05)
 *    - Android can use slightly less (0.95-1.0)
 * 
 * All components using theme.spacing will automatically update when you change these values.
 */

// Base spacing scale - edit these values to change spacing across your app
// These align with DesignAgentTheme.spacing
const baseSpacingValues = {
  xs: 4,    // Extra small spacing (e.g., between icon and text)
  sm: 8,    // Small spacing (e.g., between form fields)
  md: 12,   // Medium spacing (e.g., between sections)
  lg: 16,   // Large spacing (e.g., card padding)
  xl: 24,   // Extra large spacing (e.g., between major sections)
} as const;

// Platform multiplier: Adjust to fine-tune iOS vs Android spacing differences
// Set both to 1.0 if you want identical spacing on both platforms
const spacingMultiplier = Platform.OS === "ios" ? 1.0 : 0.95;

// Apply platform multiplier (optional - remove if you want identical spacing)
// This exports the spacing values that match DesignAgentTheme
export const baseSpacing = {
  xs: Math.round(baseSpacingValues.xs * spacingMultiplier),
  sm: Math.round(baseSpacingValues.sm * spacingMultiplier),
  md: Math.round(baseSpacingValues.md * spacingMultiplier),
  lg: Math.round(baseSpacingValues.lg * spacingMultiplier),
  xl: Math.round(baseSpacingValues.xl * spacingMultiplier),
} as const;

export const baseRadius = {
  sm: 6,
  md: 10,
  lg: 18,
  full: 999,
} as const;

export const baseBorderWidth = {
  sm: 1,
  md: 2,
  lg: 3,
} as const;

export const baseButtonHeight = {
  sm: 40,
  md: 48,
  lg: 51,
} as const;

export const baseIconSize = {
  sm: 16,
  md: 18,
  lg: 24,
} as const;

import type { TypographySlot } from "./types";

export const baseTypography = {
  fontFamilyBase: "Urbanist",
  heading: {
    fontFamily: undefined, // if undefined, use fontFamilyBase
    fontSize: 24,
    lineHeight: 32,
  } as TypographySlot,
  body: {
    fontFamily: undefined,
    fontSize: 15,
    lineHeight: 22,
  } as TypographySlot,
  label: {
    fontFamily: undefined,
    fontSize: 12,
    lineHeight: 16,
  } as TypographySlot,
};

export type Spacing = typeof baseSpacing;
export type Radius = typeof baseRadius;
export type BorderWidth = typeof baseBorderWidth;
export type ButtonHeight = typeof baseButtonHeight;
export type IconSize = typeof baseIconSize;

