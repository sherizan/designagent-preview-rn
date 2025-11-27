import React from "react";
import { Pressable, ViewStyle } from "react-native";
import { useTheme } from "../../theme";
import { baseBorderWidth, baseButtonHeight } from "../../tokens/base";
import { DAText } from "./Text";
import { Icon, IconLibrary } from "./Icon";

interface SocialButtonProps {
  title: string;
  onPress: () => void;
  iconLibrary?: IconLibrary; // Icon library to use (e.g., "google", "apple", "facebook")
  disabled?: boolean;
  style?: ViewStyle;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  title,
  onPress,
  iconLibrary,
  disabled = false,
  style,
}) => {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          backgroundColor: theme.colors.inputBackground,
          borderColor: theme.colors.border,
          borderWidth: baseBorderWidth.md,
          borderRadius: theme.radius.full,
          height: baseButtonHeight.lg,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: theme.spacing.sm,
          opacity: disabled ? 0.6 : pressed ? 0.8 : 1,
          width: "100%",
        },
        style,
      ]}
    >
      {iconLibrary && (
        <Icon
          library={iconLibrary}
          size={20}
          color={iconLibrary === "google" ? undefined : theme.colors.text}
        />
      )}
      <DAText variant="body" style={{ color: theme.colors.text }}>
        {title}
      </DAText>
    </Pressable>
  );
};

