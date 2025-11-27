import React, { useState } from "react";
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, View, ViewStyle, Platform, Pressable } from "react-native";
import { useTheme } from "../../theme";
import { baseBorderWidth, baseButtonHeight, baseIconSize } from "../../tokens/base";
import { DAText } from "./Text";
import { Icon } from "./Icon";

interface TextInputProps extends Omit<RNTextInputProps, "style"> {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: RNTextInputProps["keyboardType"];
  error?: string | null;
  pill?: boolean; // Use full border radius for pill shape
  showPasswordToggle?: boolean; // Show eye icon for password
  onTogglePassword?: () => void;
  style?: ViewStyle;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  error,
  pill = false,
  showPasswordToggle = false,
  onTogglePassword,
  style,
  ...props
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const borderColor = error ? theme.colors.danger : isFocused ? theme.colors.primary : theme.colors.border;
  const borderRadius = pill ? theme.radius.full : theme.radius.md;
  const borderWidth = pill ? baseBorderWidth.md : baseBorderWidth.sm;
  
  // Slightly lighter background on focus
  const inputBackground = isFocused 
    ? theme.colors.inputBackground 
    : theme.colors.inputBackground;

  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
    onTogglePassword?.();
  };

  return (
    <View style={style}>
      {label && (
        <DAText variant="caption" color="muted" style={{ marginBottom: theme.spacing.xs }}>
          {label}
        </DAText>
      )}
      <View style={{ position: "relative" }}>
        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            backgroundColor: inputBackground,
            borderColor,
            borderWidth,
            borderRadius,
            paddingVertical: pill ? theme.spacing.md : theme.spacing.sm,
            paddingHorizontal: pill ? theme.spacing.xl : theme.spacing.md,
            paddingRight: showPasswordToggle ? 50 : undefined,
            color: theme.colors.text,
            fontSize: 16,
            height: pill ? baseButtonHeight.lg : undefined,
            fontFamily: Platform.OS === "web" 
              ? "Urbanist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              : "Urbanist_400Regular",
          }}
          {...props}
        />
        {showPasswordToggle && (
          <Pressable
            onPress={handleTogglePassword}
            style={{
              position: "absolute",
              right: theme.spacing.md,
              top: "50%",
              transform: [{ translateY: -12 }],
              padding: theme.spacing.xs,
            }}
          >
            <Icon
              library="lucide"
              name={isPasswordVisible ? "EyeOff" : "Eye"}
              size={baseIconSize.md}
              color={theme.colors.textMuted}
            />
          </Pressable>
        )}
      </View>
      {error && (
        <DAText variant="caption" color="danger" style={{ marginTop: theme.spacing.xs }}>
          {error}
        </DAText>
      )}
    </View>
  );
};

