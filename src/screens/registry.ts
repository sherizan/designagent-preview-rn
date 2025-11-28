import { LoginSimpleScreen } from "./auth/LoginSimpleScreen";
import { LoginHeroScreen } from "./auth/LoginHeroScreen";
import { LoginMinimalScreen } from "./auth/LoginMinimalScreen";

export const screens = {
  "login-simple": LoginSimpleScreen,
  "login-hero": LoginHeroScreen,
  "login-minimal": LoginMinimalScreen,
};

export type ScreenKey = keyof typeof screens;

