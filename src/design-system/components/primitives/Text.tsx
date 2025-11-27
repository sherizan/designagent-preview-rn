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

  const getFontFamily = () => {
    // On web, use system fonts as fallback since Expo fonts work differently
    if (Platform.OS === "web") {
      return "Urbanist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    }
    // On native, use Expo font keys
    if (variant === "heading" || variant === "eyebrow") {
      return "Urbanist_600SemiBold";
    }
    return "Urbanist_400Regular";
  };

  const getFontSize = () => {
    switch (variant) {
      case "heading":
        return 26 * theme.typography.headingScale; // ~30px
      case "eyebrow":
        return 12;
      case "caption":
        return 12;
      case "body":
      default:
        return 15; // ~15px
    }
  };

  const getLineHeight = () => {
    switch (variant) {
      case "heading":
        return 32;
      case "caption":
        return 16;
      case "body":
      default:
        return 22;
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

