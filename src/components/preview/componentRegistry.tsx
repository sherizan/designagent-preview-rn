import React, { useState } from "react";
import { Button, ButtonVariant } from "@/design-system/components/Button";
import { InputField, InputVariant } from "@/design-system/components/InputField";

export type ComponentSlug = "button" | "input-field";

export type ComponentPreviewProps = {
  variant: string;
};

export type ComponentPreviewEntry = {
  slug: ComponentSlug;
  supportedVariants: string[];
  Component: React.FC<ComponentPreviewProps>;
};

// Wrapper component for InputField that uses hooks
const InputFieldPreview: React.FC<{ variant: string }> = ({ variant }) => {
  const [value, setValue] = useState("");
  const v = (variant || "outline") as InputVariant;
  return (
    <InputField
      label="Email"
      placeholder="you@example.com"
      variant={v}
      value={value}
      onChangeText={setValue}
    />
  );
};

// Button preview component
const ButtonPreview: React.FC<{ variant: string }> = ({ variant }) => {
  const v = (variant || "primary") as ButtonVariant;
  return (
    <Button
      label={`Continue (${v})`}
      variant={v}
      onPress={() => {}}
    />
  );
};

const componentPreviews: ComponentPreviewEntry[] = [
  {
    slug: "button",
    supportedVariants: ["primary", "secondary", "outline", "ghost", "minimal"],
    Component: ButtonPreview,
  },
  {
    slug: "input-field",
    supportedVariants: ["outline", "solid", "underline"],
    Component: InputFieldPreview,
  },
];

export { componentPreviews };

export const findComponentPreview = (slug: string): ComponentPreviewEntry | undefined => {
  return componentPreviews.find((entry) => entry.slug === slug);
};

