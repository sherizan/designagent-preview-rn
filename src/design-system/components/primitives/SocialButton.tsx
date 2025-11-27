import React from "react";
import { Pressable, ViewStyle, View, Image, ImageSourcePropType } from "react-native";
import { useTheme } from "../../theme";
import { DAText } from "./Text";

interface SocialButtonProps {
  title: string;
  onPress: () => void;
  icon?: string | ImageSourcePropType; // URL string or local asset
  disabled?: boolean;
  style?: ViewStyle;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  title,
  onPress,
  icon,
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
          borderWidth: theme.borderWidth.md,
          borderRadius: theme.radius.full,
          height: theme.buttonHeight.lg,
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
      {icon && (
        <Image
          source={typeof icon === "string" ? { uri: icon } : icon}
          style={{ width: theme.iconSize.md, height: theme.iconSize.md }}
          resizeMode="contain"
        />
      )}
      <DAText variant="body" style={{ color: theme.colors.text }}>
        {title}
      </DAText>
    </Pressable>
  );
};

