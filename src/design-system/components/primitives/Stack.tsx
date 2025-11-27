import React from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "../../theme";

type SpacingKey = "xs" | "sm" | "md" | "lg" | "xl";
type FlexAlign = "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
type FlexJustify = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";

interface StackProps {
  children: React.ReactNode;
  direction?: "vertical" | "horizontal";
  gap?: SpacingKey;
  align?: FlexAlign;
  justify?: FlexJustify;
  style?: ViewStyle;
}

export const Stack: React.FC<StackProps> = ({
  children,
  direction = "vertical",
  gap = "md",
  align,
  justify,
  style,
}) => {
  const theme = useTheme();

  const gapValue = theme?.spacing?.[gap] ?? 12;

  // Convert children to array and filter out null/undefined
  const childrenArray = React.Children.toArray(children).filter(
    (child) => child != null && (typeof child !== "boolean")
  );

  if (childrenArray.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        {
          flexDirection: direction === "vertical" ? "column" : "row",
          alignItems: align,
          justifyContent: justify,
        },
        style,
      ]}
    >
      {React.Children.map(childrenArray, (child, index) => {
        if (index === 0) {
          return child;
        }

        const marginStyle =
          direction === "vertical"
            ? { marginTop: gapValue }
            : { marginLeft: gapValue };

        return (
          <View key={index} style={marginStyle}>
            {child}
          </View>
        );
      })}
    </View>
  );
};

