// Native-only font provider
import React from "react";
import { View, ActivityIndicator } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

type FontsProviderProps = { children: React.ReactNode };

export const FontsProvider: React.FC<FontsProviderProps> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#050816" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <>{children}</>;
};

