import React from "react";
import { View } from "react-native";
import { useTheme } from "../../theme";
import { DAText } from "./Text";

interface DividerProps {
  label?: string;
}

export const Divider: React.FC<DividerProps> = ({ label = "OR" }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginVertical: theme.spacing.md,
      }}
    >
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: theme.colors.border,
        }}
      />
      {label && (
        <View style={{ paddingHorizontal: theme.spacing.md }}>
          <DAText variant="body" style={{ color: theme.colors.textMuted, fontWeight: "600" }}>
            {label}
          </DAText>
        </View>
      )}
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: theme.colors.border,
        }}
      />
    </View>
  );
};

