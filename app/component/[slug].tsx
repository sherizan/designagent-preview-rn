import React from "react";
import { View, Text, Platform } from "react-native";
import { useLocalSearchParams, useSegments } from "expo-router";
import { findComponentPreview } from "@/components/preview/componentRegistry";
import {
  DesignAgentProvider,
  DesignAgentProviderMode,
} from "@/design-system/theme";
import { useTheme } from "@/design-system/theme";
import { resolveThemeFromQuery } from "@/design-system/themes/registry";

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
    themeId?: string | string[];
    mode?: string | string[];
    customTheme?: string | string[];
    // Backwards compatibility
    theme?: string | string[];
  }>();

  // Extract slug from URL pathname (most reliable for web)
  let slug: string | undefined;
  
  if (Platform.OS === "web" && typeof window !== "undefined") {
    try {
      // Extract slug from URL path like /component/button
      const pathname = window.location.pathname;
      const match = pathname.match(/^\/component\/([^\/\?]+)/);
      if (match && match[1]) {
        slug = match[1];
      }
    } catch (error) {
      // Fall through to other methods
    }
  }
  
  // Try to get slug from segments (route params)
  if (!slug && segments.length >= 2 && segments[0] === "component") {
    const segmentSlug = segments[1];
    // Only use if it's not the literal "[slug]" string
    if (segmentSlug && segmentSlug !== "[slug]") {
      slug = segmentSlug;
    }
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

  // Resolve theme from query params (supports both themeId and theme for backwards compatibility)
  const { themeId, theme, mode, customTheme } = resolveThemeFromQuery(params);
  const variant = variantParam || entry.supportedVariants[0];

  return (
    <DesignAgentProvider
      key={`${themeId}-${mode}-${customTheme ? "custom" : "base"}`}
      themeId={customTheme ? undefined : themeId}
      mode={mode}
      themeOverride={customTheme}
    >
      <ComponentPreviewContent slug={slug} variant={variant} />
    </DesignAgentProvider>
  );
}

