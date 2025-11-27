// src/design-system/FontsProvider.tsx

import React from "react";

type FontsProviderProps = { children: React.ReactNode };

// TEMP: no font loading, just render children

export const FontsProvider: React.FC<FontsProviderProps> = ({ children }) => {
  return <>{children}</>;
};

