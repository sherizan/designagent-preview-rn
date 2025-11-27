// This file uses the registry as the single source of truth
import { screens } from "../src/screens/registry";

export default function LoginHeroRoute() {
  const Screen = screens["login-hero"];
  return <Screen />;
}

