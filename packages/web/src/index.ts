import "./styles/theme.css";

import { registerCustomElements } from "./core/register";
import { MButton } from "./components/button";
import { MIcon } from "./components/icon";
import { MText, MDisplay, MHeading, MTitle, MBody, MCaption } from "./components/text";

export { MButton } from "./components/button";
export type {
  MButtonSize,
  MButtonState,
  MButtonType,
  MButtonVariant
} from "./components/button";

export { MIcon } from "./components/icon";
export type { MIconColor, MIconSize } from "./core/icons";

export { MText, MDisplay, MHeading, MTitle, MBody, MCaption } from "./components/text";
export type {
  MTextAlign,
  MTextAnimation,
  MTextAs,
  MTextColor,
  MTextFamily,
  MTextFormat,
  MTextGradient,
  MTextLeading,
  MTextSize,
  MTextTracking,
  MTextVariant,
  MTextWeight
} from "./core/typography";

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
    "m-button": MButton,
    "m-icon": MIcon,
    "m-text": MText,
    "m-display": MDisplay,
    "m-heading": MHeading,
    "m-title": MTitle,
    "m-body": MBody,
    "m-caption": MCaption
  });
}
