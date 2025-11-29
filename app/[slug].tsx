import React from "react";
import { Redirect, useLocalSearchParams } from "expo-router";
import { screens, ScreenKey } from "../src/screens/registry";
import {
  DesignAgentProvider,
} from "../src/design-system/theme";
import { resolveThemeFromQuery } from "../src/design-system/themes/registry";

const DEFAULT_SCREEN: ScreenKey = "login-simple";

export default function ScreenRoute() {
  const params = useLocalSearchParams<{
    slug?: string | string[];
    themeId?: string | string[];
    mode?: string | string[];
    customTheme?: string | string[];
    // Backwards compatibility
    theme?: string | string[];
  }>();

  // Handle expo-router params which can be string or string[]
  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : (params.slug as string | undefined);

  const screenKey: ScreenKey = (slug as ScreenKey) || DEFAULT_SCREEN;

  if (!screenKey || !(screenKey in screens)) {
    return <Redirect href={`/${DEFAULT_SCREEN}`} />;
  }

  const ActiveScreen = screens[screenKey];

  // Resolve theme from query params (supports both themeId and theme for backwards compatibility)
  const { themeId, mode, customTheme } = resolveThemeFromQuery(params);

  return (
    <DesignAgentProvider
      key={`${themeId}-${mode}-${customTheme ? "custom" : "base"}`}
      themeId={customTheme ? undefined : themeId}
      mode={mode}
      themeOverride={customTheme}
    >
      <ActiveScreen />
    </DesignAgentProvider>
  );
}

