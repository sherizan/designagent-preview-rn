import React, { useState } from "react";
import { View, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormField } from "../../design-system/components/patterns/FormField";
import { Button } from "../../design-system/components/primitives/Button";
import { SocialButton } from "../../design-system/components/primitives/SocialButton";
import { Divider } from "../../design-system/components/primitives/Divider";
import { DAText } from "../../design-system/components/primitives/Text";
import { useTheme } from "../../design-system/theme";

export const LoginSimpleScreen: React.FC = () => {
  const theme = useTheme();
  const { typography } = theme;
  const headingFontFamily =
    typography.heading.fontFamily ?? typography.fontFamilyBase;
  const bodyFontFamily =
    typography.body.fontFamily ?? typography.fontFamilyBase;
  const labelFontFamily =
    typography.label.fontFamily ?? typography.fontFamilyBase;
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
          paddingTop: theme.spacing.xl * 2,
          paddingBottom: theme.spacing.xl,
          paddingHorizontal: theme.spacing.lg,
        }}
      >
      {/* Header */}
      <View
        style={{
          alignItems: "center",
          marginBottom: theme.spacing.xl,
          gap: theme.spacing.sm,
        }}
      >
        <DAText
          variant="heading"
          style={{
            fontFamily: headingFontFamily,
            fontSize: typography.heading.fontSize * 1.25, // Slightly larger for main title
            lineHeight: (typography.heading.lineHeight ?? typography.heading.fontSize * 1.25) * 1.25,
            fontWeight: "700",
            color: theme.colors.text,
          }}
        >
          DesignAgent
        </DAText>
        <DAText
          variant="body"
          color="muted"
          style={{
            fontFamily: bodyFontFamily,
            fontSize: typography.body.fontSize,
            lineHeight: typography.body.lineHeight ?? typography.body.fontSize * 1.4,
          }}
        >
          Login to your account
        </DAText>
      </View>

      {/* Form */}
      <View style={{ width: "100%", gap: theme.spacing.md }}>
        {/* Email Field */}
        <FormField
          label="Email address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError(null);
          }}
          placeholder="your@email.com"
          keyboardType="email-address"
          error={null}
          pill
        />

        {/* Password Field */}
        <FormField
          label="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError(null);
          }}
          placeholder="password"
          secureTextEntry
          error={error}
          pill
          showPasswordToggle
        />

        {/* Log in Button */}
        <Button
          title={loading ? "Logging in..." : "Log in"}
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          variant="primary"
          style={{ marginTop: theme.spacing.sm }}
        />

        {/* Create account link */}
        <View style={{ alignItems: "center", marginTop: theme.spacing.md }}>
          <Pressable onPress={() => {}}>
            <DAText
              variant="body"
              style={{
                fontFamily: bodyFontFamily,
                fontSize: typography.body.fontSize,
                lineHeight: typography.body.lineHeight ?? typography.body.fontSize * 1.4,
                textDecorationLine: "underline",
                color: theme.colors.text,
              }}
            >
              Create an account
            </DAText>
          </Pressable>
        </View>

        {/* Divider */}
        <Divider label="OR" />

        {/* Social Login Buttons */}
        <View style={{ gap: theme.spacing.md, width: "100%" }}>
          <SocialButton
            title="Continue with Apple"
            onPress={() => console.log("Apple login")}
            iconLibrary="apple"
          />
          <SocialButton
            title="Continue with Google"
            onPress={() => console.log("Google login")}
            iconLibrary="google"
          />
        </View>
      </View>

      {/* Footer */}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "row",
          gap: theme.spacing.md,
          marginTop: theme.spacing.xl * 2,
          paddingBottom: theme.spacing.xl,
        }}
      >
        <Pressable onPress={() => {}}>
          <DAText
            variant="body"
            style={{
              fontFamily: bodyFontFamily,
              fontSize: typography.body.fontSize,
              lineHeight: typography.body.lineHeight ?? typography.body.fontSize * 1.4,
              textDecorationLine: "underline",
              color: theme.colors.text,
            }}
          >
            Terms of Use
          </DAText>
        </Pressable>
        <Pressable onPress={() => {}}>
          <DAText
            variant="body"
            style={{
              fontFamily: bodyFontFamily,
              fontSize: typography.body.fontSize,
              lineHeight: typography.body.lineHeight ?? typography.body.fontSize * 1.4,
              textDecorationLine: "underline",
              color: theme.colors.text,
            }}
          >
            Privacy Policy
          </DAText>
        </Pressable>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};
