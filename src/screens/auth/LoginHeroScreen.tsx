import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { useTheme } from "../../design-system/theme";
import { AuthCard } from "../../design-system/components/patterns/AuthCard";
import { AuthHeader } from "../../design-system/components/patterns/AuthHeader";
import { FormField } from "../../design-system/components/patterns/FormField";
import { Button } from "../../design-system/components/primitives/Button";
import { DAText } from "../../design-system/components/primitives/Text";

export const LoginHeroScreen: React.FC = () => {
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

  const handleContinue = () => {
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
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Hero Background - Top Gradient */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40%",
          backgroundColor: theme.colors.primary,
          opacity: 0.08,
        }}
      />

      {/* Optional: DesignAgent logo/title at top left */}
      <View
        style={{
          position: "absolute",
          top: theme.spacing.xl,
          left: theme.spacing.lg,
        }}
      >
        <DAText
          variant="heading"
          style={{
            fontFamily: headingFontFamily,
            fontSize: typography.heading.fontSize * 0.83, // Slightly smaller for logo
            lineHeight: (typography.heading.lineHeight ?? typography.heading.fontSize * 1.25) * 0.83,
            fontWeight: "600",
          }}
        >
          DesignAgent
        </DAText>
      </View>

      {/* Content - Centered with slight offset */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: theme.spacing.lg,
          paddingTop: theme.spacing.xl * 2, // Slightly lower for hero effect
        }}
      >
        <AuthCard>
          <AuthHeader
            eyebrow="Welcome back"
            title="Sign in to your account"
            subtitle="Use your email and password to continue."
          />

          {/* Form fields */}
          <View style={{ marginTop: theme.spacing.lg, gap: theme.spacing.md }}>
            <FormField
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError(null);
              }}
              placeholder="you@example.com"
              keyboardType="email-address"
              error={error ? undefined : null}
            />

            <FormField
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError(null);
              }}
              placeholder="••••••••"
              secureTextEntry
              error={error}
            />
          </View>

          {/* Forgot password */}
          <View
            style={{
              marginTop: theme.spacing.sm,
              marginBottom: theme.spacing.lg,
              alignItems: "flex-end",
            }}
          >
            <Pressable onPress={() => {}}>
              <DAText variant="caption" color="muted">
                Forgot password?
              </DAText>
            </Pressable>
          </View>

          {/* Error message */}
          {error && (
            <View style={{ marginBottom: theme.spacing.md }}>
              <DAText variant="caption" color="danger" style={{ textAlign: "center" }}>
                {error}
              </DAText>
            </View>
          )}

          {/* Actions */}
          <View style={{ gap: theme.spacing.sm }}>
            <Button
              title={loading ? "Signing in..." : "Continue"}
              onPress={handleContinue}
              loading={loading}
              disabled={loading}
            />
            <Button
              title="Create an account"
              onPress={() => {}}
              variant="ghost"
              disabled={loading}
            />
          </View>
        </AuthCard>
      </View>
    </View>
  );
};
