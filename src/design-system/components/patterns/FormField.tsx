import React from "react";
import { TextInput, TextInputProps } from "../primitives/TextInput";
import { Stack } from "../primitives/Stack";

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  error?: string | null;
  pill?: boolean;
  showPasswordToggle?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  error,
  pill = false,
  showPasswordToggle = false,
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      error={error}
      pill={pill}
      showPasswordToggle={showPasswordToggle}
    />
  );
};

