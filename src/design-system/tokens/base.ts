export const baseSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
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

export const baseTypography = {
  fontFamily: "Urbanist",
  bodyScale: 1,
  headingScale: 1.15,
} as const;

export type Spacing = typeof baseSpacing;
export type Radius = typeof baseRadius;
export type BorderWidth = typeof baseBorderWidth;
export type ButtonHeight = typeof baseButtonHeight;
export type IconSize = typeof baseIconSize;
export type Typography = typeof baseTypography;

