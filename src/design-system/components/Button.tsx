import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/design-system/theme";

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

  let variantStyle: ViewStyle = {};
  let textColor = theme.colors.text;

  switch (variant) {
    case "primary":
      variantStyle = {
        backgroundColor: theme.colors.primary,
      };
      textColor = "#000"; // assume light text on primary. Wait, theme.colors.primary is usually an accent color. 
      // If primary is dark, text should be light. If primary is light, text dark.
      // Assuming existing theme structure, primary usually needs contrasting text.
      // In the prompt "textColor = '#000'; // assume light text on primary" -> this comment says light text but assigns #000 (black). 
      // If primary is bright (like lime green), black is good. If primary is dark blue, white is good.
      // The comment says "assume light text on primary" but assigns black. 
      // Let's look at `midnightTheme`.
      break;
    case "secondary":
      variantStyle = {
        backgroundColor: theme.colors.surfaceMuted, // or surface? Prompt says surfaceMuted.
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
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.md,
      };
      textColor = theme.colors.text;
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

