import React from "react";
import { useLocalSearchParams } from "expo-router";
import {
  DesignAgentProvider,
} from "../src/design-system/theme";
import { resolveThemeFromQuery } from "../src/design-system/themes/registry";
import { screens } from "../src/screens/registry";

export default function LoginHeroRoute() {
  const params = useLocalSearchParams<{
    themeId?: string | string[];
    mode?: string | string[];
    customTheme?: string | string[];
    // Backwards compatibility
    theme?: string | string[];
  }>();

  // Resolve theme from query params (supports both themeId and theme for backwards compatibility)
  const { themeId, mode, customTheme } = resolveThemeFromQuery(params);
  const Screen = screens["login-hero"];

  return (
    <DesignAgentProvider
      key={`${themeId}-${mode}-${customTheme ? "custom" : "base"}`}
      themeId={customTheme ? undefined : themeId}
      mode={mode}
      themeOverride={customTheme}
    >
      <Screen />
    </DesignAgentProvider>
  );
}

