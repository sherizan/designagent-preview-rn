// This file uses the registry as the single source of truth
import { screens } from "../src/screens/registry";

export default function LoginSimpleRoute() {
  const Screen = screens["login-simple"];
  return <Screen />;
}

