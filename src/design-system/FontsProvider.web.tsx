// Web-only font provider (no font loading needed)
import React from "react";

type FontsProviderProps = { children: React.ReactNode };

export const FontsProvider: React.FC<FontsProviderProps> = ({ children }) => {
  // On web, fonts load via CSS, so just render children
  return <>{children}</>;
};

