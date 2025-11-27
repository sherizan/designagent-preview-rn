// Native-only font provider
import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useFonts, Urbanist_400Regular, Urbanist_600SemiBold } from "@expo-google-fonts/urbanist";

type FontsProviderProps = { children: React.ReactNode };

export const FontsProvider: React.FC<FontsProviderProps> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_600SemiBold,
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

