import React from "react";
import { Redirect, useLocalSearchParams } from "expo-router";
import { screens, ScreenKey } from "../src/screens/registry";
import {
  DesignAgentProvider,
  DesignAgentProviderMode,
} from "../src/design-system/theme";
import { ThemeKey } from "../src/design-system/themes/registry";
import {
  getThemeKeyFromQuery,
  getModeFromQuery,
} from "../src/utils/themeQuery";

const DEFAULT_SCREEN: ScreenKey = "login-simple";
const DEFAULT_THEME: ThemeKey = "midnight";
const DEFAULT_MODE: DesignAgentProviderMode = "dark";

export default function ScreenRoute() {
  const params = useLocalSearchParams<{
    slug?: string | string[];
    theme?: string | string[];
    mode?: string | string[];
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

  const themeKey = getThemeKeyFromQuery(params, DEFAULT_THEME);
  const mode = getModeFromQuery(params, DEFAULT_MODE);

  return (
    <DesignAgentProvider key={`${themeKey}-${mode}`} themeId={themeKey} mode={mode}>
      <ActiveScreen />
    </DesignAgentProvider>
  );
}

