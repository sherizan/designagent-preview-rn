import React from "react";
import { Pressable, ViewStyle, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "../../theme";
import { baseBorderWidth, baseButtonHeight } from "../../tokens/base";
import { DAText } from "./Text";

type ButtonVariant = "primary" | "ghost" | "black";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
}) => {
  const theme = useTheme();

  const isPrimary = variant === "primary";
  const isBlack = variant === "black";

  const getBackgroundColor = () => {
    if (disabled || loading) {
      if (isBlack) return "rgba(0, 0, 0, 0.4)";
      return isPrimary ? theme.colors.primarySoft : "transparent";
    }
    if (isBlack) return "#000000";
    return isPrimary ? theme.colors.primary : "transparent";
  };

  const getBorderColor = () => {
    if (isBlack) return "transparent";
    if (!isPrimary) {
      return theme.colors.border;
    }
    return "transparent";
  };

  const getTextColor = () => {
    if (disabled || loading) {
      return isBlack || isPrimary ? "rgba(255, 255, 255, 0.6)" : theme.colors.textMuted;
    }
    if (isBlack || isPrimary) return "#FFFFFF";
    return theme.colors.textMuted;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: isPrimary ? 0 : baseBorderWidth.sm,
          borderRadius: theme.radius.full,
          height: baseButtonHeight.lg,
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.lg,
          alignItems: "center",
          justifyContent: "center",
          width: fullWidth ? "100%" : undefined,
          opacity: disabled ? 0.6 : pressed ? 0.8 : 1,
          // Subtle shadow for primary/black button
          ...((isPrimary || isBlack) && !disabled && !loading
            ? {
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }
            : {}),
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <DAText variant="body" style={{ color: getTextColor(), fontWeight: "600" }}>
          {title}
        </DAText>
      )}
    </Pressable>
  );
};

