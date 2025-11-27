import React from "react";
import { View } from "react-native";
import { useTheme } from "../../theme";
import { Card } from "../primitives";

interface AuthCardProps {
  children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  const theme = useTheme();
  
  return (
    <View style={{ width: "100%", maxWidth: 420, alignSelf: "center" }}>
      <Card
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.lg,
          borderWidth: 1,
          borderColor: theme.colors.border,
          padding: theme.spacing.xl,
        }}
      >
        {children}
      </Card>
    </View>
  );
};

