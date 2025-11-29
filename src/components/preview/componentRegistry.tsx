import React, { useState } from "react";
import { View } from "react-native";
import { Button, ButtonVariant } from "@/design-system/components/Button";
import { InputField, InputVariant } from "@/design-system/components/InputField";
import { DAText } from "@/design-system/components/primitives/Text";
import { Surface } from "@/design-system/components/primitives/Surface";
import { Stack } from "@/design-system/components/primitives/Stack";
import { TextInput } from "@/design-system/components/primitives/TextInput";
import { Card } from "@/design-system/components/primitives/Card";
import { SocialButton } from "@/design-system/components/primitives/SocialButton";
import { Divider } from "@/design-system/components/primitives/Divider";
import { Icon } from "@/design-system/components/primitives/Icon";
import { AuthCard } from "@/design-system/components/patterns/AuthCard";
import { AuthHeader } from "@/design-system/components/patterns/AuthHeader";
import { FormField } from "@/design-system/components/patterns/FormField";

export type ComponentSlug =
  | "button"
  | "input-field"
  | "text"
  | "surface"
  | "stack"
  | "text-input"
  | "card"
  | "social-button"
  | "divider"
  | "icon"
  | "auth-card"
  | "auth-header"
  | "form-field";

export type ComponentPreviewProps = {
  variant: string;
};

export type ComponentPreviewEntry = {
  slug: ComponentSlug;
  supportedVariants: string[];
  Component: React.FC<ComponentPreviewProps>;
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

// InputField preview component
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

// Text preview component
const TextPreview: React.FC<{ variant: string }> = ({ variant }) => {
  const v = (variant || "body") as "heading" | "body" | "label" | "caption";
  const sampleText = {
    heading: "Welcome Back",
    body: "This is body text for paragraphs and content.",
    label: "Email Address",
    caption: "This is caption text for hints and metadata.",
  };
  return <DAText variant={v}>{sampleText[v] || sampleText.body}</DAText>;
};

// Surface preview component
const SurfacePreview: React.FC<{ variant: string }> = ({ variant }) => {
  const isCard = variant === "card";
  // Note: Surface doesn't have built-in border, so we'll just show the variant name
  return (
    <Surface padding="md">
      <DAText variant="body">Surface ({variant})</DAText>
    </Surface>
  );
};

// Stack preview component
const StackPreview: React.FC<{ variant: string }> = ({ variant }) => {
  const direction = (variant || "vertical") as "vertical" | "horizontal";
  return (
    <Stack direction={direction} gap="sm">
      <DAText variant="body">Item 1</DAText>
      <DAText variant="body">Item 2</DAText>
      <DAText variant="body">Item 3</DAText>
    </Stack>
  );
};

// TextInput preview component
const TextInputPreview: React.FC<{ variant: string }> = ({ variant }) => {
  const [value, setValue] = useState("");
  const pill = variant === "pill";
  return (
    <TextInput
      label="Email"
      placeholder="you@example.com"
      value={value}
      onChangeText={setValue}
      pill={pill}
    />
  );
};

// Card preview component
const CardPreview: React.FC<{ variant: string }> = () => {
  return (
    <Card>
      <DAText variant="body">Card content</DAText>
    </Card>
  );
};

// SocialButton preview component
const SocialButtonPreview: React.FC<{ variant: string }> = ({ variant }) => {
  const library = (variant || "google") as "google" | "apple";
  const title = library === "google" ? "Continue with Google" : "Continue with Apple";
  return (
    <SocialButton
      title={title}
      iconLibrary={library}
      onPress={() => {}}
    />
  );
};

// Divider preview component
const DividerPreview: React.FC<{ variant: string }> = () => {
  return <Divider label="OR" />;
};

// Icon preview component
const IconPreview: React.FC<{ variant: string }> = () => {
  return (
    <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
      <Icon library="lucide" name="Heart" size={24} />
      <Icon library="lucide" name="Star" size={24} />
      <Icon library="lucide" name="User" size={24} />
    </View>
  );
};

// AuthCard preview component
const AuthCardPreview: React.FC<{ variant: string }> = () => {
  return (
    <AuthCard>
      <DAText variant="body">Auth card content</DAText>
    </AuthCard>
  );
};

// AuthHeader preview component
const AuthHeaderPreview: React.FC<{ variant: string }> = () => {
  return (
    <AuthHeader
      eyebrow="Welcome"
      title="Sign in to your account"
      subtitle="Enter your credentials to continue"
    />
  );
};

// FormField preview component
const FormFieldPreview: React.FC<{ variant: string }> = () => {
  const [value, setValue] = useState("");
  return (
    <FormField
      label="Password"
      placeholder="Enter password"
      value={value}
      onChangeText={setValue}
      secureTextEntry
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
  {
    slug: "text",
    supportedVariants: ["heading", "body", "label", "caption"],
    Component: TextPreview,
  },
  {
    slug: "surface",
    supportedVariants: ["default", "card"],
    Component: SurfacePreview,
  },
  {
    slug: "stack",
    supportedVariants: ["vertical", "horizontal"],
    Component: StackPreview,
  },
  {
    slug: "text-input",
    supportedVariants: ["default", "pill"],
    Component: TextInputPreview,
  },
  {
    slug: "card",
    supportedVariants: ["default"],
    Component: CardPreview,
  },
  {
    slug: "social-button",
    supportedVariants: ["google", "apple"],
    Component: SocialButtonPreview,
  },
  {
    slug: "divider",
    supportedVariants: ["horizontal"],
    Component: DividerPreview,
  },
  {
    slug: "icon",
    supportedVariants: ["default"],
    Component: IconPreview,
  },
  {
    slug: "auth-card",
    supportedVariants: ["default"],
    Component: AuthCardPreview,
  },
  {
    slug: "auth-header",
    supportedVariants: ["default"],
    Component: AuthHeaderPreview,
  },
  {
    slug: "form-field",
    supportedVariants: ["default"],
    Component: FormFieldPreview,
  },
];

export { componentPreviews };

export const findComponentPreview = (slug: string): ComponentPreviewEntry | undefined => {
  return componentPreviews.find((entry) => entry.slug === slug);
};

