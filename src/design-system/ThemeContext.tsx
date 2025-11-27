import React, { createContext, useContext, ReactNode } from "react";
import { DesignTheme, midnightTheme } from "./tokens/themes";

const ThemeContext = createContext<DesignTheme>(midnightTheme);

export const ThemeProvider: React.FC<{ theme: DesignTheme; children: ReactNode }> = ({
  theme,
  children,
}) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = (): DesignTheme => {
  return useContext(ThemeContext);
};

