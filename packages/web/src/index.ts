import "./styles/theme.css";

import { registerCustomElements } from "./core/register";
import { MButton } from "./components/button";

export { MButton } from "./components/button";
export type {
  MButtonSize,
  MButtonState,
  MButtonType,
  MButtonVariant
} from "./components/button";
export { MithraElement } from "./core/mithra-element";
export { applyTheme } from "./core/theme";
export type { MithraDirection, MithraTheme, ThemeOptions } from "./core/theme";
export { registerCustomElements } from "./core/register";
export type {
  CustomElementConstructorMap,
  RegisterOptions
} from "./core/register";

export function register(): void {
  registerCustomElements({
    "m-button": MButton
  });
}
