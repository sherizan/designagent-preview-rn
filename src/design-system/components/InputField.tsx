import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { useTheme } from "@/design-system/theme";

export type InputVariant = "solid" | "outline" | "underline";

export type InputFieldProps = {
  label?: string;
  helperText?: string;
  errorText?: string;
  variant?: InputVariant;
} & Omit<TextInputProps, "style">;

export const InputField: React.FC<InputFieldProps> = ({
  label,
  helperText,
  errorText,
  variant = "outline",
  placeholder,
  secureTextEntry,
  keyboardType,
  value,
  onChangeText,
  ...rest
}) => {
  const theme = useTheme();
  const { typography } = theme;

  const labelFont =
    typography.label.fontFamily ?? typography.fontFamilyBase;
  const bodyFont =
    typography.body.fontFamily ?? typography.fontFamilyBase;

  const hasError = !!errorText;

  const baseInputStyle = {
    fontFamily: bodyFont,
    fontSize: typography.body.fontSize,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    flex: 1, // Ensure text input takes available space
  } as const;

  let containerStyle: any = {
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.inputBackground,
  };
  let borderStyles: any = {
    borderColor: hasError ? theme.colors.danger : theme.colors.border,
  };

  if (variant === "outline") {
    borderStyles.borderWidth = 1;
  } else if (variant === "solid") {
    borderStyles.borderWidth = 0;
  } else if (variant === "underline") {
    borderStyles = {
      borderBottomWidth: 1,
      borderBottomColor: hasError
        ? theme.colors.danger
        : theme.colors.border,
      borderRadius: 0,
    };
    containerStyle = {
      backgroundColor: "transparent",
    };
  }

  return (
    <View style={{ gap: theme.spacing.xs, width: "100%" }}>
      {label && (
        <Text
          style={{
            fontFamily: labelFont,
            fontSize: typography.label.fontSize,
            lineHeight:
              typography.label.lineHeight ??
              typography.label.fontSize * 1.3,
            color: hasError
              ? theme.colors.danger
              : theme.colors.textMuted,
          }}
        >
          {label}
        </Text>
      )}

      <View style={[containerStyle, borderStyles, { flexDirection: 'row', alignItems: 'center' }]}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          style={baseInputStyle}
          {...rest}
        />
      </View>

      {errorText ? (
        <Text
          style={{
            fontFamily: labelFont,
            fontSize: typography.label.fontSize,
            color: theme.colors.danger,
          }}
        >
          {errorText}
        </Text>
      ) : helperText ? (
        <Text
          style={{
            fontFamily: labelFont,
            fontSize: typography.label.fontSize,
            color: theme.colors.textMuted,
          }}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

