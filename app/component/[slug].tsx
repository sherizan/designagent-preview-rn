import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams, useSegments } from "expo-router";
import { findComponentPreview } from "@/components/preview/componentRegistry";
import {
  DesignAgentProvider,
  DesignAgentProviderMode,
} from "@/design-system/theme";
import { useTheme } from "@/design-system/theme";
import { ThemeKey } from "@/design-system/themes/registry";
import {
  getThemeKeyFromQuery,
  getModeFromQuery,
} from "@/utils/themeQuery";

const DEFAULT_THEME: ThemeKey = "midnight";
const DEFAULT_MODE: DesignAgentProviderMode = "dark";

// Wrapper component to access theme inside DesignAgentProvider
const ComponentPreviewContent: React.FC<{
  slug: string;
  variant: string;
}> = ({ slug, variant }) => {
  const theme = useTheme();
  const entry = findComponentPreview(slug);

  if (!entry) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
        <Text style={{ color: theme.colors.text }}>
          Component "{slug}" not found
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing.lg,
      }}
    >
      <View
        style={{
          width: 320,
          maxWidth: "100%",
          borderRadius: theme.radius.lg,
          borderWidth: 1,
          borderColor: theme.colors.border,
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.surface,
        }}
      >
        <entry.Component variant={variant} />
      </View>
    </View>
  );
};

export default function ComponentPreviewRoute() {
  const segments = useSegments();
  const params = useLocalSearchParams<{
    slug?: string | string[];
    variant?: string | string[];
    theme?: string | string[];
    mode?: string | string[];
  }>();

  // Extract slug from route segments or params
  // In Expo Router, for /component/[slug], the slug should be in segments or params
  let slug: string | undefined;
  
  // Try to get slug from segments first (route params)
  if (segments.length >= 2 && segments[0] === "component") {
    slug = segments[1];
  }
  
  // Fallback to params (query params or route params)
  if (!slug) {
    slug = Array.isArray(params.slug)
      ? params.slug[0]
      : (params.slug as string | undefined);
  }

  const variantParam = Array.isArray(params.variant)
    ? params.variant[0]
    : (params.variant as string | undefined);

  if (!slug) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
        <Text style={{ color: "#fff" }}>No component slug provided</Text>
      </View>
    );
  }

  const entry = findComponentPreview(slug);
  if (!entry) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
        <Text style={{ color: "#fff" }}>Component "{slug}" not found</Text>
      </View>
    );
  }

  const themeKey = getThemeKeyFromQuery(params, DEFAULT_THEME);
  const mode = getModeFromQuery(params, DEFAULT_MODE);
  const variant = variantParam || entry.supportedVariants[0];

  return (
    <DesignAgentProvider key={`${themeKey}-${mode}`} themeId={themeKey} mode={mode}>
      <ComponentPreviewContent slug={slug} variant={variant} />
    </DesignAgentProvider>
  );
}

