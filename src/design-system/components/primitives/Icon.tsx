import React from "react";
import { Platform, Image, ImageStyle } from "react-native";
import { useTheme } from "../../theme";

// react-icons imports for brand icons (web only)
// Using dynamic imports to avoid errors on native
let FcGoogle: any = null;
let FaApple: any = null;
let FaFacebook: any = null;
let SiTwitter: any = null;
let SiLinkedin: any = null;
let SiGithub: any = null;

if (Platform.OS === "web") {
  try {
    // Only import react-icons on web
    const reactIconsFc = require("react-icons/fc");
    const reactIconsFa = require("react-icons/fa");
    const reactIconsSi = require("react-icons/si");
    FcGoogle = reactIconsFc.FcGoogle;
    FaApple = reactIconsFa.FaApple;
    FaFacebook = reactIconsFa.FaFacebook;
    SiTwitter = reactIconsSi.SiTwitter;
    SiLinkedin = reactIconsSi.SiLinkedin;
    SiGithub = reactIconsSi.SiGithub;
  } catch (e) {
    // react-icons not available, will fall back to images
    console.warn("react-icons not available, using fallback icons");
  }
}

// Lucide icons (already installed via lucide-react-native)
import * as LucideIcons from "lucide-react-native";

// Type for icon library
export type IconLibrary =
  | "lucide"
  | "google"
  | "apple"
  | "facebook"
  | "twitter"
  | "linkedin"
  | "github";

export interface IconProps {
  /**
   * Icon name (required for lucide icons, ignored for brand icons)
   */
  name?: string;
  /**
   * Icon library to use
   */
  library: IconLibrary;
  /**
   * Icon size in pixels (defaults to 20 * theme.typography.bodyScale)
   */
  size?: number;
  /**
   * Icon color (defaults to theme.colors.text)
   * Note: Google icon (FcGoogle) ignores color prop as it's multicolor
   */
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, library, size, color }) => {
  const theme = useTheme();
  const finalColor = color ?? theme.colors.text;
  const finalSize = size ?? 20 * theme.typography.bodyScale;

  // For native platforms, use Image assets for brand icons
  if (Platform.OS !== "web") {
    switch (library) {
      case "google":
        return (
          <Image
            source={require("../../../assets/google-icon.png")}
            style={{ width: finalSize, height: finalSize } as ImageStyle}
            resizeMode="contain"
          />
        );

      case "apple":
        return (
          <Image
            source={require("../../../assets/apple-icon.png")}
            style={{ width: finalSize, height: finalSize } as ImageStyle}
            resizeMode="contain"
          />
        );

      case "facebook":
      case "twitter":
      case "linkedin":
      case "github":
        // For other brand icons on native, we could add assets later
        // For now, return null or use a placeholder
        return null;

      case "lucide":
        if (name && name in LucideIcons) {
          const LucideIcon = LucideIcons[name as keyof typeof LucideIcons] as React.ComponentType<{
            size?: number;
            color?: string;
          }>;
          return <LucideIcon size={finalSize} color={finalColor} />;
        }
        return null;

      default:
        return null;
    }
  }

  // Web platform - use react-icons
  switch (library) {
    case "google":
      // Google icon is multicolor, color prop is ignored
      return FcGoogle ? <FcGoogle size={finalSize} /> : null;

    case "apple":
      return FaApple ? <FaApple size={finalSize} color={finalColor} /> : null;

    case "facebook":
      return FaFacebook ? <FaFacebook size={finalSize} color={finalColor} /> : null;

    case "twitter":
      return SiTwitter ? <SiTwitter size={finalSize} color={finalColor} /> : null;

    case "linkedin":
      return SiLinkedin ? <SiLinkedin size={finalSize} color={finalColor} /> : null;

    case "github":
      return SiGithub ? <SiGithub size={finalSize} color={finalColor} /> : null;

    case "lucide":
      if (name && name in LucideIcons) {
        const LucideIcon = LucideIcons[name as keyof typeof LucideIcons] as React.ComponentType<{
          size?: number;
          color?: string;
        }>;
        return <LucideIcon size={finalSize} color={finalColor} />;
      }
      return null;

    default:
      return null;
  }
};

