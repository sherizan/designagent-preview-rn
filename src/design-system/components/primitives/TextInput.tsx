import React, { useState } from "react";
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, View, ViewStyle, Platform, Pressable } from "react-native";
import { useTheme } from "../../theme";
import { baseBorderWidth, baseButtonHeight, baseIconSize } from "../../tokens/base";
import { DAText } from "./Text";
import { Icon } from "./Icon";

type TextInputVariant = "default" | "pill" | "minimal" | "outline" | "solid" | "underline";

interface TextInputProps extends Omit<RNTextInputProps, "style"> {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: RNTextInputProps["keyboardType"];
  error?: string | null;
  pill?: boolean; // Use full border radius for pill shape (deprecated, use variant="pill")
  variant?: TextInputVariant; // "default" | "pill" | "minimal" | "outline" | "solid" | "underline"
  showPasswordToggle?: boolean; // Show eye icon for password
  onTogglePassword?: () => void;
  // For minimal variant - separate email and password handling
  emailValue?: string;
  onEmailChangeText?: (text: string) => void;
  passwordValue?: string;
  onPasswordChangeText?: (text: string) => void;
  errorText?: string | null; // Alias for error
  helperText?: string; // Helper text below input
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
  errorText,
  helperText,
  pill = false,
  variant,
  showPasswordToggle = false,
  onTogglePassword,
  emailValue,
  onEmailChangeText,
  passwordValue,
  onPasswordChangeText,
  style,
  ...props
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [internalEmailValue, setInternalEmailValue] = useState("");
  const [internalPasswordValue, setInternalPasswordValue] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Determine actual variant (pill prop takes precedence for backward compatibility)
  const actualVariant: TextInputVariant = variant || (pill ? "pill" : "default");
  
  // Use errorText if provided, otherwise use error
  const displayError = errorText || error;
  
  // For minimal variant, use internal state if props not provided
  const emailVal = emailValue !== undefined ? emailValue : internalEmailValue;
  const passwordVal = passwordValue !== undefined ? passwordValue : internalPasswordValue;
  const handleEmailChange = onEmailChangeText || setInternalEmailValue;
  const handlePasswordChange = onPasswordChangeText || setInternalPasswordValue;

  const borderColor = displayError ? theme.colors.danger : isFocused ? theme.colors.primary : theme.colors.border;
  
  // Determine border styles based on variant
  let borderRadius = theme.radius.md;
  let borderStyle: any = {};
  
  if (actualVariant === "pill") {
    borderRadius = theme.radius.full;
    borderStyle = { borderWidth: baseBorderWidth.md };
  } else if (actualVariant === "minimal") {
    borderRadius = 20;
  } else if (actualVariant === "outline") {
    borderStyle = { borderWidth: 1 };
  } else if (actualVariant === "solid") {
    borderStyle = { borderWidth: 0 };
  } else if (actualVariant === "underline") {
    borderStyle = {
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
    };
    borderRadius = 0;
  } else {
    // default
    borderStyle = { borderWidth: baseBorderWidth.sm };
  }
  
