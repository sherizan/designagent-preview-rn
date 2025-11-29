import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/design-system/components";
import { TextInput } from "@/design-system/components/primitives/TextInput";
import { DAText } from "../../design-system/components/primitives/Text";
import { useTheme } from "../../design-system/theme";

export const LoginMinimalScreen: React.FC = () => {
  const theme = useTheme();
  const { typography } = theme;
  const headingFontFamily =
    typography.heading.fontFamily ?? typography.fontFamilyBase;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const isValid = email.includes("@") && password.length >= 6;
      if (isValid) {
        setError(null);
        setLoading(false);
        console.log("Signed in!");
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.background,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: theme.spacing.xl * 2,
          paddingBottom: theme.spacing.xl,
          paddingHorizontal: theme.spacing.lg,
        }}
      >
        {/* Minimal Header */}
        <View
          style={{
            alignItems: "center",
            marginBottom: theme.spacing.xl * 2,
            gap: theme.spacing.xs,
          }}
        >
          <DAText
            variant="heading"
            style={{
              fontFamily: headingFontFamily,
              fontSize: typography.heading.fontSize * 1.5,
              lineHeight: (typography.heading.lineHeight ?? typography.heading.fontSize * 1.25) * 1.5,
              fontWeight: "700",
              color: theme.colors.text,
            }}
          >
            Welcome back
          </DAText>
        </View>

        {/* Form */}
        <View style={{ width: "100%", maxWidth: 400, gap: theme.spacing.lg }}>
          {/* Minimal TextInput (Email + Password combined) */}
          <TextInput
            variant="minimal"
            emailValue={email}
            onEmailChangeText={(text) => {
              setEmail(text);
              setError(null);
            }}
            passwordValue={password}
            onPasswordChangeText={(text) => {
              setPassword(text);
              setError(null);
            }}
            errorText={error || undefined}
          />

          {/* Log in Button */}
          <Button
            label={loading ? "Logging in..." : "Log in"}
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            variant="minimal"
            style={{ marginTop: theme.spacing.md }}
          />

          {/* Create account link */}
          <View style={{ alignItems: "center", marginTop: theme.spacing.lg }}>
            <Button
              label="Don't have an account? Sign up"
              variant="ghost"
              fullWidth={false}
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
