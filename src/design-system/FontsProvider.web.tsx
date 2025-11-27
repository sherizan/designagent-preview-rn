// Web-only font provider
import React from "react";
import { useFonts } from "expo-font";

type FontsProviderProps = { children: React.ReactNode };

export const FontsProvider: React.FC<FontsProviderProps> = ({ children }) => {
  // On web, Inter font is loaded via Google Fonts or system fonts
  // The font will be available via CSS font-family: "Inter"
  return <>{children}</>;
};

