import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { useTheme } from "../../theme";

type SpacingKey = "xs" | "sm" | "md" | "lg" | "xl";

interface SurfaceProps {
  children: React.ReactNode;
  padding?: SpacingKey;
  style?: ViewStyle;
}

export const Surface: React.FC<SurfaceProps> = ({ children, padding = "md", style }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme?.colors?.surface ?? "#0B1020",
          borderRadius: theme?.radius?.lg ?? 12,
          padding: theme?.spacing?.[padding] ?? 12,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