  // Background color based on variant
  const inputBackground = 
    actualVariant === "underline" 
      ? "transparent" 
      : theme.colors.inputBackground;

  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
    onTogglePassword?.();
  };

  // Minimal variant: render two connected inputs
  if (actualVariant === "minimal") {
    const inputHeight = 60;

    return (
      <View style={style}>
        {label && (
          <DAText variant="caption" color="muted" style={{ marginBottom: theme.spacing.xs }}>
            {label}
          </DAText>
        )}
        <View style={{ overflow: "hidden", borderRadius: 20 }}>
          {/* Email Input (Top) */}
          <View style={{ position: "relative" }}>
            <RNTextInput
              value={emailVal}
              onChangeText={handleEmailChange}
              placeholder="your@email.com"
              placeholderTextColor={theme.colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => {
                setEmailFocused(true);
                setIsFocused(true);
              }}
              onBlur={() => {
                setEmailFocused(false);
                setIsFocused(false);
              }}
              style={{
                backgroundColor: theme.colors.background,
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.border,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                paddingVertical: theme.spacing.md,
                paddingHorizontal: theme.spacing.lg,
                height: inputHeight,
                color: theme.colors.text,
                fontSize: theme.typography.body.fontSize,
                lineHeight: theme.typography.body.lineHeight ?? theme.typography.body.fontSize * 1.4,
                fontFamily: Platform.OS === "web"
                  ? (theme.typography.body.fontFamily ?? theme.typography.fontFamilyBase) === "Inter"
                    ? "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    : (theme.typography.body.fontFamily ?? theme.typography.fontFamilyBase)
                  : (theme.typography.body.fontFamily ?? theme.typography.fontFamilyBase) === "Inter"
                    ? "Inter_400Regular"
                    : (theme.typography.body.fontFamily ?? theme.typography.fontFamilyBase),
              }}
            />
          </View>
          
          {/* Password Input (Bottom) */}
          <View style={{ position: "relative" }}>
            <RNTextInput
              value={passwordVal}
              onChangeText={handlePasswordChange}
              placeholder="Password"
              placeholderTextColor={theme.colors.textMuted}
              secureTextEntry={!isPasswordVisible}
              onFocus={() => {
                setPasswordFocused(true);
                setIsFocused(true);
              }}
              onBlur={() => {
                setPasswordFocused(false);
                setIsFocused(false);
              }}
              style={{
                backgroundColor: theme.colors.background,
                borderWidth: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                paddingVertical: theme.spacing.md,
                paddingHorizontal: theme.spacing.lg,
                paddingRight: 50,
                height: inputHeight,
                color: theme.colors.text,
                fontSize: theme.typography.body.fontSize,
                lineHeight: theme.typography.body.lineHeight ?? theme.typography.body.fontSize * 1.4,
                fontFamily: Platform.OS === "web"
                  ? (theme.typography.body.fontFamily ?? theme.typography.fontFamilyBase) === "Inter"
                    ? "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    : (theme.typography.body.fontFamily ?? theme.typography.fontFamilyBase)
                  : (theme.typography.body.fontFamily ?? theme.typography.fontFamilyBase) === "Inter"
                    ? "Inter_400Regular"
                    : (theme.typography.body.fontFamily ?? theme.typography.fontFamilyBase),
              }}
            />
            {/* Password toggle icon */}
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
          </View>
        </View>
        {displayError ? (
          <DAText variant="caption" color="danger" style={{ marginTop: theme.spacing.xs }}>
            {displayError}
          </DAText>
        ) : helperText ? (
          <DAText variant="caption" color="muted" style={{ marginTop: theme.spacing.xs }}>
            {helperText}
          </DAText>
        ) : null}
      </View>
    );
  }

  // Default and pill variants
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
            ...borderStyle,
            borderRadius,
            paddingVertical: actualVariant === "pill" ? theme.spacing.md : theme.spacing.sm,
            paddingHorizontal: actualVariant === "pill" ? theme.spacing.xl : theme.spacing.md,
            paddingRight: showPasswordToggle ? 50 : undefined,
            color: theme.colors.text,
            fontSize: theme.typography.body.fontSize,
            lineHeight: theme.typography.body.lineHeight ?? theme.typography.body.fontSize * 1.4,
            height: actualVariant === "pill" ? baseButtonHeight.lg : undefined,
            fontFamily: Platform.OS === "web"
              ? (theme.typography.body.fontFamily ?? theme.typography.fontFamilyBase) === "Inter"
                ? "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                : (theme.typography.body.fontFamily ?? theme.typography.fontFamilyBase)
              : (theme.typography.body.fontFamily ?? theme.typography.fontFamilyBase) === "Inter"
                ? "Inter_400Regular"
                : (theme.typography.body.fontFamily ?? theme.typography.fontFamilyBase),
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
      {displayError ? (
        <DAText variant="caption" color="danger" style={{ marginTop: theme.spacing.xs }}>
          {displayError}
        </DAText>
      ) : helperText ? (
        <DAText variant="caption" color="muted" style={{ marginTop: theme.spacing.xs }}>
          {helperText}
        </DAText>
      ) : null}
    </View>
  );
};

