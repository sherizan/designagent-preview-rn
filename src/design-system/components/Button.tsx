import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme, useThemeMeta } from "@/design-system/theme";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "minimal";

export type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  fullWidth = true,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onPress,
  style,
}) => {
  const theme = useTheme();
  const { typography } = theme;
  const { mode } = useThemeMeta();

  const labelFont =
    typography.label.fontFamily ?? typography.fontFamilyBase;

  const isDisabled = disabled || loading;

  const basePaddingVertical = theme.spacing.md;
  const basePaddingHorizontal = theme.spacing.lg;

  const baseStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.full,
    paddingVertical: basePaddingVertical,
    paddingHorizontal: basePaddingHorizontal,
    opacity: isDisabled ? 0.6 : 1,
  };

  // Helper to determine if a color is dark (for contrast calculation)
  const isDarkColor = (color: string): boolean => {
    // Remove # if present
    const hex = color.replace("#", "");
    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  };

  // Get contrasting text color for primary buttons
  // In dark mode, use white text; in light mode, use black text (or contrast-based)
  const getContrastTextColor = (backgroundColor: string): string => {
    if (mode === "dark") {
      // In dark mode, always use white text for better contrast
      return "#FFFFFF";
    } else {
      // In light mode, use contrast-based color
      return isDarkColor(backgroundColor) ? "#FFFFFF" : "#000000";
    }
  };

  let variantStyle: ViewStyle = {};
  let textColor = theme.colors.text;

  switch (variant) {
    case "primary":
      variantStyle = {
        backgroundColor: theme.colors.primary,
      };
      // Use primaryForeground color for text
      textColor = theme.colors.primaryForeground;
      break;
    case "secondary":
      variantStyle = {
        backgroundColor: theme.colors.surfaceMuted,
      };
      textColor = theme.colors.text;
      break;
    case "outline":
      variantStyle = {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: theme.colors.primary,
      };
      textColor = theme.colors.primary;
      break;
    case "ghost":
      variantStyle = {
        backgroundColor: "transparent",
      };
      textColor = theme.colors.textMuted;
      break;
    case "minimal":
      variantStyle = {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.radius.md,
      };
      // Use primaryForeground color for text
      textColor = theme.colors.primaryForeground;
      break;
    default:
      break;
  }

  const containerStyle: ViewStyle = {
    ...baseStyle,
    ...variantStyle,
    width: fullWidth ? "100%" : undefined,
  };

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      style={[containerStyle, style]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.xs,
          }}
        >
          {leftIcon}
          <Text
            style={{
              fontFamily: labelFont,
              fontSize: typography.body.fontSize,
              color: textColor,
              fontWeight: "600",
            }}
          >
            {label}
          </Text>
          {rightIcon}
        </View>
      )}
    </TouchableOpacity>
  );
};

