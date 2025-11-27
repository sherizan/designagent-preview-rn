import { LoginSimpleScreen } from "./auth/LoginSimpleScreen";
import { LoginHeroScreen } from "./auth/LoginHeroScreen";

export const screens = {
  "login-simple": LoginSimpleScreen,
  "login-hero": LoginHeroScreen,
};

export type ScreenKey = keyof typeof screens;

