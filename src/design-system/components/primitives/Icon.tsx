import React from "react";
import { useTheme } from "../../theme";

// react-icons imports for brand icons
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { SiTwitter, SiLinkedin, SiGithub } from "react-icons/si";

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

  switch (library) {
    case "google":
      // Google icon is multicolor, color prop is ignored
      return <FcGoogle size={finalSize} />;

    case "apple":
      return <FaApple size={finalSize} color={finalColor} />;

    case "facebook":
      return <FaFacebook size={finalSize} color={finalColor} />;

    case "twitter":
      return <SiTwitter size={finalSize} color={finalColor} />;

    case "linkedin":
      return <SiLinkedin size={finalSize} color={finalColor} />;

    case "github":
      return <SiGithub size={finalSize} color={finalColor} />;

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

