import React from "react";
import { Stack } from "expo-router";
import { FontsProvider } from "../src/design-system/FontsProvider";

export default function RootLayout() {
  return (
    <FontsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </FontsProvider>
  );
}


