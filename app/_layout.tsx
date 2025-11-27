import { Stack } from "expo-router";
import { FontsProvider } from "../src/design-system/FontsProvider";
import { ThemeProvider } from "../src/design-system/ThemeContext";
import { midnightTheme } from "../src/design-system/tokens/themes";

export default function RootLayout() {
  return (
    <FontsProvider>
      <ThemeProvider theme={midnightTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </ThemeProvider>
    </FontsProvider>
  );
}

