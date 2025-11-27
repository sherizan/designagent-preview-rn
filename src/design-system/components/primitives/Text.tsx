import React from "react";
import { Text as RNText, TextProps as RNTextProps, Platform } from "react-native";
import { useTheme } from "../../theme";

type TextVariant = "body" | "heading" | "eyebrow" | "caption";
type TextColor = "default" | "muted" | "danger";

interface DATextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
}

export const DAText: React.FC<DATextProps> = ({
  variant = "body",
  color = "default",
  style,
  children,
  ...props
}) => {
  const theme = useTheme();

  const { typography } = theme;
  
  const getFontFamily = () => {
    switch (variant) {
      case "heading":
      case "eyebrow":
        return (
          typography.heading.fontFamily ??
          typography.fontFamilyBase
        );
      case "caption":
        return (
          typography.label.fontFamily ??
          typography.fontFamilyBase
        );
      case "body":
      default:
        return (
          typography.body.fontFamily ??
          typography.fontFamilyBase
        );
    }
  };

  const getFontSize = () => {
    switch (variant) {
      case "heading":
        return typography.heading.fontSize;
      case "eyebrow":
      case "caption":
        return typography.label.fontSize;
      case "body":
      default:
        return typography.body.fontSize;
    }
  };

  const getLineHeight = () => {
    switch (variant) {
      case "heading":
        return typography.heading.lineHeight ?? typography.heading.fontSize * 1.25;
      case "caption":
        return typography.label.lineHeight ?? typography.label.fontSize * 1.3;
      case "body":
      default:
        return typography.body.lineHeight ?? typography.body.fontSize * 1.4;
    }
  };

  const getLetterSpacing = () => {
    if (variant === "eyebrow") {
      return 0.08;
    }
    return undefined;
  };

  const getTextTransform = () => {
    if (variant === "eyebrow") {
      return "uppercase" as const;
    }
    return undefined;
  };

  const getColor = () => {
    switch (color) {
      case "muted":
        return theme.colors.textMuted;
      case "danger":
        return theme.colors.danger;
      case "default":
      default:
        return theme.colors.text;
    }
  };

  return (
    <RNText
      style={[
        {
          fontFamily: getFontFamily(),
          fontSize: getFontSize(),
          lineHeight: getLineHeight(),
          letterSpacing: getLetterSpacing(),
          textTransform: getTextTransform(),
          color: getColor(),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

