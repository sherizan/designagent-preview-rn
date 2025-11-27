import React from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "../../theme";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.lg,
          padding: theme.spacing.lg,
          borderColor: theme.colors.border,
          borderWidth: 1,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

