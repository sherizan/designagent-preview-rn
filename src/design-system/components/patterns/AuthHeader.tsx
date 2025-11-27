import React from "react";
import { View } from "react-native";
import { useTheme } from "../../theme";
import { DAText } from "../primitives";

interface AuthHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ eyebrow, title, subtitle }) => {
  const theme = useTheme();
  
  return (
    <View>
      {eyebrow && (
        <DAText variant="eyebrow" color="muted" style={{ marginBottom: theme.spacing.sm }}>
          {eyebrow}
        </DAText>
      )}
      <DAText variant="heading" style={{ marginBottom: theme.spacing.xs }}>
        {title}
      </DAText>
      {subtitle && (
        <DAText variant="body" color="muted">
          {subtitle}
        </DAText>
      )}
    </View>
  );
};

