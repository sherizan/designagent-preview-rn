import { midnightTheme, DesignTheme } from "./tokens/themes";
import { useThemeContext } from "./ThemeContext";

export const designAgentTheme: DesignTheme = midnightTheme;

// Re-export useTheme from ThemeContext for backward compatibility
export { useThemeContext as useTheme };

